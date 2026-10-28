// Puts the freshly generated snake onto its slice of old paper: dist/snake.svg -> dist/snake-paper.svg
import { readFileSync, writeFileSync } from 'fs';

const tpl = readFileSync(new URL('./paper.tpl.svg', import.meta.url), 'utf8');
const snake = readFileSync('dist/snake.svg', 'utf8');
const box = { x: 105, y: 116, w: 990, h: 216 };
const inner = snake.replace(/<\?xml[^>]*>/, '')
  .replace(/<svg([^>]*?)\swidth="[^"]*"/, '<svg$1').replace(/<svg([^>]*?)\sheight="[^"]*"/, '<svg$1')
  .replace('<svg', `<svg x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}"`);
writeFileSync('dist/snake-paper.svg', tpl.replace('<!--SNAKE-->', inner));
console.log('composed dist/snake-paper.svg');
