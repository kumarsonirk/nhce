import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to automatically prepend the base path to absolute image paths in JS/TS/JSX/TSX files
function imageBasePrefixPlugin(basePath: string) {
  const baseClean = basePath.replace(/^\/|\/$/g, ''); // e.g. "react"
  const extensions = 'png|jpg|jpeg|svg|webp|gif|PNG|JPG|JPEG|SVG|WEBP|GIF';
  
  return {
    name: 'vite-plugin-image-base-prefix',
    transform(code: string, id: string) {
      // Only process source files under src/
      if (!id.includes('/src/')) return null;
      if (!/\.(js|ts|jsx|tsx)$/.test(id)) return null;

      let modified = code;
      
      // Replace double-quoted absolute paths (e.g. "/main_logo.png" -> "/react/main_logo.png")
      const doubleQuoteRegex = new RegExp(`"\\/((?!${baseClean}\\/)[^"]+\\.(?:${extensions}))"`, 'g');
      modified = modified.replace(doubleQuoteRegex, `"${basePath}$1"`);

      // Replace single-quoted absolute paths (e.g. '/main_logo.png' -> '/react/main_logo.png')
      const singleQuoteRegex = new RegExp(`'\\/((?!${baseClean}\\/)[^']+\\.(?:${extensions}))'`, 'g');
      modified = modified.replace(singleQuoteRegex, `'${basePath}$1'`);

      return {
        code: modified,
        map: null
      };
    }
  };
}

// Vercel sets VERCEL=1 automatically during its build step — no manual env var needed.
// On Vercel the app is served at the domain root; everywhere else (e.g. reverse-proxied
// under the main NHCE site) it's served under the /react subpath.
const isVercel = !!process.env.VERCEL;
const BASE_PATH = isVercel ? '/' : '/react/';
const BASENAME = isVercel ? '/' : '/react';

export default defineConfig({
  plugins: [
    react(),
    imageBasePrefixPlugin(BASE_PATH)
  ],
  base: BASE_PATH,
  define: {
    __APP_BASENAME__: JSON.stringify(BASENAME),
  }
})
