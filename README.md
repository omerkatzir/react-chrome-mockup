# React Chrome Mockup

A pixel-accurate Chrome browser mockup built with React + Vite. Every dimension, icon, and color is extracted directly from Chromium source code — no guesswork.

![Light and Dark mode](https://img.shields.io/badge/theme-light%20%2F%20dark-blue)

## Features

- **Exact Chromium dimensions** from `layout_constants.cc`, `tab_style.cc`, `toolbar_button.h`
- **Authentic SVG icons** converted from Chromium's `.icon` vector format (Chrome Refresh 2023)
- **Material Design 3 color system** — 3-layer pipeline matching Chromium's architecture:
  - Layer 1: Reference Palette (`ref_color_mixer.cc`)
  - Layer 2: System Tokens (`sys_color_mixer.cc`)
  - Layer 3: Chrome Theme (`chrome_color_mixer.cc`)
- **Seed color theming** — pick any color, choose a variant (tonal spot, neutral, vibrant, expressive, content)
- **Platform switching** — macOS (Tahoe traffic lights, 26pt radius) and Windows (caption buttons, 8pt radius)
- **Interactive tabs** — add, close, switch, with correct hover states and separator logic

## Getting Started

```bash
npm install
npm run dev
```

## Components

| Component | Description |
|---|---|
| `ChromeWindow` | Top-level window frame with platform-specific border radius |
| `ChromeTabStrip` | Tab strip with traffic lights / caption buttons, tab search, new tab |
| `ChromeTab` | Individual tab with GM2TabStyle SVG path, hover squarcle, separators |
| `ChromeToolbar` | Navigation buttons, omnibox with page info + star, extensions, avatar, menu |

## Color System

```js
import { createChromeTheme } from './chrome-color-system';

// Default Chrome blue
const theme = createChromeTheme({ mode: 'baseline', isDark: false });

// Custom seed color
const themed = createChromeTheme({ mode: 'seed', seedColor: '#4285F4', variant: 'tonalSpot', isDark: true });

// Grayscale
const gray = createChromeTheme({ mode: 'grayscale', isDark: false });
```

## License

MIT
