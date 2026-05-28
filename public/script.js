async function loadVideos() {
  const res = await fetch("/videos");
  const data = await res.json();

  const container = document.getElementById("videoCarousel");

  if (!data.items) {
    container.innerHTML = "<p>No videos found.</p>";
    return;
  }

  data.items.forEach(item => {
    if (!item.id.videoId) return;

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${item.id.videoId}`;
    iframe.loading = "lazy";
    iframe.allowFullscreen = true;

    container.appendChild(iframe);
  });
}

function scrollVideos(direction) {
  const container = document.getElementById("videoCarousel");
  container.scrollLeft += direction * 350;
}

loadVideos();
