---
layout: page
title: PCIe Switch Modeling for AI Inference Fabrics
description: A transaction-level model of a PCIe switch, built to find where an interconnect fabric actually stalls. Arbitration and queueing choices moved achieved throughput from 36% to 88% of theoretical peak.
img: assets/img/qualcomm/arbitration-results.svg
importance: 3
category: realdeal
related_publications: false
---

**Qualcomm** · San Diego, CA · Sep 2025 – Dec 2025

<div class="row justify-content-center">
    <div class="col-sm-11 mt-3 mt-md-0">
{% include figure.liquid path="assets/img/qualcomm/arbitration-results.svg" class="img-fluid" zoomable=true alt="Horizontal bar chart of achieved throughput as a percentage of theoretical peak for four queueing and arbitration policies, rising from 36 percent to 88 percent" %}
    </div>
</div>
<div class="caption">
    Same switch, same buffers, same traffic. Only the queueing structure and the arbitration policy change.
</div>

I built a transaction-level model of a PCIe switch to find where fabrics stall when many accelerators talk at once. A switch under backpressure can collapse system throughput far below what the link rates suggest, and a datasheet peak will not tell you when. This page stays at the level already described in my CV: no internal measurements, vendor comparisons, or product specifics.

## What the model showed

<div class="row text-center mt-4 mb-2">
  <div class="col-sm-4 mb-3">
    <h2 class="mb-0">36% → 88%</h2>
    <p class="text-muted mb-0">of theoretical peak<br><small>from queueing and arbitration alone</small></p>
  </div>
  <div class="col-sm-4 mb-3">
    <h2 class="mb-0">2 cliffs</h2>
    <p class="text-muted mb-0">found in fan-in scaling<br><small>uplink, then transmit buffer</small></p>
  </div>
  <div class="col-sm-4 mb-3">
    <h2 class="mb-0">Deadlock</h2>
    <p class="text-muted mb-0">detected and resolved<br><small>cyclic credit dependencies</small></p>
  </div>
</div>

**Arbitration sets the ceiling, not buffer size.** Virtual output queues with a poor arbiter can be worse than a single queue, because independently rotating pointers synchronize and keep offering the same conflicting matches. Iterative request-grant-accept matching, with pointers that advance only on a successful match, recovers the large majority of peak. Queue structure and arbiter have to be chosen together.

**Traffic pattern changes the answer.** The same switch with the same policy gives materially different throughput depending on how destinations are distributed in time, so a single reported number without its traffic pattern means very little.

**Large buffers do not rescue a bad policy.** Scaling endpoints per switch, aggregate throughput climbs and then stops, and it stops for different reasons at different points: first uplink bandwidth between levels, later transmit buffer occupancy at the upper level.

**Cyclic routes deadlock.** Inter-switch links that permit a cycle can lock up once credit dependencies close the loop. I implemented detection for it; the resolutions are to reserve a bubble of buffer space so a cycle can always drain, provision more buffering, or route so the cycle never forms. Routing that deliberately pushes load up a level also absorbs excess traffic and damps the oscillations that otherwise appear in link utilization.

**Multicast helps.** Replicating a shared payload as late as possible in the tree keeps redundant copies off the busiest links, and the gain grows with destination count.

<div class="row justify-content-center">
    <div class="col-sm-11 mt-3 mt-md-0">
{% include figure.liquid path="assets/img/qualcomm/switch-model.svg" class="img-fluid" zoomable=true alt="Diagram of a switch model: an ingress port holding three virtual output queues, feeding an arbiter and crossbar, feeding three egress ports, with dashed credit-return arrows running backwards from egress to ingress" %}
    </div>
</div>
<div class="caption">
    What the model represents: one queue per destination at each ingress, an arbiter picking a conflict-free matching each cycle, and credit returns that make congestion propagate backwards the way it does in hardware.
</div>

The recurring result is that no single knob is sufficient. High-performance fabrics need arbitration, buffering, and routing designed together, and a model that keeps all of them visible at once is how that happens before silicon.
