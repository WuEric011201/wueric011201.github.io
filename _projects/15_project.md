---
layout: page
title: AI System Architecture Modeling
description: Architecture modeling and design exploration that improved throughput from 36% to 88% of theoretical peak.
img: assets/img/qualcomm/arbitration-results.svg
importance: 4
category: research
related_publications: false
---

**Qualcomm** · San Diego, CA · Sep 2025 – Dec 2025

<div class="row justify-content-center">
    <div class="col-sm-11 mt-3 mt-md-0">
{% include figure.liquid path="assets/img/qualcomm/arbitration-results.svg" class="img-fluid" zoomable=true alt="Results chart showing modeled throughput improving from 36 percent to 88 percent of theoretical peak" %}
    </div>
</div>
<div class="caption">
    Design exploration improved modeled throughput from 36% to 88% of theoretical peak.
</div>

I developed workload-aware architecture models for AI inference systems. The models enabled quantitative comparison of design alternatives, exposed scaling limits, and guided performance optimization.

## Results

<div class="row text-center mt-4 mb-2">
  <div class="col-sm-4 mb-3">
    <h2 class="mb-0">36% → 88%</h2>
    <p class="text-muted mb-0">of theoretical peak<br><small>through design exploration</small></p>
  </div>
  <div class="col-sm-4 mb-3">
    <h2 class="mb-0">2 scaling limits</h2>
    <p class="text-muted mb-0">identified before implementation</p>
  </div>
  <div class="col-sm-4 mb-3">
    <h2 class="mb-0">Reliability issue</h2>
    <p class="text-muted mb-0">detected and resolved</p>
  </div>
</div>

Systematic design-space exploration raised modeled throughput from 36% to 88% of theoretical peak. The same work identified key scaling limits that would have been difficult to isolate from headline specifications alone.

I also detected and resolved a system-level reliability issue, then evaluated the design across varied workloads to make sure the improvement was robust rather than tied to a single scenario.

<div class="row justify-content-center">
    <div class="col-sm-11 mt-3 mt-md-0">
{% include figure.liquid path="assets/img/qualcomm/switch-model.svg" class="img-fluid" zoomable=true alt="High-level conceptual diagram illustrating the architecture-modeling work" %}
    </div>
</div>
<div class="caption">
    A high-level illustration of the architecture model.
</div>

The project demonstrated how workload-aware modeling can reveal bottlenecks early, quantify tradeoffs, and guide system-level optimization before implementation.
