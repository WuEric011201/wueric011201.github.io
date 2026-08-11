---
layout: page
title: A Four-Chip 28 nm p-bit ASIC Tapeout
description: Four fabricated 28 nm chips, 6,912 spins each, wired as a mesh. A streaming schedule hides every chip-to-chip transfer behind interior work, holding time per sweep flat as chips are added.
img: assets/img/pbit/photo-quadchip-board.jpg
importance: 1
category: realdeal
related_publications: false
---

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/photo-quadchip-board.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Photograph of a green printed circuit board holding four square packaged integrated circuits arranged diagonally, with ribbon cable and coaxial connections" %}
    </div>
</div>
<div class="caption">
    The quad-chip test board. Four fabricated 28 nm probabilistic-bit ASICs, 6,912 spins each, connected over on-board chip-to-chip links.
</div>

The chip is a probabilistic-bit array in TSMC 28 nm, 1.5 mm2 of die, holding 6,912 spins on a Pegasus-style sparse graph. Four of them sit on one test board and talk over on-board chip-to-chip links.

## Why four chips

The reason to build four rather than one is the thing worth measuring. Adding devices to an Ising machine normally adds a boundary exchange to every sweep, and that exchange is on the critical path. The streaming schedule puts it off the critical path instead: the wave order is chosen so that each transfer has a full interior computation to hide behind.

The result is a per-sweep time that does not grow with chip count. Four chips, 27,648 spins, 0.985 us per sweep, 28.1 Gflips/s aggregate, 4.81 pJ per spin update.

At that problem size on the same graph, the four-chip array is 32.4x faster than an H200 and roughly three orders of magnitude lower in energy per spin update.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/photo-quadchip-board-annotated.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="The quad-chip board photograph overlaid with blue arrows showing data moving between the four chips, a labelled scan input and output, and green arrows to adjacent boards" %}
    </div>
</div>
<div class="caption">
    The same board with the streaming dataflow drawn on. Arrows trace the order in which spin state moves between chips, and the edge connectors extend the same pattern to neighboring boards.
</div>

## The schedule

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig05-boundary-exchange-schedules.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Three-panel diagram showing execution timelines for two devices under three synchronization schedules, a latency-hiding timeline, and a mapping from a processing-element array onto a spin graph" %}
    </div>
</div>
<div class="caption">
    How the boundary exchange gets hidden. (a) Three schedules for a two-device cut: fully serialized, multi-rate, and bounded staleness. (b) The latency-hiding timeline once the wave order is phase-offset. (c) How the processing-element array maps onto the graph.
</div>

## Hardware and results

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig08-hardware-fpga-mesh-and-asic-mesh.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Two panels. Left: a diagram of four devices in a two-by-two mesh with coloured spins and cross-links, beside a photograph of four FPGA boards joined by ribbon cables. Right: an annotated photograph of four chips on one board with arrows showing the data path" %}
    </div>
</div>
<div class="caption">
    The two multi-device platforms. On the left, four XEM8320 FPGA boards wired as a 2x2 mesh, with the logical partition shown alongside. On the right, four 28 nm ASICs on one board, where the edge connectors extend the same dataflow to further boards.
</div>

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig09b-energy-vs-throughput.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Log-log scatter plot, energy per spin update in picojoules against throughput in updates per second, with GPU points near ten thousand picojoules, FPGA points in the hundreds, and ASIC points below ten" %}
    </div>
</div>
<div class="caption">
    Energy per spin update against sustained throughput. Each point carries its accounting range as a vertical bar, and the diagonals are constant power. GPUs, FPGAs, and the ASIC separate by roughly three orders of magnitude in energy at comparable throughput.
</div>

*Figures from "Accelerating Distributed Digital Ising Machines" (Wu et al., 2026).*
