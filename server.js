import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/videos", async (req, res) => {
  const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCt6p8pYtBXexdFvkbDE5j2A";
  const response = await fetch(feedUrl);
  const xml = await response.text();
  res.send(xml);
});

app.listen(3000, () => console.log("Server running on port 3000"));
