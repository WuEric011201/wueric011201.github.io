---
layout: page
title: A Full-Custom SRAM Macro in Virtuoso
description: A 4 kb SRAM macro drawn from the bitcell up — replica wordline and bitline timing, 25 FO4 read cycle at 1.19 mW, DRC and LVS clean, and stable across six process corners.
img: assets/img/sram-macro/drc-clean.png
importance: 6
category: research
related_publications: false
---

**Carnegie Mellon University** · Graduate custom IC design course · Fall 2024 · with Atharva Raut

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/sram-macro/drc-clean.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Cadence Virtuoso layout of the full SRAM macro, dense arrays above and below a central periphery stripe, with a dialog box reading No DRC errors found" %}
    </div>
</div>
<div class="caption">
    The finished macro, and the dialog box the whole semester was aimed at.
</div>

A 4 kb SRAM — 256 words of 16 bits — drawn from the bitcell up in a 45 nm PDK. Every block is custom: bitcell, decoder, sense amp, write driver, control-signal generator, flops.

## Measured results

<div class="row text-center mt-4 mb-2">
  <div class="col-sm-3 mb-3">
    <h2 class="mb-0">25 FO4</h2>
    <p class="text-muted mb-0">read cycle time<br><small>1,048 ps post-extraction</small></p>
  </div>
  <div class="col-sm-3 mb-3">
    <h2 class="mb-0">1.19 mW</h2>
    <p class="text-muted mb-0">at 1.2 ns, 50/50 R/W<br><small>11 µW static</small></p>
  </div>
  <div class="col-sm-3 mb-3">
    <h2 class="mb-0">67.5%</h2>
    <p class="text-muted mb-0">cell area efficiency<br><small>4,826 µm² total</small></p>
  </div>
  <div class="col-sm-3 mb-3">
    <h2 class="mb-0">6 corners</h2>
    <p class="text-muted mb-0">functional at 1.2 ns<br><small>DRC and LVS clean</small></p>
  </div>
</div>

## Floorplan

The bitcell is 1.54 µm × 0.445 µm — roughly 4:1 — so a 32 × 128 array comes out close to square, and splitting it into four 64 × 16 sub-arrays cuts both the bitline and the wordline load again. One sense amp is shared across four bitline pairs, two columns from the sub-array above and two from below, which buys 2:1 column muxing and hierarchical-bitline behavior at the same time.

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/sram-macro/floorplan.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Hand-drawn floorplan: four sub-arrays in a two-by-two grid around a central column of decoders and predecoders, with BL reset at top and bottom, write drivers and sense amps between the arrays, and address and read-data flip-flops along the bottom" %}
    </div>
</div>
<div class="caption">
    Four sub-arrays around a central decode spine. Inputs and outputs all leave through the bottom.
</div>

## Replica wordline and bitline timing

The part I like most. Rather than time the sense amp with a fixed delay chain — which drifts against the array across corners — every sub-array is ringed with **replica cells** that track the real thing.

A replica wordline along the top fires every cycle and follows the worst-case decoder delay. A replica column on the right has only a subset of its cells connected, so it swings full rail in about the time the real bitlines develop their small differential. When that replica bitline drops, sense enable fires. The timing reference is built out of the same devices as the array, so it moves with the array over process and temperature instead of against it.

That meant designing five different flavors of "SRAM cell": the real one, a replica driver that always drives the replica bitline, a dummy for the replica row that loads the wordline but never touches the bitlines, a dummy for the replica column whose connection to the replica bitline can be selectively tuned, and a permanently-off bottom row that cannot pick a fight with the real cells.

<div class="row justify-content-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/sram-macro/replica-subarray.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Hand-drawn sub-array diagram: a 64 by 16 core of SRAM cells, a replica wordline for timing along the top, a partially connected replica column on the right, replica wordline and bitline for isolation on the left and bottom, and a corner cell" %}
    </div>
</div>
<div class="caption">
    One sub-array. The ring around the core does two jobs — isolation for the edge cells, and timing generation.
</div>

## Where the read cycle goes

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/sram-macro/read-timing.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Post-extraction transient waveforms showing clock, wordline, sense enable and bitline pair, and read data out, with markers measuring 523.9 ps from clock to wordline and 457.6 ps from wordline to sense enable" %}
    </div>
</div>
<div class="caption">
    Post-extraction read: about 13 FO4 from address to wordline, 8 more to a usable bitline differential, 5 to data out.
</div>

Read is the critical path, and it is critical for a structural reason: the bitline cannot start moving until the wordline fires, so the full decode delay lands in front of the slowest part of the cycle. The other constraint that showed up late was that sense enable has to stay low long enough to overlap bitline reset, or the sense amp's internal node never fully recovers between back-to-back reads.

## Corners

<div class="row justify-content-center">
    <div class="col-sm-11 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/sram-macro/corner-sweep.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Overlaid transient waveforms of read data across six process corners, all switching within a few hundred picoseconds of each other" %}
    </div>
</div>
<div class="caption">
    Read data across TTLH, TTTT, SSTT, FFTT, SFTT and FSTT at a 1.2 ns clock. Worst slack against the TTLH reference is 264 ps.
</div>

Power stays between 1.19 and 1.35 mW across all six. Static CMOS throughout — the plan was to escalate to a faster logic family if timing did not close, and it never had to.

<div class="row justify-content-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/sram-macro/stickies.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Pink sticky notes on a fabric wall, one reading watching sunset from CFA rooftop, LVS passes, DRC is evil" %}
    </div>
</div>
<div class="caption">
    Contemporaneous notes on the experience.
</div>
