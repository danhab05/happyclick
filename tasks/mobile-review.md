# Recomposition mobile — après 80ae3e2

## Problème constaté par OpenBot

Dan : « Le site est pas fou du tt sur mobile ». À 390×844, OpenBot mesure sur la DA précédente : header **193 px**, hero **941 px**, premier CTA **y582**, second **y646**, logo **y775 / h258**, première grille de thèmes **y1407**. L’absence d’overflow ne rend pas cette composition efficace. Les anciennes approbations du responsive ne valent pas validation de cette nouvelle composition.

Base `80ae3e2` poussée, correction de cache conservée. Cette mission reste **locale, sans push avant nouvelle revue**. Aucun navigateur/Playwright ni appel d’infrastructure par l’exécutant.

## Composition implémentée

- Sous 800 px, header en une rangée : logo 44 px + nom à gauche, commande native **Menu** à droite. Hauteur CSS minimale 76 px, bordure comprise autour de 77 px. Sous-titre et CTA redondant retirés de cette rangée.
- Menu natif `details/summary`, fermé initialement, cinq liens de 48 px, même destination courante que desktop. L’ouverture pousse le contenu ; pas de superposition masquant un contrôle au clavier, ni de modal/focus trap. Fermeture en activant à nouveau Menu. Aucun JS supplémentaire, aucun faux `aria-expanded` à synchroniser. Entrée/Espace/Tab reposent sur le comportement natif à vérifier par OpenBot.
- Desktop : navigation visible identique, menu mobile masqué. Les deux versions sont issues de la même liste de liens ; CSS masque la version inactive.
- Hero mobile : badge court, titre 32 px (30 px sous 360), phrase de présentation concise à 16 px, CTA quiz de 48 px et accès au kit de 44 px. Pas de second grand logo ni de liste de badges empilée. Le grand logo et les bénéfices restent présents sur desktop ; le logo du header porte l’identité sur mobile.
- Entrées quiz : titre direct, courts repères ; cartes entières cliquables, pictogramme 40 px à gauche, titre/thème/comptage à droite, description puis action compacte. Pas de minimum de hauteur décoratif ni de texte tronqué.
- Quiz : introductions, progression, question, choix et actions rapprochés ; options à 16 px, contrôles d’au moins 48 px, bouton précédent compact. Tous les choix, feedbacks, nuances, bilans et références restent présents.
- Kit, guides, FAQ et trois jeux : sommaire natif fermé sur mobile, sidebar complète sur desktop. Chaque destination est conservée ; liens PDF consulter/télécharger toujours hors aperçu repliable.
- Footer : deux groupes natifs repliables sur mobile, ouverts visuellement comme avant sur desktop. Liens GATE et archives conservés. Pas de duplication d’identifiants.
- Espaces réduits et rythme resserré pour les sections, rôles, documents, FAQ, questionnaires et équipe. Le visuel d’édition devient un petit bloc horizontal sur mobile ; équipe en deux colonnes, puis une sous 360 px.

`ResponsiveDisclosure.astro` porte les sommaires et groupes de footer : les deux présentations ont exactement les mêmes liens via slot, sans stockage ni JS. Les titres et contenus pédagogiques ne sont pas supprimés. Les descriptions du hero sont redistribuées dans le bloc de discussion ; aucun changement aux données pédagogiques.

## Mesures à effectuer par OpenBot

Les valeurs ci-dessous sont des **cibles**, pas des observations d’un navigateur par l’exécutant. Le CSS fixe des tailles et espacements, mais le rendu réel dépend notamment des retours à la ligne.

| Mesure à 390×844, menu fermé, défilement initial | Avant (OpenBot) | Cible |
|---|---:|---:|
| Hauteur du header | 193 px | 72–88 px |
| Haut du CTA principal | y582 | au plus y400–450 |
| Première entrée thème réellement visible | grille y1407 | au plus y650–800 |
| Hero | 941 px | bloc compact, sans grand logo empilé |

À contrôler aussi à 320 px : header sur une rangée, Menu et nom visibles, texte non coupé, CTA accessible rapidement, cartes faciles à activer et sommaires fermés par défaut. À 768 px : composition mobile et menu ; à 1440/1920 : navigation desktop et grand logo préservés.

Parcours de revue :

1. Tabulation vers le lien d’évitement, le logo puis Menu ; ouvrir/fermer via Entrée/Espace, parcourir les cinq liens au clavier et au pouce. Le menu ouvert pousse la page et n’obscurcit aucun focus.
2. Accueil : mesurer header, CTA principal et première carte ; apprécier la densité et la hiérarchie à 390/320, pas seulement l’overflow.
3. `/quiz` puis `/quiz/comportements` : accès rapide à la question/aux choix ; erreur sans choix, sélection, validation, feedback/focus, suivante, bilan/rejouer. Pas d’action masquée par un élément fixe.
4. Kit/guides : ouvrir le sommaire, suivre une ancre, consulter/télécharger les PDF ; vérifier les deux couvertures après défilement.
5. Trois jeux, FAQ, projet/équipe, usages et carnet : densité, lisibilité, ouverture des volets, boutons et restitution.
6. Footer : ouvrir chaque groupe, suivre ses liens et vérifier le focus. Vérifier aussi les versions desktop des sommaires/footer.

## Vérification technique

- CSS toujours importée par Astro avec hash de contenu ; aucun retour à `/style.css`.
- Build **15 pages**, tests **18/18** : 14 pédagogiques, deux sur le cache CSS, deux nouveaux sur les menus/disclosures natifs et la conservation de leurs liens/ancres. Les tests DOM ne simulent pas le moteur de rendu ou les touches natives d’un navigateur.
- Verify local : **60 URLs HTTP 200 identiques au build / 319 références**. Les 31 références supplémentaires viennent des sommaires présents en versions desktop/mobile ; elles pointent vers les mêmes ancres. Les 288 précédentes restent couvertes.
- Verify contrôle les cinq destinations et le lien actif de chaque navigation séparément. CSS hashée, ressources locales/MIME, noindex, 26 blocs source, 29 questions/116 choix, 11 usages, 14 enseignants, trois jeux et dix PDF/204 pages toujours contrôlés.
- Données, scripts/lib applicatifs, assets/PDF et fichiers package inchangés par rapport à 80ae3e2. Aucun nouveau module client.
- Serveur local existant réutilisé sur `0.0.0.0:4321`. Aucun push autorisé pour cette composition avant revue ; commit local avec trailer OpenBot.

Reprise : `npm run build && npm test && npm run verify -- --base-url http://127.0.0.1:4321`. Résultats détaillés dans `tasks/verification.md`. **Revue réelle OpenBot encore attendue** ; ne pas conclure que les cibles sont atteintes sur la seule base des contrôles automatisés.
