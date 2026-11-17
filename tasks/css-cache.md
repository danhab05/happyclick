# Correction du cache CSS — après dcb3136

## Cause et preuve publique transmise

OpenBot confirme Coolify `ib2ibihlxhvxqcz9fk3wm1r3` finished sur `dcb3136`, puis verify public HTTPS : 60 URLs / 288 références identiques au build, exit0. Son navigateur persistant affiche cependant les anciennes couleurs ivoire et la police Click Cheese avec les nouveaux textes HTML : `/style.css` garde une URL stable et peut donc rester dans le cache client.

La revue locale de la DA reste valable. Le défaut concerne la livraison/cache des styles, pas les règles graphiques. Un contrôle HTTP sans cache ne démontre pas le résultat dans un navigateur ayant déjà visité le site.

## Correction livrée

- Déplacement exact de `public/style.css` vers `src/styles/site.css`, sans modifier un octet de CSS. SHA-256 avant/après : `e44d02f7c501f9a4ff291b808c6987d27a2caae823fd7f8ec78f6fbb592a65b2`.
- Import dans `src/layouts/Layout.astro` ; suppression du lien explicite `/style.css`.
- `build.inlineStylesheets: 'never'` dans Astro : fichier CSS externe produit par le pipeline, avec hash de contenu. URL observée sur les 15 pages : **`/_astro/Layout.CMnZyUAi.css`**. Aucun timestamp ni paramètre aléatoire.
- Les références de police restent locales et absolues sous `/assets/fonts`. Ni images, ni fonts, ni données, ni logique applicative, ni dépendances modifiées.
- `/style.css` n’est plus émis dans `dist`. Le manifeste historique reste intact ; son entrée CSS est contrôlée par SHA-256 dans `source-snapshot/style.css`, où la source est archivée. Les 17 autres ressources historiques et les ressources 2027 restent contrôlées dans le build. Aucune compatibilité active n’exige de garder l’ancienne URL.

## Contrôles renforcés

`verify.py` collecte les feuilles réellement liées par **chaque page**. Il exige une URL locale Astro hashée, refuse une feuille inline/non auditée et les imports CSS indirects, contrôle leurs références locales et compare chaque fichier actif au build par HTTP 200 avec MIME `text/css`. Les contrôles préexistants restent en place : contenus, noindex, ancres, JS ciblé, absence de réseau/stockage applicatif, PDF et hashes.

Deux tests supplémentaires dans `tests/styles.test.mjs` :

1. Les 15 pages générées utilisent des feuilles externes hashées, présentes sur disque ; aucun `/style.css` émis.
2. Trois builds Astro isolés démontrent qu’une CSS identique garde la même URL et qu’un changement de contenu change cette URL. Fixtures temporaires sous `.astro` (ignoré) pour respecter le répertoire de sortie Astro ; suppression après test, sans changer la source ni le build de revue.

## Résultats locaux

- `npm run build` : **15 pages**, succès.
- `npm test` : **16/16**, dont les 14 tests pédagogiques et les deux régressions CSS.
- `npm run verify -- --base-url http://127.0.0.1:4321` : **60 URLs HTTP 200 identiques au build / 288 références**, succès ; l’URL hashée remplace `/style.css` dans ce total.
- Données, scripts/lib applicatifs, assets/PDF et fichiers package identiques à dcb3136 ; CSS déplacée sans altération. 29 questions / 116 choix, 3 jeux, 10 PDF / 204 pages conservés.
- `git diff --check` sans erreur. Serveur de revue existant réutilisé.

Commit avec trailer OpenBot et push de `feat/astro-preview` explicitement autorisés. Aucun appel d’infrastructure, navigateur, Playwright, purge de cache ou nouvelle refonte par l’exécutant. **OpenBot doit encore confirmer le nouveau déploiement et le rendu dans son navigateur persistant** ; aucune réussite publique du correctif n’est anticipée ici.
