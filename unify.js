const fs = require('fs');
const path = require('path');

const files = ['index.html', 'technology.html', 'impact.html', 'gallery.html', 'command.html'];

// Standard Tailwind config (lavender primary, from gallery/command)
const TAILWIND_CONFIG = `tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-secondary-fixed-variant": "#454747",
                        "on-tertiary": "#2c3133",
                        "on-surface": "#e0e3e4",
                        "tertiary": "#dfe3e6",
                        "tertiary-fixed-dim": "#c3c7ca",
                        "surface-container-high": "#272b2c",
                        "inverse-on-surface": "#2d3132",
                        "outline": "#90909a",
                        "on-primary": "#1f2d5e",
                        "error": "#ffb4ab",
                        "secondary-container": "#454747",
                        "on-secondary-fixed": "#1a1c1c",
                        "outline-variant": "#45464f",
                        "surface-variant": "#313536",
                        "background": "#101415",
                        "secondary-fixed-dim": "#c6c6c7",
                        "inverse-surface": "#e0e3e4",
                        "surface-tint": "#b7c4ff",
                        "primary-fixed-dim": "#b7c4ff",
                        "surface-container-lowest": "#0b0f10",
                        "surface-container": "#1c2021",
                        "on-secondary-container": "#b4b5b5",
                        "on-surface-variant": "#c6c5d0",
                        "inverse-primary": "#4f5c90",
                        "surface-container-low": "#181c1d",
                        "on-tertiary-fixed": "#171c1e",
                        "primary-container": "#b7c4ff",
                        "tertiary-fixed": "#dfe3e6",
                        "on-background": "#e0e3e4",
                        "secondary-fixed": "#e2e2e2",
                        "surface": "#101415",
                        "surface-container-highest": "#313536",
                        "tertiary-container": "#c3c7ca",
                        "surface-dim": "#101415",
                        "on-secondary": "#2f3131",
                        "on-tertiary-container": "#4e5355",
                        "secondary": "#c6c6c7",
                        "on-error-container": "#ffdad6",
                        "primary-fixed": "#dce1ff",
                        "on-tertiary-fixed-variant": "#42484a",
                        "on-primary-fixed-variant": "#374476",
                        "on-primary-container": "#435083",
                        "on-primary-fixed": "#071749",
                        "on-error": "#690005",
                        "primary": "#dde1ff",
                        "surface-bright": "#363a3b",
                        "error-container": "#93000a"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "stack-sm": "0.5rem",
                        "stack-md": "1.5rem",
                        "container-max": "1440px",
                        "section-padding": "8rem",
                        "margin-inline": "2rem",
                        "gutter": "1.5rem"
                    },
                    "fontFamily": {
                        "nav-link": ["Inter"],
                        "label-sm": ["Hanken Grotesk"],
                        "display-lg-mobile": ["Hanken Grotesk"],
                        "display-lg": ["Hanken Grotesk"],
                        "headline-md": ["Hanken Grotesk"],
                        "body-base": ["Inter"]
                    },
                    "fontSize": {
                        "nav-link": ["14px", {"lineHeight": "20px", "letterSpacing": "0.02em", "fontWeight": "400"}],
                        "label-sm": ["11px", {"lineHeight": "16px", "letterSpacing": "0.12em", "fontWeight": "500"}],
                        "display-lg-mobile": ["32px", {"lineHeight": "1.2", "letterSpacing": "0.1em", "fontWeight": "600"}],
                        "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "0.15em", "fontWeight": "600"}],
                        "headline-md": ["24px", {"lineHeight": "1.2", "letterSpacing": "0.1em", "fontWeight": "500"}],
                        "body-base": ["16px", {"lineHeight": "1.6", "letterSpacing": "0.01em", "fontWeight": "400"}]
                    }
                }
            }
        }`;

const BODY_CLASS = `bg-background text-on-surface font-body-base antialiased`;

const BODY_STYLE = `
        body {
            background-color: #101415;
            color: #e0e3e4;
            overflow-x: hidden;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .glass-panel {
            background: rgba(28, 32, 33, 0.7);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }`;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // 1. Replace body class
  html = html.replace(/<body[^>]*>/, `<body class="${BODY_CLASS}">`);

  // 2. Replace Tailwind config
  const configRegex = /tailwind\.config\s*=\s*\{[\s\S]*?\}\s*<\/script>/;
  if (configRegex.test(html)) {
    html = html.replace(configRegex, `${TAILWIND_CONFIG}\n    </script>`);
  }

  // 3. Replace body background-color in style blocks
  html = html.replace(/background-color:\s*#[0-9a-fA-F]+;/g, 'background-color: #101415;');

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`Unified: ${file}`);
});

console.log('\nAll pages now share identical Tailwind config, body class, and background.');
