document.querySelectorAll(".project-filters").forEach((filters) => {
  const projects = filters.closest(".projects");
  const buttons = Array.from(filters.querySelectorAll("[data-project-filter]"));
  const cards = Array.from(projects.querySelectorAll("[data-project-category]"));
  const status = filters.querySelector("[data-project-filter-status]");

  const applyFilter = () => {
    const requestedCategory = window.location.hash.slice(1);
    const selectedButton = buttons.find((button) => button.dataset.projectFilter === requestedCategory) || buttons[0];
    const category = selectedButton.dataset.projectFilter;
    let visibleCount = 0;

    cards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.projectCategory !== category;
      if (!card.hidden) visibleCount += 1;
    });

    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button === selectedButton));
    });

    status.textContent = `Showing ${visibleCount} of ${cards.length} projects: ${selectedButton.textContent.trim()}.`;
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const hash = `#${button.dataset.projectFilter}`;
      if (window.location.hash !== hash) window.history.pushState(null, "", hash);
      applyFilter();
    });
  });

  window.addEventListener("popstate", applyFilter);
  window.addEventListener("hashchange", applyFilter);
  applyFilter();
  filters.hidden = false;
});
