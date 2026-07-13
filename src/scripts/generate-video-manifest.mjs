import fs from "node:fs";
import path from "node:path";

const videoDirectory = path.join(process.cwd(), "public", "videos");
const outputDirectory = path.join(process.cwd(), "src", "generated");
const outputFile = path.join(outputDirectory, "video-manifest.ts");

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

const videos = fs
  .readdirSync(videoDirectory)
  .filter((file) => file.endsWith(".mp4"))
  .sort()
  .map((file) => `/videos/${file}`);

const content = `export const videos = ${JSON.stringify(videos, null, 2)} as const;
`;

fs.writeFileSync(outputFile, content);

console.log(`Generated ${videos.length} videos.`);
