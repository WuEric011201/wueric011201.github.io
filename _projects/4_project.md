---
layout: page
title: Teensy Multi-effect
description: Analog compression into Teensy 4.0 DSP — tremolo, delay, reverb, 2 W out.
img: assets/img/teensy-multieffect/cover.jpg
importance: 3
category: personal
related_publications: false
---

A mixed-signal music processor: an analog compression front end feeding a Teensy 4.0 running custom DSP.

## I/O

- **Line**, **instrument**, and **mic** level inputs
- Up to **2 W of output** to drive an on-stage cab
- Built-in **effect loop** for external analog modules

## DSP (Teensy 4.0)

Custom **tremolo**, **delay**, and **reverb** algorithms written for the Teensy 4.0 audio library.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/7mSkSR_Pba4" title="Analog compression and Teensy multi-effect demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
    </div>
</div>

## Hardware

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/teensy-multieffect/01.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="3D-printed enclosure with eleven potentiometer shafts protruding" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/teensy-multieffect/02.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Populated main PCB with potentiometers and the Teensy 4.0" %}
    </div>
</div>
<div class="caption">
    The 3D-printed enclosure, and the populated main board — eleven pots for parameter, gain, threshold and attack control, with the Teensy 4.0 at centre.
</div>

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/teensy-multieffect/03.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Reverse of the board showing SMD sections, Eurorack in and external send jacks" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/teensy-multieffect/04.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Breadboard prototype of the analog stages" %}
    </div>
</div>
<div class="caption">
    The board's reverse side with the SMD analog sections, Eurorack input and external effect-loop jacks — and the breadboard prototype it grew out of.
</div>

<div class="row justify-content-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/teensy-multieffect/05.png" class="img-fluid rounded z-depth-1" zoomable=true alt="3D render of the custom 3PDT switching breakout board" %}
    </div>
</div>
<div class="caption">
    3D render of the custom 3PDT switching breakout.
</div>

## Schematics

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/teensy-multieffect/06.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Top-level Altium schematic showing signal path, effect loop and Teensy" %}
    </div>
</div>
<div class="caption">
    Top-level schematic: input stage, second stage, the external analog pedal effect loop, 3PDT bypass, and the Teensy 4.0 with its audio shield on the ±9 V supply.
</div>

## SPICE simulation

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/teensy-multieffect/07.png" class="img-fluid rounded z-depth-1" zoomable=true alt="LTspice schematic of the compression circuit with diode clipping network" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/teensy-multieffect/08.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Transient simulation plot with input, reference and output traces" %}
    </div>
</div>
<div class="caption">
    The compression path simulated in LTspice with noise and AC sweeps, and the resulting transient response — red is the input ramp, green the reference, blue the compressed output.
</div>

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/teensy-multieffect/09.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Level-shifting circuit schematic feeding the Teensy ADC" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/teensy-multieffect/10.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Power amplifier output stage schematic" %}
    </div>
</div>
<div class="caption">
    Left: the level-shifting stage that maps the bipolar analog signal into the Teensy's ADC range, with a 3.3 V regulator and clamp. Right: the power amp output stage, an op-amp driving a current buffer.
</div>
