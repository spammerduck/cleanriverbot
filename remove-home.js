const fs = require('fs');
const path = require('path');

const allFiles = ['index.html', 'technology.html', 'impact.html', 'gallery.html', 'command.html', 'support.html', 'ethics.html', 'legal.html'];

const navActive = {
  'index.html': null,
  'technology.html': 'Technology',
  'impact.html': 'Impact',
  'gallery.html': 'Gallery',
  'command.html': 'Command',
  'support.html': null,
  'ethics.html': null,
  'legal.html': null,
};

function makeNav(activeName) {
  const links = [
    { name: 'Technology', href: 'technology.html' },
    { name: 'Impact', href: 'impact.html' },
    { name: 'Gallery', href: 'gallery.html' },
    { name: 'Command', href: 'command.html' },
  ];

  const navLinks = links.map(l => {
    const isActive = l.name === activeName;
    const cls = isActive
      ? 'font-nav-link text-nav-link uppercase tracking-widest text-primary border-b-2 border-primary pb-1 transition-all'
      : 'font-nav-link text-nav-link uppercase tracking-widest text-on-surface-variant hover:text-primary border-b-2 border-transparent hover:border-primary pb-1 transition-all';
    return `<a class="${cls}" href="${l.href}">${l.name}</a>`;
  }).join('\n');

  return `<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/10">
<div class="flex justify-between items-center px-margin-inline py-5 max-w-container-max mx-auto">
<a href="index.html" class="font-headline-md text-headline-md tracking-tighter text-on-surface uppercase hover:text-primary transition-colors cursor-pointer">
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

allFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  const navRegex = /<!-- TopNavBar -->[\s\S]*?<\/nav>/;
  if (navRegex.test(html)) {
    html = html.replace(navRegex, makeNav(navActive[file]));
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`Updated: ${file}`);
  }
});

console.log('\nDone. "Home" removed. "CleanRiver Bot" links to index.html on all pages.');
