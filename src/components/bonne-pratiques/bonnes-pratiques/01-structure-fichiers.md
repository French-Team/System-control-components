# Structure des Fichiers Obligatoires

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
│       ├── index.ts
│       ├── SousComposant2.tsx
│       ├── SousComposant2.test.tsx
│       └── SousComposant2.css
└── docs/                       # Documentation
    ├── README.md              # Documentation principale
    └── components/            # Documentation des sous-composants
        ├── SousComposant1.md
        └── SousComposant2.md
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
