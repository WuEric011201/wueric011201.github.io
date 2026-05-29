---
layout: page
title: 13-Band Equalizer on FPGA + MicroBlaze
description: Stereo 13-band FIR EQ at 50 kHz sample rate, with custom SPI for the LTC1865L ADC and LTC1654 DAC, controlled in C from a MicroBlaze soft-core over AXI4-Lite.
img: assets/img/wp_2_eq.jpg
importance: 2
category: engineering
related_publications: false
---

A real-time 13-band graphic equalizer implemented in HDL on an FPGA, with a MicroBlaze soft-core driving the control plane. Original post: [13 Band Equalizer using FPGA + MicroBlaze](https://nanjingtt.wordpress.com/2023/11/13/13-band-equalizer-using-fpga-microblaze/).

## Highlights

- **13-band FIR filter** running at a 50 kHz sample rate on both stereo channels
- Custom SPI cores driving the **LTC1865L ADC** and **LTC1654 DAC**
- **MicroBlaze** soft-core integration over the **AXI4-Lite** bus
- C firmware on MicroBlaze for band gain control and runtime configuration

## Design artifacts

Block / bubble diagrams of the system architecture, schematics for the ADC + DAC front end, and FIR filter design with response plots.

## Listen / watch

- [YouTube](https://www.youtube.com/@Qianeric3825)
- [SoundCloud](https://on.soundcloud.com/yEd21)
