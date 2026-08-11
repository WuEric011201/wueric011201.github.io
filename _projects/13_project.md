---
layout: page
title: Ising Machines Across FPGA Meshes
description: Digital Ising samplers spread across paired ZCU106 boards and a four-board XEM8320 2x2 mesh, where the boundary exchange over a real cable is measured rather than assumed.
img: assets/img/pbit/fig06-two-device-streaming-speedup.png
importance: 3
category: research
related_publications: false
---

FPGAs are where the distribution question gets concrete, because the link is a real cable with a real latency and the memory hierarchy has hard tiers.

## The samplers

The FPGA implementations run kings-graph and Pegasus-graph samplers in Q6.3 fixed point at 100 MHz, with a three-stage pipeline issuing one spin update per cycle. Across four memory tiers, from registers through BRAM to DRAM, the cost model tracks measured throughput to within a few percent with no empirical fitting. A prefetch engine on the DRAM tier cuts per-spin update time from about 335 ns to about 3.5 ns.

## The distributed builds

The distributed builds are a pair of ZCU106 boards over an FMC link and four XEM8320 boards in a 2x2 mesh, where each link runs at 806.4 Mb/s per direction with 116 ns of latency. Applying the phase-offset streaming schedule gives 1.74x on the board pair and 2.01x on the four-board mesh.

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig08-hardware-fpga-mesh-and-asic-mesh.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Two panels. Left: a diagram of four devices in a two-by-two mesh with coloured spins and cross-links, beside a photograph of four FPGA boards joined by ribbon cables. Right: an annotated photograph of four chips on one board with arrows showing the data path" %}
    </div>
</div>
<div class="caption">
    Panel (a): four XEM8320 FPGA boards wired as a 2x2 mesh, with the logical partition shown alongside.
</div>

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig06-two-device-streaming-speedup.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Line chart of speedup against problem size for three multi-device platforms, with horizontal dashed lines at the ideal two-device and four-device limits" %}
    </div>
</div>
<div class="caption">
    Speedup from a second device, and the extra speedup from streaming, against problem size, on two H200 GPUs, two ZCU106 boards, and four XEM8320 boards. Grey dashed lines mark ideal scaling for two and four devices.
</div>

## The residency effect

The residency effect shows up most sharply here. At 16,384 spins, a single board spills its couplings to DRAM and takes 130 us per sweep. Split the same problem over two boards so each half stays on chip and it takes 0.68 us. The second board is not buying compute, it is buying the right memory tier.

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig09a-sweep-time-vs-problem-size.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Log-log line chart, time per sweep in microseconds against number of spins. Three GPU curves rise gently, two FPGA curves rise sharply past ten thousand spins, and a flat ASIC line sits at about one microsecond" %}
    </div>
</div>
<div class="caption">
    Time per sweep against problem size for every platform measured, up to a million spins. The FPGA curves jump by orders of magnitude at the point where couplings no longer fit on chip.
</div>

*Figures from "Accelerating Distributed Digital Ising Machines" (Wu et al., 2026).*
