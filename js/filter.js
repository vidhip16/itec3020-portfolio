// live search filter - used on both the projects page and the blog page
// starter code from the assignment PDF, filled in the TODOs

document.addEventListener("DOMContentLoaded", function () {
  const filterInput = document.getElementById("filter-input");
  const noResults = document.getElementById("no-results");
  if (!filterInput) return; // pages without a search box just skip this

  filterInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();

    // grabbing the cards fresh on every keystroke instead of once up front - on the blog page
    // blog.js adds the .post-card elements after this script runs, so caching them here would
    // come back empty. re-querying keeps it working for both pages.
    const cards = document.querySelectorAll(".project-card, .post-card");
    let visibleCount = 0;

    cards.forEach(function (card) {
      // title, tag/category, and description are all in the card text, so matching against
      // the whole thing covers "at least two fields" without picking each one apart
      const text = card.textContent.toLowerCase();
      const match = text.includes(query);

      card.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });

    // show the friendly message only when nothing matched
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
  });
});
