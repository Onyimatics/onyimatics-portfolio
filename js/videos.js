// const { youtubeApiKey, youtubeChannelId } = window.siteConfig;

// async function loadYouTubeVideos() {
//   const url = `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&channelId=${youtubeChannelId}&part=snippet&maxResults=10&type=video&order=date`;
//   const res = await fetch(url);
//   const { items } = await res.json();

//   const carousel = document.getElementById("videoCarousel");
//   if (!carousel) return;

//   carousel.innerHTML = "";
//   items?.forEach(video => {
//     const vid = video.id.videoId;
//     const { title, thumbnails, description, publishedAt } = video.snippet;

//     const card = document.createElement("div");
//     card.className = "video-card";
//     card.innerHTML = `
//       <div class="video-thumbnail" data-video-id="${vid}">
//         <img src="${thumbnails.medium.url}" alt="${title}">
//         <div class="play-button"><i class="fas fa-play"></i></div>
//       </div>
//       <div class="video-info">
//         <h3>${title}</h3>
//         <div class="video-meta">
//           <span><i class="fas fa-calendar"></i> ${new Date(publishedAt).toDateString()}</span>
//         </div>
//         <p>${description.substring(0, 80)}...</p>
//         <a href="#" class="watch-video" data-video-id="${vid}">Watch Video</a>
//       </div>
//     `;
//     carousel.appendChild(card);
//   });

//   setupVideoModals();
//   autoScrollCarousel(carousel);
// }

// loadYouTubeVideos();

// function setupVideoModals() {
//   const modal = document.getElementById("videoModal");
//   const iframe = document.getElementById("videoFrame");

//   const openModal = (videoId) => {
//     iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
//     modal.style.display = "flex";
//     document.body.style.overflow = "hidden";
//   };

//   const closeModal = () => {
//     modal.style.display = "none";
//     iframe.src = "";
//     document.body.style.overflow = "auto";
//   };

//   document.querySelectorAll(".watch-video, .video-thumbnail").forEach(trigger => {
//     trigger.addEventListener("click", (e) => {
//       e.preventDefault();
//       const videoId = trigger.dataset.videoId || trigger.getAttribute("data-video-id");
//       if (videoId) openModal(videoId);
//     });
//   });

//   document.querySelector(".close-modal")?.addEventListener("click", closeModal);
//   modal.addEventListener("click", (e) => e.target === modal && closeModal());
//   document.addEventListener("keydown", (e) => e.key === "Escape" && modal.style.display === "flex" && closeModal());
// }

// function autoScrollCarousel(carousel) {
//   let offset = 0;
//   setInterval(() => {
//     offset += 320; // width of a card + gap
//     if (offset >= carousel.scrollWidth - carousel.clientWidth) offset = 0;
//     carousel.scrollTo({ left: offset, behavior: "smooth" });
//   }, 6000);
// }


const { youtubeChannelId } = window.siteConfig;

async function loadYouTubeVideos() {
  const YOUTUBE_FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeChannelId}`;
  const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(YOUTUBE_FEED)}`;

  const res = await fetch(rssUrl);
  const { items } = await res.json();

  const carousel = document.getElementById("videoCarousel");
  if (!carousel) return;

  carousel.innerHTML = "";
  items.slice(0, 10).forEach(video => {
    const { title, pubDate, thumbnail, link, description } = video;
    const videoId = link.split("v=")[1];

    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <div class="video-thumbnail" data-video-id="${videoId}">
        <img src="${thumbnail}" alt="${title}">
        <div class="play-button"><i class="fas fa-play"></i></div>
      </div>
      <div class="video-info">
        <h3>${title}</h3>
        <div class="video-meta">
          <span><i class="fas fa-calendar"></i> ${new Date(pubDate).toDateString()}</span>
        </div>
        <p>${description.substring(0, 80)}...</p>
        <a href="#" class="watch-video" data-video-id="${videoId}">Watch Video</a>
      </div>
    `;
    carousel.appendChild(card);
  });

  setupVideoModals();
  autoScrollCarousel(carousel);
}

function setupVideoModals() {
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoFrame");

  const openModal = (videoId) => {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.style.display = "none";
    iframe.src = "";
    document.body.style.overflow = "auto";
  };

  document.querySelectorAll(".watch-video, .video-thumbnail").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const videoId = trigger.dataset.videoId || trigger.getAttribute("data-video-id");
      if (videoId) openModal(videoId);
    });
  });

  document.querySelector(".close-modal")?.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => e.target === modal && closeModal());
  document.addEventListener("keydown", (e) => e.key === "Escape" && modal.style.display === "flex" && closeModal());
}

function autoScrollCarousel(carousel) {
  let offset = 0;
  setInterval(() => {
    offset += 320;
    if (offset >= carousel.scrollWidth - carousel.clientWidth) offset = 0;
    carousel.scrollTo({ left: offset, behavior: "smooth" });
  }, 6000);
}

loadYouTubeVideos();
