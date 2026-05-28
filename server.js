let cachedData = null;
let lastFetchTime = 0;

app.get("/videos", async (req, res) => {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  // If cache is fresh, return it
  if (cachedData && (now - lastFetchTime < oneDay)) {
    return res.json(cachedData);
  }

  // Otherwise fetch new data
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.CHANNEL_ID;

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Save to cache
    cachedData = data;
    lastFetchTime = now;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch YouTube videos" });
  }
});
