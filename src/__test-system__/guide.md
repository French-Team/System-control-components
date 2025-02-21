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

### 3.1 Organisation des Variables CSS

Les variables CSS doivent être organisées par catégories dans `:root` :

```css
:root {
  /* Espacements */
  --spacing-small: 0.5rem;
  --spacing-medium: 1rem;
  --spacing-large: 2rem;

  /* Dimensions */
  --header-height: 100px;
  --footer-height: calc(var(--header-height) / 2);

  /* Points de rupture */
  --breakpoint-tablet: 768px;
  --breakpoint-mobile: 480px;

  /* Bordures */
  --border-radius: 8px;

  /* Z-index */
  --z-index-header: 1000;

  /* Couleurs */
  --color-light-bg: #f5f5f5;
  --color-dark-bg: #1a1a1a;
  /* etc... */
}
```

### 3.2 Règles Flex par Défaut

Tous les éléments de layout doivent suivre ces règles par défaut :

```css
[class^='layout-'] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex: 1;
}
```

Exceptions :

- Les éléments à hauteur fixe (header, footer) doivent utiliser `flex: none`
- Les éléments nécessitant une direction spécifique doivent surcharger avec `flex-direction`

### 3.3 Thèmes et Couleurs

- Utiliser les variables CSS pour toutes les couleurs
- Appliquer les classes `theme-light` ou `theme-dark`
- Définir les couleurs dans le thème et non directement dans les composants

### 3.4 Calculs des Tailles Adaptatives

Les tailles des éléments doivent être calculées de manière à garantir une lisibilité optimale sur tous les écrans :

#### Texte

```css
/* Utilisation de clamp() pour le texte */
:root {
  /* Tailles de base avec limites min/max */
  --font-size-base: clamp(14px, 2vw, 16px);
  --font-size-small: clamp(12px, 1.8vw, 14px);
  --font-size-large: clamp(16px, 2.2vw, 18px);
  --font-size-header: clamp(16px, 2.5vw, 20px);
}

/* Exemple d'application */
.text-element {
  font-size: clamp(12px, 2vw, var(--font-size-base));
}

/* Pour les titres */
.title-element {
  font-size: clamp(14px, 2.5vw, var(--font-size-header));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* En mobile, permettre le retour à la ligne */
@media screen and (max-width: var(--breakpoint-mobile)) {
  .title-element {
    white-space: normal;
    word-wrap: break-word;
  }
}
```

#### Icônes et Éléments Interactifs

```css
/* Tailles proportionnelles avec limites min/max */
.interactive-element {
  width: clamp(24px, calc(100% / 3), 32px);
  height: clamp(24px, calc(100% / 3), 32px);
  font-size: clamp(14px, calc(100% / 4), 18px);
}

/* Adaptation tablette */
@media screen and (max-width: var(--breakpoint-tablet)) {
  .interactive-element {
    width: clamp(20px, calc(100% / 4), 28px);
    height: clamp(20px, calc(100% / 4), 28px);
    font-size: clamp(12px, calc(100% / 5), 16px);
  }
}

/* Adaptation mobile */
@media screen and (max-width: var(--breakpoint-mobile)) {
  .interactive-element {
    width: clamp(18px, calc(100% / 5), 24px);
    height: clamp(18px, calc(100% / 5), 24px);
    font-size: clamp(10px, calc(100% / 6), 14px);
  }
}
```

#### Règles Générales pour les Calculs Adaptatifs

1. **Utilisation de `clamp()`**

   - Toujours définir une taille minimale en pixels
   - Utiliser une valeur relative (vw, %) pour l'adaptation
   - Définir une taille maximale pour éviter les débordements

2. **Proportions**

   - Calculer les tailles en fonction du conteneur avec `calc()`
   - Maintenir des ratios cohérents entre les éléments
   - Adapter les proportions selon les breakpoints

3. **Accessibilité**

   - Ne jamais descendre sous 12px pour le texte standard
   - Assurer un contraste suffisant à toutes les tailles
   - Prévoir le comportement du texte long (ellipsis, wrap)

4. **Performance**
   - Privilégier les unités relatives (rem, em, %) quand possible
   - Éviter les calculs trop complexes
   - Utiliser les variables CSS pour la cohérence

## 4. Accessibilité

Chaque composant doit inclure :

- Des rôles ARIA appropriés (`role="main"`, `role="banner"`, etc.)
- Des labels ARIA descriptifs (`aria-label`)
- Une structure sémantique claire (header, main, footer)
- Une hiérarchie de titres logique

## 5. Tests

Les tests doivent couvrir :

- La présence de tous les éléments avec leurs `data-testid`
- La structure sémantique et la hiérarchie
- Les attributs d'accessibilité
- Les classes CSS et styles appropriés
- La réactivité et le comportement responsive

## 6. Réactivité

Implémenter la réactivité via :

- Des media queries utilisant les variables de points de rupture
- Des ajustements de taille appropriés pour chaque breakpoint
- Des modifications de layout pour les petits écrans
- Des ajustements d'espacement via les variables CSS

## 7. Validation et Surveillance Automatique

Le système de surveillance vérifie :

- La présence de tous les éléments et fichiers requis
- La conformité des styles avec les règles flex
- L'utilisation correcte des variables CSS
- La présence des attributs d'accessibilité
- La couverture des tests

## Conclusion

Ce guide est la référence unique et exhaustive pour les bonnes pratiques de développement des composants. Il sert de modèle par défaut et toute déviation sera immédiatement signalée par notre système de surveillance, garantissant ainsi une qualité optimale et une cohérence à travers l'ensemble de l'application.
