import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  server: { host: '0.0.0.0', port: 4321 },
  devToolbar: { enabled: false },
});
