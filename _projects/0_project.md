---
layout: page
title: Opto-Electronic Front-End Redesign
description: Redesign of the photodiode receiver front end for DeepSight Technology's imaging system — noise, stability, and power, from analytic modeling through topology selection, PCB layout, and production.
importance: 1
category: professional
related_publications: false
---

**DeepSight Technology Inc.** · St. Louis, MO · May 2023 – May 2024

I redesigned the opto-electronic front end that converts the optical signal from a photodiode into the digitized data the imaging system runs on. This page describes the engineering approach; specific circuit values, part selections, and internal performance data are proprietary and left out.

## The signal chain

The board sits between the photodiode and the ADC. A transimpedance stage converts photodiode current to a voltage, a second stage sets gain and drives the cable to the digitizer, and a separate control path handles thermal management and instrument communication.

## The problems

Three constraints ran against each other, which is what made the problem interesting:

- **Stability** — capacitive loading on the line driver and the feedback capacitance around the transimpedance stage both push the loop toward marginal phase margin. Fixing one tends to make the other worse.
- **Noise** — the existing front end put more noise into the acquisition band than the imaging application wanted.
- **Power** — the board drew enough current to raise the local temperature meaningfully, which matters both for the system's thermal budget and for the noise floor itself.

## Modeling before building

Rather than iterate on hardware, I built the problem up analytically first — hand calculations for the noise contributions of each stage and for loop stability — and then in SPICE, and validated both against bench measurements on the boards already in the field.

Getting the analytic model, the simulation, and the measured spectrum to agree was the pivot point of the project. Once the model tracked reality across the frequency and time domains, topology comparison became a desk exercise instead of a fabrication cycle, and I could rule out most candidate designs before spending a board spin on them.

## Approaches evaluated

I worked through several independent levers and evaluated them in combination rather than in isolation:

- **Reconfiguring the topology** — where the transimpedance conversion happens, and what follows it
- **Distributing gain across stages** to maximize dynamic range instead of concentrating it in one place
- **Op-amp selection** driven by the noise and bandwidth budget the model produced
- **Single-supply operation with level shifting**, which is where most of the power saving came from
- **Output impedance matching** into the cable and digitizer

Six topologies came out of this. Two were strong enough on the modeled tradeoffs to carry into layout.

## Layout

I took both candidates through PCB layout in Altium, which is where a good schematic gets won or lost at these bandwidths:

- **Grounded coplanar waveguide** for the controlled-impedance signal runs
- **Parasitic optimization** around the transimpedance node, where a fraction of a picofarad moves the stability margin
- **Ground plane cutouts** under sensitive nodes
- **Crosstalk and channel-to-channel uniformity** across the multi-channel board
- **Board material and layer stack-up** selected against thermal, EMI, and signal-integrity requirements

The two layouts traded off against each other honestly: the higher-performing topology carried more risk and needed a proof of concept, while the more conservative one gave up some performance for a safer path to production.

## Production and verification

I wrote the performance specification, compared quotes across a set of PCB manufacturers, supervised the build, and then verified the finished boards in both the frequency and time domains against the model that predicted them.

The redesign delivered substantial reductions in both noise and power consumption, along with the corresponding drop in board temperature.
