# Leçons de revue

- Une route statique correcte sans slash peut répondre 404 avec slash en preview Astro si `trailingSlash: never`. Pour cette préversion, accepter les deux formes avec `ignore` et contrôler les deux variantes par HTTP sans redirection.
- Distinguer contrôle CSS par l’exécutant et revue navigateur rapportée par OpenBot ; documenter le périmètre exact de la revue.
- Une résolution DNS ou une configuration Coolify ne démontre pas que le site et HTTPS sont opérationnels. Consigner le déploiement comme en cours jusqu’au constat du superviseur.
