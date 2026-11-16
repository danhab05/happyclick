# Cartographie — Happy Click

## État et reprise
Astro 7.4.12 statique, Node 22.23.4 local via npm, dépôt privé `danhab05/happyclick`, branche `feat/astro-preview`. **Revue finale approuvée ; push explicitement autorisé par OpenBot pour cette seule préversion** : cette branche est raccordée au webhook Coolify. Commit d’implémentation `0fc4fb9bc985be9c1952e3ec395bcc4355cb23f3` conservé, documentation ajoutée dans un commit suivant. Ancienne DA au commit `cc71f4a98d650bbc915b92eb463feefaa51a807e`.

Serveur de revue existant `0.0.0.0:4321` (vérifier `ss -ltnp 'sport = :4321'` avant de relancer). `npm run build && npm test && npm run verify -- --base-url http://127.0.0.1:4321`. Pas de navigateur/Playwright par l’exécutant.

## Interface et routes (13 pages)
- `src/layouts/Layout.astro` : langue, noindex, navigation Accueil/Quiz/Kit/Guides, footer et deux liens GATE originaux.
- `src/pages/index.astro` : accueil éditorial, trois thèmes, parcours par publics.
- `src/components/ThemeCards.astro` : liens/counts des thèmes.
- `src/pages/quiz/index.astro` : choix ; `quiz/[theme].astro` : 4 parcours statiques, cartes SSR, feedback accessible sans JS.
- `src/pages/mes-usages.astro` : 11 questions sans score ; `kit/reflexion.astro` : 14 questions ouvertes facultatives.
- `src/pages/kit.astro` : textes source, six PDF, activités.
- `src/pages/kit/roles/[theme].astro` : trois jeux × six rôles × quatre scènes, aides/débrief/pistes sourcées.
- `src/pages/guides.astro` : deux guides, résumés/chapitres/datation/crédits et textes source.
- `src/components/PdfDocument.astro` : liens ouvrir/télécharger permanents, aperçu natif en details et repli mobile.
- `public/style.css` : DA ivoire/marine/corail/turquoise, polices locales, responsive 1100/800/480, focus/reduced-motion/césure des longs titres.
- `public/assets/` : ressources d’origine ; `previews/` : deux couvertures extraites des guides.
- `public/resources/` : huit PDF binaires inchangés ; `public/robots.txt` : Disallow /.
- `astro.config.mjs` : static, slash ignore, host0.0.0.0 port4321, modules JS émis en fichiers (assetsInlineLimit0).

## Données et interactions
- `src/data/quiz.json` : 29 questions exactes, 116 choix, clés des réponses du document, feedback/nuance/discussion, pages et quadrants recto/verso. 10 comportements / 8 santé / 11 écologie.
- `src/data/usage.json` : 11 questions et options, choix multiples/exclusifs, pages.
- `src/data/teachers.json` : 14 questions, sections et pages.
- `src/data/roles.json` : trois jeux, six rôles chacun, quatre scènes, aides, questions, pistes et références. Débriefs 12/12/7 ; absences de corrigé explicites.
- `src/data/source-copy.json` : textes de présentation source kit/guides.
- `src/lib/quiz-state.mjs` : progression, validation, retour, remise à zéro, comparaison sans note.
- `src/scripts/quiz.mjs` : amélioration progressive DOM, focus, bilan, rejouer et nettoyage pagehide.
- `src/lib/reflection.mjs` / `src/scripts/reflection.mjs` : exclusivité des choix, restitution descriptive, notes textContent, effacement. Aucun réseau/stockage ; pas de diagnostic.

## Analyse et preuves
- `source-snapshot/` : HTML/CSS curl source, non servi ; `assets.json` inventorie 18 ressources et SHA-256 (CSS adaptée, 17 autres originales inchangées).
- `scripts/collect-assets.py` : collecte d’origine, ne pas relancer pour une modification d’interface.
- `scripts/extract-pdfs.py` : pdftotext intégral, OCR des pages <260 caractères (tesseract fra+eng, pdftoppm180dpi). Reprise : `OMP_THREAD_LIMIT=1 python3 scripts/extract-pdfs.py`.
- `tasks/pdf-text/` : textes/OCR/inventaire par page versionnés. `tasks/pdf-images/` : ~12 Mo de rendus locaux ignorés par Git, disponibles au superviseur.
- `tasks/pdf-analysis.md` : couverture156pages, synthèse des8PDF et ambiguïtés ; `tasks/quiz-source-map.md` : matrice29cartes.
- `tests/activities.test.mjs` : 10tests Node/LinkeDOM, aucune utilisation de navigateur ; build préalable nécessaire.
- `scripts/verify.py` : 13routes, 26blocs source, contenu des quiz/questionnaires, navigation/noindex, scripts locaux ciblés, API de réseau/stockage interdites, 8PDF/156pages/hash, ancres/pages PDF, tous assets et variantes slash en HTTP.
- `tasks/verification.md` : rapport généré (50URLs/276références au dernier contrôle) ; `tasks/browser-review.md` : retours visuels réels rapportés, séparés des contrôles automatiques.
- `tasks/todo.md`, `tasks/lessons.md`, `README.md` : suivi, leçons et reprise.

## Infrastructure et limites
Coolify créé/configuré par OpenBot : projet `yuhz20ol6ogbmzj1pol2r7pz`, application `ezv2qhhub0jjl6cg4zgkp8p8`, branche dédiée, Nixpacks npmci/build, static /dist port80. Domaines et disponibilité : voir README ; aucune confirmation HTTPS ni action d’infrastructure par l’exécutant.

Aucun compte/backend/formulaire envoyé/analytics/persistance. Les conseils/cartes ambigus sont attribués au support et nuancés ; guides de2021 explicitement datés. Revue finale navigateur approuvée par OpenBot : voir `tasks/browser-review.md` pour les mesures 320/1920 px, focus initial et questionnaires. Ne pas extrapoler au-delà de ce périmètre ; déploiement et HTTPS restent supervisés par OpenBot. Tout commit inclut le trailer OpenBot demandé.
