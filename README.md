# Happy Click — préversion pédagogique Astro

Nouvelle interface papier ivoire, encre marine, corail et turquoise, avec le cœur-curseur Happy Click et les polices locales ClickChesse/Josefin/Ubuntu. Treize pages statiques, quatre parcours de quiz (trois thèmes et l’ensemble), activités locales et documents accessibles sur le même site. L’ancienne interface est récupérable au commit `cc71f4a98d650bbc915b92eb463feefaa51a807e`.

**Revue finale approuvée : OpenBot autorise le push de `feat/astro-preview` pour cette seule préversion Happy Click.** Le webhook peut déclencher le déploiement, supervisé par OpenBot avec HTTPS. Aucun appel d’infrastructure ni changement DNS par cet exécutant. Le commit d’implémentation `0fc4fb9bc985be9c1952e3ec395bcc4355cb23f3` est conservé.

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
| `/kit` | Textes d’origine et 6 PDF ; accès aux activités |
| `/kit/reflexion` | 14 questions enseignants, notes temporaires |
| `/kit/roles/addiction` | Écrans et équilibre : 6 rôles, 4 scènes |
| `/kit/roles/cyberharcelement` | 6 rôles, 4 scènes |
| `/kit/roles/desinformation` | 6 rôles, 4 scènes |
| `/guides` | Étude parents (9 pages), guide jeunes (52 pages), résumés datés et crédits |

Les quiz comportent choix multiples, validation, progression, retour, explications, pistes de discussion, nuances, références recto/verso, bilan et rejouer. Sans JavaScript, les cartes et leurs corrigés restent lisibles. Les activités gardent l’esprit de débat ; aucun classement ni barème de diagnostic.

Les 8 PDF d’origine sont inchangés. Les liens ouvrir/télécharger sont toujours visibles ; les aperçus natifs s’ouvrent dans un volet. Les deux liens externes GATE sont conservés au pied de page et tous les textes de présentation d’origine sont présents, parfois dans un volet explicitement titré.

## Confidentialité et accessibilité

- `noindex, nofollow` sur les 13 pages, `robots.txt` avec `Disallow: /`.
- JavaScript ciblé sur les quiz et questionnaires seulement, modules locaux cacheables. Aucun compte, backend, analytics, appel réseau applicatif ni API de stockage.
- Les choix et notes vivent uniquement dans la page ; remise à zéro et nettoyage à sa sortie. Aucun prénom ou renseignement d’identification demandé, aucun envoi de formulaire.
- Navigation clavier, contrôles natifs, labels/fieldset, erreurs annoncées, focus après changement d’étape, reduced-motion, mise en page responsive et titres longs pouvant revenir à la ligne.
- Statistiques attribuées et datées de 2021. Les formulations ambiguës ou non étayées des cartes sont signalées ; elles ne sont pas élevées au rang de faits universels ou de conseils médicaux/juridiques actuels.

## Preuves et limites

- `tasks/pdf-analysis.md` : analyse intégrale des 8 PDF, 156 pages, publics, enjeux, pédagogie, sources et limites.
- `tasks/quiz-source-map.md` : correspondance des 29 questions et corrigés, pages et quadrants.
- `tasks/pdf-text/` : textes complets, OCR et inventaire par page versionnés (~412 Ko).
- `tasks/pdf-images/` : 16 cartes rendues individuellement et autres pages graphiques, disponibles localement pour OpenBot ; ~12 Mo ignorés par Git et reproductibles.
- `tasks/verification.md` : rapport généré par verify (contenus, 8 empreintes PDF, noindex, liens/ancres et tous les assets HTTP).
- `tasks/browser-review.md` : périmètre exact de la revue rapportée par OpenBot, y compris les points restant à vérifier.
- `source-snapshot/` : HTML/CSS originaux non servis ; `assets.json` contient les 18 ressources et leurs SHA-256. Seule la feuille CSS originale est adaptée ; les autres ressources originales restent identiques.
- `tasks/todo.md`, `tasks/lessons.md`, `.opencode/codebase_map.md` : suivi et reprise.

Build : 13 pages. Tests : 10/10. Verify HTTP : 50 URLs, 276 références d’ancres/pages PDF, 26 blocs source et toutes les questions contrôlés. Ces vérifications ne sont pas une mesure visuelle. Aucun navigateur lancé par l’exécutant. OpenBot a approuvé la revue finale : correctif du titre à 320 px, pages accueil/kit/guides/quiz écologie à 1920 px sans débordement, lien d’évitement au clavier, sélection/restitution/effacement du questionnaire d’usage et saisie/relecture/effacement des 14 champs enseignants. Voir `tasks/browser-review.md` pour les mesures et le périmètre exact. La validation locale ne confirme pas la disponibilité publique ou HTTPS.

## Infrastructure transmise par OpenBot

Configuration précédemment annoncée par OpenBot ; disponibilité publique/HTTPS non confirmées par l’exécutant :

| Paramètre | Valeur |
|---|---|
| Coolify | https://deploy.danhabib.dev |
| Projet | `yuhz20ol6ogbmzj1pol2r7pz` |
| Application | `ezv2qhhub0jjl6cg4zgkp8p8` |
| Branche | `feat/astro-preview` |
| Build | Nixpacks : `npm ci` puis `npm run build` |
| Service | Statique, répertoire `/dist`, port `80` |
| Domaine initial | `happyclick.danhabib.dev` : NXDOMAIN constaté par OpenBot |
| Domaine alternatif | `happyclick.app.danhabib.dev` : résolution 72.61.167.104 rapportée par OpenBot |

Le superviseur gère l’infrastructure. Une résolution DNS ne démontre pas la disponibilité du site ou du certificat. Aucun DNS ni site original modifié.
