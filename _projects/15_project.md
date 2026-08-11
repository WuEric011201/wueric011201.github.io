---
layout: page
title: PCIe Switch Modeling for AI Inference Fabrics
description: A transaction-level model of a PCIe switch, built to find where a fabric actually stalls. Credit-based backpressure, virtual output queues, arbitration policy, and routing, evaluated under realistic traffic instead of at a single operating point.
img: assets/img/qualcomm/arbitration.svg
importance: 3
category: realdeal
related_publications: false
---

**Qualcomm** · San Diego, CA · Sep 2025 – Dec 2025

I built a transaction-level model (TLM) of a PCIe switch to study how interconnect fabrics behave when many accelerators talk to each other at once. This page describes the modeling approach and the general findings. Internal measurements, vendor comparisons, and product specifics are left out.

## Why model instead of measure

A switch datasheet gives a peak number. The peak is almost never what a real workload sees, because the fabric's behavior under congestion depends on how packets are queued, how arbitration picks among them, and where backpressure propagates when a destination is oversubscribed. A switch under backpressure can collapse system throughput well below what the link rates suggest.

The model exists to answer three questions before hardware is committed: what bandwidth is actually achievable under a given traffic pattern, which resource is the binding constraint, and how the answer moves as buffers, link rates, and topology change.

## What the model represents

Traffic is broken into fixed-size packets and moved through the fabric on a cycle-accurate clock. Each hop carries a structural latency, and each link has a credit-based flow control loop: a sender may only transmit when the receiver has advertised buffer space, and credits return as that space frees. This is what makes congestion propagate backwards through the fabric the way it does in real hardware, rather than packets simply disappearing into an infinite queue.

Ingress ports hold **virtual output queues**, one queue per destination, so that a packet blocked on a busy output does not stall packets bound for an idle one. That single structural choice is worth a large fraction of achievable throughput, and its absence is the classic head-of-line blocking failure.

<div class="row justify-content-center">
    <div class="col-sm-11 mt-3 mt-md-0">
{% include figure.liquid path="assets/img/qualcomm/switch-model.svg" class="img-fluid" zoomable=true alt="Diagram of a switch model: an ingress port holding three virtual output queues, feeding an arbiter and crossbar, feeding three egress ports, with dashed credit-return arrows running backwards from egress to ingress" %}
    </div>
</div>
<div class="caption">
    The structure the model captures. Each ingress port keeps one queue per destination so a blocked output cannot stall traffic bound elsewhere. The arbiter picks a conflict-free set of ingress-to-egress pairs each cycle, and credits returning from egress to ingress are what make congestion propagate backwards.
</div>

## Arbitration is the throughput ceiling

Every cycle the switch has to choose a conflict-free matching between inputs that have traffic and outputs that can accept it. That choice is the arbiter, and it turns out to set the ceiling more than buffer size does.

A naive round robin leaves a great deal on the table, because independently rotating pointers tend to synchronize and repeatedly offer the same conflicting matches. The published fix is iterative request-grant-accept matching with pointers that only advance on a successful match, which desynchronizes them and converges toward a maximal matching in a few iterations. The canonical treatment is McKeown's iSLIP.

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
{% include figure.liquid path="assets/img/qualcomm/arbitration.svg" class="img-fluid" zoomable=true alt="Three-panel diagram of one arbitration round: inputs issue requests to every output they have traffic for, each output grants one requester by pointer order, then each input accepts one grant, with unmatched requests shown dropping out" %}
    </div>
</div>
<div class="caption">
    One arbitration round in three phases. Every input requests each output it has queued traffic for; each output grants a single requester in pointer order; each input accepts a single grant. Pointers advance only on a successful match, which is what stops them locking into a repeating conflict.
</div>

Working through the policies in the model, the ordering was consistent: virtual output queues with a poor arbiter can be worse than a single queue, while the same queues with iterative matching recover the large majority of theoretical peak. The queue structure and the arbiter have to be chosen together.

## Traffic pattern changes the answer

The same switch, same buffers, same arbiter, gives materially different throughput depending on how destinations are distributed in time. Uniformly random destinations, destinations randomized within a cycle, and staggered or synchronized linear permutations all stress the arbiter differently, and a policy that looks best on one can be mid-pack on another. Reporting a single number without saying which pattern produced it is close to meaningless, which is a large part of why the model was worth building.

## Scaling, routing, and deadlock

Beyond a single switch, the questions become topological. Multi-level trees connected by inter-switch links raise three issues the model was extended to handle:

- **Saturation points.** As more endpoints attach per switch, aggregate throughput climbs and then stops, and it matters which resource stopped it. Uplink bandwidth between levels and transmit buffer occupancy at the upper level saturate at different fan-in counts, and they produce different curves.
- **Deadlock.** Inter-switch links that permit cyclic routes can deadlock outright once credit dependencies form a loop. I implemented detection for this, and the resolutions are the standard ones: reserve a bubble of buffer space so a cycle can always drain, provision more buffering, or route so the cycle never forms.
- **Routing policy.** Whether inter-switch links are used in one direction or both, and how many hops a packet may take before it is pushed to a higher level, decides both stability and scalability. Routing that deliberately pushes load up a level absorbs excess traffic and damps the oscillations that otherwise show up in link utilization traces.

**Multicast** is the other lever. When one source sends the same payload to many destinations, replicating as late as possible in the tree removes redundant copies from the busiest links, and the gain grows with the number of destinations.

## What it added up to

The recurring result is that no single knob is sufficient. Large buffers do not rescue a poor arbiter; a good arbiter does not rescue a routing policy that permits cyclic dependencies; and neither fixes a topology whose uplinks are undersized for the fan-in. High-performance fabrics need arbitration, buffering, and routing designed together, and a model that keeps all four cost terms visible at once is how that co-design gets done before silicon.
