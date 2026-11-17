# Preuves publiques durables — Happy Click

## Historique DNS / TLS — confirmation initiale du 17 novembre 2026

Compte rendu du superviseur OpenBot, consigné par l’exécutant sans nouveau contrôle réseau, navigateur ou appel d’infrastructure. Ce document est maintenu manuellement : `scripts/verify.py` ne le réécrit pas. Le rapport automatique `tasks/verification.md` peut être régénéré sans perdre ces preuves.

### DNS du domaine principal

- Le superviseur s’est connecté à Name.com via Google avec le compte de Dan.
- Après autorisation de Dan, ajout du seul enregistrement **A `happyclick.danhabib.dev` → `72.61.167.104`, TTL 300 secondes**.
- Aucun doublon ; les autres enregistrements sont restés présents.
- Le 17 novembre 2026, les quatre serveurs autoritatifs `ns1hwy.name.com`, `ns2hjl.name.com`, `ns3qty.name.com`, `ns4cjp.name.com`, ainsi que les résolveurs `1.1.1.1` et `8.8.8.8`, ont tous répondu **`72.61.167.104`**, selon les contrôles d’OpenBot.

### Déploiement et certificat

- Après l’ajout DNS, un certificat présentant un mauvais nom a été constaté sur le domaine principal.
- OpenBot a résolu ce problème par un redéploiement via l’API Coolify de l’application `ezv2qhhub0jjl6cg4zgkp8p8`.
- Déploiement **`1rbbwrx32ragmtnltqbirebp`**, statut **`finished`**, commit **`6dab746a80281eac645146e1b9d6c308d2ac60af`**.
- `curl` sur **`https://happyclick.danhabib.dev`** : **HTTP 200 avec validation TLS, sans bypass**.
- Certificat rapporté : CN/SAN **`happyclick.danhabib.dev`**, émetteur **Let’s Encrypt YR2**, `notBefore` **17 novembre 2026**, `notAfter` **15 février 2027**. Il s’agit du certificat observé lors de ce contrôle, pas d’une garantie au-delà de sa validité.

### Vérification des fichiers et parcours

Commande exécutée par OpenBot :

```bash
npm run verify -- --base-url https://happyclick.danhabib.dev
```

Résultat : **50 URLs HTTP 200 identiques au build, 276 références vérifiées**, incluant accueil, kit, guides, les huit PDF et les assets. Ce résultat est attribué au superviseur ; aucun test public n’a été relancé par l’exécutant pour la présente mise à jour documentaire.

Dans le navigateur sur l’URL HTTPS exacte du domaine principal : accueil accessible, **noindex confirmé**, quiz comportements testé pour **sélection et feedback**. Ce test ne prétend pas refaire l’ensemble des parcours.

## Historique conservé — état remplacé le 17 novembre 2026

Le suivi du commit documentaire `a7a3b4e` indiquait encore un domaine principal NXDOMAIN et un ajout A autorisé mais non effectué, avec accès Name.com à retrouver. Cet état est remplacé par les confirmations DNS/HTTPS du 17 novembre ci-dessus.

Le domaine alternatif `https://happyclick.app.danhabib.dev` avait déjà été confirmé accessible en HTTPS avec certificat valide par OpenBot, après le déploiement `zamd0grrvoe11mumcyfvaycq`, `finished` sur `6dab746`. Le superviseur y avait exécuté verify : **50 URLs HTTP 200 identiques au build / 276 références**, puis joué le quiz santé avec feedback OK. Ces preuves restent distinctes du nouveau contrôle du domaine principal.

Le parcours `/quiz/tout` avait également été terminé en navigateur local : **29 questions, 29 résumés, premier choix multiple, aucun débordement à 1920 px**. Les autres preuves de revue sont conservées dans `tasks/browser-review.md`.

## Historique Git à la finalisation documentaire précédente

À cette étape, le commit déployé était `6dab746` ; `0fc4fb9` et `a7a3b4e` sont conservés dans l’historique local. La présente finalisation documentaire ajoute un commit local avec trailer OpenBot, **sans push**, afin de ne pas déclencher un déploiement documentaire. Aucun code, DNS, service ou certificat modifié par l’exécutant.

## Publication GATE 2027 — confirmation OpenBot du 17 novembre 2026

État le plus récent transmis par le superviseur : dépôt désormais public [danhab05/happyclick](https://github.com/danhab05/happyclick), branche `feat/astro-preview`, commit `969d4670eb9028f308ea5d6e1f037c62841cefaa`. Coolify **`enbdelpmy0pbqsspjzvmfr79` finished** sur ce commit. **60 URLs HTTPS identiques au build** ; projet et FAQ validés en navigateur. Build 15 pages / tests 14 / verify 60 URLs et 288 références également revérifiés par OpenBot avant publication.

La refonte visuelle demandée ensuite par Dan est locale et non poussée. Ces preuves publiques concernent la base 969d467, pas le nouveau rendu. Aucun nouveau contrôle public ni appel d’infrastructure par l’exécutant pour consigner ce retour.

## dcb3136 publié, cache CSS persistant — retour OpenBot

Déploiement Coolify `ib2ibihlxhvxqcz9fk3wm1r3` **finished** sur `dcb3136`. Verify public HTTPS exécuté par OpenBot : **60 URLs / 288 références identiques au build, exit0**. Toutefois, son navigateur persistant a reçu le nouveau HTML avec l’ancien `/style.css` en cache : capture ivoire/Click Cheese et ancien traitement du hero malgré les nouveaux textes. La DA locale validée reste correcte.

Correction autorisée : versionner l’URL CSS par hash de contenu au build. Le contrôle HTTP ne remplace pas le test de navigation avec cache existant. Le recontrôle du navigateur persistant et du nouveau déploiement appartient à OpenBot ; aucun succès de cette correction en public n’est encore affirmé. Voir `tasks/css-cache.md`.
