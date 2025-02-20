# Approche de surveillance et de contrôle des composants

## Date de mise à jour: 21/10/2023

Notre approche a évolué pour garantir la qualité et la conformité des composants de l'application. Voici les points clés de notre nouvelle stratégie :

1. **Surveillance des composants** :

   - Utilisation du module `surveillance-system.ts` pour surveiller automatiquement le dossier `src/components`.
   - Analyse des fichiers de style (fichiers avec extension `.styles.css`, `.styles.js`, etc.) de chaque composant.
   - Génération automatique de rapports de contrôle pour chaque composant dans le dossier `src/__test-system__/__reports__`.

2. **Bonnes pratiques (Version Stable)** :

   - Vérification de la présence des identifiants `data-testid` (par exemple, `stable-container`, `stable-header`, etc.).
   - Utilisation des variables CSS pour une gestion standardisée des couleurs.
   - Application de l'affichage en flex et des classes de thème (`theme-light` ou `theme-dark`).

3. **Mauvaises pratiques (Version Instable)** :

   - Détection des valeurs en dur pour les propriétés CSS, telles que les couleurs fixées (ex: `background-color: #ff0000`).
   - Détection de l'utilisation de `display: block` au lieu de `flex`.
   - Identification des dimensions fixes, des transitions longues et d'autres pratiques déconseillées.

4. **Test et comparaison** :

   - Les tests de la version stable (`stable-layout.tests.ts`) servent de référence pour les bonnes pratiques.
   - Les tests de la version instable (`unstable-layout.tests.ts`) illustrent les pratiques à éviter.
   - Le fichier `demoLayout.tsx` compare visuellement les deux approches pour présenter clairement la version à adopter et celle à éviter.

5. **Évolution continue** :
   - Le système surveille en continu le dossier `src/components` pour détecter et analyser tout nouveau composant.
   - Chaque composant est validé par rapport aux règles définies, et des rapports permettent d'identifier les écarts par rapport aux standards.
   - Les retours d'analyse alimentent un processus d'amélioration continue des pratiques de développement.

Cette approche intégrée permet de maintenir une haute qualité de code et de respecter les conventions établies par l'équipe.
