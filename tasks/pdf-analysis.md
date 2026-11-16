# Analyse intégrale des huit PDF Happy Click

## Méthode et couverture

156 pages PDF examinées. La pagination ci-dessous est celle du fichier (à partir de 1), pas celle imprimée sur les diapositives. `scripts/extract-pdfs.py` extrait chaque page avec `pdftotext -layout`, puis rend en JPEG à 180 dpi et OCR français/anglais (`tesseract`) toutes les pages de moins de 260 caractères. `tasks/pdf-text/inventory.json` donne le décompte par page ; textes complets et OCR conservés dans `tasks/pdf-text/`.

**Cartes : 16/16 pages rendues, OCRisées et vues individuellement.** Le texte natif est vide sur les 16 pages, mais les pages contiennent bien 29 questions et leurs corrigés. Les rectos portent 4 cartes sauf p.15 (1 carte). Les versos changent l’ordre des quadrants : association effectuée par le contenu, jamais par position identique.

**Autres pages peu textuelles :** guide jeunes p.4,21,30,31,38,44,45 ; étude parents p.1,9 ; addiction p.5,10,15,20,25 ; désinformation p.20 ; enseignants p.4. Toutes rendues/OCRisées ; planche de contrôle `tasks/pdf-images/contact-autres.jpg`. Guide p.30 : page blanche avec numéro ; p.44 : dessin sur les pressions vécues et le refuge dans les écrans ; p.4,21,31,38,45 : intercalaires illustrés avec bulles. Addiction p.10,15,20,25 : pictogrammes de poignées de main, sans consigne textuelle cachée. Étude p.9 : méthodologie en image, récupérée par OCR. Aucun document traité comme vide.

Ces images sont remises au superviseur dans `tasks/pdf-images/` pour contrôle. Les rendus (~12 Mo) sont ignorés par Git, conservés localement et reproductibles avec `OMP_THREAD_LIMIT=1 python3 scripts/extract-pdfs.py` ; les textes/OCR et leur inventaire sont versionnés. Elles ne sont pas publiées automatiquement. Aucun navigateur/Playwright utilisé par l’exécutant.

## 1. activite_cartes_a_imprimer.pdf — 16 pages

- **Public :** enfants fin primaire/début collège, avec enseignant/parent. Groupes de 4 à 6 selon la page web source.
- **Enjeu :** discuter sécurité et comportement en ligne, attention/santé, impacts matériels du numérique.
- **Pédagogie :** choix multiples possibles, débat avant retournement de la carte ; objectif de compréhension plutôt que réussite (texte source). 29 questions, 116 propositions. Les 29 corrigés et leurs explications sont associés aux pages recto/verso.
- **Sources/crédits :** logos Happy Click, GATE et Télécom SudParis. P.14 : photos créditées France Info, Swiss Info, Amnesty International ; mention de Nature Communications sans référence bibliographique complète pour l’eau et l’IA. Nombreuses affirmations sans référence précise ni date. Pas d’attribution de résultats à une étude non identifiée.

| Pages question / corrigé | Cartes dans l’ordre de lecture du recto | Thème |
|---|---|---|
| 1 / 2 | Mot de passe compliqué ; données personnelles ; achat intégré ; photos et inconnus | Comportements (4) |
| 3 / 4 | Demandes d’amis ; exemple de mot de passe ; pièce jointe inconnue ; insultes/harcèlement | Comportements (4) |
| 5 / 6 | Compte inoxtag_officiel ; fiabilité d’une information | Comportements (2) |
| 5 / 6 | Captation par les applications ; durée des écrans de loisir | Santé (2) |
| 7 / 8 | Vidéos courtes ; FOMO ; comparaison sociale ; lumière bleue | Santé (4) |
| 9 / 10 | Protection des yeux ; coucher et écrans | Santé (2) |
| 9 / 10 | Vidéo/équivalence CO₂ ; recyclage du téléphone | Écologie (2) |
| 11 / 12 | Éteindre les appareils ; streaming/serveurs ; matériaux des batteries ; fabrication/CO₂ | Écologie (4) |
| 13 / 14 | Métaux rares ; eau et IA ; énergie annuelle ; fin de vie/reconditionnement | Écologie (4) |
| 15 / 16 | Fabrication et eau | Écologie (1) |

**Limites à afficher dans le quiz :**
- P.3 : quatrième option étiquetée C au lieu de D sur deux cartes. Textes conservés, lettres normalisées pour l’interaction. Exemple de mot de passe p.3 : le caractère central est un zéro (`P@ssw0rd!84`). Exemple publié, pas une invitation à le réutiliser.
- P.4 : une insulte n’est pas automatiquement une qualification juridique de cyberharcèlement. Retenir l’aide d’un adulte et le signalement, sans diagnostic légal.
- P.6 : corrigé C pour le faux compte ; les « preuves », nombre d’abonnés/pastille ne permettent pas ici de démontrer l’identité. Débat sur B possible, sans déclarer qu’un badge garantit la confiance.
- P.6 : « 2 heures » sans référence d’expert précise ; présenter comme repère du support, pas seuil universel ni diagnostic. Le guide de décembre 2021 p.39,42–43 insiste sur le contexte.
- P.8 : causalité vidéos/dopamine, FOMO dit « syndrome », lumière bleue dite plus intense/dangereuse : raccourcis non étayés dans les cartes ; ne pas transformer en diagnostic ou certitude clinique.
- P.10 : filtre de lunettes et mode logiciel confondus ; bénéfice clinique non démontré par ce document. Horaires de coucher proposés dans le support, pas une ordonnance.
- P.10 : équivalences vidéo/CO₂ et « 15 % recyclés » sans date/périmètre. Pas de chiffre actuel affiché hors citation attribuée.
- P.12 : 80,2 kg / 99 % non sourcés à la page et non généralisables à tous les smartphones ; la comparaison avion ne définit pas ses hypothèses.
- P.14 : « 2 à 3 kWh/an = ampoule LED allumée toute l’année » sans puissance ; l’équivalence ne peut être validée ainsi. « Rares » mélange disponibilité, extraction et concentration de production. Eau/IA : projection de 5,4 milliards de m³ sans année ni référence complète ; le verso lui-même dit estimation variable.
- P.16 : extraction/pollution et eau des composants : discussion sur le cycle de vie, pas seulement la recharge.

## 2. rp_addiction.pdf — 28 pages

- **Public :** groupe de 6 enfants, encadré par un adulte ; famille/école.
- **Enjeu :** mettre en scène fatigue, usages, relations et accompagnement, sans étiqueter les participants.
- **Contenu intégral :** p.1–6 six rôles (élève, ami inquiet, parent, professeur, témoin neutre, médecin scolaire), descriptions/comportements/objectifs ; p.7 carte spécialiste enfants/parents ; tour 1 p.8 contexte, p.9 aide, p.10 pictogramme, p.11 questions, p.12 pistes ; tour 2 p.13–17 selon la même structure ; tour 3 p.18–22 ; tour 4 p.23–27 ; p.28 sources.
- **Pédagogie :** 4 scènes successives, 12 questions de débrief, plusieurs attitudes possibles ; finir chaque scène par une discussion.
- **Sources nommées p.7,28 :** OMS, Santé publique France, MILDECA, INSERM, Éducation nationale, Ministère de la Santé, plan « Pour un usage raisonné des écrans ». Références génériques, sans liens d’études ni dates détaillées.
- **Adaptation :** utiliser le titre « Écrans et équilibre » ; conserver le PDF original et ses rôles consultables. Les horaires (21 h), durées de sommeil (8–10 h) et termes médicaux du scénario ne deviennent pas une consigne médicale personnalisée. Les quatre tours et toutes les pages d’aide/débrief sont accessibles sur site.

## 3. rp_cyberharcelement.pdf — 24 pages

- **Public :** six enfants avec encadrant ; rôle des adultes à expliciter.
- **Enjeu :** reconnaître une situation de souffrance, écouter sans jugement, soutenir et mobiliser les adultes.
- **Contenu :** p.1–6 élève harcelé, ami, parent, professeur, harceleur, CPE ; p.7 carte CPE. Tour 1 p.8–11 : discussion à la maison ; tour 2 p.12–15 : retour à l’école, ami et auteur ; tour 3 p.16–19 : intervention du professeur ; tour 4 p.20–23 : CPE, protection/confidentialité/suivi. P.24 sources. Chaque tour a contexte, aide, trois questions de débrief et réponses (12 au total).
- **Pédagogie :** jeu de rôles puis discussion des actions et des postures. Aucun enfant obligé de raconter une situation personnelle ; scénario fictif.
- **Sources p.7,24 :** CNIL, Cybermalveillance.gouv.fr, Éducation nationale/pHARe/NonAuHarcèlement, UNICEF, Éducation aux écrans, OMS, Service-public.fr, Code pénal ; Assurance prévention p.7. Numéro 3018 dans le PDF. Ces références restent celles du document, non des vérifications de leur état actuel.
- **Limites :** p.20 « mis face à ses responsabilités » et p.21 pression à parler contredisent le respect du rythme p.19. Ne pas reproduire cette culpabilisation comme consigne d’animation. P.23 peines et qualification légale datables/non précisées : ne pas en faire un quiz juridique ni une affirmation actuelle. PDF complet conservé.

## 4. rp_desinformation.pdf — 21 pages

- **Public :** six enfants avec parent/enseignant dans la mise en scène.
- **Enjeu :** passer de l’affirmation à la vérification d’une information, accepter la discussion.
- **Contenu :** p.1–6 rôles (élève désinformé, ami, élève informé, professeur, parent, expert numérique) ; p.7 carte expert (auteur, contexte, croisement des sources, dialogue). Tour 1 p.8–11 : fausse nouvelle, aide, 3 questions et pistes. Tour 2 p.12–13 : recherche du professeur et aide, **pas de débrief spécifique dans le PDF**. Tour 3 p.14–17 : réunion, aide, 3 questions et pistes. Tour 4 p.18–20 : recherche en famille, aide, une question récapitulative ouverte, **pas de corrigé séparé**. P.21 sources. La numérotation imprimée p.20 «22» et p.21 «11» est erronée ; références données en pages PDF.
- **Pédagogie :** invention d’une information fictive, confrontation, recherche, réinvestissement ; pas de réponse universelle pour une recherche choisie par le groupe.
- **Sources p.21 :** Gouvernement français / Info.gouv.fr, UNESCO (compétences MIL, éducation aux médias), CNIL, Éducation nationale. P.7 cite Décodex comme outil, sans garantir sa disponibilité actuelle.
- **Adaptation :** les 4 scènes, 6 rôles et 7 questions de débrief sont présents. Aucun corrigé inventé pour les tours 2/4 ; ajouter seulement une invitation explicitement éditoriale à discuter de la recherche.

## 5. test_numerico_dependance.pdf — 2 pages

- **Public :** enfants ; à utiliser comme support de dialogue avec un adulte.
- **Enjeu :** décrire ses usages et la place qu’ils prennent dans la vie quotidienne.
- **Contenu p.1 :** champ prénom, questions 1–10 : appareils, activités, moments de la journée, fréquence hebdomadaire, équipement personnel, règles parentales, accompagnement, réseaux, activités délaissées, perception du temps. P.2 : question 11 durée quotidienne ; 11 encadrés de conseils a–k.
- **Pédagogie :** questionnaire avec choix simples/multiples ; aucun barème ni correspondance explicite entre réponses et conseils, aucun instrument validé identifié.
- **Sources :** Happy Click/site d’origine ; aucune bibliographie interne.
- **Adaptation :** les 11 questions et toutes leurs options sont conservées ; prénom supprimé de la saisie (PDF inchangé). Aucun total ni seuil « dépendance ». Restitution descriptive des choix, questions pour dialoguer, sources p.1–2 et guide p.39,42–43. Les jugements « excessive », « modérée » et seuil « 2 h » ne sont pas attribués automatiquement. Mémoire de la page uniquement, ni stockage ni envoi ; remise à zéro possible.

## 6. questionnaire_enseignants.pdf — 4 pages

- **Public :** enseignants primaire/collège ; réflexion professionnelle.
- **Enjeu :** usages des élèves, effets sur les apprentissages, inégalités, rôles éducatifs et leviers d’action.
- **Contenu p.1 :** présentation d’une collecte anonyme d’origine, niveau/ancienneté/discipline ; 3 questions sur évolution, apprentissages, situations problématiques. P.2 : 2 questions sur inégalités/santé et 3 sur apprentissages/institutions/familles. P.3 : 3 questions sur méthodes/compétences et 2 sur ressources/leviers. P.4 : 1 question de débat public. **14 questions ouvertes**, en plus des informations générales.
- **Pédagogie :** entretien/réflexion qualitative, aucun résultat statistique ni barème.
- **Sources :** projet citoyen Happy Click, sans bibliographie interne.
- **Adaptation :** 14 questions intégrales en carnet local, pas de collecte/nom/établissement ni métadonnées professionnelles. L’annonce d’anonymat du PDF n’est pas une promesse de collecte du site : aucun envoi. Restitution = notes saisies, pas statistiques fictives.

## 7. guide_parents.pdf — 9 pages

- **Public :** parents, enseignants et acteurs de l’accompagnement familial.
- **Enjeu :** écarts entre perceptions parents/enfants, changements liés aux confinements, dialogue plutôt que seule surveillance.
- **Auteurs/crédits :** OPEN et Unaf ; étude réalisée par Ipsos, avec le soutien de Google (logos p.1). P.8 présente les organismes. Photographie et logos conservés dans le PDF, couverture reproduite comme aperçu du document.
- **Date/méthode p.9 (OCR + rendu) :** terrain parents 9–22 juillet **2021**, 2 012 interviews de parents d’enfants 0–17 ans ; enfants 9–19 juillet **2021**, 600 interviews de 7–17 ans ; questionnaires en ligne, quotas/redressements précisés. Pas une enquête menée par ce site.
- **Contenu :** p.1 couverture/crédits ; p.2 chiffres clés crise/risques/opportunités ; p.3 difficultés d’accompagnement ; p.4 équipements/temps et écarts de perception ; p.5 pratiques et réseaux sous-estimés ; p.6 réseaux/risques/bénéfices ; p.7 contrôle, dialogue et outils de surveillance ; p.8 besoins de ressources, actions locales et présentation OPEN/Unaf ; p.9 méthode/échantillons.
- **Pédagogie :** lire les perceptions en regard, ouvrir une discussion familiale sur les contenus, pas uniquement le temps.
- **Limites :** chiffres de 2021, déclaratifs, âges et populations distincts. Les variations p.2 et p.4 ne doivent pas être fusionnées sans questionnaire complet. Restitution datée et attribuée ; pas de chiffre présenté comme actuel.

## 8. guide_jeune_et_numerique.pdf — 52 pages

- **Public :** professionnels de la jeunesse/éducation/santé, puis parents ; adolescents selon les sujets. Pas un petit quiz enfant sur les sujets intimes.
- **Enjeu :** culture professionnelle commune, pluralité des avis, accompagnement contextualisé plutôt que panique morale ou diagnostic rapide.
- **Auteurs/date :** L’Agora·MDA Niort et Ireps Nouvelle-Aquitaine, **décembre 2021** (p.52 ; rédaction dernier trimestre 2021 p.2). Coordination Matthieu Aguesse/Émilie Ly. Soutiens Caf Deux-Sèvres et ARS Nouvelle-Aquitaine.
- **Contributeurs p.52 :** Vincent Bernard, Anna Bisch, Guillaume Dorai, Arnaud Gheysens, François Herbulot, Celia Hodent, Nadège Larcher, Thomas Rohmer, Serge Tisseron, Marion Haza-Pery. Illustrations Naïs Coq ; graphisme Isabelle Demeurie ; crédits Pixabay, Studiogstock/Freepik, Shutterstock. Aucun visuel tiers extrait pour décorer artificiellement le site.
- **Pédagogie :** questions de professionnels + réponses nominatives parfois divergentes ; bibliographie et ressources en fin de guide. Ne pas aplatir ces avis en vérités uniques.

| Pages PDF couvertes | Contenu / enjeu |
|---|---|
| 1–3 | Couverture, éditorial/partenaires, sommaire |
| 4–5 | Intercalaire Éducation 2.0 ; repères 3-6-9-12+, accompagnement/alternance/autorégulation, sources Tisseron |
| 6–7 | Cybersécurité, mythes du « digital native », PIX, formation/arnaques |
| 8–9 | Posture parentale, cadre progressif, exemplarité et dialogue |
| 10–11 | Curiosité pour les usages, veille et formation des professionnels, économie de l’attention |
| 12–13 | Contrôle vs accompagnement, intimité/géolocalisation, « conduite accompagnée » |
| 14–15 | Premier smartphone, normes sociales, motivations parentales |
| 16–17 | Traces, données, réputation, information collective et accompagnement individuel |
| 18–19 | Images non souhaitées, groupe, réception individuelle, esprit critique |
| 20 | Limites de la restriction seule, règles et confiance ; références Beyens/Beullens et Padilla-Walker et al. |
| 21–22 | Intercalaire réseaux ; protection de l’enfance et accès aux contenus adultes |
| 23 | Légitimité et modération des débats en ligne |
| 24 | Cyberviolence/harcèlement, recours et CNIL ; affirmations juridiques/hypothèses à dater |
| 25 | Analyse des conflits selon contexte, rôle et relation du professionnel |
| 26–28 | #anti2010, viralité et médiatisation ; plusieurs points de vue distincts |
| 29 | Âges/RGPD : exposé daté 2021, ne pas réutiliser comme état du droit actuel |
| 30–31 | Page blanche numérotée puis intercalaire illustré jeux vidéo |
| 32–33 | Jeux vidéo : diversité des jeux/joueurs/contextes ; éviter pour/contre simpliste |
| 34–35 | Émotions, besoins, expérimentation et fiction ; Glasser/Ready Player One cités |
| 36–37 | Usage problématique, captologie, FoMO/lootboxes ; étude Parlement européen 2020 citée |
| 38–39 | Intercalaire santé ; temps de jeu insuffisant pour diagnostiquer, socialisation/créativité, avis de Tisseron |
| 40–41 | Image de soi, filtres, limites méthodologiques d’une étude isolée ; Eli Pariser cité |
| 42–43 | Passion/difficultés, dynamique familiale, éviter l’autodiagnostic |
| 44–45 | Illustration sur les pressions et le refuge numérique ; intercalaire intimité |
| 46–47 | Relations en ligne, reconnaissance du vécu, rencontre et accompagnement |
| 48–49 | Consentement, diffusion d’images intimes, soutien sans jugement ; ne pas confondre victime et responsable |
| 50–51 | Extimité, estime de soi, mise en scène, traces et audience ; Tisseron cité |
| 52 | Coordination, contributeurs, crédits, date, ressources/bibliographie et contacts |

**Limites d’actualisation :** numéros, services, paramètres de plateformes et droit cités dans un guide de 2021 peuvent évoluer. Le site présente des résumés sourcés par chapitre, pas des conseils juridiques/médicaux actualisés. Les opinions p.18/24/39 notamment sont situées et ne deviennent pas des règles universelles. Ne pas reconduire le numéro 3020 mentionné en 2021 comme contact actuel sans vérification.

## Choix de restitution

- 29 cartes complètes : 10 comportements, 8 santé, 11 écologie ; mots de la question/options conservés, ponctuation/espaces harmonisés, corrections d’OCR contrôlées visuellement. Réponses attribuées au support et discussion/nuance séparées.
- 11 questions d’usage, 14 questions enseignants, 3 jeux de rôles × 6 rôles × 4 tours ; aucun barème inventé, aucune donnée envoyée ou conservée après remise à zéro/navigation.
- 2 guides avec dates, auteurs, sommaires utiles et liens aux pages pertinentes ; PDF complets inchangés.
- Les textes et documents de l’ancien site restent accessibles dans Kit et Guides ; les deux liens GATE restent au pied de page.

## Correspondance détaillée des quiz

Voir `tasks/quiz-source-map.md` : les 29 questions, leur quadrant recto/verso, les lettres du corrigé et les pages correspondantes. `src/data/quiz.json` contient aussi toutes les options, les retours pédagogiques, les nuances et les questions de discussion.
