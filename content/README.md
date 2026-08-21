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
bin/publish.sh "short description of the change"
```

That is the whole thing. The script discards local `Gemfile.lock` churn, refreshes
these symlinks, runs the Prettier version this repo pins, then commits and pushes.
Leave the message off and it opens your editor instead.

The equivalent by hand, if you would rather:

```bash
git checkout Gemfile.lock      # local builds add macOS entries CI does not want
npx prettier . --write         # the repo pins Prettier 3.1.1; CI fails without this
git add -A
git commit -m "short description of the change"
git push
```

Then watch <https://github.com/WuEric011201/wueric011201.github.io/actions>.
The site is live a minute or two after "Deploy site" turns green.

## Regenerating this folder

After adding or renaming a project, run:

```bash
python3 bin/relink-content.py
```

`content/` is excluded from the Jekyll build, so nothing here is published.

| Project | Folder | Real file |
| --- | --- | --- |
| 13-Band FPGA Equalizer | `personal-01-13-band-fpga-equalizer` | `_projects/2_project.md` |
| Guitar Pedals | `personal-02-guitar-pedals` | `_projects/1_project.md` |
| Teensy Multi-effect | `personal-03-teensy-multi-effect` | `_projects/4_project.md` |
| Woodshop | `personal-04-woodshop` | `_projects/16_project.md` |
| Four Songs | `personal-06-four-songs` | `_projects/6_project.md` |
| WAIT (Synth Metal) | `personal-07-wait-synth-metal` | `_projects/9_project.md` |
| VCV Rack Synths | `personal-08-vcv-rack-synths` | `_projects/10_project.md` |
| FM Synthesis | `personal-09-fm-synthesis` | `_projects/8_project.md` |
| Demo Dump | `personal-10-demo-dump` | `_projects/7_project.md` |
| 28 nm p-bit Tapeout | `research-01-28-nm-p-bit-tapeout` | `_projects/12_project.md` |
| Distributed Ising Machines | `research-02-distributed-ising-machines` | `_projects/11_project.md` |
| Monolithic 3D Memory | `research-03-monolithic-3d-memory` | `_projects/14_project.md` |
| PCIe Switch Modeling | `research-04-pcie-switch-modeling` | `_projects/15_project.md` |
| Photodiode Front-End Redesign | `research-05-photodiode-front-end-redesign` | `_projects/0_project.md` |
| Custom SRAM Macro | `research-06-custom-sram-macro` | `_projects/13_project.md` |
