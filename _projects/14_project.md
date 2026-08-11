---
layout: page
title: A Calibrated Cost Model and Its Open Artifact
description: "One calibration per GPU, then held-out predictions with no refitting: under 10% error across Ada, Blackwell, and Hopper from 100 to a million spins. Code and data are public."
img: assets/img/pbit/fig04-cost-model-validation.png
importance: 4
category: research
related_publications: false
---

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig04-cost-model-validation.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Two panels: a measured-versus-modelled sweep-time curve, and a predicted-versus-measured scatter plot with a ten percent error band" %}
    </div>
</div>
<div class="caption">
    One calibration per GPU, then predictions at held-out block sizes with no refitting. (a) An exemplar sweep on the RTX 6000. (b) Model against measurement for all 18 GPU-and-block configurations at 63 sizes each. The band is plus or minus 10%.
</div>

The model is the part of this work that transfers. It takes synthesis-time or datasheet constants and predicts the time of a sweep, so a platform can be compared before it is built.

## Validation

On GPUs, one calibration per device covers every held-out block size. The validation set is 18 GPU-and-block configurations at 63 sizes each, spanning the RTX 4070 (Ada), the RTX PRO 6000 (Blackwell), and the H200 (Hopper), from 100 spins to one million. Mean error is 4.8% overall, and every configuration stays inside a 10% band.

## What the memory study found

The GPU kernel behind the measurements uses ELLPACK coupling storage in FP16 with a cooperative-groups barrier between color steps. Two findings from the memory study carry beyond this kernel: ELLPACK beats CSR by up to 1.6x once the sweep is bandwidth-bound, and marking non-reused loads as evict-first is worth 1.44x past the L2 capacity point.

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pbit/fig03-precision-and-storage-format.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Two panels: a heat map of ground-state success rate over two bit-width axes, and a chart of the CSR to ELLPACK execution-time ratio" %}
    </div>
</div>
<div class="caption">
    Precision and storage format both matter. (a) Success rate on a 26-spin fully connected instance against integer field width and stored coupling width, which sets the narrowest datapath that still solves the problem. (b) Execution time ratio of CSR to ELLPACK storage on an RTX 4070.
</div>

The same model structure, given synthesis-time constants instead of measured bandwidths, predicts FPGA and ASIC throughput statically.

## Artifact

The calibration scripts, the CUDA kernel, and the model are published under MIT at [github.com/WuEric011201/distributed-ising-machines](https://github.com/WuEric011201/distributed-ising-machines).

*Figures from "Accelerating Distributed Digital Ising Machines" (Wu et al., 2026).*
