#!/usr/bin/env python3
"""Rebuild content/ -- an editing view of the site.

Every project gets one folder holding a symlink to its Markdown source and a
symlink to each image folder it uses.  Because they are symlinks, editing
anything under content/ edits the real file; there is no copy to keep in sync.

Run from the repo root:  python3 bin/relink-content.py
"""
import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "content")

FRONT = re.compile(r"^---\n(.*?)\n---", re.S)
IMGREF = re.compile(r"assets/img/([A-Za-z0-9_.-]+)/")


def field(front, name):
    m = re.search(r"^%s:\s*(.+?)\s*$" % name, front, re.M)
    return m.group(1).strip().strip('"') if m else ""


def slug(title):
    s = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return re.sub(r"-+", "-", s)


def rel(target, start):
    return os.path.relpath(target, start)


def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)

    projects = []
    src = os.path.join(ROOT, "_projects")
    for name in sorted(os.listdir(src)):
        if not name.endswith(".md"):
            continue
        path = os.path.join(src, name)
        text = open(path, encoding="utf-8").read()
        m = FRONT.match(text)
        if not m:
            continue
        front = m.group(1)
        cat = field(front, "category") or "uncategorized"
        try:
            imp = int(field(front, "importance") or 99)
        except ValueError:
            imp = 99
        title = field(front, "title")
        dirs = sorted(set(IMGREF.findall(text)))
        projects.append((cat, imp, title, path, dirs))

    lines = []
    for cat, imp, title, path, dirs in sorted(projects, key=lambda p: (p[0], p[1])):
        folder = os.path.join(OUT, "%s-%02d-%s" % (cat, imp, slug(title)))
        os.makedirs(folder)
        os.symlink(rel(path, folder), os.path.join(folder, "text.md"))
        for d in dirs:
            target = os.path.join(ROOT, "assets", "img", d)
            if os.path.isdir(target):
                link = "figures" if len(dirs) == 1 else "figures-%s" % d
                os.symlink(rel(target, folder), os.path.join(folder, link))
        lines.append("| %s | `%s` | `%s` |" % (title, os.path.basename(folder),
                                               os.path.relpath(path, ROOT)))

    readme = os.path.join(OUT, "README.md")
    with open(readme, "w", encoding="utf-8") as f:
        f.write(HEADER)
        f.write("\n| Project | Folder | Real file |\n| --- | --- | --- |\n")
        f.write("\n".join(lines))
        f.write("\n")
    print("wrote %d project folders under content/" % len(projects))


HEADER = """# Editing the site

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
"""

if __name__ == "__main__":
    main()
