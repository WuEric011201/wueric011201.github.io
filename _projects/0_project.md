---
layout: page
title: Photodiode Front-End Redesign
description: 60% less power and 60% less noise on DeepSight's imaging receiver, and a board 20–30 °C cooler.
img: assets/img/deepsight/layout-2-1-3d.png
importance: 5
category: research
related_publications: false
---

**DeepSight Technology Inc.** · St. Louis, MO · May 2023 – May 2024

<div class="row justify-content-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-2-1-3d.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Rendered view of the redesigned multi-channel photodiode board" %}
    </div>
</div>
<div class="caption">
    The redesigned multi-channel photodiode board.
</div>

I rebuilt the front end that turns photodiode current into the data the imaging system runs on. Six candidate topologies, two taken to layout, one into production.

## Measured results

<div class="row text-center mt-4 mb-2">
  <div class="col-sm-4 mb-3">
    <h2 class="mb-0">60%</h2>
    <p class="text-muted mb-0">less power</p>
  </div>
  <div class="col-sm-4 mb-3">
    <h2 class="mb-0">60%</h2>
    <p class="text-muted mb-0">less input-referred noise</p>
  </div>
  <div class="col-sm-4 mb-3">
    <h2 class="mb-0">20–30 °C</h2>
    <p class="text-muted mb-0">cooler board</p>
  </div>
</div>

## Choosing the design

Every candidate was modeled and ranked before anything was fabricated, so the selection was a desk exercise instead of a board spin.

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/topology-comparison.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Comparison table of all candidate topologies with supply rails, transimpedance gain, total gain, input-referred noise, and power" %}
    </div>
</div>
<div class="caption">
    All seven candidates on the terms that mattered. Highlighted is the design that shipped; the bottom row is what was already in the field.
</div>

## Before and after

<div class="row justify-content-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-original-3d.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Rendered view of the original production board, densely populated with repeated channel blocks" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-2-1-3d.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Rendered view of the redesigned board" %}
    </div>
</div>
<div class="caption">
    The board in production, and the replacement.
</div>

## Layout

Grounded coplanar waveguide on the signal runs, a ground plane cutout under the transimpedance node where a fraction of a picofarad moves the stability margin, and per-channel routing blocks to hold crosstalk and channel-to-channel variation flat across the array.

<div class="row justify-content-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-2-1-copper.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Copper layer view of the redesigned board showing routing and ground plane treatment" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-2-2-inner.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Inner layer view showing the per-channel room definitions that keep channel routing identical" %}
    </div>
</div>
<div class="caption">
    Copper and inner layers. The outlined blocks on the right constrain each channel to identical routing.
</div>

I wrote the performance specification, compared quotes across PCB manufacturers, supervised the build, and verified the finished boards in the frequency and time domains.
