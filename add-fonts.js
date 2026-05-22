const fs = require('fs');
const path = require('path');

const files = ['index.html', 'technology.html', 'impact.html', 'gallery.html', 'command.html'];

// Add missing font families and sizes
const extraFontFamilies = `,
                        "headline-lg": ["Hanken Grotesk"],
                        "headline-xl": ["Hanken Grotesk"],
                        "body-md": ["Inter"]`;

const extraFontSizes = `,
                        "headline-lg": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "headline-lg-mobile": ["28px", {"lineHeight": "1.3", "letterSpacing": "0", "fontWeight": "600"}],
                        "headline-xl": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800"}],
                        "headline-xl-mobile": ["40px", {"lineHeight": "1.1", "letterSpacing": "-0.01em", "fontWeight": "800"}],
                        "body-md": ["18px", {"lineHeight": "1.6", "letterSpacing": "0.01em", "fontWeight": "400"}],
                        "body-md-mobile": ["16px", {"lineHeight": "1.6", "letterSpacing": "0.01em", "fontWeight": "400"}]`;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // Add missing font families after "body-base"
  html = html.replace(
    '"body-base": ["Inter"]',
    '"body-base": ["Inter"]' + extraFontFamilies
  );

  // Add missing font sizes after "body-base" fontSize
  html = html.replace(
    '"body-base": ["16px", {"lineHeight": "1.6", "letterSpacing": "0.01em", "fontWeight": "400"}]',
    '"body-base": ["16px", {"lineHeight": "1.6", "letterSpacing": "0.01em", "fontWeight": "400"}]' + extraFontSizes
  );

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`Added fonts to: ${file}`);
});

console.log('\nDone. All pages now have headline-lg, headline-xl, and body-md fonts.');
