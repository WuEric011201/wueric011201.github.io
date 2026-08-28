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
        {% include figure.liquid path="assets/img/deepsight/layout-2-1-3d.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Rendered view of the redesigned board" %}
    </div>
</div>
<div class="caption">
    The redesigned board.
</div>

I led the redesign of a core imaging receiver subsystem, carrying it from design evaluation through implementation, production, and validation.

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

## Design evaluation

I evaluated multiple alternatives against the project's performance goals and selected the strongest direction before fabrication.

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/topology-comparison.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Comparison of the design alternatives evaluated during the project" %}
    </div>
</div>
<div class="caption">
    Design alternatives compared during the selection process.
</div>

## Before and after

<div class="row justify-content-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-original-3d.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Rendered view of the earlier board" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-2-1-3d.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Rendered view of the redesigned board" %}
    </div>
</div>
<div class="caption">
    The earlier implementation and the redesigned board.
</div>

## Implementation

I translated the selected design into a manufacturable board and carried it through build and verification.

<div class="row justify-content-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-2-1-copper.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Board implementation view from the redesign process" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-2-2-inner.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Additional board implementation view from the redesign process" %}
    </div>
</div>
<div class="caption">
    Board implementation views from the design process.
</div>

I wrote the performance specification, coordinated manufacturing, supervised the build, and verified the finished boards against the project goals.
