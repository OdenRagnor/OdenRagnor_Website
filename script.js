async function loadVideos() {
  const res = await fetch("/videos");
  const xmlText = await res.text();

  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");
  const entries = xml.getElementsByTagName("entry");
  const container = document.getElementById("videoCarousel");

  for (let i = 0; i < entries.length; i++) {
    const videoId = entries[i].getElementsByTagName("yt:videoId")[0].textContent;

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.loading = "lazy";
    container.appendChild(iframe);
  }
}

function scrollVideos(direction) {
  const container = document.getElementById("videoCarousel");
  container.scrollLeft += direction * 350;
}

loadVideos();
