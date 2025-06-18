const { mediumUsername } = window.siteConfig;

function extractImage(content) {
  const div = document.createElement("div");
  div.innerHTML = content;
  const img = div.querySelector("img");
  return img?.src || "assets/images/fallback-blog-thumbnail.png";
}

async function loadMediumPosts() {
  const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`);
  const { items } = await res.json();

  const blogGrid = document.querySelector(".blog-grid");
  if (!blogGrid) return;

  blogGrid.innerHTML = "";
  items.slice(0, 6).forEach(post => {
    const imageSrc = extractImage(post.content);

    blogGrid.innerHTML += `
      <div class="blog-card">
        <div class="blog-image"><img src="${imageSrc}" alt="${post.title}"></div>
        <div class="blog-info">
          <div class="blog-date">${new Date(post.pubDate).toDateString()}</div>
          <h3>${post.title}</h3>
          <p>${post.description.replace(/<[^>]+>/g, "").substring(0, 100)}...</p>
          <a href="${post.link}" class="read-more" target="_blank">Read More</a>
        </div>
      </div>
    `;
  });
}

loadMediumPosts();
