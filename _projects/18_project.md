---
layout: page
title: Multi-FPGA Platforms
description: Four XEM8320 boards over SYZYGY, four ZCU106 boards over FMC, and a little Yeats on the PCB.
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
    The four-board ZCU106 setup, with FMC cabling and custom interface PCBs.
</div>

I put together two multi-FPGA setups: four XEM8320 boards connected with SYZYGY cables, and four ZCU106 boards connected with FMC cables and custom PCBs.

## Four XEM8320 boards over SYZYGY

The XEM8320 setup uses four boards arranged in a 2 × 2 mesh, with SYZYGY cables connecting neighboring boards. The compact layout keeps all four FPGAs and their interconnects together on the bench.

<div class="row justify-content-center">
    <div class="col-sm-8 col-lg-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fpga/xem8320-syzygy.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Four XEM8320 FPGA boards arranged in a two-by-two mesh on a desk, with blue SYZYGY cables linking neighboring boards" %}
    </div>
</div>
<div class="caption">
    Four XEM8320 boards connected through SYZYGY cables.
</div>

## Four ZCU106 boards over FMC

The ZCU106 setup connects four boards through FMC cables and custom interface PCBs. The boards sit across several rack shelves, with the cables running between them.

<div class="row justify-content-center">
    <div class="col-sm-8 col-lg-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fpga/zcu106-fmc-links.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Front view of the ZCU106 rack showing blue FMC ribbon cables looping between boards on different shelves" %}
    </div>
</div>
<div class="caption">
    The FMC connections between shelves, with the custom PCBs mounted on the FPGA boards.
</div>

## A little Yeats on the PCB

The custom PCB carries a poem by W. B. Yeats in its silkscreen. A small personal detail alongside the connectors and routing.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fpga/zcu106-yeats-pcb.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Detail of the ZCU106 FMC interconnects, with blue ribbon cables and a black custom PCB bearing white lines from a Yeats poem" %}
    </div>
</div>
<div class="caption">
    The custom PCB with Yeats on the silkscreen, installed in the ZCU106 setup.
</div>
