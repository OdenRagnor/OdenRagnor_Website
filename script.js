async function loadVideos() {
  const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCt6p8pYtBXexdFvkbDE5j2A";
  const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(feedUrl);

  try {
    const res = await fetch(proxyUrl);
    const xmlText = await res.text(); // <-- FIXED: get raw text, not JSON

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");
    const entries = xml.getElementsByTagName("entry");
    const container = document.getElementById("videoCarousel");

    if (entries.length === 0) {
      container.innerHTML = "<p style='color:#888;'>No videos found — check your channel ID.</p>";
      return;
    }

    for (let i = 0; i < entries.length; i++) {
      const videoId = entries[i].getElementsByTagName("yt:videoId")[0].textContent;

      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.loading = "lazy";
      iframe.allowFullscreen = true;

      container.appendChild(iframe);
    }
  } catch (error) {
    console.error("Error loading videos:", error);
    document.getElementById("videoCarousel").innerHTML =
      "<p style='color:#888;'>Failed to load videos. Try refreshing or check console.</p>";
  }
}

function scrollVideos(direction) {
  const container = document.getElementById("videoCarousel");
  const scrollAmount = 350;
  container.scrollLeft += direction * scrollAmount;
}

loadVideos();
