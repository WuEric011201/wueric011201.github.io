---
layout: page
title: Distributed Ising Machines
description: 4.2x from data placement, 3.16x from scheduling, 2.01x from streaming — on GPUs, FPGAs and a 28 nm ASIC.
img: assets/img/pbit/fig08-hardware-fpga-mesh-and-asic-mesh.png
importance: 2
category: research
related_publications: false
---

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig08-hardware-fpga-mesh-and-asic-mesh.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Two panels. Left: four FPGA boards wired as a two-by-two mesh with the logical partition alongside. Right: an annotated photograph of four chips on one board with arrows showing the data path" %}
    </div>
</div>
<div class="caption">
    The two multi-device platforms: four XEM8320 FPGA boards in a 2x2 mesh, and four 28 nm ASICs on one board.
</div>

The problems Ising machines are built for need millions of spins, and no single device holds a million spins. So a real machine is a distributed machine, and the question is what the distribution costs. Published accelerators tend to report one throughput number at one operating point, leaving open space for design space exploration and analysis.

## Measured results

<div class="row text-center mt-4 mb-2">
  <div class="col-sm-3 mb-3">
    <h2 class="mb-0">4.2x</h2>
    <p class="text-muted mb-0">from data placement</p>
  </div>
  <div class="col-sm-3 mb-3">
    <h2 class="mb-0">3.16x</h2>
    <p class="text-muted mb-0">faster time-to-solution<br><small>relaxed synchronization</small></p>
  </div>
  <div class="col-sm-3 mb-3">
    <h2 class="mb-0">2.01x</h2>
    <p class="text-muted mb-0">from streaming<br><small>four-board mesh</small></p>
  </div>
  <div class="col-sm-3 mb-3">
    <h2 class="mb-0">4.8%</h2>
    <p class="text-muted mb-0">mean model error<br><small>to 1M spins</small></p>
  </div>
</div>

## Streaming across devices

A phase-offset dataflow orders the wave slots so every boundary transfer has maximum slack, and when a link meets a latency-transparency criterion the exchange disappears behind interior computation entirely. Measured on a pair of H200 GPUs, a pair of ZCU106 boards, and a four-board XEM8320 mesh.

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig06-two-device-streaming-speedup.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Line chart of speedup against problem size for three multi-device platforms, with horizontal dashed lines at the ideal two-device and four-device limits" %}
    </div>
</div>
<div class="caption">
    Speedup from a second device and the extra speedup from streaming, against problem size. Grey dashed lines mark ideal two-device and four-device scaling.
</div>

The same dataflow runs on silicon, on the [four-chip 28 nm ASIC]({{ '/projects/12_project/' | relative_url }}).

## Code

Calibration scripts, the CUDA kernel, and the model are published under MIT at [github.com/WuEric011201/distributed-ising-machines](https://github.com/WuEric011201/distributed-ising-machines).

_Figures from "Accelerating Distributed Digital Ising Machines" (Wu et al., 2026)._
