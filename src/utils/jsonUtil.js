// src/utils/jsonUtil.js
import fs from 'fs';
import path from 'path'; // ✅ required to use path.resolve

export function loadJson(fileName, folder = 'testdata') {
  const filePath = path.resolve(`src/${folder}`, `${fileName}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`JSON file not found: ${filePath}`);
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}