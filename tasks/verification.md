# Vérification de la nouvelle interface et des activités

Commande : `npm run build && npm test && npm run verify -- --base-url http://127.0.0.1:4321`

Édition 2026–2027 : contrôles ci-dessous exécutés sur le build local. Le périmètre exact de la revue navigateur rapportée par OpenBot est consigné dans `tasks/browser-review.md` ; les observations sur l’ancienne interface ne sont pas transposées.

## Pages, contenu et interactions

- `/` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 0 module JS ciblé.
- `/faq` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 0 module JS ciblé.
- `/guides` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 0 module JS ciblé.
- `/kit` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 0 module JS ciblé.
- `/kit/reflexion` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 1 module JS ciblé.
- `/kit/roles/addiction` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 0 module JS ciblé.
- `/kit/roles/cyberharcelement` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 0 module JS ciblé.
- `/kit/roles/desinformation` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 0 module JS ciblé.
- `/mes-usages` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 1 module JS ciblé.
- `/projet-2027` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 0 module JS ciblé.
- `/quiz` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 0 module JS ciblé.
- `/quiz/comportements` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 1 module JS ciblé.
- `/quiz/ecologie` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 1 module JS ciblé.
- `/quiz/sante` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 1 module JS ciblé.
- `/quiz/tout` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; 1 module JS ciblé.
- 26 blocs de textes originaux contrôlés ; 29 cartes intégrales dans leur thème et dans le parcours complet ; 11 questions d’usage et 14 questions enseignants.

## CSS actifs versionnés

- `/_astro/Doodle.I3r-scvP.css` : feuille active avec hash, références locales contrôlées ; contenu comparé par HTTP si demandé.

## Documents et empreintes source

- `guide_jeune_et_numerique.pdf` : 52 pages, 5,279,873 octets ; SHA-256 `0038126275f1741502519b9566ca5636c51dac09a6895f102fd83baf89a96834` identique à la source.
- `guide_parents.pdf` : 9 pages, 655,421 octets ; SHA-256 `4afbbc4e0101dc28c2527802e7976151439b41df4b599fb6fc240e28bd98d596` identique à la source.
- `activite_cartes_a_imprimer.pdf` : 16 pages, 12,267,427 octets ; SHA-256 `e6011ead90daaa29d69e6f013e331a508e8c940f5831420a0cc5b4e707a1b4d2` identique à la source.
- `questionnaire_enseignants.pdf` : 4 pages, 51,779 octets ; SHA-256 `1fbf236ec41aaaab4b0e9677c0faab2cf273f325b5fb08045e9c0611ba37867a` identique à la source.
- `rp_addiction.pdf` : 28 pages, 10,973,077 octets ; SHA-256 `c954745ecabbbd5f0a54a3bbdcf2e2c01c2a8009ebf86b44c1db2732b2eb09c0` identique à la source.
- `rp_cyberharcelement.pdf` : 24 pages, 9,698,538 octets ; SHA-256 `bdaf0476e328bb1dc30c6b575b7add35ab8ffe822f9f20372835220e32a9c2ea` identique à la source.
- `rp_desinformation.pdf` : 21 pages, 7,826,609 octets ; SHA-256 `a5f8757553722734990e8b3405fef9d95fe1a7c6776d07131b2af662b4d586ed` identique à la source.
- `test_numerico_dependance.pdf` : 2 pages, 911,191 octets ; SHA-256 `840532b90dc891ecdc0e2a0bdf65fe9bcb7ccc50f3ce79bdc5d678eb91c6536b` identique à la source.
- `addiction-v1.pdf` : 24 pages, 2,709,601 octets ; SHA-256 `7032e5371a83a49f656cd5e03bdb4432b158da23acd84b27e43e148bc6140edd` identique à la source.
- `addiction-v2.pdf` : 24 pages, 1,767,576 octets ; SHA-256 `7b3ed98040e29e36ebb5a88068cb02a6befdf6352b5428fbc1b56180b3e33863` identique à la source.

## Ressources et HTTP

65 URLs contrôlées sur disque et par HTTP 200 sans redirection, réponses identiques au build.
319 références à des ancres HTML/pages PDF vérifiées. Les 14 routes hors accueil sont testées avec et sans slash final. Tous les assets émis sont inclus, dont les modules JS et leurs chunks.

## Responsive et limites de cette vérification

Analyse des règles CSS seulement : conteneur borné à 1180 px, paquets en une colonne sous 800 px, menu mobile natif et sommaires repliables, images/PDF bornés, cibles d’au moins 44 px, focus visibles et reduced-motion (retournement de carte désactivé). Aucun navigateur lancé : ces contrôles ne mesurent pas le rendu. Refonte « table de jeu » (52115d2) approuvée par OpenBot après mesures réelles à 320/390/1000/1920 px ; périmètre exact dans `tasks/browser-review.md` et `tasks/redesign-enfants.md`. Les mesures de `tasks/mobile-review.md` concernent la version précédente.

Les tests Node/DOM de `npm test` couvrent la transcription et les clés des 29 cartes, la progression des quatre parcours, validation/retour/rejouer, les choix exclusifs du questionnaire, l’absence de score lié à la durée, les notes comme texte et leur effacement. Ce script ne remplace pas leur exécution.

Base publique e8bf224 confirmée par OpenBot : `tasks/public-verification.md`. La CSS reste importée par Astro avec un hash de contenu, contrôlé ici.

Aucun push, déploiement, contrôle HTTPS ni changement d’infrastructure effectué par cette vérification.
