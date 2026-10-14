# your-qr-code

Free, privacy-friendly QR code generator that runs entirely in the browser. No accounts, no server-side processing — your data never leaves the device.

The UI is in Spanish (`es`).

## Features

- **Multiple payload types:** URL, plain text, Wi‑Fi (WPA/WEP/open), email (`mailto:`), and phone (`tel:`)
- **Live preview** with customizable size, error correction level (L/M/Q/H), and colors
- **Contrast warning** when foreground/background colors may hurt scan reliability
- **Export:** download PNG or SVG, or copy the image to the clipboard
- **SEO-ready:** Open Graph/Twitter meta tags, JSON-LD (WebApplication + FAQ), `robots.txt`, and `sitemap.xml` generated at build time

## Privacy

QR codes are built with the [`qrcode`](https://www.npmjs.com/package/qrcode) library in the client. Nothing you type is sent to a backend or stored by this app.

## Requirements

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) (recommended) or npm

## Getting started

```bash
pnpm install
pnpm dev
```

Open the URL shown in the terminal (default Vite port).

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Start the development server         |
| `pnpm build`   | Type-check and production build      |
| `pnpm preview` | Serve the production build locally   |

## Configuration

Copy the example env file and set your public site URL (used in canonical links, Open Graph, sitemap, and structured data):

```bash
cp .env.example .env
```

| Variable         | Description                                      |
| ---------------- | ------------------------------------------------ |
| `VITE_SITE_URL`  | Public origin, no trailing slash (e.g. `https://tu-dominio.com`) |

If unset, the build falls back to `https://example.com`.

Place a 1200×630 PNG at `public/og.png` for social previews (referenced in `index.html`).

## Project structure

```
├── index.html          # App shell, SEO meta, FAQ content
├── public/og.png       # Open Graph / Twitter image
├── src/
│   ├── main.ts         # Form wiring, preview, downloads
│   ├── qr.ts           # Payload builders and QR rendering
│   └── style.css       # Layout and theme
└── vite.config.ts      # Build config + robots/sitemap plugin
```

## Tech stack

- [Vite](https://vitejs.dev/) 6
- TypeScript
- [`qrcode`](https://www.npmjs.com/package/qrcode)

## Contributing

Issues and pull requests are welcome. Please keep changes focused and match existing code style.

## License

[MIT](LICENSE)
