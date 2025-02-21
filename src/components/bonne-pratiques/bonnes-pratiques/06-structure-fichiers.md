# Structure des Fichiers et Organisation CSS

> ⚠️ **RAPPEL : Test-Driven Development (TDD)**
>
> Tout développement DOIT suivre la méthode TDD :
>
> 1. ❌ RED - Écrire le test d'abord (et le voir échouer)
> 2. ✅ GREEN - Écrire le minimum de code pour faire passer le test
> 3. 🔄 REFACTOR - Améliorer le code en gardant les tests verts
>
> Cette règle est non négociable et s'applique à TOUTES les modifications de code.

## Organisation du Dossier

```typescript
MonComposant/
├── index.ts                     # Point d'entrée avec exports nommés
├── MonComposant.tsx            # Composant principal
├── MonComposant.test.tsx       # Tests unitaires
├── MonComposant.css            # Styles spécifiques
├── MonComposant_theme.css      # Variables de thème
├── components/                  # Sous-composants
│   ├── SousComposant1/
│   │   ├── index.ts
│   │   ├── SousComposant1.tsx
│   │   ├── SousComposant1.test.tsx
│   │   └── SousComposant1.css
│   └── SousComposant2/
└── docs/                       # Documentation
    ├── README.md              # Documentation principale
    └── correctifs.md          # Liste des problèmes et solutions
```

## Séparation des Responsabilités CSS

### 1. Fichier Thème (`MonComposant_theme.css`)

Le fichier thème DOIT contenir :

```css
:root {
  /* Calculs de Base */
  --vw: calc(100vw * 0.01);
  --vh: calc(100vh * 0.01);

  /* Espacements */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Dimensions */
  --header-height: calc(var(--vh) * 10);
  --content-width: calc(100% - (var(--spacing-md) * 2));
  --min-width: calc(var(--vw) * 30);
  --max-width: calc(var(--vw) * 90);

  /* Points de rupture */
  --breakpoint-tablet: calc(var(--vw) * 76.8);
  --breakpoint-mobile: calc(var(--vw) * 48);

  /* Bordures */
  --border-radius: 4px;

  /* Typographie */
  --font-xs: clamp(0.75rem, 1vw, 0.875rem);
  --font-sm: clamp(0.875rem, 1.5vw, 1rem);
  --font-md: clamp(1rem, 2vw, 1.25rem);
  --font-lg: clamp(1.25rem, 2.5vw, 1.5rem);
  --font-xl: clamp(1.5rem, 3vw, 2rem);

  /* Couleurs de Base */
  --color-light-bg: #f5f5f5;
  --color-dark-bg: #1a1a1a;
}

/* Thèmes */
.theme-light {
  --background: var(--color-light-bg);
}

.theme-dark {
  --background: var(--color-dark-bg);
}
```

### 2. Fichier Styles (`MonComposant.css`)

Le fichier styles DOIT contenir UNIQUEMENT :

```css
/* 1. Import du thème */
@import './MonComposant_theme.css';

/* 2. Classes Composants */
.mon-composant {
  width: clamp(var(--min-width), var(--content-width), var(--max-width));
  padding: var(--spacing-md);
  background: var(--background);
  border-radius: var(--border-radius);
  font-size: var(--font-md);
}

/* 3. Media Queries */
@media screen and (max-width: var(--breakpoint-tablet)) {
  .mon-composant {
    width: calc(100% - var(--spacing-md) * 2);
    padding: var(--spacing-sm);
    font-size: var(--font-sm);
  }
}
```

## Convention de Nommage

### 1. Classes CSS (BEM)

```css
/* Bloc */
.header-block {
}

/* Élément */
.header-block__title {
  font-size: var(--font-lg);
}

/* Modificateur */
.header-block--active {
}
```

### 2. Data Attributes

```typescript
// Pour les tests
data-testid="stable-header-block"

// Pour l'accessibilité
aria-label="En-tête principal"
```

## Bonnes Pratiques Importantes

1. **Système d'Espacement**

   - Utiliser les variables d'espacement prédéfinies
   - Jamais de valeurs en pixels pour les espacements
   - Progression cohérente : xs → xl

2. **Système Typographique**

   - Utiliser les variables de taille de police prédéfinies
   - Échelle typographique cohérente avec `clamp()`
   - 5 niveaux de taille : xs → xl

3. **Points de Rupture**

   - Définir les breakpoints en unités relatives
   - Adapter la typographie selon le contexte
   - Maintenir la lisibilité à toutes les tailles

4. **Performance**
   - Limiter les calculs imbriqués
   - Utiliser `clamp()` pour éviter les media queries
   - Préférer les unités relatives aux valeurs fixes

## Exemple Complet

```typescript
// MonComposant_theme.css
:root {
  --vw: calc(100vw * 0.01);
  --vh: calc(100vh * 0.01);
  --font-base: var(--font-md);
  --container-width: clamp(
    calc(var(--vw) * 30),
    calc(100% - var(--spacing-lg) * 2),
    calc(var(--vw) * 90)
  );
}

// MonComposant.css
.mon-composant {
  width: var(--container-width);
  padding: var(--spacing-md);
  font-size: var(--font-base);
}

// MonComposant.tsx
export const MonComposant = () => (
  <div className="mon-composant">
    <span className="mon-composant__title">
      Composant avec Typographie Adaptative
    </span>
  </div>
);
```

## Point d'Entrée (index.ts)

```typescript
// Export du composant principal
export { default as MonComposant } from './MonComposant';

// Export des sous-composants
export { SousComposant1 } from './components/SousComposant1';
export { SousComposant2 } from './components/SousComposant2';

// Export des types
export type { MonComposantProps } from './MonComposant';
```

## Structure du Composant Principal

```typescript
import React from 'react';
import './MonComposant.css';
import './MonComposant_theme.css';
import { SousComposant1 } from './components/SousComposant1';
import { SousComposant2 } from './components/SousComposant2';

export interface MonComposantProps {
  theme?: 'light' | 'dark';
  // Autres props...
}

const MonComposant: React.FC<MonComposantProps> = ({
  theme = 'light',
  ...props
}) => {
  return (
    <div
      className={`stable-container theme-${theme}`}
      id="test-container"
      data-testid="stable-container"
      role="main"
      aria-label="Conteneur principal"
    >
      <header
        className="stable-header"
        id="test-header"
        data-testid="stable-header"
        role="banner"
      >
        <SousComposant1 theme={theme} />
      </header>

      <main
        className="stable-content"
        id="test-content"
        data-testid="stable-content"
        role="main"
      >
        <SousComposant2 theme={theme} />
      </main>
    </div>
  );
};

export default MonComposant;
```

## Documentation (README.md)

```markdown
# MonComposant

Composant React suivant les bonnes pratiques établies.

## Props

| Prop  | Type              | Default | Description        |
| ----- | ----------------- | ------- | ------------------ |
| theme | 'light' \| 'dark' | 'light' | Thème du composant |

## Sous-composants

- [SousComposant1](./components/SousComposant1.md)
- [SousComposant2](./components/SousComposant2.md)

## Utilisation

\`\`\`typescript
import { MonComposant } from './MonComposant';

function App() {
return <MonComposant theme="dark" />;
}
\`\`\`
```
