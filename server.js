import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files
app.use(express.static(__dirname));

// Your /videos endpoint
app.get("/videos", async (req, res) => {
  const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCt6p8pYtBXexdFvkbDE5j2A";
  const response = await fetch(feedUrl);
  const xml = await response.text();
  res.send(xml);
});

// Fallback: send index.html for root
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => console.log("Server running on port 3000"));
