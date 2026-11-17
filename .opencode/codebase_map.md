# Cartographie — Happy Click

## État et reprise
Astro 7.4.12 statique, Node 22.23.4 local via npm, dépôt public `danhab05/happyclick`, branche `feat/astro-preview`. **Base publique `969d467` confirmée par OpenBot le 17 novembre 2026**, Coolify `enbdelpmy0pbqsspjzvmfr79` finished, 60 URLs HTTPS identiques au build et projet/FAQ vérifiés en navigateur. **Nouvelle DA autour du logo : locale, sans push avant revue OpenBot.** Le webhook de cette branche déploie. Versions antérieures conservées dans Git : `0fc4fb9`, `6dab746`, `cc71f4a`.

Serveur de revue existant `0.0.0.0:4321` (vérifier `ss -ltnp 'sport = :4321'` avant de relancer). `npm run build && npm test && npm run verify -- --base-url http://127.0.0.1:4321`. Pas de navigateur/Playwright par l’exécutant.

## Interface et routes (15 pages locales, édition2026–2027)
- `src/layouts/Layout.astro` : langue, noindex, navigation Accueil/Quiz/Kit/Guides/Projet, footer et deux liens GATE originaux.
- `src/pages/index.astro` : hero bleu ciel avec grand logo officiel, trois thèmes, parcours par publics, édition 2027.
- `src/components/ThemeCards.astro` : liens/counts des thèmes.
- `src/pages/quiz/index.astro` : choix ; `quiz/[theme].astro` : 4 parcours statiques, cartes SSR, feedback accessible sans JS.
- `src/pages/mes-usages.astro` : 11 questions sans score ; `kit/reflexion.astro` : 14 questions ouvertes facultatives.
- `src/pages/kit.astro` : textes source, huit PDF (dont V2/V1/ancienne archive addiction), activités.
- `src/pages/kit/roles/[theme].astro` : trois jeux × six rôles × quatre scènes, aides/débrief/pistes sourcées.
- `src/pages/guides.astro` : deux guides, résumés/chapitres/datation/crédits et textes source.
- `src/components/PdfDocument.astro` : liens ouvrir/télécharger permanents, aperçu natif en details et repli mobile.
- `public/style.css` : système unique bleu ciel/blanc/encre/rouge, Ubuntu locale, composants et états interactifs ; responsive 1100/800/480, focus/reduced-motion/césure. Ancienne feuille remplacée entièrement, sans surcharges héritées.
- `public/assets/` : ressources d’origine ; `previews/` : deux couvertures extraites des guides.
- `public/resources/` : huit PDF historiques inchangés + deux originaux2027 ; `public/robots.txt` : Disallow /.
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
- `scripts/verify.py` : 15routes, 26blocs source, contenu des quiz/questionnaires, navigation/noindex, scripts locaux ciblés, API de réseau/stockage interdites, 10PDF/204pages/hash, ancres/pages PDF, tous assets et variantes slash en HTTP.
- `tasks/verification.md` : rapport généré (60URLs/288références au contrôle local2027) ; `tasks/browser-review.md` : retours visuels réels rapportés, séparés des contrôles automatiques.
- `tasks/public-verification.md` : preuves publiques durables (DNS, TLS, déploiements, verify et navigateur), maintenues manuellement et jamais réécrites par verify.
- `tasks/design-2027.md` : spec DA, couverture, contrastes calculés et limites de revue.
- `tasks/todo.md`, `tasks/lessons.md`, `README.md` : suivi, leçons et reprise.

## Infrastructure et limites
Coolify créé/configuré par OpenBot : projet `yuhz20ol6ogbmzj1pol2r7pz`, application `ezv2qhhub0jjl6cg4zgkp8p8`, branche dédiée, Nixpacks npmci/build, static /dist port80. Dernier déploiement confirmé le 17 novembre 2026 : `enbdelpmy0pbqsspjzvmfr79`, `finished` sur `969d467` (retour OpenBot).

Domaine principal `https://happyclick.danhabib.dev` : A → `72.61.167.104` TTL300 ajouté par OpenBot chez Name.com après connexion Google avec Dan, sans doublon ni retrait d’autres enregistrements. Les quatre NS autoritatifs et les résolveurs 1.1.1.1/8.8.8.8 répondent 72.61.167.104 selon ses contrôles. HTTPS200 sans bypass ; certificat CN/SAN happyclick.danhabib.dev, Let’s Encrypt YR2, 17 novembre 2026–15 février 2027. Verify public de la base 969d467 : 60URLs200 identiques build/288références ; navigateur accueil noindex et quiz comportements sélection/feedback OK. Domaine alternatif déjà validé : `https://happyclick.app.danhabib.dev`.

Historique DNS, noms des NS, preuves TLS et déploiement précédent : `tasks/public-verification.md`. Aucun appel d’infrastructure par l’exécutant ; ces résultats sont ceux du superviseur.

Aucun compte/backend/formulaire envoyé/analytics/persistance. Les conseils/cartes ambigus sont attribués au support et nuancés ; guides de2021 explicitement datés. Revue des versions précédentes approuvée par OpenBot, non transposable à la refonte locale : voir `tasks/browser-review.md` pour les mesures 320/1920 px, focus initial et questionnaires. Complément : quiz santé public avec feedback OK ; parcours `/quiz/tout` local terminé, 29 résumés, premier choix multiple et aucun débordement à 1920 px. Ne pas extrapoler au-delà de ce périmètre ; infrastructure et DNS restent supervisés par OpenBot. Tout commit inclut le trailer OpenBot demandé.


## Nouveautés GATE2027 intégrées à la base publiée 969d467

- `src/pages/projet-2027.astro`, `faq.astro` : édition, équipe confirmée sans contacts, FAQ pratique, liens aux activités ; aucun JS nouveau.
- `src/components/AddictionDocuments.astro` : V2 par défaut, variante V1 et archive2025–2026, previews/téléchargements dans kit et jeu.
- `src/data/roles.json` : addiction V2 de24pages, six rôles/quatre tours/douze questions ; références8–11/12–15/16–19/20–23, sources24. Autres jeux inchangés.
- `public/resources/kit/2027/` : deux PDF originaux de24pages ; `public/assets/2027/` : quatre dérivés du vrai PNG sans fond, utilisés dans marque/favicon/édition.
- `scripts/prepare-gate-assets.py` : métadonnées PNG retirées, dérivés sans redessin, copie des deux PDF et inventaire SHA-256. Pillow seulement pour préparation, pas pour build.
- `scripts/compare-gate-archives.py` : comparaison des95pages et16JPEG incorporés des cartes. Originaux requis hors dépôt `/tmp/happyclick-gate-2027`.
- `tests/gate-2027.test.mjs` : quatre tests supplémentaires ; total14tests avec la suite précédente.
- `tasks/gate-2027.md` : bilan/provenance/limites ; `gate-2027-assets.json`, `gate-2027-archives.json`, `gate-2027-onepager.json` : empreintes et couverture ; `gate-2027-text/` : textes complets V1/V2.
- Revue OpenBot locale : accueil1920 logos/rendu bon ; projet320 sans débordement ; FAQ lien/ouverture des rôles OK ; addiction mobile référencesV2 et troisPDF présents.

Nouveautés GATE publiées sur 969d467, selon confirmation OpenBot. La nouvelle refonte graphique est distincte : elle reste locale et attend sa revue. Aucun changement de données, PDF, PNG ni scripts applicatifs pendant la refonte. Conserver les preuves publiques durables et ne pas leur attribuer une validation du nouveau rendu.
