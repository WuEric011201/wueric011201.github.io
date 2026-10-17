---
layout: page
title: 28 nm p-bit Tapeout
description: Four fabricated chips, 27,648 spins, 32.4x faster than an H200.
img: assets/img/pbit/7499.jpg
importance: 1
category: research
related_publications: false
---

<div class="row justify-content-center">
    <div class="col-sm-8 col-lg-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/7499.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Top-down view of four packaged ASICs on the quad-chip test board, connected to an FPGA board by three blue ribbon cables" %}
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

## Measurement setup

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/photo-quadchip-board.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="The quad-chip test board on the lab bench, connected to an FPGA board, an oscilloscope, and bench instruments through ribbon cables and test leads" %}
    </div>
</div>
<div class="caption">
    The measurement setup: the four-chip board, FPGA interface, and bench instruments used to characterize the silicon.
</div>

## Pushing single-chip frequency

To push the operating frequency of a single chip, I reworked the existing four-chip PCB by cutting traces and soldering jumper wires to reroute connections. These photos show the cuts and rewiring on the underside of the board during single-chip testing.

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/7598.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Close-up of cut PCB traces near a connector footprint and hand-soldered jumper wires beneath a chip socket" caption="Trace cuts and jumper wires on the underside of the quad-chip PCB." %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/7599.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Wider view of the quad-chip PCB underside showing colored jumper wires soldered between socket pins" caption="The wider view of the board rework for single-chip frequency testing." %}
    </div>
</div>

## Story

Class tape-out for 18-725, 2025.
