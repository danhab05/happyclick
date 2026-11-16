# Happy Click — préversion Astro

Reconstruction statique des pages publiques https://happy-click.fr/, /kit et /guides. Textes et direction artistique conservés : ciel orageux/bleu, cœur-curseur, ClickChesse, Josefin Sans et Ubuntu. Les 8 PDF et toutes les ressources chargées sont locaux.

## Reprendre

```bash
cd /root/happyclick
git switch feat/astro-preview
npm ci
npm run build
npm run preview
```

Le serveur écoute sur `0.0.0.0:4321` ; ouvrir `http://localhost:4321` (ou `http://148.113.237.197:4321` depuis le réseau si accessible). Routes `/`, `/kit`, `/kit/`, `/guides`, `/guides/` (`trailingSlash: 'ignore'`). Vérifier si le port 4321 est déjà occupé avant de relancer le serveur. Pour travailler en mode rechargement : `npm run dev`.

Vérification avec le serveur lancé :

```bash
npm run verify -- --base-url http://127.0.0.1:4321
```

Node >=22.12 pour installer ; les commandes npm utilisent le runtime Node 22.23.4 local verrouillé, requis par Astro 7.4.12. Python 3 et `pdfinfo` (poppler-utils) pour les vérifications. Le build seul requiert Node/npm. Dépendances verrouillées par package-lock.json.

## Périmètre

- HTML Astro statique, aucun JavaScript côté client, formulaire, analytics ou envoi.
- `noindex, nofollow` sur les trois pages et `robots.txt` avec `Disallow: /`.
- Trois liens internes et deux liens externes GATE conservés.
- Liens ouvrir/télécharger et repli pour les appareils sans aperçu PDF intégré.
- Header dans le flux et navigation repliable sur petits écrans, largeur des PDF bornée, animation désactivée si réduction des mouvements demandée.
- Site original inchangé. La nouvelle préversion est raccordée à Coolify par le superviseur ; aucun changement d’infrastructure effectué par cet exécutant.

## Traçabilité

- `source-snapshot/` : HTML/CSS originaux, jamais servis ; ils contiennent les commentaires et la référence de script cassée du site source comme preuve. Le script n’est pas repris dans la préversion.
- `source-snapshot/assets.json` : URL, taille et SHA-256 des ressources téléchargées. La feuille locale `public/style.css` est adaptée ; les autres fichiers restent identiques octet pour octet.
- `scripts/collect-assets.py` : collecte via curl ; la feuille originale est conservée dans le snapshot, sans écraser la feuille adaptée.
- `tasks/todo.md`, `tasks/verification.md` : suivi et preuves reproductibles.
- `.opencode/codebase_map.md` : cartographie pour reprise.

La validation responsive automatisée est une analyse des règles et dimensions CSS, pas une mesure par navigateur. OpenBot a effectué la revue navigateur : accueil desktop très fidèle ; accueil et kit mobile sans débordement de navigation ni de titres ; guides desktop avec PDF visibles et contenu correct. Il a aussi relancé build et verify avec succès.

## Infrastructure de la nouvelle préversion

Informations transmises par OpenBot (déploiement en cours sous sa supervision, disponibilité publique et HTTPS non encore confirmés) :

| Paramètre | Valeur |
|---|---|
| Coolify | https://deploy.danhabib.dev |
| Projet | `yuhz20ol6ogbmzj1pol2r7pz` |
| Application | `ezv2qhhub0jjl6cg4zgkp8p8` |
| Branche | `feat/astro-preview` |
| Build | Nixpacks : `npm ci` puis `npm run build` |
| Service | Statique, répertoire `/dist`, port `80` |
| Domaine initial | `happyclick.danhabib.dev` : NXDOMAIN constaté par OpenBot |
| Domaine alternatif ajouté | `happyclick.app.danhabib.dev` : résout vers `72.61.167.104` selon OpenBot |

Aucun DNS modifié. Le domaine alternatif utilise la résolution existante ; cela ne prouve pas que le site ou HTTPS soit opérationnel. Le superviseur suit le déploiement et vérifiera l’accès et le certificat. Les pushes sur la branche raccordée peuvent déclencher le webhook Coolify ; ne pas lancer de déploiement supplémentaire ni modifier l’infrastructure sans instruction.
