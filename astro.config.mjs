import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
  server: { host: '0.0.0.0', port: 4321 },
  devToolbar: { enabled: false },
  // Keep activity modules in local cacheable files, independently audited over HTTP.
  vite: { build: { assetsInlineLimit: 0 } },
});
