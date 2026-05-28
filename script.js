async function loadVideos() {
    const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCt6p8pYtBXexdFvkbDE5j2A";
    const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(feedUrl);


    const res = await fetch(proxyUrl);
    const data = await res.json();

    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");

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
    const scrollAmount = 350;
    container.scrollLeft += direction * scrollAmount;
}

loadVideos();