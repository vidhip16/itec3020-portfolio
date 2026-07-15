// fetches blog posts from data/posts.json and renders them into #blog-list
// keeping the cards simple for now - sorting, date formatting, and styling come next session

document.addEventListener("DOMContentLoaded", function () {

  const blogList = document.getElementById("blog-list");

  fetch("data/posts.json")
    .then(response => {
      if (!response.ok) throw new Error("Could not load posts.json");
      return response.json();
    })
    .then(posts => {
      posts.forEach(post => {
        blogList.appendChild(createPostCard(post));
      });
    })
    .catch(error => console.error(error));

});

// builds one post card and wires up its Read More button
function createPostCard(post) {
  const card = document.createElement("article");
  card.className = "post-card";

  card.innerHTML = `
    <h2>${post.title}</h2>
    <p class="post-meta">${post.date} &middot; ${post.category}</p>
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
