const fs = require('fs');
const src = fs.readFileSync('src/data/products.ts', 'utf8');
const lines = src.split('\n');
const removeIds = new Set(['dp-014','op-007','op-014','hb-005','hb-011','hb-016','hb-019','sc-005','sc-015','sc-016','sc-018','cg-015']);
let skip = false;
let braceDepth = 0;
const out = [];
for (let i = 0; i < lines.length; i++) {
  if (!skip) {
    if (/^\s*\{$/.test(lines[i]) && i + 1 < lines.length) {
      const idMatch = lines[i + 1].match(/id:\s*"([^"]+)"/);
      if (idMatch && removeIds.has(idMatch[1])) {
        skip = true;
        braceDepth = 1;
        continue;
      }
    }
    out.push(lines[i]);
  } else {
    for (const ch of lines[i]) {
      if (ch === '{') braceDepth++;
      if (ch === '}') braceDepth--;
    }
    if (braceDepth <= 0) {
      skip = false;
    }
  }
}
fs.writeFileSync('src/data/products.ts', out.join('\n'));
console.log('Removed ' + removeIds.size + ' products. Lines: ' + lines.length + ' -> ' + out.length);
