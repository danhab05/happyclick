import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parseHTML } from 'linkedom';
const dist = new URL('../dist/', import.meta.url);
const files = readdirSync(dist, { recursive: true }).filter(file => file.endsWith('index.html'));
const documentFor = file => parseHTML(readFileSync(new URL(file, dist), 'utf8')).document;
const destinations = element => [...element.querySelectorAll('a')].map(a => a.getAttribute('href'));

test('all pages provide a native closed mobile menu with the same five destinations and current page as desktop', () => {
  assert.equal(files.length, 15);
  for (const file of files) {
    const doc = documentFor(file);
    const menu = doc.querySelector('header details.mobile-menu');
    assert.ok(menu, file);
    assert.equal(menu.hasAttribute('open'), false);
    assert.equal(menu.firstElementChild.tagName, 'SUMMARY');
    assert.equal(menu.firstElementChild.textContent.trim(), 'Menu');
    const nav = menu.querySelector('nav');
    assert.equal(menu.firstElementChild.getAttribute('aria-controls'), nav.id);
    assert.equal(nav.getAttribute('aria-label'), 'Navigation principale mobile');
    assert.deepEqual(destinations(nav), ['/', '/projet-2027', '/kit', '/guides', '/quiz']);
    assert.deepEqual(destinations(nav), destinations(doc.querySelector('.desktop-navigation')));
    assert.equal(nav.querySelector('[aria-current="page"]').getAttribute('href'), doc.querySelector('.desktop-navigation [aria-current="page"]').getAttribute('href'));
    assert.equal(nav.querySelectorAll('[tabindex="-1"]').length, 0);
  }
});

test('mobile contents and footer disclosures retain every desktop destination without duplicate IDs', () => {
  let contents = 0;
  for (const file of files) {
    const doc = documentFor(file);
    assert.equal(doc.querySelectorAll('footer details.disclosure-mobile').length, 2);
    for (const group of doc.querySelectorAll('.contents, .footer-links')) {
      const details = group.querySelector('details.disclosure-mobile');
      assert.ok(details, file);
      assert.equal(details.hasAttribute('open'), false);
      assert.equal(details.firstElementChild.tagName, 'SUMMARY');
      assert.ok(details.firstElementChild.textContent.trim());
      assert.deepEqual(destinations(details), destinations(group.querySelector('.disclosure-desktop')));
      for (const href of destinations(details).filter(href => href.startsWith('#'))) {
        assert.ok(doc.getElementById(href.slice(1)), `${file} ${href}`);
      }
      if (group.classList.contains('contents')) contents++;
    }
    const ids = [...doc.querySelectorAll('[id]')].map(el => el.id);
    assert.equal(new Set(ids).size, ids.length, file);
  }
  assert.equal(contents, 6);
});
