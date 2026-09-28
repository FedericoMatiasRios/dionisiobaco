const fs = require('fs');
const path = require('path');

const productosDir = path.resolve(__dirname, '..', 'img', 'productos');
const outFile = path.join(productosDir, 'index.json');

function isImage(name){
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(name);
}

if(!fs.existsSync(productosDir)){
  console.error('Directory not found:', productosDir);
  process.exit(1);
}

const items = fs.readdirSync(productosDir).filter(isImage);

items.sort((a,b)=>{
  const an = parseInt((a.match(/^\d+/)||[])[0] || '', 10);
  const bn = parseInt((b.match(/^\d+/)||[])[0] || '', 10);
  if(!isNaN(an) && !isNaN(bn)) return an - bn;
  return a.localeCompare(b);
});

fs.writeFileSync(outFile, JSON.stringify(items, null, 2), 'utf8');
console.log(`Wrote ${items.length} items to ${outFile}`);
