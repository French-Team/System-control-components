# Configuration du Système Typographique

## Variables de Base

```css
/* Variables typographiques */
:root {
  /* Famille de police */
  --font-family-base: 'Consolas', monospace;

  /* Tailles de police adaptatives */
  --font-xs: clamp(0.75rem, 1vw, 0.875rem);
  --font-sm: clamp(0.875rem, 1.5vw, 1rem);
  --font-md: clamp(1rem, 2vw, 1.25rem);
  --font-lg: clamp(1.25rem, 2.5vw, 1.5rem);
  --font-xl: clamp(1.5rem, 3vw, 2rem);

  /* Hauteurs de ligne */
  --line-height-xs: calc(var(--spacing-md));
  --line-height-sm: calc(var(--spacing-lg));
  --line-height-md: calc(var(--spacing-xl));
  --line-height-lg: calc(var(--spacing-xl) * 1.25);
  --line-height-xl: calc(var(--spacing-xl) * 1.5);

  /* Graisse de police */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
}
```

## Styles de Base

```css
/* Configuration globale */
html {
  font-family: var(--font-family-base);
  font-size: 16px;
  line-height: var(--line-height-md);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Styles de texte de base */
.stable-text-base {
  font-family: var(--font-family-base);
  color: var(--text-primary);
  margin: 0;
  padding: 0;
}

/* Titres */
.stable-title-xl {
  composes: stable-text-base;
  font-size: var(--font-xl);
  line-height: var(--line-height-xl);
  font-weight: var(--font-weight-bold);
}

.stable-title-lg {
  composes: stable-text-base;
  font-size: var(--font-lg);
  line-height: var(--line-height-lg);
  font-weight: var(--font-weight-bold);
}

/* Corps de texte */
.stable-text-md {
  composes: stable-text-base;
  font-size: var(--font-md);
  line-height: var(--line-height-md);
  font-weight: var(--font-weight-normal);
}

.stable-text-sm {
  composes: stable-text-base;
  font-size: var(--font-sm);
  line-height: var(--line-height-sm);
  font-weight: var(--font-weight-normal);
}
```

## Exemple d'Utilisation

```typescript
<div
  className="stable-typography"
  id="test-typography"
  data-testid="stable-typography"
  role="region"
  aria-label="Exemple de typographie"
>
  <h1
    className="stable-title-xl"
    id="test-title-xl"
    data-testid="stable-title-xl"
  >
    Titre Principal
  </h1>
  <h2
    className="stable-title-lg"
    id="test-title-lg"
    data-testid="stable-title-lg"
  >
    Sous-titre
  </h2>
  <p
    className="stable-text-md"
    id="test-text-md"
    data-testid="stable-text-md"
  >
    Texte de paragraphe standard avec une taille moyenne
  </p>
  <p
    className="stable-text-sm"
    id="test-text-sm"
    data-testid="stable-text-sm"
  >
    Texte plus petit pour les informations secondaires
  </p>
</div>
```

## Bonnes Pratiques

1. **Utilisation des Variables**

   - Toujours utiliser les variables CSS pour les tailles et les espacements
   - Ne jamais hardcoder les valeurs de police ou d'espacement

2. **Accessibilité**

   - Maintenir une hiérarchie claire des titres (h1 à h6)
   - Assurer un contraste suffisant entre le texte et le fond
   - Utiliser des tailles de police lisibles (minimum 12px)

3. **Responsive Design**
   - Utiliser `clamp()` pour des tailles de police adaptatives
   - Ajuster les hauteurs de ligne en fonction de la taille de police
   - Tester la lisibilité sur différents appareils
