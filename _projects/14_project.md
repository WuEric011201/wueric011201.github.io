---
layout: page
title: Monolithic 3D ReRAM + Carbon Nanotube Memory
description: A 1 kb ReRAM array with CNT periphery, taped out with back-end-of-line ReRAM and carbon nanotube transistors, then brought up on the bench — FORM, SET and RESET validated in-array.
img: assets/img/monolithic3d/test-board.jpg
importance: 3
category: research
related_publications: false
---

**NEXUS Lab, Carnegie Mellon University** · Jun 2025 – Oct 2025

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/monolithic3d/test-board.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Top-down view of a green test board with a packaged die in a socket at its centre, ribbon connectors on all four sides, and scope probes and power leads attached" %}
    </div>
</div>
<div class="caption">
    The characterization board. Everything on the die comes out through those four edges.
</div>

Monolithic 3D stacks logic and memory in the back end of the line rather than side by side, which only works if the memory and the transistors driving it can both be built at low temperature. This part is ReRAM and carbon nanotube FETs on a Skywater 130 nm base — designed, taped out, and then made to actually work.

## What was built

<div class="row text-center mt-4 mb-2">
  <div class="col-sm-4 mb-3">
    <h2 class="mb-0">1 kb</h2>
    <p class="text-muted mb-0">1T1R ReRAM array<br><small>with full periphery</small></p>
  </div>
  <div class="col-sm-4 mb-3">
    <h2 class="mb-0">BEOL</h2>
    <p class="text-muted mb-0">ReRAM + CNT<br><small>on Skywater 130 nm</small></p>
  </div>
  <div class="col-sm-4 mb-3">
    <h2 class="mb-0">FORM / SET / RESET</h2>
    <p class="text-muted mb-0">validated in-array<br><small>through the periphery</small></p>
  </div>
</div>

## Bring-up

Silicon arriving is the start of the work, not the end of it. A 1T1R cell has to be electroformed before it will switch at all, and forming is the one operation you get exactly one shot at per device: too little compliance and the filament never forms, too much and the cell is shorted permanently. Doing that through on-chip periphery rather than a probe needle means the drivers, the wordline and bitline decode, and the current limit all have to be right before the first pulse.

<div class="row justify-content-center">
    <div class="col-sm-11 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/monolithic3d/test-bench.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="A lab bench: oscilloscope and stacked bench power supplies on the left, a monitor showing a Python test script and streams of binary output on the right, and the wired test board in the centre of the desk" %}
    </div>
</div>
<div class="caption">
    The bench, mid-campaign. Python driving the pulses on the right, the array answering in binary next to it.
</div>

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/monolithic3d/probe-wiring.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Close-up of coloured jumper wires fanning out from a pin header on the test fixture, with a spreadsheet of wordline and bitline pin assignments on the monitor behind" %}
    </div>
</div>
<div class="caption">
    Wordline and bitline mapping, kept in a spreadsheet and rewired by hand — the part of test engineering nobody puts in the paper.
</div>

I also automated the probe-station workflow for the standalone CNT device measurements. Manual probing is slow and, worse, inconsistent — sweep parameters drift between sessions and the resulting device statistics are hard to trust. Scripting the sweeps made the numbers reproducible and let the campaign cover far more devices per day.
