---
layout: page
title: projects
permalink: /projects/
description:
nav: true
nav_order: 3
display_categories: [research, personal]
category_titles:
  research: Research + Industry
  personal: Music + Personal
horizontal: false
---

<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <div class="project-filters" role="group" aria-label="Filter projects by category" hidden>
    <button type="button" class="project-filter" data-project-filter="all" aria-pressed="true" aria-controls="projects-grid">All</button>
    {% for category in page.display_categories %}
      <button type="button" class="project-filter" data-project-filter="{{ category | escape }}" aria-pressed="false" aria-controls="projects-grid">
        {{ page.category_titles[category] | default: category }}
      </button>
    {% endfor %}
    <span class="sr-only" role="status" data-project-filter-status></span>
  </div>
  {% assign sorted_projects = "" | split: "," %}
  {% for category in page.display_categories %}
    {% assign categorized_projects = site.projects | where: "category", category | sort: "importance" %}
    {% assign sorted_projects = sorted_projects | concat: categorized_projects %}
  {% endfor %}
  <script defer src="{{ '/assets/js/project-filters.js' | relative_url | bust_file_cache }}"></script>
{% else %}
  {% assign sorted_projects = site.projects | sort: "importance" %}
{% endif %}
  <div id="projects-grid" class="row row-cols-1 {% if page.horizontal %}row-cols-md-2{% else %}row-cols-md-3{% endif %}">
  {% for project in sorted_projects %}
    {% if page.horizontal %}
      {% include projects_horizontal.liquid %}
    {% else %}
      {% include projects.liquid %}
    {% endif %}
  {% endfor %}
  </div>
</div>
