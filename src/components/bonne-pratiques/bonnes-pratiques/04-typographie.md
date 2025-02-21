# Application de la Typographie

## Hiérarchie des Textes

```typescript
<div
  className="stable-typography"
  id="test-typography"
  data-testid="stable-typography"
  role="region"
  aria-label="Exemple de hiérarchie typographique"
>
  {/* Niveau 1 - Titre Principal */}
  <h1
    className="stable-title-xl"
    id="test-title-xl"
    data-testid="stable-title-xl"
  >
    Titre Principal
  </h1>

  {/* Niveau 2 - Sous-sections */}
  <div className="stable-section" id="test-section" data-testid="stable-section">
    <h2
      className="stable-title-lg"
      id="test-title-lg"
      data-testid="stable-title-lg"
    >
      Sous-section
    </h2>
    <p
      className="stable-text-md"
      id="test-text-md"
      data-testid="stable-text-md"
    >
      Texte descriptif de la section avec une taille moyenne pour une bonne
      lisibilité.
    </p>
  </div>

  {/* Niveau 3 - Contenus */}
  <div
    className="stable-content"
    id="test-content"
    data-testid="stable-content"
  >
    <h3
      className="stable-title-md"
      id="test-title-md"
      data-testid="stable-title-md"
    >
      Titre de Contenu
    </h3>
    <p
      className="stable-text-sm"
      id="test-text-sm"
      data-testid="stable-text-sm"
    >
      Texte de contenu plus compact pour les informations détaillées.
    </p>
  </div>

  {/* Niveau 4 - Métadonnées */}
  <div className="stable-meta" id="test-meta" data-testid="stable-meta">
    <span
      className="stable-text-xs"
      id="test-text-xs"
      data-testid="stable-text-xs"
    >
      Informations complémentaires en plus petit
    </span>
  </div>
</div>
```

## Styles CSS

```css
/* Base Typographique */
.stable-typography {
  font-family: var(--font-family-base);
  color: var(--text-primary);
  line-height: var(--line-height-md);
}

/* Titres */
.stable-title-xl {
  font-size: var(--font-xl);
  line-height: var(--line-height-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: calc(var(--spacing-lg));
  color: var(--text-primary);
}

.stable-title-lg {
  font-size: var(--font-lg);
  line-height: var(--line-height-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: calc(var(--spacing-md));
  color: var(--text-primary);
}

.stable-title-md {
  font-size: var(--font-md);
  line-height: var(--line-height-md);
  font-weight: var(--font-weight-medium);
  margin-bottom: calc(var(--spacing-sm));
  color: var(--text-primary);
}

/* Textes */
.stable-text-md {
  font-size: var(--font-md);
  line-height: var(--line-height-md);
  margin-bottom: calc(var(--spacing-md));
  color: var(--text-secondary);
}

.stable-text-sm {
  font-size: var(--font-sm);
  line-height: var(--line-height-sm);
  margin-bottom: calc(var(--spacing-sm));
  color: var(--text-secondary);
}

.stable-text-xs {
  font-size: var(--font-xs);
  line-height: var(--line-height-xs);
  color: var(--text-tertiary);
}

/* Conteneurs */
.stable-section {
  margin-bottom: calc(var(--spacing-xl));
}

.stable-content {
  margin-bottom: calc(var(--spacing-lg));
}

.stable-meta {
  margin-top: calc(var(--spacing-md));
  padding-top: calc(var(--spacing-sm));
  border-top: 1px solid var(--border-color);
}
```

## Bonnes Pratiques

1. **Hiérarchie Visuelle**

   - Maintenir une progression claire des tailles
   - Utiliser les bons niveaux de titres (h1-h6)
   - Espacements proportionnels à la taille du texte

2. **Lisibilité**

   - Longueur de ligne optimale (45-75 caractères)
   - Contraste suffisant entre texte et fond
   - Hauteurs de ligne adaptées à la taille du texte

3. **Responsive**

   - Utiliser des unités relatives (rem, em)
   - Ajuster les tailles selon les breakpoints
   - Tester sur différents appareils

4. **Accessibilité**

   - Structure sémantique des titres
   - Taille de police minimum de 12px
   - Espacement suffisant entre les lignes
   - Contraste conforme aux normes WCAG

5. **Maintenance**
   - Utiliser les variables CSS
   - Nommer les classes de manière cohérente
   - Documenter les choix typographiques

# Système de Typographie

## Principes Fondamentaux

1. **Centralisation des Calculs**

   - Tous les calculs de taille de police DOIVENT être dans le fichier thème
   - Les tailles sont calculées relativement à la taille du conteneur
   - Utilisation de variables CSS pour la réutilisabilité

2. **Adaptation au Conteneur**
   - Le texte DOIT s'adapter à son conteneur parent
   - Éviter les débordements et troncatures
   - Utiliser des unités relatives (rem, em, %)

## Variables de Base

```css
:root {
  /* Tailles de Base */
  --font-size-base: 16px;
  --line-height-base: 1.5;

  /* Échelle Typographique */
  --scale-factor: 1.25; /* Major Third */
  --h1-scale: calc(var(--scale-factor) * var(--scale-factor) * var(--scale-factor));
  --h2-scale: calc(var(--scale-factor) * var(--scale-factor));
  --h3-scale: var(--scale-factor);

  /* Calculs Adaptatifs */
  --container-width: 100%;
  --text-scale: calc(100% * (var(--container-width) / 100vw));

  /* Tailles Finales */
  --font-size-h1: calc(var(--font-size-base) * var(--h1-scale) * var(--text-scale));
  --font-size-h2: calc(var(--font-size-base) * var(--h2-scale) * var(--text-scale));
  --font-size-h3: calc(var(--font-size-base) * var(--h3-scale) * var(--text-scale));
}
```

## Utilisation des Tags HTML

1. **Sémantique vs Style**
   - Utiliser `<span>` pour le style pur
   - Réserver `<h1>` à `<h6>` pour la hiérarchie sémantique
   - Ne pas mélanger sémantique et style

```typescript
// ❌ INCORRECT
<h1 style={{ fontSize: '2rem' }}>Titre</h1>

// ✅ CORRECT
<span className="header-block__title">Titre</span>
```

## Classes CSS

```css
/* Base */
.text-base {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}

/* Titres */
.header-block__title {
  font-size: var(--font-size-h1);
  line-height: 1.2;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* Conteneur */
.header-block {
  width: var(--container-width);
  overflow: hidden;
}
```

## Media Queries

```css
@media screen and (max-width: var(--breakpoint-tablet)) {
  :root {
    --scale-factor: 1.2; /* Réduire l'échelle sur mobile */
  }

  .header-block__title {
    font-size: var(--font-size-h2);
  }
}
```

## Bonnes Pratiques

1. **Éviter les Tailles Fixes**

   - ❌ `font-size: 24px`
   - ✅ `font-size: var(--font-size-h1)`

2. **Gestion du Débordement**

   - Toujours définir `overflow-wrap` et `word-break`
   - Utiliser `white-space: normal` pour permettre le retour à la ligne
   - Éviter `text-overflow: ellipsis` sauf cas spécifiques

3. **Tests**

   - Tester avec différentes tailles de conteneur
   - Vérifier le comportement responsive
   - S'assurer de l'absence de troncature

4. **Accessibilité**
   - Maintenir un contraste suffisant
   - Permettre le zoom sans perte d'information
   - Respecter la hiérarchie des titres

## Exemple Complet

```typescript
// MonComposant_theme.css
:root {
  --container-width: 100%;
  --text-scale: calc(100% * (var(--container-width) / 100vw));
  --font-size-title: calc(2rem * var(--text-scale));
}

// MonComposant.css
.header-block {
  width: var(--container-width);
}

.header-block__title {
  font-size: var(--font-size-title);
  line-height: 1.2;
  white-space: normal;
  overflow-wrap: break-word;
}

// MonComposant.tsx
export const MonComposant = () => (
  <div className="header-block">
    <span className="header-block__title">
      Titre qui s'adapte automatiquement
    </span>
  </div>
);
```
