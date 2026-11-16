# Leçons de revue

- Une route statique correcte sans slash peut répondre 404 avec slash en preview Astro si `trailingSlash: never`. Pour cette préversion, accepter les deux formes avec `ignore` et contrôler les deux variantes par HTTP sans redirection.
- Distinguer contrôle CSS par l’exécutant et revue navigateur rapportée par OpenBot ; documenter le périmètre exact de la revue.
- Une résolution DNS ou une configuration Coolify ne démontre pas que le site et HTTPS sont opérationnels. Consigner le déploiement comme en cours jusqu’au constat du superviseur.
- Retour Dan « il manque plein de truc » : comparer les contenus internes des PDF et les parcours proposés, pas seulement la présence de liens. Couvrir chaque page, transcrire les questions et leurs explications, rattacher chaque activité à ses sources.
- Un PDF sans texte extrait n’est pas vide : rendre/OCR toutes ses pages, contrôler visuellement les cartes et consigner la couverture intégrale. Aucun score ou diagnostic inventé pour les questionnaires.
- Une nouvelle DA rend les anciennes assertions de titres/navigation obsolètes : adapter les attentes sans supprimer les contrôles de textes, questions, PDF, liens, noindex et HTTP. Ne pas réutiliser la validation visuelle de la précédente version.
- Tester les mots longs dans les titres à 320 px (ex. Cyberharcèlement) ; autoriser césure/retour à la ligne plutôt que masquer un débordement.
