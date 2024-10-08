import express from "express";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json(req.body);
});

app.post("/render", async (req, res) => {
  const { compositionId = "Intro", text = "Je suis un texte par défaut !" } =
    req.body;
  // The composition you want to render
  console.log(text, req.body, Object.keys(req));
  const options = {
    codec: "h264",
    chromiumOptions: {
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--headless",
      ],
    },
  };
  try {
    // You only have to create a bundle once, and you may reuse it
    // for multiple renders that you can parametrize using input props.
    const bundleLocation = await bundle({
      entryPoint: path.resolve("./src/index.ts"),
    });

    const inputProps = {
      text,
    };
    const outputLocation = `out/${compositionId}.mp4`;

    // Get the composition you want to render. Pass `inputProps` if you
    // want to customize the duration or other metadata.
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps,
    });

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: options.codec,
      outputLocation,
      inputProps,
      chromiumOptions: options.chromiumOptions,
    });

    res.download(outputLocation, "video.mp4", (err) => {
      if (err) {
        console.error("Error while sending the file:", err);
        res.status(500).send("Error while sending the video");
      }
    });
  } catch (error) {
    console.error("Error rendering video:", error);
    res.status(500).send("Error rendering video");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
