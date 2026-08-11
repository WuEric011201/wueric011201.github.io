---
layout: page
title: Accelerating Distributed Digital Ising Machines
description: A calibrated cost model that says which of compute, memory, synchronization, or communication binds a distributed Ising machine, plus the data placement, scheduling, and streaming techniques it points to. Validated across GPUs, FPGAs, and a 28 nm ASIC.
img: assets/img/pbit/fig09b-energy-vs-throughput.png
importance: 2
category: realdeal
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

The model is the part of this work that transfers. It takes synthesis-time or datasheet constants and predicts the time of a sweep, so a platform can be compared before it is built. On GPUs, one calibration per device covers every held-out block size. The validation set is 18 GPU-and-block configurations at 63 sizes each, spanning the RTX 4070 (Ada), the RTX PRO 6000 (Blackwell), and the H200 (Hopper), from 100 spins to one million. Every configuration stays inside a 10% band.

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig04-cost-model-validation.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Two panels: a measured-versus-modelled sweep-time curve, and a predicted-versus-measured scatter plot with a ten percent error band" %}
    </div>
</div>
<div class="caption">
    One calibration per GPU, then predictions at held-out block sizes with no refitting. (a) An exemplar sweep on the RTX 6000. (b) Model against measurement for all 18 GPU-and-block configurations at 63 sizes each. The band is plus or minus 10%.
</div>

## Memory

Coupling storage format, residency tier, and datapath precision interact, and picking them well is worth up to 4.2x. Two findings carry beyond this particular kernel: ELLPACK beats CSR by up to 1.6x once the sweep is bandwidth-bound, and marking non-reused loads as evict-first is worth 1.44x past the L2 capacity point.

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig03-precision-and-storage-format.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Two panels: a heat map of ground-state success rate over two bit-width axes, and a chart of the CSR to ELLPACK execution-time ratio" %}
    </div>
</div>
<div class="caption">
    Precision and storage format both matter. (a) Success rate on a 26-spin fully connected instance against integer field width and stored coupling width, which sets the narrowest datapath that still solves the problem. (b) Execution time ratio of CSR to ELLPACK storage on an RTX 4070.
</div>

The sharpest version of this is a residency cliff. At 16,384 spins, one FPGA that spills its couplings to DRAM sweeps in 130 us, while two FPGAs that keep 8,192 spins each on chip sweep in 0.68 us. Same problem, 191x apart, entirely from where the data lives. The second board is not buying compute, it is buying the right memory tier.

## Synchronization

Gibbs sampling wants a barrier between color steps. Multi-rate and bounded-staleness schedules trade a little per-run success probability for a much higher sweep rate, cutting time-to-solution by up to 3.16x across max-cut, frustrated-loop, and tile-planted instance families.

<div class="row justify-content-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig07-tts-vs-sync-interval.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Two stacked panels: time-to-solution speedup against synchronization interval for three instance families, and a mixing-time cost curve" %}
    </div>
</div>
<div class="caption">
    How far the barrier can be relaxed. (a) Time-to-solution speedup against synchronization interval for three kings-graph instance families at ten thousand spins. (b) What gating the seam by a factor of sixteen costs in mixing time.
</div>

## Communication

A phase-offset streaming dataflow orders the wave slots so that every boundary transfer has the maximum possible slack. When a link meets a latency-transparency criterion, the exchange disappears behind interior computation.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig05-boundary-exchange-schedules.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Three-panel diagram showing execution timelines for two devices under three synchronization schedules, a latency-hiding timeline, and a mapping from a processing-element array onto a spin graph" %}
    </div>
</div>
<div class="caption">
    How the boundary exchange gets hidden. (a) Three schedules for a two-device cut: fully serialized, multi-rate, and bounded staleness. (b) The latency-hiding timeline once the wave order is phase-offset. (c) How the processing-element array maps onto the graph.
</div>

FPGAs are where this gets concrete, because the link is a real cable with a real latency. The implementations run kings-graph and Pegasus-graph samplers in Q6.3 fixed point at 100 MHz, with a three-stage pipeline issuing one spin update per cycle, and a prefetch engine on the DRAM tier cuts per-spin update time from about 335 ns to about 3.5 ns. The distributed builds are a pair of ZCU106 boards over an FMC link and four XEM8320 boards in a 2x2 mesh, each link running at 806.4 Mb/s per direction with 116 ns of latency. Measured gains from the streaming schedule: 1.25x on a pair of H200 GPUs, 1.74x on the ZCU106 pair, and 2.01x on the four-board mesh.

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig06-two-device-streaming-speedup.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Line chart of speedup against problem size for three multi-device platforms, with horizontal dashed lines at the ideal two-device and four-device limits" %}
    </div>
</div>
<div class="caption">
    Speedup from a second device, and the extra speedup from streaming, against problem size, on two H200 GPUs, two ZCU106 boards, and four XEM8320 boards. Grey dashed lines mark ideal scaling for two and four devices.
</div>

## Across platforms

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig09a-sweep-time-vs-problem-size.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Log-log line chart, time per sweep in microseconds against number of spins. Three GPU curves rise gently, two FPGA curves rise sharply past ten thousand spins, and a flat ASIC line sits at about one microsecond" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig09b-energy-vs-throughput.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Log-log scatter plot, energy per spin update in picojoules against throughput in updates per second, with GPU points near ten thousand picojoules, FPGA points in the hundreds, and ASIC points below ten" %}
    </div>
</div>
<div class="caption">
    Left: time per sweep against problem size for every platform measured, up to a million spins. The FPGA curves jump by orders of magnitude where couplings no longer fit on chip, while the ASIC line stays flat because chip-to-chip transfer is hidden behind interior computation. Right: energy per spin update against sustained throughput, where the three platform classes separate by roughly three orders of magnitude in energy at comparable throughput.
</div>

The streaming dataflow also runs on silicon. That work has [its own page]({{ '/projects/12_project/' | relative_url }}).

## Code

The calibration scripts, the CUDA kernel, and the model are published under MIT at [github.com/WuEric011201/distributed-ising-machines](https://github.com/WuEric011201/distributed-ising-machines).

_Figures from "Accelerating Distributed Digital Ising Machines" (Wu et al., 2026)._
