# wueric011201.github.io

Personal site for **Tong Wu**, built on the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme.

- **Live site:** https://wueric011201.github.io
- **Repo:** https://github.com/WuEric011201/wueric011201.github.io
- **CI / build status:** https://github.com/WuEric011201/wueric011201.github.io/actions

## How deploys work

You don't deploy by hand. There's a GitHub Action in `.github/workflows/deploy.yml`. On every push to `main`, it:

1. Builds the Jekyll site with Ruby 3.3.5.
2. Purges unused CSS.
3. Pushes the built `_site` to the `gh-pages` branch.

GitHub Pages serves `gh-pages`. Settings → Pages should be **Deploy from a branch** → `gh-pages` / `/ (root)`.

Build takes 3–5 min. Watch it under the **Actions** tab.

## Edit cycle (the only commands you need)

```sh
cd ~/Code/portfolio/WuEric011201
# ...make changes in your editor...
git add -A
git commit -m "short description of the change"
git push
```

That's it. The Action handles the rest.

If `git push` is rejected with "fetch first", that's the citations bot (`update-citations.yml`) committing to `main` on its own schedule. Just:

```sh
git pull --rebase origin main
git push
```

## Where things live

| What you want to change                | File / folder                                       |
| -------------------------------------- | --------------------------------------------------- |
| Home page bio                          | `_pages/about.md`                                   |
| Profile photo                          | `assets/img/prof_pic.jpg`                           |
| Social links (email, GitHub, YouTube…) | `_data/socials.yml`                                 |
| Navbar title, footer, theme color      | `_config.yml`                                       |
| Project cards                          | `_projects/*.md` (one file per project)             |
| Project categories on `/projects/`     | `_pages/projects.md` → `display_categories:`        |
| Blog post                              | `_posts/YYYY-MM-DD-slug.md`                         |
| Blog page header / tag bar             | `_config.yml` → `blog_name`, `display_tags`         |
| Publications list (BibTeX)             | `_bibliography/papers.bib`                          |
| Light/dark toggle, search, etc.        | `_config.yml` → `enable_darkmode`, `search_enabled` |
| Accent color (theme)                   | `_sass/_themes.scss` → `--global-theme-color`       |

## Common edits

### Add a blog post

Create a new file in `_posts/` named `YYYY-MM-DD-slug.md`:

```markdown
---
layout: post
title: "Your title"
date: 2026-06-01 12:00:00 -0500
description: One-line summary shown on the blog index.
tags: music reflection
categories: blog
---

Your content in Markdown — **bold**, [links](https://...), images, code, etc.
```

Commit and push. Done.

### Add a project

Copy any file in `_projects/` (e.g. `1_project.md`) and edit the front matter:

```yaml
---
layout: page
title: My new project
description: One-line summary shown on the cards.
img: assets/img/your-photo.jpg
importance: 1            # lower = shown first within the category
category: engineering    # must match an entry in _pages/projects.md
---
```

Put the photo in `assets/img/`. Commit and push.

### Change which categories show on `/projects/`

Edit `_pages/projects.md`:

```yaml
display_categories: [engineering, music]
```

Each entry must match a `category:` value used by at least one project file.

### Add a publication

Append a BibTeX entry to `_bibliography/papers.bib`. Flag the headliner ones with `selected={true}` if you re-enable the home-page "selected publications" block (toggle `selected_papers: true` in `_pages/about.md`).

### Update social links

Edit `_data/socials.yml`. Native handlers exist for `email`, `github_username`, `linkedin_username`, `scholar_userid`, `youtube_id`, `soundcloud_username`, `spotify_id` (points at `/artist/`), and many more. See `_includes/social.liquid` for the full list.

To re-enable the RSS icon or the CV download button at the bottom of the about page, add `rss_icon: true` or `cv_pdf: /assets/pdf/your-cv.pdf` back to `_data/socials.yml`.

### Force light / re-enable dark toggle

`_config.yml` → `enable_darkmode: false` removes the toggle entirely. Set it to `true` to bring it back.

### Change the search-icon "ctrl k" hint

The text was removed from `_includes/header.liquid` (line ~124). The shortcut itself still works.

## Preview locally (optional)

The Ruby/Jekyll setup is finicky. Easiest path is Docker:

```sh
docker compose -f docker-compose-slim.yml up
# open http://localhost:8080
```

If you'd rather use Ruby directly: install `rbenv`, `rbenv install 3.3.5`, `bundle install`, `bundle exec jekyll serve` → http://localhost:4000.

Most edits are cheap enough to just push and let CI rebuild.

## Pulling theme upstream changes

This repo is a fork of [alshedivat/al-folio](https://github.com/alshedivat/al-folio). To grab upstream improvements later:

```sh
git remote add upstream https://github.com/alshedivat/al-folio.git
git fetch upstream
git merge upstream/main          # resolve conflicts, especially in _config.yml
```

Don't merge blindly — upstream may overwrite the customizations you actually want to keep.
