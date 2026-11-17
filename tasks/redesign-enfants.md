# Refonte « table de jeu » : un site pour enfants et parents (17 novembre 2026)

Base `e8bf224` (publique, approuvée sur le plan technique). Retour de Dan : « c cense etre un site pr enfant parent la ca fait trop pro et ia slope ». Le bleu du logo et un responsive correct ne suffisent pas : le rendu institutionnel générique est rejeté. Cette mission est menée par Claude, seul, sans sous-agent ni navigateur.

## Sources de guidage (texte seulement, rien d'installé)

| Source | Licence | Ce qui a réellement guidé une décision |
|---|---|---|
| `anthropics/skills`, `skills/frontend-design/SKILL.md` (copie superviseur `/tmp/happyclick-guidance/frontend-design`) | Apache 2.0 (`LICENSE.txt` lu) | Partir du vrai matériau du sujet (des cartes à imprimer qu'on retourne, des rôles qu'on pioche). Plan en deux passes : tokens, puis relecture contre les défauts génériques. Concentrer l'audace en un seul endroit (les paquets de cartes). Pas d'étiquettes en capitales, pas de mot isolé en couleur dans un titre, pas de 01/02/03 hors vraie séquence, pas de « → » ajouté aux liens. Une seule animation, déclenchée par l'action (retourner la carte). Textes du point de vue de l'utilisateur, verbe + objet. |
| `pbakaus/impeccable`, `skill/reference/delight.md` | Apache 2.0 | Thèse de « delight » unique, tirée du mécanisme du produit : retourner la carte et découvrir le dos. Fin de paquet reconnue sans célébration démesurée, ni confettis, ni son. La personnalité reste dans la voix et le dessin, jamais au détriment de la tâche. |
| `pbakaus/impeccable`, `skill/reference/clarify.md` | Apache 2.0 | Réécriture des libellés par fonction : un même mot pour un même concept (« carte », « paquet », « retourner »). Erreur = quoi faire. Une seule idée par intitulé. Le jargon (« support », « corrigé », « parcours ») est remplacé côté enfant et conservé dans la zone adulte. |

Ce sont des références éditoriales lues seules. Ni la commande `/impeccable` ni aucun moteur, hook ou télémétrie n'ont été installés. Les contraintes du superviseur priment sur ces sources.

## Sujet, public, travail principal

- **Sujet** : Happy Click est d'abord une boîte de cartes à imprimer : un quiz recto/verso en trois paquets, des cartes de rôle à piocher et deux questionnaires.
- **Public** : un enfant de 8 à 12 ans qui veut jouer, souvent sur téléphone, et l'adulte qui l'accompagne (parent, enseignant).
- **Travail de la page** : faire choisir un paquet et jouer en un geste. L'adulte doit trouver en un coup d'œil « comment accompagner » et des repères fiables.

## Angle retenu, en deux phrases

Happy Click existe d'abord en cartes qu'on retourne et en rôles qu'on pioche : le site devient une **table de jeu** où l'enfant choisit un paquet et retourne des cartes, dessinées avec le trait noir et les aplats colorés du logo. Les adultes retrouvent le même univers en version **carnet** (papier blanc, trait fin, une couleur à la fois), pour lire calmement sans la parade du jeu.

## Tokens

**Couleurs** (contrastes calculés WCAG ci-dessous) :

| Nom | Hex | Rôle |
|---|---|---|
| Ciel | `#7ACBF5` | Couleur du logo. Plateau de jeu, fonds des scènes. |
| Encre | `#14213D` | Trait et texte : bleu-noir de feutre, cohérent avec le contour du logo. |
| Cœur | `#E2342F` (aplat) / `#C21F2A` (texte, boutons) | Paquet « Les bons réflexes », action principale. |
| Soleil | `#FFC93C` | Paquet « Trouver son équilibre ». |
| Feuille | `#37B26C` (aplat) / `#1C7643` (texte) | Paquet « Derrière nos écrans ». |
| Papier | `#FFFFFF`, ciel pâle `#E4F4FD` | Cartes, pages de lecture. |

Ratios : encre/blanc 15.97, encre/ciel 8.89, blanc sur cœur texte 5.96, cœur texte sur rose 4.92, feuille texte/blanc 5.64, encre/soleil 10.4, gris `#44506A`/blanc 8.07. Le cœur vif `#E2342F` n'est jamais utilisé pour du texte (4.41 sur blanc).

**Typographie** :

- **Fredoka** (variable 300–700, OFL) pour les titres, boutons, noms de paquets et la navigation. Ronde et dense comme un titre de jeu de société, très lisible en minuscules.
- **Andika** (400/700, OFL, SIL) pour le texte. Conçue pour les lecteurs débutants : I/l/1 et 0/O distincts, ce qui compte pour une option comme `P@ssw0rd!84`.
- Échelle 16 / 18 / 22 / 28 / 36 / 48 / 60 ; texte 18 px (17 px sous 360), interligne 1.6, mesure ≤ 68 caractères.
- Les polices sont servies en local depuis `public/assets/fonts` avec leurs licences (`LICENSE-*-OFL.txt`), à partir des paquets npm `@fontsource-variable/fredoka` 5.3.0 et `@fontsource/andika` 5.3.0. Ce ne sont pas des dépendances du projet.
- Click Cheese (police du site historique) est écartée : tout en capitales, donc moins lisible pour les enfants, et sa licence n'est pas indiquée (« All rights reserved »). Ubuntu reste présente dans les assets historiques, mais n'est plus utilisée.

**Formes** : trait encre de 2,5 px sur les objets qu'on manipule (paquets, carte question, choix, boutons). Ombre décalée pleine (« carte posée ») uniquement sur les paquets et la carte en jeu. Rayons hiérarchisés : 22 px pour les cartes, 999 px pour les boutons et pastilles, 12 px pour les blocs de lecture. Les pages adultes n'ont ni ombre ni trait épais.

**Dessins** : SVG natifs au trait encre, avec une fonction narrative. Un cadenas et une bulle pour les bons réflexes (mots de passe, les autres derrière l'écran). Un téléphone et une lune pour l'équilibre (notifications, sommeil). Une feuille qui pousse d'un téléphone pour les écrans et la planète. Une petite saynète par jeu de rôles (balance, bulles, loupe). Pas de mascotte, d'emoji, de confettis, d'avatar ni de dégradé.

## Composition

Alignement à gauche partout ; le centrage est réservé aux pictogrammes.

Accueil mobile (390 px) :

```
[logo] Happy Click              [Menu]
┌ plateau ciel, contour encre ───────┐
│ Tire une carte, on en parle !      │
│ Choisis un paquet, réponds…        │
│ ╔═[cadenas] Les bons réflexes ══╗  │  ← le paquet entier est le lien
│ ╔═[lune] Trouver son équilibre ═╗  │
│ ╔═[feuille] Derrière nos écrans ╗  │
│ Les 29 cartes mélangées            │
└────────────────────────────────────┘
Change de place : 3 jeux de rôles (lignes illustrées)
Mes écrans et moi (questionnaire)
┌ Pour les adultes (papier blanc) ───┐
│ À la maison / En classe / Guides   │
└────────────────────────────────────┘
Happy Click 2027 (logo + équipe)
```

Accueil desktop (1440 px) :

```
[logo Happy Click]  Accueil  Quiz  Jeux et kit  Guides parents  Le projet   (Jouer)
┌ plateau ciel ───────────────────────────────────────────────┐
│ Tire une carte,       ┌──────┐ ┌──────┐ ┌──────┐            │
│ on en parle !         │paquet│ │paquet│ │paquet│  (inclinés,│
│ phrase                │ rouge│ │soleil│ │feuill│   empilés) │
│ Les 29 cartes         └──────┘ └──────┘ └──────┘            │
└─────────────────────────────────────────────────────────────┘
Jeux de rôles (3 scènes illustrées) | Mes écrans et moi
Coin des adultes : 4 entrées en liste, ton calme
```

Quiz : la carte question est un objet unique (bandeau couleur du paquet, pictogramme, lettres A–D en pastilles, choix de 48 px minimum). « Retourner la carte » ouvre le dos de la carte : explication, puis « Pour en parler », puis, en petit, la nuance et la source pour les adultes. Animation de retournement de 280 ms, uniquement si le mouvement est autorisé.

Pages de lecture (kit, guides, carnet, FAQ, projet) : bandeau titre court sur papier, pictogramme du sujet, sommaire existant (desktop/mobile), blocs blancs à filet fin. Documents et nuances sont accessibles mais placés après l'action.

## Autocritique du plan avant code

1. *Ombre décalée et contour épais = tendance néo-brutaliste générique ?* Risque réel si c'est appliqué partout. Révision : réservés aux objets « carte » qu'on prend en main (paquets, carte en jeu, choix, boutons). Les sections et les pages adultes restent sans ombre. Le trait vient du logo dessiné au feutre, pas d'un kit.
2. *Trois paquets = la grille de trois cartes SaaS rejetée ?* Le contenu compte vraiment trois thèmes. Révision : des paquets empilés (deux cartes visibles derrière), de couleurs et d'inclinaisons différentes, avec un dessin propre à chacun. Lignes pleine largeur sur mobile. La grille de « publics » à trois cartes et les objectifs 01–04 du projet sont supprimés.
3. *Hero = titre + phrase + bouton, le défaut ?* Révision : les paquets sont l'action. Il n'y a pas de bouton « Commencer » séparé, ni de grand logo empilé : le logo reste identifiable dans l'en-tête et sur la page projet.
4. *Reprise automatique du bandeau bleu pleine largeur et des titres noirs ?* Révision : un plateau ciel encadré (bord encre arrondi) posé sur la page, comme un plateau de jeu. Titres en Fredoka encre, sans mot en rouge.
5. *Texte de vitrine.* Révision : une phrase par section au maximum. Les textes source imposés (kit, guides) sont regroupés sous « Le texte du kit d'origine », lisible mais secondaire.
6. *Libellés.* Nav : Accueil, Quiz, Jeux et kit, Guides parents, Le projet. Boutons : « Retourner la carte », « Carte suivante », « Carte d'avant », « Rejouer ce paquet », « Voir le récap ». Pas de « Explorer le parcours » ni de « Comparer au support ».

## Interdits respectés

Aucune nouvelle question, réponse, statistique ou affirmation médicale. Les questions, options, corrigés, feedbacks, nuances, données de rôles et documents sont intacts. Pas de note, de classement ni de série à maintenir. Pas de son ni d'autoplay. Les données restent dans la page (aucun stockage, aucun envoi).

## Bilan de l'implémentation (17 novembre 2026)

**Ce qui change, page par page**

- **En-tête** : liens Accueil, Quiz, Jeux et kit, Guides parents, Le projet (mêmes 5 URL et même lien courant), bouton « Jouer » sur grand écran, menu natif sur mobile. Le bouton « Jouer » et le sous-titre disparaissent sous 1100 px pour éviter les retours à la ligne.
- **Accueil** : un plateau ciel encadré, « Tire une carte, on en parle ! », avec trois paquets empilés et inclinés (dessin, nom, sujet, nombre de cartes) et un accès aux 29 cartes mélangées. Puis « Change de place » (trois jeux de rôles illustrés), « Mes écrans et moi », le coin des adultes (quatre entrées et trois garanties) et la note de l'édition 2027 avec le logo.
- **Quiz** : « Choisis ton paquet », règle en trois gestes réels (choisir, retourner, en parler). Sur une carte : bandeau couleur du paquet, lettres A–D en pastilles, bouton « Retourner la carte ». Le dos de la carte (animation de 320 ms, coupée en reduced-motion) donne la réponse, la phrase de comparaison, l'explication et « À toi d'en parler ». Ensuite seulement, en petit, la nuance et les pages source « Pour les adultes ». Fin : « Paquet terminé ! » avec le dessin cœur et mains, le récap de toutes les cartes, « Rejouer ce paquet ».
- **Kit, jeux de rôles, carnet, guides, FAQ, projet** : en-tête papier « pour qui », titre simple, dessin du sujet. Le sommaire existant reste (desktop et volet mobile). Les textes d'origine du kit et des guides sont dans des volets « Le texte d'origine du kit » et « La présentation d'origine ». Dans les jeux, les « tours » deviennent des « scènes », sans changer les ancres `#tour-N`. Les objectifs du projet passent en liste sans numéros, et l'historique des éditions en frise.
- **Microcopy des scripts** : messages de comparaison, d'erreur, de récap et de questionnaire réécrits (`quiz.mjs`, `reflection.mjs`). Logique inchangée.
- Plus aucune flèche décorative, aucune étiquette en capitales, aucun 01/02/03, aucun méta-texte « A · B ». Le seul « ↗ » restant signale un nouvel onglet (PDF, liens GATE), avec un texte pour les lecteurs d'écran.

**Intact** : `src/data/*`, `src/lib/*`, les 10 PDF, le logo et ses dérivés, `package*.json` et `astro.config.mjs` (diff vide). Les routes, ancres, identifiants, le noindex et la CSS externe hashée (fichier unique `/_astro/Doodle.<hash>.css` ; Astro le nomme d'après son premier composant importateur) ne changent pas.

**Vérifications de l'exécutant** : `npm run build` 15 pages. `npm test` 18/18, sans modification des tests : les libellés testés (Menu, /Choisis/, /explorées/, V2 avant V1, Archive 2025–2026) sont conservés. `npm run verify -- --base-url http://127.0.0.1:4321` exit 0 : **65 URLs** HTTP 200 identiques au build (60 plus les 3 polices et 2 licences OFL), **319 références**, 26 blocs source, 29 cartes, 11 et 14 questions, 10 PDF / 204 pages et empreintes. Seul le texte du rapport de verify a été actualisé, aucun contrôle n'a été retiré. Le serveur existant sur 4321 a été réutilisé, sans second serveur. Les classes émises ont toutes une règle CSS (sauf le crochet JS `choice-text`).

**Limites** : aucun navigateur lancé par l'exécutant. Le rendu, les positions mobiles, le retournement de carte et la lisibilité des dessins n'ont pas été mesurés. Les SVG ont seulement été vérifiés en géométrie et en aplats : le rasteriseur ImageMagick local ignore les traits. Les cibles proposées pour la revue OpenBot sont ci-dessous ; ce ne sont pas des observations.

**À regarder en priorité (OpenBot)**

1. 390×844 et 320×800 : en-tête ≈ 74 px ; les trois paquets doivent être visibles sans défiler à 390 (estimation : premier paquet vers y 440, dernier terminé vers y 790). Aucun débordement, cartes arrière visibles derrière chaque paquet sans masquer le texte.
2. 1440/1920 : paquets inclinés à côté du titre, survol qui soulève la face, focus visible sur chaque paquet.
3. `/quiz/comportements` : erreur sans choix, sélection (pastille encre), « Retourner la carte » (dos animé, focus sur « Au dos de la carte »), « Carte suivante », « Carte d'avant », fin de paquet et rejouer. Même parcours en reduced-motion : pas d'animation.
4. Kit, un jeu de rôles, Mes écrans et moi, carnet, guides, FAQ, projet : densité, volets « texte d'origine », PDF ouvrir/télécharger, frise des éditions, logo du projet à 96 px sur mobile.
5. Header entre 800 et 1100 px : cinq liens sur une ligne, sans bouton Jouer.

## Correctif après première revue OpenBot (1516d5c)

Revue OpenBot : direction validée, traits SVG et polices OK, accueil 1920 bien composé, en-tête de 74 px à 390 sans débordement, parcours du quiz à 390 OK. Mais sur une vraie photo à 390×844, le **troisième paquet était coupé en bas**.

Correctif sans refonte :
- intro réduite à « Choisis un paquet, réponds, puis retourne la carte. » ;
- sujets des paquets raccourcis, sur l'accueil et sur les pages quiz : « Mots de passe, photos, messages. », « Écrans, sommeil, temps pour soi. », « D’où viennent nos appareils ? » ;
- « Les 29 cartes mélangées » passe **après** les paquets (sous l'intro sur desktop) ;
- sur mobile : titre de 32 px, paquets plus compacts (dessin de 56 px, marges et espacements réduits).

Estimation CSS (non mesurée) à 390×844 : paquets de y ≈ 255 à y ≈ 620. Données et questions inchangées. Build 15 pages, tests 18/18, verify 65 URLs / 319 références exit 0.

Le message de commit ne contient plus de lien de session interne ; il garde le trailer OpenBot et le co-auteur Claude.
