# Leçons de revue

- Une route statique correcte sans slash peut répondre 404 avec slash en preview Astro si `trailingSlash: never`. Pour cette préversion, accepter les deux formes avec `ignore` et contrôler les deux variantes par HTTP sans redirection.
- Distinguer contrôle CSS par l’exécutant et revue navigateur rapportée par OpenBot ; documenter le périmètre exact de la revue.
- Une résolution DNS ou une configuration Coolify ne démontre pas que le site et HTTPS sont opérationnels. Consigner le déploiement comme en cours jusqu’au constat du superviseur.
- Retour Dan « il manque plein de truc » : comparer les contenus internes des PDF et les parcours proposés, pas seulement la présence de liens. Couvrir chaque page, transcrire les questions et leurs explications, rattacher chaque activité à ses sources.
- Un PDF sans texte extrait n’est pas vide : rendre/OCR toutes ses pages, contrôler visuellement les cartes et consigner la couverture intégrale. Aucun score ou diagnostic inventé pour les questionnaires.
- Une nouvelle DA rend les anciennes assertions de titres/navigation obsolètes : adapter les attentes sans supprimer les contrôles de textes, questions, PDF, liens, noindex et HTTP. Ne pas réutiliser la validation visuelle de la précédente version.
- Tester les mots longs dans les titres à 320 px (ex. Cyberharcèlement) ; autoriser césure/retour à la ligne plutôt que masquer un débordement.
- Ne pas déduire la transparence du nom du fichier : vérifier le canal alpha et le rendu ; un damier RGB est une image opaque.
- Des hashes PDF différents ne prouvent pas un nouveau contenu : comparer texte, pagination et rendus ; pour les cartes sans texte, comparer les images incorporées. Distinguer archives de promotion et nouveautés.
- Consigner les preuves publiques dans un document durable indépendant du rapport que verify régénère.
- Retour Dan « Adapte le site au logo […] c’est moche » : un nouveau logo implique de réévaluer palette, typographie, formes et composition globale. Ne pas plaquer le symbole sur une DA héritée incohérente ; définir un système partagé et revoir chaque famille de pages, y compris les états interactifs.

- Cache CSS : une URL stable peut servir d’anciens styles à un navigateur persistant avec du nouveau HTML, même si verify HTTP retourne les bons octets. Importer les styles via Astro pour une URL avec hash de contenu ; contrôler chaque CSS actif et ses ressources dans le build/HTTP. Ni rafraîchissement forcé ni timestamp variable comme correctif.
- Retour mobile Dan : absence d’overflow ≠ qualité mobile. Recomposer la hiérarchie, limiter la hauteur du header/hero et mesurer l’accès aux actions dans le premier écran ; ne pas simplement empiler les sections desktop. Consigner les positions réelles des CTA/cartes, puis faire valider le parcours au pouce et au clavier.
- Retour Dan « c cense etre un site pr enfant parent la ca fait trop pro et ia slope » : une palette issue du logo et un responsive propre ne donnent pas un univers enfant. Partir du matériau réel du produit (cartes qu'on retourne, rôles qu'on pioche), nommer les choses avec les mots d'un enfant de 10 ans, séparer clairement le chemin « jouer » du chemin « adulte ». Bannir les tics générés : étiquettes en capitales, 01/02/03, flèches, grilles de cartes identiques, slogans en triade.
- Retour Dan après la refonte « table de jeu » : « J'ai rien compris […] Les quiz c'était en plus, c'était pas le truc principal. Faut quand même parler du projet. » Avant de choisir un angle, relire le site officiel en ligne et les éditions précédentes pour savoir **ce qu'est le produit** (ici, un projet étudiant d'interventions en école, avec un kit). Ne pas faire d'une activité secondaire la promesse principale. Expliquer les livraisons à Dan en phrases simples, sans jargon de design.

- Pour cette tâche de scroll cinématique Happy Click, Dan a choisi explicitement Codex GPT Astra en effort high. Ne jamais sélectionner Sol par défaut pour cette mission.

- Dan a rejeté la version du 23 novembre centrée sur l’éventail de cartes. Une demande de refonte complète implique de changer la composition et la navigation de toutes les familles de pages. Pour un accueil rythmé par le scroll, établir d’abord un storyboard du haut au bas de la page, puis comparer les silhouettes à des positions fixes en descendant et en remontant, aussi sur mobile.

- Dan veut voir le décor changer dès le premier geste. Au contrôle d’une animation, regarder la séquence à vitesse normale et ses états intermédiaires : une petite variation de matrice sur un visuel ne prouve pas que la scène se transforme.
- Pour une désactivation demandée après une refonte, vérifier le nouveau commit déployé, le catalogue et les anciennes URL directes. Les tests de jouabilité de la refonte ne valident pas la désactivation.
