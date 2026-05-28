import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// YouTube feed endpoint
app.get("/videos", async (req, res) => {
  const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCt6p8pYtBXexdFvkbDE5j2A";
  const response = await fetch(feedUrl);
  const xml = await response.text();
  res.type("application/xml").send(xml);
});

// Fallback route — ALWAYS send index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => console.log("Server running on port 3000"));
