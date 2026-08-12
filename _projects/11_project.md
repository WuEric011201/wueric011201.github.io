---
layout: page
title: Accelerating Distributed Digital Ising Machines
description: Data placement, relaxed synchronization, and a streaming dataflow for Ising machines spread across many devices. Up to 4.2x from placement, 3.16x from scheduling, and 2.01x from streaming, measured on GPUs, FPGAs, and a 28 nm ASIC.
img: assets/img/pbit/fig08-hardware-fpga-mesh-and-asic-mesh.png
importance: 2
category: realdeal
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

The problems Ising machines are built for need millions of spins, and no single device holds a million spins. So a real machine is a distributed machine, and the question is what the distribution costs. Published accelerators tend to report one throughput number at one operating point, which leaves the binding resource unnamed.

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

## Where the time goes

A sweep costs compute, memory traffic, synchronization, and inter-device communication. Splitting it that way names the binding term, and each one then gets attacked directly. Calibrated once per platform, the split predicts held-out configurations without refitting across three GPU generations, an FPGA, and an ASIC.

The sharpest single result is a residency cliff. At 16,384 spins, one FPGA that spills its couplings to DRAM sweeps in 130 us, while two FPGAs that keep 8,192 spins each on chip sweep in 0.68 us. Same problem, 191x apart, purely from where the data lives. The second board is not buying compute, it is buying the right memory tier.

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig09a-sweep-time-vs-problem-size.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Log-log line chart, time per sweep in microseconds against number of spins. Three GPU curves rise gently, two FPGA curves rise sharply past ten thousand spins, and a flat ASIC line sits at about one microsecond" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig09b-energy-vs-throughput.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Log-log scatter plot, energy per spin update in picojoules against throughput in updates per second, with GPU points near ten thousand picojoules, FPGA points in the hundreds, and ASIC points below ten" %}
    </div>
</div>
<div class="caption">
    Left: the FPGA curves jump by orders of magnitude where couplings stop fitting on chip, while the ASIC line stays flat because chip-to-chip transfer is hidden behind interior computation. Right: the three platform classes separate by roughly three orders of magnitude in energy at comparable throughput.
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
