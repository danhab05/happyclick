# Happy Click — préversion Astro

- [x] Relever /, /kit, /guides et style.css, inventorier les ressources publiques.
- [x] Télécharger images, polices et les huit PDF ; conserver les preuves source.
- [x] Reproduire textes et structure en Astro statique ; corriger le responsive.
- [x] Bloquer l’indexation ; aucun formulaire, analytics ou envoi.
- [x] Vérifier build, URLs, ressources, liens PDF et règles mobile/desktop.
- [x] Rendre la préversion disponible sur 0.0.0.0:4321 pour la revue OpenBot.
- [x] Vérifier/créer le dépôt GitHub privé danhab05/happyclick.
- [ ] Committer et pousser feat/astro-preview, vérifier la concordance du hash distant.

## Review
- Build Astro 7.4.12 : 3 pages statiques générées ; runtime Node 22.23.4 local au projet.
- `npm audit` : 0 vulnérabilité après mise à jour d’Astro et des dépendances.
- `npm run verify -- --base-url http://127.0.0.1:4321` : 22 URLs HTTP 200, réponses identiques au build.
- Tous les textes actifs source conservés ; 5 liens de navigation identiques sur chaque page.
- 8 PDF valides via pdfinfo, SHA-256 identiques aux originaux ; liens ouvrir et télécharger disponibles sur mobile.
- 18 ressources source inventoriées, aucune ressource distante chargée automatiquement.
- CSS analysé de 320 à 1920 px ; revue navigateur volontairement laissée au superviseur.
- Le serveur sur 4321 a été lancé par le superviseur pendant le travail et sert bien le build final ; le second processus temporaire ouvert par l’exécutant sur 4322 a été arrêté.
- Un rebuild a transitoirement échoué sur un chunk de prérendu absent ; le rebuild complet suivant a réussi, puis toutes les réponses HTTP ont été comparées aux fichiers générés.

## Contraintes et reprise
Aucun déploiement, DNS ou changement du site original. Pas de navigateur externe. Chaque commit porte le trailer OpenBot demandé.

```bash
cd /root/happyclick
git switch feat/astro-preview
npm ci
npm run build
# Seulement si aucun serveur n’écoute déjà sur 4321 :
npm run preview
# Autre terminal :
npm run verify -- --base-url http://127.0.0.1:4321
```

Preuves détaillées : `tasks/verification.md`. Revue visuelle finale mobile/desktop : OpenBot/superviseur.
