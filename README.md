# Happy Click — préversion pédagogique Astro

Nouvelle interface papier ivoire, encre marine, corail et turquoise, avec le cœur-curseur Happy Click et les polices locales ClickChesse/Josefin/Ubuntu. Quinze pages statiques locales, quatre parcours de quiz (trois thèmes et l’ensemble), activités locales et documents accessibles sur le même site. L’ancienne interface est récupérable au commit `cc71f4a98d650bbc915b92eb463feefaa51a807e`.

**Préversion accessible : https://happyclick.danhabib.dev**, DNS et HTTPS avec certificat valide confirmés par OpenBot le **17 novembre 2026**, sur le commit déployé `6dab746`. Le domaine alternatif `https://happyclick.app.danhabib.dev` a également été validé par le superviseur. Le push autorisé a été effectué ; **ce nouveau suivi documentaire reste local, sans push**, pour éviter un déploiement uniquement documentaire. Aucun appel d’infrastructure ni changement DNS par cet exécutant. Le commit d’implémentation `0fc4fb9bc985be9c1952e3ec395bcc4355cb23f3` est conservé.

## Nouveautés locales — Happy Click2027

**Aucun push de cette mission** : les nouveautés restent locales pour revue. Le déploiement public confirmé ci-dessous reste au commit6dab746. DA et29quiz conservés ; logo officiel PNG transparent, page projet/FAQ, équipe confirmée sans contacts et supports addictionV2/V1 de24pages. Le jeu complet garde ses six rôles/quatre tours/douze questions ; l’ancien PDF28pages est disponible en archive.

Rapport complet : [tasks/gate-2027.md](tasks/gate-2027.md), provenance et hashes : `tasks/gate-2027-assets.json`, comparaison des six archives : `tasks/gate-2027-archives.json`. Les originaux Drive sont hors dépôt ; documents de gestion, contacts, finances, neuf portraits et onepager historique ne sont pas publiés. Revue navigateur locale2027 rapportée par OpenBot dans `tasks/browser-review.md`.

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
- `tasks/verification.md` : rapport généré par verify (contenus, 8 empreintes PDF, noindex, liens/ancres et tous les assets HTTP), réécrit à chaque exécution.
- `tasks/public-verification.md` : preuves publiques durables, maintenues manuellement ; DNS, certificat, déploiements et contrôles du superviseur. Ce fichier n’est pas réécrit par verify.
- `tasks/browser-review.md` : périmètre exact de la revue locale et publique rapportée par OpenBot.
- `source-snapshot/` : HTML/CSS originaux non servis ; `assets.json` contient les 18 ressources et leurs SHA-256. Seule la feuille CSS originale est adaptée ; les autres ressources originales restent identiques.
- `tasks/todo.md`, `tasks/lessons.md`, `.opencode/codebase_map.md` : suivi et reprise.

Build local2027 : 15 pages. Tests : 14/14. Verify HTTP local : 60 URLs, 288 références d’ancres/pages PDF, 26 blocs source et toutes les questions contrôlés. Ces vérifications ne sont pas une mesure visuelle. Aucun navigateur lancé par l’exécutant. OpenBot a approuvé la revue finale : correctif du titre à 320 px, pages accueil/kit/guides/quiz écologie à 1920 px sans débordement, lien d’évitement au clavier, sélection/restitution/effacement du questionnaire d’usage et saisie/relecture/effacement des 14 champs enseignants. Voir `tasks/browser-review.md` pour les mesures et le périmètre exact. OpenBot a ensuite confirmé la disponibilité publique et le certificat HTTPS valide, joué le quiz santé sur le domaine public (feedback OK) et terminé `/quiz/tout` en navigateur local : 29 questions, 29 résumés, premier choix multiple, aucun débordement à 1920 px.

## Infrastructure transmise par OpenBot

Déploiement et accès public confirmés par OpenBot ; constats consignés ici sans nouvel appel d’infrastructure par l’exécutant :

| Paramètre | Valeur |
|---|---|
| Coolify | https://deploy.danhabib.dev |
| Projet | `yuhz20ol6ogbmzj1pol2r7pz` |
| Application | `ezv2qhhub0jjl6cg4zgkp8p8` |
| Branche | `feat/astro-preview` |
| Build | Nixpacks : `npm ci` puis `npm run build` |
| Service | Statique, répertoire `/dist`, port `80` |
| Dernier déploiement confirmé | `1rbbwrx32ragmtnltqbirebp` : `finished`, commit `6dab746` ; redéploiement API par OpenBot |
| Domaine principal | `https://happyclick.danhabib.dev` : DNS 72.61.167.104, HTTPS 200 avec validation TLS sans bypass |
| Domaine alternatif | `https://happyclick.app.danhabib.dev` : accessible en HTTPS, certificat valide selon OpenBot |

OpenBot a exécuté `npm run verify -- --base-url https://happyclick.app.danhabib.dev` : **50 URLs HTTP 200 identiques au build et 276 références vérifiées**. Ce contrôle public est distinct de la vérification locale et du test navigateur du quiz santé.

Le **17 novembre 2026**, OpenBot a ajouté chez Name.com, après connexion Google avec le compte de Dan, le seul enregistrement autorisé **A `happyclick.danhabib.dev` → `72.61.167.104`, TTL 300** : aucun doublon, autres enregistrements présents. Les quatre NS autoritatifs `ns1hwy.name.com`, `ns2hjl.name.com`, `ns3qty.name.com`, `ns4cjp.name.com` ainsi que `1.1.1.1` et `8.8.8.8` ont répondu 72.61.167.104 selon ses contrôles.

Un certificat au mauvais nom a été résolu par le redéploiement Coolify indiqué ci-dessus. Certificat observé : **CN/SAN `happyclick.danhabib.dev`**, émetteur **Let’s Encrypt YR2**, valable du **17 novembre 2026 au 15 février 2027**. OpenBot a obtenu HTTPS 200 avec validation TLS sans bypass, puis exécuté `npm run verify -- --base-url https://happyclick.danhabib.dev` : **50 URLs HTTP 200 identiques au build, 276 références**, incluant les huit PDF et les assets. Sur ce domaine exact, il a confirmé l’accueil noindex et testé la sélection et le feedback du quiz comportements.

Les preuves et l’historique du précédent état DNS sont conservés durablement dans [tasks/public-verification.md](tasks/public-verification.md). Aucun code ni infrastructure modifié par l’exécutant ; finalisation documentaire committée localement sans push.
