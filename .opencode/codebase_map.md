# Cartographie — Happy Click

## Projet
Préversion Astro 7.4.12 statique, branche `feat/astro-preview`, dépôt privé `danhab05/happyclick`. Node 22.23.4 fourni en dépendance de développement locale : les scripts npm l’utilisent sans modifier Node global. Nouvelle préversion raccordée à Coolify par OpenBot : projet `yuhz20ol6ogbmzj1pol2r7pz`, application `ezv2qhhub0jjl6cg4zgkp8p8`, branche `feat/astro-preview`. Déploiement en cours supervisé par OpenBot ; accès public et HTTPS non confirmés. Nixpacks `npm ci` / `npm run build`, statique `/dist`, port 80. Domaines : `happyclick.danhabib.dev` NXDOMAIN ; `happyclick.app.danhabib.dev` ajouté, résout 72.61.167.104 selon OpenBot. Aucun DNS modifié. Voir README pour reprise infrastructure.

## Entrées
- `src/pages/index.astro` : accueil, logo animé et slogan source.
- `src/pages/kit.astro` : textes source et 6 documents.
- `src/pages/guides.astro` : textes source et 2 documents.
- `src/layouts/Layout.astro` : head noindex/nofollow, navigation (3 internes, 2 GATE externes), footer.
- `src/components/PdfDocument.astro` : aperçu natif, liens ouvrir/télécharger, repli sans plugin PDF.
- `public/style.css` : CSS source localisé + adaptations responsive/accessibilité. Desktop >1100 px proche source ; header dans le flux ≤1100 px ; mise en page mobile ≤600 px.
- `public/assets/` : images, icônes et polices originales.
- `public/resources/` : 8 PDF binaires inchangés.
- `public/robots.txt` : Disallow /.

## Preuves et outils
- `source-snapshot/{index,kit,guides}.html`, `style.css` : relevé curl source, non servi.
- `source-snapshot/assets.json` : 18 ressources, URL/taille/SHA-256 d’origine (CSS adaptée dans public).
- `scripts/collect-assets.py` : téléchargement curl des références actives ; conserve le CSS original dans source-snapshot.
- `scripts/verify.py` : textes, navigation, indexation, absence de scripts/formulaires, fichiers/hash/PDF, HTTP optionnel (incluant /kit/ et /guides/ sans redirection), rapport responsive calculé.
- `tasks/todo.md` : tâches et review ; `tasks/verification.md` : preuves générées ; `tasks/lessons.md` : leçons de la revue (slash final et distinction DNS/disponibilité).
- `README.md` : reprise et limites de validation.

## Commandes
`npm ci` → `npm run build` → `npm run preview` (0.0.0.0:4321).
`npm run verify -- --base-url http://127.0.0.1:4321` ; `npm audit`.
Serveur de revue déjà présent sur 4321 à la livraison. Vérifier `ss -ltnp 'sport = :4321'` avant de relancer pour éviter un second serveur sur un autre port.

## Limites
Les largeurs 320–1920 px du rapport sont déduites du CSS. Revue navigateur effectuée par OpenBot : accueil desktop très fidèle ; accueil/kit mobile sans débordement de navigation ni de titres ; guides desktop avec PDF visibles et contenu correct. Build et verify confirmés par OpenBot. Aucun navigateur utilisé par cet exécutant. La source comporte des coquilles conservées volontairement. Aucun formulaire inventé ; questionnaires = PDF uniquement.

## Routage
`astro.config.mjs` utilise `trailingSlash: ignore` : /kit et /kit/, /guides et /guides/ doivent tous répondre 200 en preview. Redémarrer le serveur local après un changement de configuration Astro.
