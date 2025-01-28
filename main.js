const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to fetch the video stream URL
app.get("/get-stream-url", async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    // Validate the YouTube URL
    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    // Get video info
    const info = await ytdl.getInfo(videoUrl);

    // Find the highest quality video format with both audio and video
    const format = ytdl.chooseFormat(info.formats, {
      quality: "highest",
      filter: "videoandaudio",
    });

    if (!format) {
      return res.status(404).json({ error: "No suitable format found" });
    }

    // Return the stream URL
    res.json({ url: format.url });
  } catch (error) {
    console.error("Error fetching video info:", error);
    res.status(500).json({ error: "Failed to fetch video stream URL" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("YouTube Video Stream URL Fetcher");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});