# Guide des Bonnes Pratiques – Modèle par Défaut

Ce document représente le modèle par défaut des bonnes pratiques à respecter pour la création, l'implémentation et la maintenance de tous les composants de l'application. Il définit de manière exhaustive les règles en termes de structure, de styles, d'accessibilité et de fichiers obligatoires. Toute déviation par rapport à ce modèle sera immédiatement signalée par le système de surveillance intégré.

## 1. Structure des Composants

Chaque composant doit respecter une organisation stricte pour garantir cohérence et maintenabilité :

- Le composant doit posséder un élément principal avec l'attribut `data-testid="stable-container"`.
- Il doit inclure un en-tête identifiable via `data-testid="stable-header"`.
- Un bouton d'action doit être présent lorsque nécessaire, identifié par `data-testid="stable-button"`.
- Le contenu principal doit être regroupé dans un conteneur avec `data-testid="stable-content"`.
- Pour l'organisation interne, chaque section doit être structurée avec des conteneurs :
  - `data-testid="stable-item-row"` pour les lignes.
  - `data-testid="stable-item-column"` pour les colonnes.

## 2. Fichiers Obligatoires

Pour assurer un suivi optimal, chaque composant doit être accompagné de l'ensemble des fichiers suivants :

- Fichier du composant principal : `<NomComposant>.jsx` ou `<NomComposant>.tsx`.
- Fichier de style associé : `<NomComposant>.styles.css` ou `<NomComposant>.styles.js` (ou tout autre préprocesseur utilisé).
- Fichier de test : `<NomComposant>.test.jsx` ou `<NomComposant>.test.tsx`.
- Fichier d'index (recommandé) : `index.js` ou `index.ts`.

Tout manquement à cette liste sera systématiquement signalé par le système de surveillance.

## 3. Styles et Mise en Forme

Les styles des composants doivent respecter strictement le modèle par défaut :

- Utiliser `display: flex` pour la mise en page afin d'assurer une disposition fluide et adaptative.
- Gérer systématiquement les espacements :
  - Les marges (margin) doivent être définies de manière cohérente.
  - Les espacements internes (padding) doivent être harmonisés.
  - Utiliser le gap pour définir les espaces entre les éléments.
- Les valeurs des margin, padding et gap doivent être définies via des variables CSS (par exemple, `var(--spacing-small)`, `var(--spacing-medium)`, etc.) dans le système de thèmes (fichiers `theme-config.ts` ou `theme.css`). Toute valeur numérique fixe sera signalée.
- Recourir aux variables CSS (ex : `var(--nom-de-variable)`) pour définir les couleurs et autres propriétés graphiques afin d'assurer flexibilité et cohérence.
- Les couleurs utilisées doivent provenir d'un système centralisé, interdisant l'usage de couleurs en dur.
- Appliquer rigoureusement une classe de thème (`theme-light` ou `theme-dark`) en fonction du contexte d'affichage.

## 4. Hiérarchie et Dimensionnement

L'organisation interne des composants doit respecter une structure hiérarchique claire :

- Le conteneur principal (`stable-container`) sert de référence pour l'ensemble de la structure.
- Les sous-éléments (lignes et colonnes) doivent être utilisés pour structurer le contenu de manière logique.
- Les dimensions, alignements et espacements (margin, padding, gap) doivent être définis selon des standards stricts, garantissant une présentation uniforme et esthétiquement cohérente.

## 5. Pratiques de Nomination et Accessibilité

Pour améliorer la maintenabilité et l'accessibilité des composants :

- Utiliser des noms explicites et normalisés pour les classes CSS et les attributs `data-testid`.
- Concevoir les composants de façon à faciliter leur identification lors des tests automatisés.
- Intégrer des attributs ARIA et autres pratiques d'accessibilité pour optimiser l'expérience utilisateur sur tous les types d'appareils.

## 6. Validation et Surveillance Automatique

Le système de surveillance vérifie chaque composant selon le modèle par défaut et signalera toute déviation, notamment :

- L'absence d'un élément obligatoire dans la structure ou d'un fichier requis.
- Toute déviation sur les règles CSS, telles que l'utilisation incorrecte de `display`, l'emploi de valeurs en dur pour les couleurs, ou des espacements (margin, padding, gap) non conformes aux variables définies.
- L'inadéquation par rapport aux conventions de nommage et d'accessibilité.
- Toute autre pratique qui ne respecte pas strictement le modèle par défaut.

Ces contrôles sont réalisés automatiquement afin d'assurer la qualité et l'uniformité de tous les composants du projet.

## Conclusion

Ce guide est la référence unique et exhaustive pour les bonnes pratiques de développement des composants. Il sert de modèle par défaut et toute déviation sera immédiatement signalée par notre système de surveillance, garantissant ainsi une qualité optimale et une cohérence à travers l'ensemble de l'application.
