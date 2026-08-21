---
layout: page
title: 13-Band FPGA Equalizer
description: Stereo 13-band FIR at 50 kHz, driven in C from a MicroBlaze soft core.
img: assets/img/fpga-eq/cover.jpg
importance: 1
category: personal
related_publications: false
---

A real-time 13-band graphic equalizer implemented in HDL on an FPGA, with a MicroBlaze soft-core driving the control plane.

## Highlights

- **13-band FIR filter** running at a 50 kHz sample rate on both stereo channels
- Custom SPI cores driving the **LTC1865L ADC** and **LTC1654 DAC**
- **MicroBlaze** soft-core integration over the **AXI4-Lite** bus
- C firmware on MicroBlaze for band gain control and runtime configuration

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fpga-eq/01.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Nexys 4 DDR board with ADC and DAC breakouts wired to the Pmod headers" %}
    </div>
</div>
<div class="caption">
    The Nexys 4 DDR (Artix-7) board with the ADC and DAC breakouts wired into the Pmod headers.
</div>

## System architecture

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fpga-eq/02.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Block diagram of the ADC, DAC, FPGA and MicroBlaze signal path" %}
    </div>
</div>
<div class="caption">
    System block diagram: the LTC1865L ADC and LTC1654 DAC talk to the FPGA over Pmod, where dedicated SPI cores feed the MicroBlaze on a 3.3 V rail.
</div>

## SPI and filter design

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fpga-eq/03.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="State machine diagram for the SPI controller" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fpga-eq/04.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="State machine diagram for the AXI4-Lite FIR filter" %}
    </div>
</div>
<div class="caption">
    Left: the SPI controller state machine (IDLE → WAIT → SckHi → SckLow) that clocks the converters. Right: the AXI4-Lite FIR state machine, including coefficient load and buffer clear paths.
</div>

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fpga-eq/05.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Bubble diagram of the AXI4-Lite FIR datapath" %}
    </div>
</div>
<div class="caption">
    Datapath (bubble) diagram for the FIR core — coefficient and sample RAMs feeding the multiply-accumulate, with the AXI4-Lite register interface on the left.
</div>

## Demo

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/PLt0HKvpY5A" title="13-Band Equalizer on FPGA demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
    </div>
</div>

## Listen / watch

- [YouTube](https://www.youtube.com/@Qianeric3825)
- [SoundCloud](https://on.soundcloud.com/yEd21)
