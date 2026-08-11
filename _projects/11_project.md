---
layout: page
title: Accelerating Distributed Digital Ising Machines
description: A cost model that says which of compute, memory, synchronization, or communication binds a distributed Ising machine, calibrated to 4.8% mean error across GPUs, FPGAs, and a fabricated 28 nm ASIC up to a million spins.
img: assets/img/pbit/fig09b-energy-vs-throughput.png
importance: 1
category: research
related_publications: false
---

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig01-workflow-overview.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Left-to-right flow diagram: a max-cut problem graph, an irregular spin graph, a regular kings-graph lattice, then icons for GPU, FPGA, and ASIC" %}
    </div>
</div>
<div class="caption">
    From a combinatorial optimization problem to hardware. The problem becomes a graph of spins, sparsification maps that graph onto a regular topology the hardware can host, and the mapped problem runs on a GPU, an FPGA, or an ASIC. This work is about the last stage.
</div>

An Ising machine solves combinatorial optimization by letting a spin model relax in hardware. Max-cut, satisfiability, and portfolio problems all map onto one, and the instances that matter need millions of spins. No single device holds a million spins, so a real machine is a distributed machine, and the question becomes what the distribution costs.

Published Ising accelerators tend to report one throughput number at one operating point. That leaves the binding resource unnamed. Move to a different problem size or a different graph and the same design can be limited by something else entirely, and the only way to find out is to build it.

## The cost model

This work decomposes the time of one sweep into four terms: compute, memory traffic, synchronization between parallel updates, and inter-device communication. The decomposition is calibrated once per platform and then predicts held-out configurations without refitting, reaching 4.8% mean error across three GPU generations, an FPGA, and an ASIC, over problem sizes up to one million spins.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig02-sweep-and-architecture.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Two-part schematic. Top: a timeline of parallel blocks with one longer orange block. Bottom: a block diagram of a processing-element array with per-element memory banks and edge input and output" %}
    </div>
</div>
<div class="caption">
    What one sweep costs. Above, the work of a sweep with a straggling block marked, the block that sets the critical path. Below, the architecture assumed throughout: an array of processing elements under one scheduler, a local memory bank per element, and chip-to-chip interfaces at the edges.
</div>

## Attacking each term

With the binding term identified, each one gets its own approach.

**Memory.** Coupling storage format, residency tier, and datapath precision interact. Picking them well is worth up to 4.2x. The sharpest version of this is a residency cliff: at 16,384 spins, one FPGA that spills to DRAM sweeps in 130 us while two FPGAs that keep 8,192 spins each on chip sweep in 0.68 us. Same problem, 191x apart, entirely from where the data lives.

**Synchronization.** Gibbs sampling wants a barrier between color steps. Multi-rate and bounded-staleness schedules trade a little per-run success probability for a much higher sweep rate, cutting time-to-solution by up to 3.16x across max-cut, frustrated-loop, and tile-planted instance families.

<div class="row justify-content-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig07-tts-vs-sync-interval.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Two stacked panels: time-to-solution speedup against synchronization interval for three instance families, and a mixing-time cost curve" %}
    </div>
</div>
<div class="caption">
    How far the barrier can be relaxed. (a) Time-to-solution speedup against synchronization interval for three kings-graph instance families at ten thousand spins. (b) What gating the seam by a factor of sixteen costs in mixing time.
</div>

**Communication.** A phase-offset streaming dataflow orders the wave slots so that every boundary transfer has the maximum possible slack. When a link meets a latency-transparency criterion, the exchange disappears behind interior computation. Measured gains: 1.25x on a pair of H200 GPUs, 1.74x on a pair of ZCU106 FPGAs, and 2.01x on a four-board XEM8320 2x2 mesh.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig05-boundary-exchange-schedules.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Three-panel diagram showing execution timelines for two devices under three synchronization schedules, a latency-hiding timeline, and a mapping from a processing-element array onto a spin graph" %}
    </div>
</div>
<div class="caption">
    How the boundary exchange gets hidden. (a) Three schedules for a two-device cut: fully serialized, multi-rate, and bounded staleness. (b) The latency-hiding timeline once the wave order is phase-offset. (c) How the processing-element array maps onto the graph.
</div>

## Across platforms

The streaming dataflow also runs on silicon, on a fabricated four-chip 28 nm ASIC that sustains 28.1 Gflips/s at 4.81 pJ per flip.

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig09a-sweep-time-vs-problem-size.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Log-log line chart, time per sweep in microseconds against number of spins. Three GPU curves rise gently, two FPGA curves rise sharply past ten thousand spins, and a flat ASIC line sits at about one microsecond" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig09b-energy-vs-throughput.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Log-log scatter plot, energy per spin update in picojoules against throughput in updates per second, with GPU points near ten thousand picojoules, FPGA points in the hundreds, and ASIC points below ten" %}
    </div>
</div>
<div class="caption">
    Left: time per sweep against problem size for every platform measured, up to a million spins. The FPGA curves jump by orders of magnitude at the point where couplings no longer fit on chip, while the ASIC line stays flat because chip-to-chip transfer is hidden behind interior computation. Right: energy per spin update against sustained throughput, where GPUs, FPGAs, and the ASIC separate by roughly three orders of magnitude in energy at comparable throughput.
</div>

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig08-hardware-fpga-mesh-and-asic-mesh.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Two panels. Left: a diagram of four devices in a two-by-two mesh with coloured spins and cross-links, beside a photograph of four FPGA boards joined by ribbon cables. Right: an annotated photograph of four chips on one board with arrows showing the data path" %}
    </div>
</div>
<div class="caption">
    The two multi-device platforms. On the left, four XEM8320 FPGA boards wired as a 2x2 mesh, with the logical partition shown alongside. On the right, four 28 nm ASICs on one board, where the edge connectors extend the same dataflow to further boards.
</div>

## Code

The calibration scripts, the CUDA kernel, and the model are published under MIT at [github.com/WuEric011201/distributed-ising-machines](https://github.com/WuEric011201/distributed-ising-machines).

*Figures from "Accelerating Distributed Digital Ising Machines" (Wu et al., 2026).*
