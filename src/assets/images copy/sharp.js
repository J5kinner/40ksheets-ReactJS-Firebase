const sharp = require('sharp');
const fs = require('fs');
const directory = './';

fs.readdirSync(directory).forEach(file => {
  sharp(`${directory}/${file}`)
    .resize(466, 606) // width, height
    .toFile(`${directory}/${file}-small.webp`);
  });