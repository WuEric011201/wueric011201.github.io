# Editing the site

Every project on the site has a folder here. Each one contains:

- `text.md` — the page itself: front matter at the top, then the writing.
- `figures/` — the images that page uses. (A page that draws on more than one
  image folder gets `figures-<name>/` for each.)

**These are symlinks, not copies.** Open `content/.../text.md` in any editor and
you are editing the real file in `_projects/`. Drop a new image into a
`figures/` folder and it lands in `assets/img/`. There is nothing to sync.

Folder names are `<section>-<order>-<title>`, so they sort the way the site
displays them. `research-*` is the "Research + Industry" section,
`personal-*` is "Music + Personal".

## Changing text

Front matter (between the `---` lines) controls how the card looks:

| Field | What it does |
| --- | --- |
| `title` | Heading, and the card title |
| `description` | The blurb under the card and under the heading |
| `img` | The headline image — the card thumbnail and the picture at the top |
| `category` | `research` or `personal` — which section it lands in |
| `importance` | Sort order within the section; lower comes first |

If a value contains a colon followed by a space, wrap the whole value in double
quotes or the build will fail.

## Adding or swapping a figure

Put the file in the project's `figures/` folder, then reference it in `text.md`:

```liquid
{% include figure.liquid path="assets/img/<folder>/<file>.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Describe what is in the picture" %}
```

The `path` is always the real `assets/img/...` path, not the `content/` one.
Always write an `alt` — it is what screen readers and search engines read.

## Publishing

```bash
cd ~/Code/portfolio/WuEric011201
git checkout Gemfile.lock      # local builds add macOS entries CI does not want
npx prettier . --write         # the repo pins Prettier 3.1.1; CI fails without this
git add -A
git commit -m "short description of the change"
git push
```

Then watch <https://github.com/WuEric011201/WuEric011201.github.io/actions>.
The site is live a minute or two after "Deploy site" turns green.

## Regenerating this folder

After adding or renaming a project, run:

```bash
python3 bin/relink-content.py
```

`content/` is excluded from the Jekyll build, so nothing here is published.

| Project | Folder | Real file |
| --- | --- | --- |
| 13-Band Equalizer on FPGA + MicroBlaze | `personal-01-13-band-equalizer-on-fpga-microblaze` | `_projects/2_project.md` |
| Fuzz & Overdrive Pedals | `personal-02-fuzz-overdrive-pedals` | `_projects/1_project.md` |
| Analog Compression + Teensy Multi-effect Processor | `personal-03-analog-compression-teensy-multi-effect-processor` | `_projects/4_project.md` |
| Woodshop | `personal-04-woodshop` | `_projects/16_project.md` |
| 4 Complete Songs (Fall 2022) | `personal-06-4-complete-songs-fall-2022` | `_projects/6_project.md` |
| Synth Metal: WAIT | `personal-07-synth-metal-wait` | `_projects/9_project.md` |
| Analog Synthesizer (VCV Rack) | `personal-08-analog-synthesizer-vcv-rack` | `_projects/10_project.md` |
| Frequency Modulation Synthesis | `personal-09-frequency-modulation-synthesis` | `_projects/8_project.md` |
| Music DEMO Dump | `personal-10-music-demo-dump` | `_projects/7_project.md` |
| A Four-Chip 28 nm p-bit ASIC Tapeout | `research-01-a-four-chip-28-nm-p-bit-asic-tapeout` | `_projects/12_project.md` |
| Accelerating Distributed Digital Ising Machines | `research-02-accelerating-distributed-digital-ising-machines` | `_projects/11_project.md` |
| Monolithic 3D ReRAM + Carbon Nanotube Memory | `research-03-monolithic-3d-reram-carbon-nanotube-memory` | `_projects/14_project.md` |
| PCIe Switch Modeling for AI Inference Fabrics | `research-04-pcie-switch-modeling-for-ai-inference-fabrics` | `_projects/15_project.md` |
| Opto-Electronic Front-End Redesign | `research-05-opto-electronic-front-end-redesign` | `_projects/0_project.md` |
| A Full-Custom SRAM Macro in Virtuoso | `research-06-a-full-custom-sram-macro-in-virtuoso` | `_projects/13_project.md` |
