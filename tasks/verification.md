# Vérification de la préversion

Commande : `npm run build && npm run verify -- --base-url http://127.0.0.1:4321`

- `/` : textes source conservés, 5 liens de navigation, 0 PDF, noindex/nofollow, aucun script/formulaire.
- `/kit` : textes source conservés, 5 liens de navigation, 6 PDF, noindex/nofollow, aucun script/formulaire.
- `/guides` : textes source conservés, 5 liens de navigation, 2 PDF, noindex/nofollow, aucun script/formulaire.
- `/resources/guides/guide_jeune_et_numerique.pdf` : PDF valide, 52 pages, 5,279,873 octets, SHA-256 identique à la source.
- `/resources/guides/guide_parents.pdf` : PDF valide, 9 pages, 655,421 octets, SHA-256 identique à la source.
- `/resources/kit/activite_cartes_a_imprimer.pdf` : PDF valide, 16 pages, 12,267,427 octets, SHA-256 identique à la source.
- `/resources/kit/questionnaire_enseignants.pdf` : PDF valide, 4 pages, 51,779 octets, SHA-256 identique à la source.
- `/resources/kit/rp_addiction.pdf` : PDF valide, 28 pages, 10,973,077 octets, SHA-256 identique à la source.
- `/resources/kit/rp_cyberharcelement.pdf` : PDF valide, 24 pages, 9,698,538 octets, SHA-256 identique à la source.
- `/resources/kit/rp_desinformation.pdf` : PDF valide, 21 pages, 7,826,609 octets, SHA-256 identique à la source.
- `/resources/kit/test_numerico_dependance.pdf` : PDF valide, 2 pages, 911,191 octets, SHA-256 identique à la source.

## Ressources et HTTP

22 URLs locales vérifiées sur disque et en HTTP 200 ; réponses identiques aux fichiers du build.

## Analyse responsive sans navigateur

Dimensions déduites des règles CSS (pas des mesures de rendu). Navigation flexible avec retour à la ligne ; header dans le flux ≤ 1100 px ; titres fluides ≤ 600 px ; PDF et images bornés au conteneur ; liens PDF toujours visibles.

| Écran (px) | Colonne PDF (px) | Texte (px) | Header |
|---:|---:|---:|---|
| 320 | 280 | 280 | dans le flux |
| 375 | 335 | 335 | dans le flux |
| 390 | 350 | 350 | dans le flux |
| 600 | 560 | 560 | dans le flux |
| 768 | 614 | 492 | dans le flux |
| 1024 | 819 | 655 | dans le flux |
| 1280 | 768 | 614 | fixe |
| 1440 | 864 | 691 | fixe |
| 1920 | 1152 | 922 | fixe |

Revue navigateur mobile/desktop et fidélité visuelle finale : à effectuer par OpenBot/superviseur. Aucun navigateur utilisé par cet exécutant.

Les deux liens GATE externes sont conservés exactement ; ils ne sont pas des ressources chargées automatiquement.
