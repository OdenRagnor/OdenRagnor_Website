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

// 1️⃣ Serve static files FIRST
app.use(express.static(path.join(__dirname, "public")));

// 2️⃣ YouTube feed endpoint
app.get("/videos", async (req, res) => {
  const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UC9e9wn-JzoBHLLM9umyNGcw";
  const response = await fetch(feedUrl);
  const xml = await response.text();
  res.type("application/xml").send(xml);
});

// 3️⃣ Fallback route — ALWAYS send index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => console.log("Server running on port 3000"));
