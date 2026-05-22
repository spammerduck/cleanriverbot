const fs = require('fs');
const path = require('path');

const files = ['index.html', 'technology.html', 'impact.html', 'gallery.html', 'command.html', 'support.html', 'ethics.html', 'legal.html'];

const newFooter = `<!-- Footer -->
<footer class="w-full py-section-padding border-t border-white/10 bg-background">
<div class="flex flex-col md:flex-row justify-between items-center px-margin-inline max-w-container-max mx-auto">
<a href="index.html" class="font-headline-md text-headline-md tracking-tighter text-on-surface uppercase mb-8 md:mb-0 hover:text-primary transition-colors">
                CleanRiver Bot
            </a>
<div class="flex flex-col items-center md:items-end space-y-6">
<div class="flex space-x-8">
<a class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary border-b-2 border-transparent hover:border-primary pb-1 transition-all" href="ethics.html">Ethics</a>
<a class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary border-b-2 border-transparent hover:border-primary pb-1 transition-all" href="support.html">Support</a>
<a class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary border-b-2 border-transparent hover:border-primary pb-1 transition-all" href="legal.html">Legal</a>
</div>
<p class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant opacity-50">
                    © 2024 CleanRiver Bot. All rights reserved.
                </p>
</div>
</div>
</footer>`;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  const footerRegex = /<!-- Footer -->[\s\S]*?<\/footer>/;
  if (footerRegex.test(html)) {
    html = html.replace(footerRegex, newFooter);
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`Updated footer: ${file}`);
  }
});

console.log('\nDone. All footer links now have underline on hover.');
