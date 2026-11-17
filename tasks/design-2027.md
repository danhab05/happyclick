# Refonte visuelle — Happy Click 2027

## Intention et contexte

Demande de Dan après `969d467` : « Adapte le site au logo ». Le logo officiel et la DA papier étaient incohérents. Inspection visuelle directe de `public/assets/2027/logo-512.png` : bleu ciel, cœur rouge, mains blanches, contours et curseur noirs/blancs. Le PNG reste inchangé, sans redessin ni recoloration.

Base publique `969d467` confirmée par OpenBot le 17 novembre 2026 : Coolify `enbdelpmy0pbqsspjzvmfr79` finished, 60 URLs HTTPS identiques au build, projet/FAQ navigateur bons. Dépôt public. **Ces constats concernent la base. La refonte 259697a a depuis été approuvée par OpenBot, avec publication autorisée ; revue détaillée ci-dessous.**

## Système visuel livré

- Une famille locale : Ubuntu pour titres et textes. Fichier 400 existant ; graisses fortes synthétisées par le navigateur, sans téléchargement de police supplémentaire. Click Cheese et Josefin ne sont plus déclarées dans la CSS ; leurs fichiers historiques restent disponibles pour préserver les ressources source.
- Palette : ciel `#7acbf5`, blanc `#ffffff`, encre `#161b22`, secondaire `#495965`, bleu clair `#e8f6ff`, fond secondaire `#f5faff`, rouge accessible `#ba1d28`, bleu fonctionnel `#17557b`. Le cœur du PNG conserve ses pixels d’origine.
- Hero : grand logo officiel, proposition pédagogique claire, CTA quiz et kit, trois repères sans compte/classement. Les thèmes, publics et l’édition 2027 structurent la suite de l’accueil.
- Cartes de thèmes différenciées par leur nom, leur pictogramme de navigation et une surface blanc/rouge pâle/bleu pâle. Ces SVG simples ne redessinent pas le logo.
- Boutons hauts de 52 px, arrondis de 12 px ; cartes arrondies de 24 px, contours légers, ombres fines. Navigation toujours visible ; CTA redondant du header retiré sous 480 px, liens de navigation conservés.
- Footer encre, texte clair, logo original et liens GATE conservés. Titres directs et hiérarchisés ; largeur de lecture bornée.
- Focus de 3 px avec séparation blanche ; focus clair sur footer. Sélection par coche native et double contour, bouton désactivé lisible, erreur textuelle, feedback sans classement. Le reduced-motion supprime les transitions et le défilement animé.
- Suppression du papier incliné, tampon, sticker, paysage fantaisie, étoiles, grosses lettres décoratives et ancienne palette. **Feuille CSS entièrement remplacée**, organisée par composants puis breakpoints ; aucune ancienne surcharge conservée.

## Couverture des 15 routes

| Pages | Refonte partagée / spécifique |
|---|---|
| `/` | Nouveau hero, logo central fort, thèmes, parcours, édition et discussion |
| `/quiz` | Cartes thèmes, parcours complet, étapes pédagogiques |
| `/quiz/comportements`, `/quiz/sante`, `/quiz/ecologie`, `/quiz/tout` | Progression, cartes, multi-choix, sélection, erreur, validation, disabled, feedback, bilan et rejouer |
| `/kit` | Sommaire, ressources, liens de jeux, versions et aperçus PDF |
| `/kit/roles/addiction`, `/kit/roles/cyberharcelement`, `/kit/roles/desinformation` | Rôles, scènes, sources et téléchargements, titres longs avec césure |
| `/guides` | Couvertures sans rotation, sommaires, chapitres et PDF |
| `/mes-usages`, `/kit/reflexion` | Champs, choix, notes, actions, restitution et effacement |
| `/projet-2027` | Grand logo, objectifs, publics, versions, histoire et équipe |
| `/faq` | Sommaire, questions en details natifs, liens vers les activités |

Header/footer, type, couleurs, boutons, liens et focus sont communs à toutes les routes. Le markup des activités reste sémantique et compatible avec les sélecteurs JS existants.

## Contrastes calculés

Calcul local selon la luminance relative sRGB : `(Lclair + 0,05) / (Lsombre + 0,05)`. Les paires ci-dessous dépassent 4,5:1 pour le texte courant ; bordures/focus dépassent 3:1. Ce calcul des couleurs définies ne constitue pas un audit visuel WCAG complet.

| Paire | Ratio |
|---|---:|
| Encre / ciel | 9,63:1 |
| Texte secondaire / blanc | 7,24:1 |
| Texte secondaire / bleu pâle | 6,57:1 |
| Blanc / bouton rouge (ou rouge / blanc) | 6,37:1 |
| Bleu / fond sélection | 7,27:1 |
| Texte disabled / fond disabled | 5,25:1 |
| Texte secondaire footer / encre | 11,31:1 |
| Bordure contrôle / blanc | 3,88:1 |
| Focus bleu / ciel | 4,46:1 |

## Analyse responsive disponible

Lecture du CSS et des contraintes de grille, sans navigateur ni mesure de scrollWidth. `minmax(0,1fr)`, fieldsets et contenus à largeur minimale nulle, images/PDF bornés, césure des titres et sources. Aucun `overflow-x:hidden` utilisé pour dissimuler un défaut. Sommaires dans le flux sous 800 px ; navigation en retour à la ligne sans JS.

| Largeur cible | Largeur maximale calculée du conteneur | Règles actives |
|---|---:|---|
| 320 px | 288 px | Une colonne, boutons quiz/PDF pleine largeur, titres longs sécables |
| 390 px | 358 px | Même disposition compacte, logo hero borné à 240 px |
| 768 px | 728 px | Hero/thèmes/publics en une colonne, sommaire non sticky |
| 1440 px | 1240 px | Hero en deux colonnes, thèmes/publics en trois colonnes |
| 1920 px | 1240 px | Conteneur borné et largeurs de lecture inchangées |

Ce tableau décrit des dimensions déduites des règles. Les mesures réelles et captures approuvées ensuite par OpenBot sont consignées dans la section de revue ci-dessous. Le lecteur PDF intégré dépend du navigateur ; les liens ouvrir/télécharger restent accessibles hors aperçu.

## Vérifications exécutées le 17 novembre 2026

Commande finale exécutée avec succès après les dernières modifications CSS :

```bash
cd /root/happyclick
npm run build && npm test && npm run verify -- --base-url http://127.0.0.1:4321
```

- Build statique : **15 pages**.
- Tests : **14/14**. Transcription et clés des 29 cartes, parcours complets des quatre quiz, multi-choix, erreur sans choix, validation/retour/bilan/rejouer ; questionnaires, notes traitées comme texte, restitution/effacement ; versions, provenance et références 2027.
- Verify : **60 URLs HTTP 200 identiques au build**, sans redirection ; **288 références** HTML/pages PDF ; les 14 routes hors accueil avec et sans slash.
- Conservation : **29 questions / 116 choix**, **3 jeux × 6 rôles × 4 tours**, **10 PDF / 204 pages** et leurs SHA-256, V2/V1/archive, 11 questions d’usage et 14 questions enseignants. Les 26 blocs de présentation source et deux liens GATE sont toujours contrôlés.
- Noindex/nofollow, robots Disallow, navigation, ancres, images, polices, PDF et modules locaux vérifiés. Aucun nouvel envoi, stockage, réseau applicatif ou formulaire.
- Comparaison Git avec `969d467` : aucun changement sous `src/data`, `src/scripts`, `src/lib`, `public/assets`, `public/resources`, ni dans les dépendances. Aucun nouvel asset nécessaire ; logo fourni inchangé.
- PostCSS déjà installé : **330 règles**, **14 tokens**, syntaxe analysée sans erreur et aucune variable non définie. Recherche des anciennes classes décoratives/polices/palettes dans le CSS et le markup : aucune occurrence.
- `git diff --check` sans erreur avant commit.
- Serveur existant réutilisé : **0.0.0.0:4321**, PID observé 2872878. Le build est servi sans lancer de second serveur.

Le vérificateur n’a perdu aucune assertion. Seuls ses textes de rapport distinguent désormais la base publique 969d467 de la nouvelle DA locale, sans lui attribuer l’ancienne approbation visuelle. Les preuves publiques restent dans le document durable `tasks/public-verification.md`.

## Checklist de livraison

- [x] Inspection du vrai logo, spec et leçon du retour utilisateur.
- [x] Header, navigation et footer communs.
- [x] Accueil : hero, thèmes, publics, édition 2027.
- [x] Quiz liste et quatre parcours : tous les états couverts par les styles partagés.
- [x] Kit, trois jeux, V2/V1/archive, guides et aperçus PDF.
- [x] Mes usages et carnet : champs, focus, restitution, effacement.
- [x] Projet 2027, équipe et FAQ.
- [x] Données et documents inchangés ; contrôles de contenu maintenus.
- [x] Contrastes calculés, règles responsive analysées, reduced-motion.
- [x] Build/tests/verify et bilan ; commit local avec trailer OpenBot, aucun push.
- [x] Revue visuelle OpenBot à 320/390/768/1440/1920 et contrôle du focus sur le feedback ; périmètre exact et limites ci-dessous.

## Fichiers et reprise

`src/styles/site.css` porte désormais le même système complet, sans changement de contenu : import Astro pour URL hashée (correction de cache après dcb3136). `src/layouts/Layout.astro`, `src/components/ThemeCards.astro`, accueil/projet et les introductions kit/guides/quiz/carnet portent les changements de structure. Les autres routes héritent des composants partagés. README, carte, todo, leçons, rapports de vérification et historiques de publication/revue sont actualisés.

Ancien rendu récupérable dans `969d467`, sans maintenir une seconde DA en parallèle. Dernier commit et état exact : `git log -1 --format=full && git status --short --branch`. Push de la branche autorisé après la revue de 259697a : le webhook déploie et OpenBot en suit le résultat. Aucun appel infra/DNS, navigateur ou Playwright par l’exécutant. La revue ne couvre pas exhaustivement chaque état à chaque taille.

## Revue de 259697a approuvée par OpenBot — 17 novembre 2026

Preuves transmises par le superviseur, sans navigateur lancé par l’exécutant :

- Build **15 pages**, tests **14/14**, verify **60 URLs / 288 références** exécutés par OpenBot, tous avec exit 0. Comparaison à `969d467` : données, scripts applicatifs, bibliothèques, assets, PDF et fichiers package inchangés.
- **Les 15 routes à 320 et 1920 px** : aucun débordement ; navigation mobile présente et dans le viewport ; logos chargés. Les deux couvertures des guides, en chargement différé, ont été chargées après défilement ; aucune image cassée.
- **À 390, 768 et 1440 px**, cinq routes contrôlées : `/`, `/quiz/comportements`, `/kit`, `/kit/roles/cyberharcelement`, `/projet-2027`. Aucun débordement ni navigation coupée.
- Captures réellement vues : accueil à **1920 et 320 px**, cartes thèmes à **1920 px**, feedback quiz à **1920 px**, guides à **320 px**, projet à **768 px**, kit à **1440 px**. Rendu jugé cohérent bleu ciel/blanc/rouge ; Ubuntu lisible.
- Quiz comportements : validation sans choix → erreur attendue ; sélection visible sur fond bleu clair ; validation → fieldset verrouillé, feedback ouvert et focus sur son titre ; aucun débordement constaté.

**Revue approuvée et publication de la seule préversion autorisée**, via push de `origin feat/astro-preview` incluant `259697a` et le commit documentaire de revue. OpenBot suit le déploiement Coolify ; cette approbation ne prouve pas encore le nouveau déploiement terminé.

Limite : ce contrôle n’est pas un audit exhaustif de chaque état à chaque taille, ni de toutes les interactions au clavier. Les tests DOM et preuves des versions précédentes restent distincts de ces observations réelles.

## Suivi du cache après publication

La DA reste approuvée et inchangée. Après déploiement dcb3136, OpenBot constate cependant un ancien CSS en cache sur le domaine public malgré un verify HTTPS réussi. Correction de la livraison CSS, pas du design : voir `tasks/css-cache.md`. Recontrôle public du navigateur persistant attendu.

## Correction de composition mobile après 80ae3e2

L’absence de débordement de la DA précédente ne valait pas validation de l’accès aux actions. Les mesures OpenBot à390×844 montrent header193px et grille y1407. La composition mobile est reprise avec menu natif, hero court, cartes compactes et sommaires/footer repliables. Les spécifications de navigation toujours visible, grand hero mobile et espacements ci-dessus décrivent la version initiale. La nouvelle spec/couverture/cibles est dans `tasks/mobile-review.md` ; revue réelle attendue, aucun push.
