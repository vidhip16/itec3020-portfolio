// fetches blog posts from data/posts.json and renders them into #blog-list
// now sorts newest-first, formats the date nicely, and flags the most recent post

document.addEventListener("DOMContentLoaded", function () {

  const blogList = document.getElementById("blog-list");

  fetch("data/posts.json")
    .then(response => {
      if (!response.ok) throw new Error("Could not load posts.json");
      return response.json();
    })
    .then(posts => {
      // newest to oldest - subtracting the two Date objects gives me the ordering
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      posts.forEach((post, index) => {
        // after sorting, the first one is the most recent - that gets the badge
        const isLatest = index === 0;
        blogList.appendChild(createPostCard(post, isLatest));
      });
    })
    .catch(error => console.error(error));

});

// turns "2026-07-06" into "July 6, 2026"
function formatDate(dateStr) {
  const d = new Date(dateStr);
  // the dates are plain YYYY-MM-DD so they parse as UTC midnight - without timeZone: "UTC"
  // it kept showing the day before for me since I'm behind UTC. took me a bit to figure out
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  });
}

// builds one post card and wires up its Read More button
function createPostCard(post, isLatest) {
  const card = document.createElement("article");
  card.className = "post-card";

  const badge = isLatest ? `<span class="latest-badge">Latest Post</span>` : "";

  card.innerHTML = `
    <h2>${post.title} ${badge}</h2>
    <p class="post-meta">${formatDate(post.date)} &middot; ${post.category}</p>
    <p class="post-summary">${post.summary}</p>
    <p class="post-content" hidden>${post.content}</p>
    <button class="read-more-btn">Read More</button>
  `;

  const readMoreBtn = card.querySelector(".read-more-btn");
  const contentEl = card.querySelector(".post-content");

  readMoreBtn.addEventListener("click", function () {
    contentEl.hidden = !contentEl.hidden;
    readMoreBtn.textContent = contentEl.hidden ? "Read More" : "Show Less";
  });

  return card;
}
