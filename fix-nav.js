const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'index.html', active: 'Features', label: 'Landing Page' },
  { file: 'technology.html', active: 'Technology', label: 'Technology' },
  { file: 'impact.html', active: 'Impact', label: 'Impact' },
  { file: 'gallery.html', active: 'Gallery', label: 'Gallery' },
  { file: 'command.html', active: 'Command', label: 'Command' },
];

const links = [
  { name: 'Features', href: 'index.html' },
  { name: 'Technology', href: 'technology.html' },
  { name: 'Impact', href: 'impact.html' },
  { name: 'Gallery', href: 'gallery.html' },
  { name: 'Command', href: 'command.html' },
];

function makeNav(activeName) {
  const linkItems = links.map(l => {
    const isActive = l.name === activeName;
    const cls = isActive
      ? 'font-nav-link text-nav-link uppercase tracking-widest text-primary border-b-2 border-primary pb-2'
      : 'font-nav-link text-nav-link uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors';
    return `<a class="${cls}" href="${l.href}">${l.name}</a>`;
  }).join('\n');

  return `<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/10">
<div class="flex justify-between items-center px-margin-inline py-5 max-w-container-max mx-auto">
<a href="index.html" class="font-headline-md text-headline-md tracking-tighter text-on-surface uppercase hover:text-primary transition-colors">
                CleanRiver Bot
            </a>
<div class="hidden md:flex items-center space-x-8">
${linkItems}
</div>
<button class="bg-primary text-on-primary px-6 py-3 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:scale-95 transition-all duration-200">
                Deploy Bot
            </button>
</div>
</nav>`;
}

const footer = `<!-- Footer -->
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

pages.forEach(({ file, active }) => {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // Replace nav section
  const navRegex = /<!-- TopNavBar -->[\s\S]*?<\/nav>/;
  if (navRegex.test(html)) {
    html = html.replace(navRegex, makeNav(active));
  }

  // Replace footer section
  const footerRegex = /<!-- Footer -->[\s\S]*?<\/footer>/;
  if (footerRegex.test(html)) {
    html = html.replace(footerRegex, footer);
  }

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`Updated: ${file} (active: ${active})`);
});

console.log('\nAll pages updated with consistent header/footer and navigation.');
