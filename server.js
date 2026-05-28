import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// MUST come before app.use() or app.get()
const app = express();
app.use(cors());

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// -----------------------------
// YOUR CACHED /videos ROUTE GOES HERE
// -----------------------------

let cachedData = null;
let lastFetchTime = 0;

app.get("/videos", async (req, res) => {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (cachedData && (now - lastFetchTime < oneDay)) {
    return res.json(cachedData);
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.CHANNEL_ID;

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    cachedData = data;
    lastFetchTime = now;

    res.json(data);
  } catch (err) {
    console.error("YouTube API error:", err);
    res.status(500).json({ error: "Failed to fetch YouTube videos" });
  }
});

// Fallback route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
