const fs = require('fs');
const path = require('path');

const allFiles = ['index.html', 'technology.html', 'impact.html', 'gallery.html', 'command.html', 'support.html', 'ethics.html', 'legal.html'];

allFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // 1. Add overflow-x: hidden to body style if missing
  if (!html.includes('overflow-x: hidden')) {
    // Add it after the opening <style> tag's body block
    if (html.includes('body {')) {
      html = html.replace('body {', 'body {\n            overflow-x: hidden;');
      changed = true;
    } else if (html.includes('<style>')) {
      // Add body rule after <style>
      html = html.replace('<style>', '<style>\n        body { overflow-x: hidden; }');
      changed = true;
    }
  }

  // 2. Remove custom scrollbar styles (they cause layout shift)
  const scrollbarRegex = /\s*::-webkit-scrollbar[\s\S]*?\{[\s\S]*?\}\s*/g;
  if (scrollbarRegex.test(html)) {
    html = html.replace(/[\s\S]*?::-webkit-scrollbar[\s\S]*?\{[\s\S]*?\}/g, '');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`Fixed: ${file}`);
  } else {
    console.log(`OK: ${file}`);
  }
});

console.log('\nDone. All pages have overflow-x: hidden, no custom scrollbar.');
