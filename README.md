# Happy Click — préversion pédagogique Astro

Interface construite autour du logo officiel 2027 : bleu ciel, blanc, encre sombre et rouge, typographie locale Ubuntu, grand logo à l’accueil, cartes et contrôles communs aux **15 pages**. Les 29 questions, 116 choix, trois jeux de rôles, questionnaires et dix PDF restent intacts. La DA précédente est récupérable au commit `969d467` ; l’ancienne reproduction au commit `cc71f4a98d650bbc915b92eb463feefaa51a807e`.

**Refonte 259697a approuvée par OpenBot ; publication de la préversion autorisée.** Déploiement dcb3136 confirmé terminé par OpenBot, puis anomalie de cache CSS constatée en navigateur persistant. Correction par CSS hashée en cours de livraison ; recontrôle public attendu. Elle est disponible sur le serveur de revue `0.0.0.0:4321`. Spécification, couverture et preuves : [tasks/design-2027.md](tasks/design-2027.md).

**Base publique confirmée par OpenBot le 17 novembre 2026 :** [happyclick.danhabib.dev](https://happyclick.danhabib.dev), commit `969d467`, déploiement Coolify `enbdelpmy0pbqsspjzvmfr79` terminé, 60 URLs HTTPS identiques au build, projet et FAQ vérifiés en navigateur. Dépôt public : [danhab05/happyclick](https://github.com/danhab05/happyclick). La validation de cette base ne valide pas le nouveau rendu local.

## Édition Happy Click 2027

Logo officiel PNG, projet/FAQ, équipe confirmée sans contacts, supports addiction V2/V1 de 24 pages. V2 par défaut, V1 variante photographique et archive précédente de 28 pages ; six rôles, quatre tours et douze questions conservés.

Rapport de provenance : [tasks/gate-2027.md](tasks/gate-2027.md), hashes : `tasks/gate-2027-assets.json`, comparaison des six archives : `tasks/gate-2027-archives.json`. Documents de gestion, contacts, finances, portraits et liens Drive privés ne sont pas publiés.

## Reprendre et vérifier

```bash
cd /root/happyclick
git switch feat/astro-preview
npm ci
npm run build
npm test
ss -ltnp 'sport = :4321'
# Seulement si aucun serveur n’écoute déjà :
npm run preview
# Dans un autre terminal, avec le serveur lancé :
npm run verify -- --base-url http://127.0.0.1:4321
```

Serveur local : `0.0.0.0:4321`, soit `http://localhost:4321`. Depuis le réseau, `http://148.113.237.197:4321` si accessible. `npm run dev` sert à travailler avec rechargement. Les routes acceptent les formes avec et sans slash (`trailingSlash: ignore`). Ne pas démarrer un second serveur sur un autre port si 4321 est occupé.

Node >=22.12 pour l’installation ; les scripts npm utilisent Node 22.23.4 local, verrouillé avec Astro 7.4.12. Python 3 et `pdfinfo` pour verify. Les tests Node utilisent LinkeDOM, sans navigateur. Pour reproduire les extractions seulement : `pdftotext`, `pdftoppm`, `tesseract` et les langues fra/eng, puis `OMP_THREAD_LIMIT=1 python3 scripts/extract-pdfs.py`.

## Parcours disponibles

| Route | Contenu |
|---|---|
| `/` | Accueil, thèmes, parcours enfants/familles/animateurs |
| `/quiz` | Choix des thèmes et du parcours complet |
| `/quiz/comportements` | 10 questions |
| `/quiz/sante` | 8 questions |
| `/quiz/ecologie` | 11 questions |
| `/quiz/tout` | Les 29 cartes, 116 propositions |
| `/mes-usages` | 11 questions, restitution descriptive sans diagnostic |
| `/kit` | Textes d’origine et 8 PDF ; V2/V1/ancienne archive addiction, autres activités conservées |
| `/kit/reflexion` | 14 questions enseignants, notes temporaires |
| `/kit/roles/addiction` | Écrans et équilibre : 6 rôles, 4 scènes |
| `/kit/roles/cyberharcelement` | 6 rôles, 4 scènes |
| `/kit/roles/desinformation` | 6 rôles, 4 scènes |
| `/projet-2027` | Mission, édition2026–2027, équipe et transmission entre promotions |
| `/faq` | Préparer une séance, choisir les versions, utiliser les activités |
| `/guides` | Étude parents (9 pages), guide jeunes (52 pages), résumés datés et crédits |

Les quiz comportent choix multiples, validation, progression, retour, explications, pistes de discussion, nuances, références recto/verso, bilan et rejouer. Sans JavaScript, les cartes et leurs corrigés restent lisibles. Les activités gardent l’esprit de débat ; aucun classement ni barème de diagnostic.

Les 8 PDF d’origine sont inchangés ; les deux nouveaux PDF addiction2027 ajoutent V2 par défaut et V1 variante. Les liens ouvrir/télécharger sont toujours visibles ; les aperçus natifs s’ouvrent dans un volet. Les deux liens externes GATE sont conservés au pied de page et tous les textes de présentation d’origine sont présents, parfois dans un volet explicitement titré.

## Confidentialité et accessibilité

- `noindex, nofollow` sur les 15 pages, `robots.txt` avec `Disallow: /`.
- JavaScript ciblé sur les quiz et questionnaires seulement, modules locaux cacheables. Aucun compte, backend, analytics, appel réseau applicatif ni API de stockage.
- Les choix et notes vivent uniquement dans la page ; remise à zéro et nettoyage à sa sortie. Aucun prénom ou renseignement d’identification demandé, aucun envoi de formulaire.
- Navigation clavier, contrôles natifs, labels/fieldset, erreurs annoncées, focus après changement d’étape, reduced-motion, mise en page responsive et titres longs pouvant revenir à la ligne.
- Statistiques attribuées et datées de 2021. Les formulations ambiguës ou non étayées des cartes sont signalées ; elles ne sont pas élevées au rang de faits universels ou de conseils médicaux/juridiques actuels.

## Preuves et limites

- `tasks/design-2027.md` : nouvelle DA, couverture des composants, contrastes calculés, analyse responsive et checklist de revue.
- `tasks/verification.md` : rapport régénéré par verify ; 60 URLs HTTP 200 identiques au build, 288 références, 26 blocs source, toutes les questions, 10 PDF / 204 pages et empreintes.
- `tasks/public-verification.md` : preuves publiques durables, maintenues manuellement et jamais réécrites par verify.
- `tasks/browser-review.md` : retours réels du superviseur, séparés par version. La revue de 259697a est approuvée ; périmètre exact et limites consignés.
- `tasks/pdf-analysis.md`, `tasks/quiz-source-map.md` : analyse des huit PDF historiques / 156 pages et correspondance des 29 cartes. `tasks/pdf-text/` contient les extractions/OCR ; rendus temporaires dans `tasks/pdf-images/`, ignorés par Git.
- `source-snapshot/` : HTML/CSS originaux non servis, inventaire et hashes ; les ressources historiques restent disponibles même lorsqu’elles ne sont plus utilisées visuellement.
- `tasks/todo.md`, `tasks/lessons.md`, `.opencode/codebase_map.md` : suivi et reprise.

Build : **15 pages**. Tests : **16/16**, dont deux tests de versionnement CSS, ainsi que progression complète des quatre parcours, choix multiples, feedback, bilan/rejouer et restitution/effacement des questionnaires. Aucun navigateur/Playwright lancé par l’exécutant ; les calculs de contraste et l’analyse des règles CSS ne remplacent pas une mesure du rendu à 320–1920 px.

## Infrastructure transmise par OpenBot

| Paramètre | Valeur |
|---|---|
| Coolify | https://deploy.danhabib.dev |
| Projet | `yuhz20ol6ogbmzj1pol2r7pz` |
| Application | `ezv2qhhub0jjl6cg4zgkp8p8` |
| Branche | `feat/astro-preview` — webhook de déploiement |
| Build | Nixpacks : `npm ci` puis `npm run build` |
| Service | Statique, `/dist`, port `80` |
| Dernier déploiement confirmé | `ib2ibihlxhvxqcz9fk3wm1r3` : `finished`, commit `dcb3136` |
| Domaine principal | `https://happyclick.danhabib.dev` |
| Domaine alternatif | `https://happyclick.app.danhabib.dev` |

DNS et HTTPS ont été configurés et vérifiés par OpenBot. Les détails datés (A, TTL, résolveurs, certificat et déploiements précédents) restent dans [tasks/public-verification.md](tasks/public-verification.md). Aucun appel d’infrastructure ni changement DNS par l’exécutant. Après revue approuvée de 259697a, le push de cette branche avec les preuves documentaires est autorisé. OpenBot suit Coolify ; ne pas confondre approbation visuelle et déploiement terminé.

## Cache des styles

La feuille canonique est `src/styles/site.css`, importée par `Layout.astro`. Astro produit un fichier externe avec hash de contenu (`/_astro/Layout.CMnZyUAi.css` au build de cette correction) : même contenu, même URL ; CSS modifiée, nouvelle URL. L’ancien `/style.css` n’est plus émis. Les ressources CSS restent locales sous `/assets`.

Le manifeste historique est préservé : sa CSS est contrôlée dans `source-snapshot/style.css`, ses autres ressources restent vérifiées dans le build. Verify inspecte chaque CSS actif sur les 15 pages, son nom hashé, ses ressources, son MIME et ses octets HTTP. Deux tests ciblés couvrent le chargement et le changement réel du hash. Détails, cause et preuves : `tasks/css-cache.md`. Aucune nouvelle refonte ni configuration d’infrastructure.
