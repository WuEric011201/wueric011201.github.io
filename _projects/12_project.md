---
layout: page
title: 28 nm p-bit Tapeout
description: Four fabricated chips, 27,648 spins, 32.4x faster than an H200.
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

## Story

Class tape-out of 18-725 2025
