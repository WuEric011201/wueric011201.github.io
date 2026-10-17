---
layout: page
title: Multi-FPGA Platforms
description: Four-board FPGA platforms with SYZYGY links and custom FMC routing PCBs using Samtec cables and length-matched signal traces.
img: assets/img/fpga/zcu106-rack.jpg
importance: 2
category: research
related_publications: false
---

<div class="row justify-content-center">
    <div class="col-sm-8 col-lg-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fpga/zcu106-rack.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Four ZCU106 FPGA boards arranged on a rack, connected by blue ribbon cables and an orange flex cable, with custom PCBs at the cable interfaces" %}
    </div>
</div>
<div class="caption">
    Four ZCU106 boards interconnected through FMC interfaces, custom routing PCBs, and Samtec cables.
</div>

I assembled two four-board FPGA platforms: an XEM8320 system interconnected through SYZYGY cables and a ZCU106 system interconnected through FMC interfaces. For the ZCU106 platform, I designed custom FMC routing PCBs, had them fabricated, and integrated them with Samtec cables.

## Four XEM8320 boards over SYZYGY

I configured four XEM8320 boards in a 2 × 2 mesh, with SYZYGY cables providing the connections between neighboring boards. The assembly provides a compact bench platform for multi-FPGA experiments.

<div class="row justify-content-center">
    <div class="col-sm-8 col-lg-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fpga/xem8320-syzygy.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Four XEM8320 FPGA boards arranged in a two-by-two mesh on a desk, with blue SYZYGY cables linking neighboring boards" %}
    </div>
</div>
<div class="caption">
    Four XEM8320 boards connected through SYZYGY cables.
</div>

## Four ZCU106 boards over FMC

I installed four ZCU106 boards across multiple rack shelves and connected their FMC interfaces through custom routing PCBs and Samtec cables. I selected the Samtec cables as a lower-cost alternative to the HiTech Global cables considered for this setup.

The custom PCB layout omits power routing and uses length-matched signal traces to reduce timing skew between signals.

<div class="row justify-content-center">
    <div class="col-sm-8 col-lg-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fpga/zcu106-fmc-links.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Front view of the ZCU106 rack showing blue FMC ribbon cables looping between boards on different shelves" %}
    </div>
</div>
<div class="caption">
    Samtec cables link the custom FMC routing PCBs between rack-mounted ZCU106 boards.
</div>

## Custom PCB layout and silkscreen

The PCB rendering below shows the signal routing and silkscreen. I included an excerpt from a W. B. Yeats poem as a personal detail in the board design.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fpga/yeats-pcb-layout.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Rendering of the custom green FMC routing PCB, showing signal traces, vias, and a white silkscreen excerpt from W. B. Yeats beginning But I, being poor, have only my dreams, signed Tong Wu 2026.6" %}
    </div>
</div>
<div class="caption">
    Custom FMC routing PCB with a W. B. Yeats excerpt on the silkscreen.
</div>
