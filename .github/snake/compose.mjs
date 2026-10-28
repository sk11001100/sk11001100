// Puts the freshly generated snake onto its slice of old paper: node compose.mjs <snake.svg> <out dir>
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';

const [src = 'dist/snake.svg', out = 'out'] = process.argv.slice(2);

const tpl = readFileSync(new URL('./paper.tpl.svg', import.meta.url), 'utf8');
const snake = readFileSync(src, 'utf8');
const box = { x: 105, y: 116, w: 990, h: 216 };
const inner = snake.replace(/<\?xml[^>]*>/, '')
  .replace(/<svg([^>]*?)\swidth="[^"]*"/, '<svg$1').replace(/<svg([^>]*?)\sheight="[^"]*"/, '<svg$1')
  .replace('<svg', `<svg x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}"`);
mkdirSync(out, { recursive: true });
copyFileSync(src, join(out, 'snake.svg'));
writeFileSync(join(out, 'snake-paper.svg'), tpl.replace('<!--SNAKE-->', inner));
console.log('composed', join(out, 'snake-paper.svg'));
