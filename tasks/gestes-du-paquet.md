# Accueil et quiz · le geste du paquet

L’audit de la préversion à 1440 × 900 et 390 × 844 montre deux difficultés. Sur mobile, le premier panneau rose commence par un espace vide sous le hero. Dans le quiz, le fond sombre, le titre du paquet et les quatre réponses encadrées se disputent l’attention.

La référence de design a été consultée comme documentation Markdown au commit [91e15664896f6f27e75dcf1414d1226cb95fa167](https://github.com/dickwu/apple-design-skill/tree/91e15664896f6f27e75dcf1414d1226cb95fa167).

| Lecture | Décision pour Happy Click |
| --- | --- |
| SKILL.md, sections « Visual design and craft » et « Design improvement mode » | Un seul objet porte le mouvement. Les trois cartes proviennent du PDF déjà proposé aux enseignants, pages 1, 5 et 9. Le violet, le bleu et le vert identifient aussi les paquets jouables. |
| references/hig/motion.md | Les cartes s’écartent avec le défilement natif et reviennent sur le même chemin. Les liens et les actions de jeu restent disponibles pendant le geste. |
| references/hig/accessibility.md | La composition fonctionne à l’arrêt. Une préférence de mouvements réduits désactive les animations. Le clavier conserve un focus visible et le corrigé annonce le résultat en toutes lettres. |
| references/hig/layout.md et typography.md | La question et les réponses suivent un seul axe de lecture. Le nom du paquet et la progression occupent la marge sur ordinateur et passent au-dessus de la question sur mobile. |
| references/hig/design-principles.md, « Craft » et « Delight » | Les cartes donnent leur matière à l’accueil. Les halos, les compteurs de scène et les balayages plein écran ont été retirés. |
