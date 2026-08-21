---
layout: page
title: A Four-Chip 28 nm p-bit ASIC Tapeout
description: Four fabricated 28 nm chips, 6,912 spins each, wired as a mesh. Time per sweep stays flat as chips are added, and the array runs 32.4x faster than an H200 at three orders of magnitude less energy.
img: assets/img/pbit/photo-quadchip-board.jpg
importance: 1
category: research
related_publications: false
---

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/photo-quadchip-board.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Photograph of a green printed circuit board holding four square packaged integrated circuits arranged diagonally, with ribbon cable and coaxial connections" %}
    </div>
</div>
<div class="caption">
    The quad-chip test board. Four fabricated 28 nm probabilistic-bit ASICs, 6,912 spins each, over on-board chip-to-chip links.
</div>

A probabilistic-bit array in TSMC 28 nm, 1.5 mm2 of die, 6,912 spins per chip on a Pegasus-style sparse graph. Four chips on one board, 27,648 spins together.

## Measured results

<div class="row text-center mt-4 mb-2">
  <div class="col-sm-3 mb-3">
    <h2 class="mb-0">28.1</h2>
    <p class="text-muted mb-0">Gflips/s<br><small>sustained, four chips</small></p>
  </div>
  <div class="col-sm-3 mb-3">
    <h2 class="mb-0">4.81 pJ</h2>
    <p class="text-muted mb-0">per spin update</p>
  </div>
  <div class="col-sm-3 mb-3">
    <h2 class="mb-0">0.985 µs</h2>
    <p class="text-muted mb-0">per sweep<br><small>flat in chip count</small></p>
  </div>
  <div class="col-sm-3 mb-3">
    <h2 class="mb-0">32.4x</h2>
    <p class="text-muted mb-0">faster than an H200<br><small>same graph, 27,648 spins</small></p>
  </div>
</div>

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/chip-layout.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Cadence Virtuoso showing the full-chip layout: a dense core of repeated array blocks in blue and magenta, ringed by bond pads on all four sides" %}
    </div>
</div>
<div class="caption">
    The full-chip layout on the way to sign-off — the spin array blocks filling the core, wrapped in the pad ring.
</div>

## Why four chips

Adding devices to an Ising machine normally adds a boundary exchange to every sweep, and that exchange sits on the critical path. The streaming schedule orders the wave slots so each transfer has a full interior computation to hide behind, so per-sweep time does not grow with chip count. Building four rather than one is what makes that measurable.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/photo-quadchip-board-annotated.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="The quad-chip board photograph overlaid with blue arrows showing data moving between the four chips, a labelled scan input and output, and green arrows to adjacent boards" %}
    </div>
</div>
<div class="caption">
    The dataflow drawn on the board. Arrows trace the order spin state moves between chips, and the edge connectors extend the same pattern to neighboring boards.
</div>

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig08-hardware-fpga-mesh-and-asic-mesh.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Two panels. Left: four FPGA boards wired as a two-by-two mesh with the logical partition alongside. Right: an annotated photograph of four chips on one board with arrows showing the data path" %}
    </div>
</div>
<div class="caption">
    The same dataflow on two platforms: four FPGA boards in a 2x2 mesh, and the four-chip ASIC board.
</div>

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig09b-energy-vs-throughput.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Log-log scatter plot, energy per spin update in picojoules against throughput in updates per second, with GPU points near ten thousand picojoules, FPGA points in the hundreds, and ASIC points below ten" %}
    </div>
</div>
<div class="caption">
    Energy per spin update against sustained throughput. GPUs, FPGAs, and the ASIC separate by roughly three orders of magnitude in energy at comparable throughput.
</div>

_Figures from "Accelerating Distributed Digital Ising Machines" (Wu et al., 2026)._
