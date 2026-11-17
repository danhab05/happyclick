import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, mkdtempSync, mkdirSync, writeFileSync, symlinkSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import { build } from 'astro';
import config from '../astro.config.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const cssLinks = html => [...parseHTML(html).document.querySelectorAll('link[rel="stylesheet"]')].map(link => link.getAttribute('href'));
const hashedCSS = /^\/_astro\/[^/]+\.[\w-]{8,}\.css$/;

test('all 15 built pages use external content-hashed CSS, never the stale /style.css URL', () => {
  const pages = readdirSync(join(root, 'dist'), { recursive: true }).filter(file => file.endsWith('index.html'));
  assert.equal(pages.length, 15);
  for (const file of pages) {
    const html = readFileSync(join(root, 'dist', file), 'utf8');
    const links = cssLinks(html);
    assert.ok(links.length, file);
    assert.equal(parseHTML(html).document.querySelectorAll('style').length, 0, file);
    for (const href of links) {
      assert.match(href, hashedCSS, file);
      assert.ok(existsSync(join(root, 'dist', href)), href);
    }
  }
  assert.equal(existsSync(join(root, 'dist/style.css')), false);
});

test('Astro CSS URL stays stable for identical content and changes when the stylesheet changes', async () => {
  // Isolated build fixture: never modify the real CSS or the running preview build.
  // Astro requires build output under cwd; .astro is ignored and the fixture is removed.
  mkdirSync(join(root, '.astro'), { recursive: true });
  const fixture = mkdtempSync(join(root, '.astro/css-cache-test-'));
  try {
    mkdirSync(join(fixture, 'src/pages'), { recursive: true });
    mkdirSync(join(fixture, 'src/styles'), { recursive: true });
    mkdirSync(join(fixture, 'public/assets/fonts'), { recursive: true });
    symlinkSync(join(root, 'node_modules'), join(fixture, 'node_modules'), 'dir');
    writeFileSync(join(fixture, 'package.json'), '{"type":"module"}');
    writeFileSync(join(fixture, 'public/assets/fonts/ubuntu-latin-400-normal.woff2'), readFileSync(join(root, 'public/assets/fonts/ubuntu-latin-400-normal.woff2')));
    writeFileSync(join(fixture, 'src/pages/index.astro'), '---\nimport "../styles/site.css";\n---\n<html><head><title>CSS cache test</title></head><body>Test</body></html>');
    const stylesheet = readFileSync(join(root, 'src/styles/site.css'), 'utf8');
    const run = async css => {
      writeFileSync(join(fixture, 'src/styles/site.css'), css);
      await build({ ...config, root: fixture, cacheDir: join(fixture, '.astro'), vite: { ...config.vite, cacheDir: join(fixture, '.vite') }, configFile: false, logLevel: 'silent' });
      const [href] = cssLinks(readFileSync(join(fixture, 'dist/index.html'), 'utf8'));
      assert.match(href, hashedCSS);
      return href;
    };
    const first = await run(stylesheet);
    assert.equal(await run(stylesheet), first, 'No timestamp or random cache key');
    assert.notEqual(await run(stylesheet + '\n:root { --cache-regression-probe: 1; }\n'), first, 'Changed CSS must bypass a cached previous URL');
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
