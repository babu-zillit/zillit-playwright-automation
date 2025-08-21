import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const baseDir = 'test-results';
const outputDir = 'videos';

// Create output directory if not exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

function walkAndConvert(dir) {
  const folders = fs.readdirSync(dir);
  folders.forEach(folder => {
    const folderPath = path.join(dir, folder);
    const videoPath = path.join(folderPath, 'video.webm');

    if (fs.existsSync(videoPath)) {
      const outputName = `${folder}.mp4`;
      const outputPath = path.join(outputDir, outputName);

      const command = `ffmpeg -i "${videoPath}" -c:v libx264 -preset fast -crf 22 "${outputPath}"`;

      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error(`❌ Failed to convert: ${folder}`, err);
        } else {
          console.log(`✅ Saved: ${outputPath}`);
        }
      });
    }
  });
}

walkAndConvert(baseDir);

/**
 * run this script for convert all video to mp4 format
 * node convert-all-videos.js
 * 
 * 
 * run this command : npm run convert-videos
 */ 