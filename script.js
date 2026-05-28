async function loadVideos() {
  const playlistId = "UUt6p8pYtBXexdFvkbDE5j2A";
  const apiUrl = `https://yt-api.org/json/playlist/${playlistId}`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  const container = document.getElementById("videoCarousel");

  if (!data.items || data.items.length === 0) {
    container.innerHTML = "<p style='color:#888;'>No videos found.</p>";
    return;
  }

  data.items.forEach(video => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${video.id}`;
    iframe.loading = "lazy";
    iframe.allowFullscreen = true;
    container.appendChild(iframe);
  });
}

function scrollVideos(direction) {
  const container = document.getElementById("videoCarousel");
  const scrollAmount = 350;
  container.scrollLeft += direction * scrollAmount;
}

loadVideos();
