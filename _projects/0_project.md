---
layout: page
title: Opto-Electronic Front-End Redesign
description: Redesign of the photodiode receiver front end for DeepSight Technology's imaging system — noise, stability, and power, from analytic modeling through topology selection, PCB layout, and production.
importance: 4
category: realdeal
related_publications: false
---

**DeepSight Technology Inc.** · St. Louis, MO · May 2023 – May 2024

I redesigned the opto-electronic front end that converts the optical signal from a photodiode into the digitized data the imaging system runs on.

## The signal chain

The board sits between the photodiode and the ADC. The detector current splits two ways: a transimpedance stage takes the fast component and drives the cable to the digitizer, while a current mirror and low-pass path carry the slow component out as a separate DC measurement. Each branch has its own gain, its own bandwidth, and its own noise budget.

<div class="row justify-content-center">
    <div class="col-sm-11 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/system-signal-flow.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Hand-drawn signal flow diagram: a photodiode feeding a current mirror and low-pass path to a DC output, and a transimpedance amplifier through a band-pass filter and line driver to an AC output, annotated with gains, bandwidths and supply rails" %}
    </div>
</div>
<div class="caption">
    The front end as a specification. The DC branch runs through a current mirror into a low-pass path; the AC branch runs transimpedance, band-pass, then line driver. Both branches are single-ended, and the annotations fix the gain, bandwidth, and full-scale range that every candidate design had to hit.
</div>

## The problems

Three constraints ran against each other, which is what made the problem interesting:

- **Stability** — capacitive loading on the line driver and the feedback capacitance around the transimpedance stage both push the loop toward marginal phase margin. Fixing one tends to make the other worse.
- **Noise** — the existing front end put more noise into the acquisition band than the imaging application wanted.
- **Power** — the board drew enough current to raise the local temperature meaningfully, which matters both for the system's thermal budget and for the noise floor itself.

The power constraint is not just a budget line. The detector's own response moves with temperature, so a board that heats itself walks its operating point around, and the usable window narrows from the top.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/optical-power-vs-temperature.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Hand-drawn plot of optical power in microwatts against temperature, showing a deep notch in the response and a marked operating band" %}
    </div>
</div>
<div class="caption">
    Why self-heating matters: the response against temperature has a notch in it, and the marked band is the region the system has to stay inside. Every milliwatt the board does not dissipate is margin here.
</div>

## Where it started

The existing front end is the reference the redesign had to beat, so it goes into SPICE first, as built.

<div class="row justify-content-center">
    <div class="col-sm-11 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/original-schematic.png" class="img-fluid rounded z-depth-1" zoomable=true alt="SPICE schematic of the original front end, showing the photodiode, transimpedance amplifier, second-stage driver with feedback network, bias and clamp circuitry, and models for the coaxial cable and downstream gain control" %}
    </div>
</div>
<div class="caption">
    The original design entered into SPICE, including the parts that are easy to leave out and then get surprised by: the photodiode bias and clamp network, the coaxial cable, and a model of the downstream gain control the board actually drives.
</div>

## Modeling before building

Rather than iterate on hardware, I built the problem up analytically first — hand calculations for the noise contributions of each stage and for loop stability — and then in SPICE, and validated both against bench measurements on the boards already in the field.

The photodiode itself has to be modeled before any of this means anything. Its junction capacitance is what interacts with the transimpedance feedback network to set both the noise gain and the stability margin, so the detector goes into the simulation as a small-signal equivalent rather than as an ideal current source.

<div class="row justify-content-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/photodiode-model.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Small-signal equivalent circuit of a photodiode: a current source in parallel with junction capacitance and shunt resistance, followed by series resistance and package inductance" %}
    </div>
</div>
<div class="caption">
    The detector as the simulator sees it: a signal current in parallel with junction capacitance and shunt resistance, then the series resistance and package parasitics that follow it. The capacitance on the left is the term that sets the noise gain of the stage that comes next.
</div>

Getting the analytic model, the simulation, and the measured spectrum to agree was the pivot point of the project. Once the model tracked reality across the frequency and time domains, topology comparison became a desk exercise instead of a fabrication cycle, and I could rule out most candidate designs before spending a board spin on them.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/noise-density-and-gain.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Simulation plot with two traces against frequency from 1 Hz to 10 GHz: output noise spectral density in microvolts per root hertz, and transimpedance gain" %}
    </div>
</div>
<div class="caption">
    Output noise spectral density against gain, swept from 1 Hz to 10 GHz. The point of overlaying them is that the noise peak and the passband do not sit in the same place: most of the noise density is out of band, and what matters is the integral over the acquisition band, not the peak.
</div>

Loop stability was checked in the same pass, since the feedback network that sets the noise also sets the phase margin.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/transimpedance-bode.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Bode plot with magnitude in decibels and phase in degrees against frequency from 10 Hz to 10 GHz, showing separate traces for the AC and DC output paths" %}
    </div>
</div>
<div class="caption">
    Transimpedance magnitude and phase for both output paths across the full sweep. The AC path rolls up into its passband while the DC path rolls off, and the phase traces are what the stability margin gets read off.
</div>

## Where the noise actually came from

Splitting the simulated noise by contributor is what made the redesign tractable. It converts an unhelpful "the board is too noisy" into a ranked list, and it says immediately that no amount of work on the driver stage would have mattered.

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/noise-contribution.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Pie chart of simulated noise contribution in the AC path: transimpedance feedback resistor 51 percent, op-amp input noise 40 percent, high-pass filter resistance 6 percent, driver feedback resistor 1 percent, driver gain resistor 2 percent" %}
    </div>
</div>
<div class="caption">
    Simulated noise contribution of the AC path. The transimpedance feedback resistor and the op-amp's own input noise together account for about nine tenths of it, and everything downstream of the first stage contributes under a tenth. That ranking is what set the order of work.
</div>

## Approaches evaluated

I worked through several independent levers and evaluated them in combination rather than in isolation:

- **Reconfiguring the topology** — where the transimpedance conversion happens, and what follows it
- **Distributing gain across stages** to maximize dynamic range instead of concentrating it in one place
- **Op-amp selection** driven by the noise and bandwidth budget the model produced
- **Single-supply operation with level shifting**, which is where most of the power saving came from
- **Output impedance matching** into the cable and digitizer

Six topologies came out of this. They fall into two families: the 1.x designs branch the DC path off after the transimpedance stage, while the 2.x designs take the DC branch off the detector directly through a current mirror, which frees the transimpedance stage to be optimized for the AC path alone.

<div class="row justify-content-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/topology-1-0.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Hand-drawn block diagram of candidate topology 1.0" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/topology-1-1.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Hand-drawn block diagram of candidate topology 1.1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/topology-1-2.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Hand-drawn block diagram of candidate topology 1.2 with a level-shifted supply" %}
    </div>
</div>
<div class="caption">
    The 1.x family: the DC branch is taken after the transimpedance stage. 1.2 adds a level shift so the stage can run from a single rail.
</div>

<div class="row justify-content-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/topology-2-0.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Hand-drawn block diagram of candidate topology 2.0 with a current mirror on the DC branch" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/topology-2-1.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Hand-drawn block diagram of candidate topology 2.1, annotated with its input-referred noise and dissipation" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/topology-2-2.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Hand-drawn block diagram of candidate topology 2.2" %}
    </div>
</div>
<div class="caption">
    The 2.x family: the DC branch comes off the detector through a current mirror, so the transimpedance stage only has to serve the AC path. 2.1 concentrates the gain in that stage and runs the driver at unity.
</div>

Laid side by side, the tradeoff is legible. Concentrating gain in the transimpedance stage and running the driver at unity is what buys both the noise and the power, and it is the combination, not any single lever, that gets there.

<div class="row justify-content-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/topology-comparison.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Comparison table of all candidate topologies with columns for supply rails, transimpedance gain, total gain, input-referred noise, power, and whether the transimpedance stage is DC-coupled" %}
    </div>
</div>
<div class="caption">
    Every candidate against the original on the terms that mattered: gain distribution, input-referred noise over the band of interest, and power. The highlighted row is the design that went forward; the bottom row is what was already in the field.
</div>

The chosen design, drawn out in full:

<div class="row justify-content-center">
    <div class="col-sm-11 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/design-2-2-schematic.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Full SPICE schematic of the redesigned front end, showing the photodiode, transimpedance stage with feedback network, high-pass filter, line driver, and the coaxial and downstream gain-control models" %}
    </div>
</div>
<div class="caption">
    The redesign as simulated, end to end: detector and bias network, transimpedance stage with its feedback pair, the high-pass that sets the low corner, the line driver, and the cable and downstream models that load it.
</div>

## Layout

I took both candidates through PCB layout in Altium, which is where a good schematic gets won or lost at these bandwidths:

- **Grounded coplanar waveguide** for the controlled-impedance signal runs
- **Parasitic optimization** around the transimpedance node, where a fraction of a picofarad moves the stability margin
- **Ground plane cutouts** under sensitive nodes
- **Crosstalk and channel-to-channel uniformity** across the multi-channel board
- **Board material and layer stack-up** selected against thermal, EMI, and signal-integrity requirements

The board that was already in production is the baseline. It is dense, low risk, and easy to adjust, but it carries features the redesign no longer needs, and the routing was not built around the noise problem.

<div class="row justify-content-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-original-3d.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Rendered view of the original multi-channel photodiode board, densely populated with repeated channel blocks" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-original-copper.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Copper layer view of the original board showing all routing layers overlaid in colour" %}
    </div>
</div>
<div class="caption">
    The board as it existed: rendered, and with the copper layers overlaid. The repeated channel blocks are what makes channel-to-channel uniformity a layout problem rather than a schematic one.
</div>

The two layouts traded off against each other honestly: the higher-performing topology carried more risk and needed a proof of concept, while the more conservative one gave up some performance for a safer path to production.

<div class="row justify-content-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-2-1-3d.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Rendered view of the higher-performance candidate board layout" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-2-1-copper.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Copper layer view of the higher-performance candidate showing routing and ground plane treatment" %}
    </div>
</div>
<div class="caption">
    The aggressive candidate. Grounded coplanar waveguide on the signal runs, a plane cutout under the transimpedance node to hold its parasitic capacitance down, and the analog section pulled away from the digital corner.
</div>

<div class="row justify-content-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-2-2-copper.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Copper layer view of the lower-risk candidate board layout" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/deepsight/layout-2-2-inner.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Inner layer view of the lower-risk candidate showing the room definitions used to keep channel routing identical" %}
    </div>
</div>
<div class="caption">
    The lower-risk candidate, with the per-channel room definitions visible. Constraining each channel to an identical routing block is what keeps crosstalk and channel-to-channel variation predictable across the array.
</div>

## Production and verification

I wrote the performance specification, compared quotes across a set of PCB manufacturers, supervised the build, and then verified the finished boards in both the frequency and time domains against the model that predicted them.

The redesign delivered substantial reductions in both noise and power consumption, along with the corresponding drop in board temperature.
