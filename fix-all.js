const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'index.html', active: 'Features' },
  { file: 'technology.html', active: 'Technology' },
  { file: 'impact.html', active: 'Impact' },
  { file: 'gallery.html', active: 'Gallery' },
  { file: 'command.html', active: 'Command' },
];

const links = ['Features', 'Technology', 'Impact', 'Gallery', 'Command'];
const linkHrefs = {
  Features: 'index.html',
  Technology: 'technology.html',
  Impact: 'impact.html',
  Gallery: 'gallery.html',
  Command: 'command.html',
};

function makeHeader(activeName) {
  const navLinks = links.map(name => {
    const href = linkHrefs[name];
    const isActive = name === activeName;
    const cls = isActive
      ? 'font-nav-link text-nav-link uppercase tracking-widest text-primary border-b-2 border-primary pb-2'
      : 'font-nav-link text-nav-link uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors';
    return `<a class="${cls}" href="${href}">${name}</a>`;
  }).join('\n');

  return `<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/10">
<div class="flex justify-between items-center px-margin-inline py-5 max-w-container-max mx-auto">
<a href="index.html" class="font-headline-md text-headline-md tracking-tighter text-on-surface uppercase hover:text-primary transition-colors">
                CleanRiver Bot
            </a>
<div class="hidden md:flex items-center space-x-8">
${navLinks}
</div>
<button class="bg-primary text-on-primary px-6 py-3 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:scale-95 transition-all duration-200">
                Deploy Bot
            </button>
</div>
</nav>`;
}

const FOOTER = `<!-- Footer -->
<footer class="w-full py-section-padding border-t border-white/10 bg-background">
<div class="flex flex-col md:flex-row justify-between items-center px-margin-inline max-w-container-max mx-auto">
<a href="index.html" class="font-headline-md text-headline-md tracking-tighter text-on-surface uppercase mb-8 md:mb-0 hover:text-primary transition-colors">
                CleanRiver Bot
            </a>
<div class="flex flex-col items-center md:items-end space-y-6">
<div class="flex space-x-8">
<a class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="index.html">Ethics</a>
<a class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="index.html">Support</a>
<a class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="index.html">Legal</a>
</div>
<p class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant opacity-50">
                    © 2024 CleanRiver Bot. All rights reserved.
                </p>
</div>
</div>
</footer>`;

// Regex patterns to match ANY nav/header and footer block
const headerPatterns = [
  /<!-- TopNavBar -->[\s\S]*?<\/nav>/,
  /<!-- Top Navigation -->[\s\S]*?<\/header>/,
  /<!-- Header \/ TopNavBar -->[\s\S]*?<\/header>/,
  /<header[\s\S]*?<\/header>/,
  /<nav class="fixed[\s\S]*?<\/nav>/,
];

const footerPatterns = [
  /<!-- Footer -->[\s\S]*?<\/footer>/,
  /<footer[\s\S]*?<\/footer>/,
];

pages.forEach(({ file, active }) => {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  const originalLength = html.length;

  // Replace header - try each pattern
  let headerReplaced = false;
  for (const pattern of headerPatterns) {
    if (pattern.test(html)) {
      html = html.replace(pattern, makeHeader(active));
      headerReplaced = true;
      break;
    }
  }

  // Replace footer - try each pattern
  let footerReplaced = false;
  for (const pattern of footerPatterns) {
    if (pattern.test(html)) {
      html = html.replace(pattern, FOOTER);
      footerReplaced = true;
      break;
    }
  }

  fs.writeFileSync(filePath, html, 'utf-8');
  const newLength = html.length;
  console.log(`${file}: header=${headerReplaced ? 'OK' : 'FAIL'}, footer=${footerReplaced ? 'OK' : 'FAIL'} (${originalLength} -> ${newLength} bytes)`);
});

console.log('\nDone. All pages now share identical header/footer structure.');
