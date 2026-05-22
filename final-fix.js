const fs = require('fs');
const path = require('path');

const files = ['index.html', 'technology.html', 'impact.html', 'gallery.html', 'command.html'];

// Standard Google Fonts - loads ALL fonts needed by Tailwind config
const STANDARD_FONTS = `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Hanken+Grotesk:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">`;

// Standard nav with "Home" instead of "Features"
function makeNav(activeName) {
  const links = [
    { name: 'Home', href: 'index.html' },
    { name: 'Technology', href: 'technology.html' },
    { name: 'Impact', href: 'impact.html' },
    { name: 'Gallery', href: 'gallery.html' },
    { name: 'Command', href: 'command.html' },
  ];

  const navLinks = links.map(l => {
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

const navPageMap = {
  'index.html': 'Home',
  'technology.html': 'Technology',
  'impact.html': 'Impact',
  'gallery.html': 'Gallery',
  'command.html': 'Command',
};

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // 1. Replace ALL Google Fonts links with standard one
  // Remove all existing font links
  html = html.replace(/<link[^>]*fonts\.googleapis[^>]*\/?\s*>/g, '');
  // Insert standard fonts after <head>
  html = html.replace(/<head>/, `<head>\n${STANDARD_FONTS}`);

  // 2. Replace nav
  const navRegex = /<!-- TopNavBar -->[\s\S]*?<\/nav>/;
  if (navRegex.test(html)) {
    html = html.replace(navRegex, makeNav(navPageMap[file]));
  }
  // Also handle <header> based navs
  const headerNavRegex = /<!-- Header \/ TopNavBar -->[\s\S]*?<\/header>/;
  if (headerNavRegex.test(html)) {
    html = html.replace(headerNavRegex, makeNav(navPageMap[file]));
  }

  // 3. Replace footer
  const footerRegex = /<!-- Footer -->[\s\S]*?<\/footer>/;
  if (footerRegex.test(html)) {
    html = html.replace(footerRegex, FOOTER);
  }

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`Fixed: ${file} (active: ${navPageMap[file]})`);
});

console.log('\nAll pages now have:');
console.log('- Same Google Fonts (Inter + Hanken Grotesk)');
console.log('- Same nav structure with "Home" instead of "Features"');
console.log('- Same Deploy Bot button');
console.log('- Same footer');
