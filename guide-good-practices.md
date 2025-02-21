# Guide des Bonnes Pratiques pour les Composants React

## Identification pour les Tests

### IDs et Data Attributes

```typescript
// Toujours inclure id ET data-testid
<div
  id="test-container"
  data-testid="stable-container"
>
```

### Convention de Nommage des IDs

- Préfixe `test-` pour tous les IDs
- Structure hiérarchique :
  ```
  test-container
  ├── test-header
  ├── test-content
  │   └── test-item-row
  │       ├── test-item-content-row
  │       └── test-item-children-row
  ```

## Structure des Exports

Le dossier `bonne-pratiques` contient l'implémentation de référence qui suit toutes les bonnes pratiques :

```typescript
// index.ts - Composant de référence
export { default as StableLayout } from './good-practices'; // Implémentation de référence
```

### Objectif

- **StableLayout** (`good-practices.tsx`) :
  - Implémentation de référence des bonnes pratiques
  - Sert de modèle pour tous les nouveaux composants
  - Démontre l'utilisation correcte des patterns React et CSS

## Gestion des Overlays

### État et Contrôle

```typescript
const [showOverlay, setShowOverlay] = useState(false);

// Déclencheur
<button
  className="stable-button"
  id="test-action-button"
  data-testid="stable-action-button"
  onClick={() => setShowOverlay(true)}
  aria-label="Ouvrir la fenêtre de dialogue"
>
  Action
</button>

// Overlay
{showOverlay && (
  <div
    className="stable-overlay"
    id="test-overlay"
    data-testid="stable-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="test-overlay-title"
  >
    <div
      className="stable-overlay-content"
      id="test-overlay-content"
      data-testid="stable-overlay-content"
    >
      <h2
        id="test-overlay-title"
        className="stable-overlay-title"
        data-testid="stable-overlay-title"
      >
        Titre de l'overlay
      </h2>
      <button
        className="stable-button stable-close-button"
        id="test-close-button"
        data-testid="stable-close-button"
        onClick={() => setShowOverlay(false)}
        aria-label="Fermer la fenêtre de dialogue"
      >
        ✕
      </button>
      <div
        className="stable-overlay-body"
        id="test-overlay-body"
        data-testid="stable-overlay-body"
      >
        Contenu de l'overlay
      </div>
    </div>
  </div>
)}
```

### Style des Overlays

```css
.stable-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, calc(var(--opacity-overlay) * 0.5));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-index-overlay);
}

.stable-overlay-content {
  position: relative;
  background: var(--bg-primary);
  border-radius: calc(var(--spacing-xs) * 2);
  padding: calc(var(--spacing-md));
  min-width: clamp(300px, 50vw, 600px);
  max-height: calc(100vh - var(--spacing-xl) * 2);
  overflow-y: auto;
}

.stable-overlay-title {
  font-size: var(--font-lg);
  line-height: calc(var(--spacing-lg));
  margin-bottom: calc(var(--spacing-md));
  padding-right: calc(var(--spacing-xl));
  color: var(--text-primary);
}

.stable-close-button {
  position: absolute;
  top: calc(var(--spacing-xs));
  right: calc(var(--spacing-xs));
  padding: calc(var(--spacing-xs));
  font-size: var(--font-md);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.stable-overlay-body {
  font-size: var(--font-md);
  line-height: calc(var(--font-md) * 1.5);
  color: var(--text-secondary);
}
```

## Gestion de la Typographie Multi-niveaux

La gestion du texte dans les menus à plusieurs niveaux doit suivre ces règles :

### Structure et Accessibilité

```typescript
// Exemple complet d'une structure de menu multi-niveaux
<div
  className="stable-menu"
  id="test-menu"
  data-testid="stable-menu"
  role="navigation"
  aria-label="Menu principal"
>
  {/* Niveau 1 */}
  <div
    className="stable-item-content"
    id="test-item-content-1"
    data-testid="stable-item-content-1"
    role="menuitem"
  >
    <span
      className="stable-text"
      id="test-text-1"
      data-testid="stable-text-1"
    >
      Niveau 1
    </span>
  </div>

  {/* Niveau 2 */}
  <div
    className="stable-child-content"
    id="test-child-content-1"
    data-testid="stable-child-content-1"
    role="group"
    aria-labelledby="test-text-1"
  >
    <span
      className="stable-text"
      id="test-text-2"
      data-testid="stable-text-2"
    >
      Niveau 2
    </span>
  </div>

  {/* Niveau 3 */}
  <div
    className="stable-item-title"
    id="test-item-title-1"
    data-testid="stable-item-title-1"
    role="menuitem"
  >
    <span
      className="stable-text"
      id="test-text-3"
      data-testid="stable-text-3"
    >
      Niveau 3
    </span>
  </div>

  {/* Niveau 4 */}
  <div
    className="stable-subitem"
    id="test-subitem-1"
    data-testid="stable-subitem-1"
    role="menuitem"
  >
    <span
      className="stable-text"
      id="test-text-4"
      data-testid="stable-text-4"
    >
      Niveau 4
    </span>
  </div>
</div>
```

### Styles CSS Complets

```css
/* Base commune pour tous les conteneurs de texte */
.stable-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

/* Niveau 1 (Principal) */
.stable-item-content {
  position: relative;
  display: flex;
  align-items: center;
  height: calc(var(--spacing-lg));
  padding: 0 calc(var(--spacing-xs) * 0.5);
  background-color: var(--bg-primary);
  border-radius: calc(var(--spacing-xs) * 0.5);
}

.stable-item-content .stable-text {
  font-size: var(--font-md);
  line-height: calc(var(--spacing-lg));
  font-weight: 500;
}

/* Niveau 2 (Sous-sections) */
.stable-child-content {
  position: relative;
  display: flex;
  align-items: center;
  height: calc(var(--spacing-md));
  padding: 0 calc(var(--spacing-xs) * 0.25);
  background-color: var(--bg-secondary);
  border-radius: calc(var(--spacing-xs) * 0.5);
}

.stable-child-content .stable-text {
  font-size: var(--font-sm);
  line-height: calc(var(--spacing-md));
  font-weight: 500;
}

/* Niveau 3 (Items) */
.stable-item-title {
  position: relative;
  display: flex;
  align-items: center;
  height: calc(var(--spacing-sm));
  padding: 0 calc(var(--spacing-xs) * 0.25);
  background-color: var(--bg-content);
  border-radius: calc(var(--spacing-xs) * 0.25);
}

.stable-item-title .stable-text {
  font-size: var(--font-xs);
  line-height: calc(var(--spacing-sm));
  font-weight: 400;
}

/* Niveau 4 (Sous-items) */
.stable-subitem {
  position: relative;
  display: flex;
  align-items: center;
  height: calc(var(--spacing-xs) * 4);
  padding: 0 calc(var(--spacing-xs) * 0.25);
  background-color: var(--bg-content);
  border-radius: calc(var(--spacing-xs) * 0.25);
}

.stable-subitem .stable-text {
  font-size: calc(var(--font-xs) * 0.9);
  line-height: calc(var(--spacing-xs) * 4);
  font-weight: 400;
  color: var(--text-secondary);
}

/* États au survol */
.stable-item-content:hover,
.stable-child-content:hover,
.stable-item-title:hover,
.stable-subitem:hover {
  background-color: var(--bg-hover);
}

.stable-item-content:hover .stable-text,
.stable-child-content:hover .stable-text,
.stable-item-title:hover .stable-text,
.stable-subitem:hover .stable-text {
  color: var(--text-accent);
}
```

### Règles Importantes

1. **Structure HTML**

   - Utiliser des éléments sémantiques
   - Ajouter des attributs ARIA appropriés
   - Inclure IDs et data-testid pour les tests

2. **Styles CSS**

   - Utiliser uniquement des variables pour les valeurs
   - Appliquer des transitions fluides
   - Gérer les états au survol
   - Assurer la cohérence des espacements

3. **Accessibilité**

   - Contraste suffisant entre le texte et le fond
   - Navigation au clavier
   - Labels ARIA descriptifs

4. **Performance**
   - Transitions optimisées
   - Gestion du débordement
   - Pas de calculs complexes dans les animations

## Structure des Fichiers Obligatoires

### Organisation du Dossier

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

### Exemple de Point d'Entrée (index.ts)

```typescript
// Export du composant principal
export { default as MonComposant } from './MonComposant';

// Export des sous-composants
export { SousComposant1 } from './components/SousComposant1';
export { SousComposant2 } from './components/SousComposant2';

// Export des types
export type { MonComposantProps } from './MonComposant';
```

### Exemple de Composant Principal (MonComposant.tsx)

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

### Exemple de Styles (MonComposant.css)

```css
.stable-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: var(--spacing-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: calc(var(--spacing-md));
}

.stable-header {
  position: relative;
  display: flex;
  align-items: center;
  height: calc(var(--spacing-xl));
  background-color: var(--bg-secondary);
  border-radius: calc(var(--spacing-xs));
  padding: 0 calc(var(--spacing-md));
}

.stable-content {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  overflow: hidden;
  min-height: 0;
}
```

### Exemple de Variables de Thème (MonComposant_theme.css)

```css
/* Variables communes */
:root {
  /* Espacements */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Typographie */
  --font-xs: clamp(0.75rem, 1vw, 0.875rem);
  --font-sm: clamp(0.875rem, 1.5vw, 1rem);
  --font-md: clamp(1rem, 2vw, 1.25rem);
  --font-lg: clamp(1.25rem, 2.5vw, 1.5rem);

  /* Z-index */
  --z-index-base: 1;
  --z-index-overlay: 1000;
}

/* Thème clair */
.theme-light {
  --bg-primary: var(--light-bg-primary);
  --bg-secondary: var(--light-bg-secondary);
  --text-primary: var(--light-text-primary);
  --text-secondary: var(--light-text-secondary);
}

/* Thème sombre */
.theme-dark {
  --bg-primary: var(--dark-bg-primary);
  --bg-secondary: var(--dark-bg-secondary);
  --text-primary: var(--dark-text-primary);
  --text-secondary: var(--dark-text-secondary);
}
```

### Exemple de Tests (MonComposant.test.tsx)

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import MonComposant from './MonComposant';

describe('MonComposant', () => {
  it('devrait rendre le composant avec le thème par défaut', () => {
    render(<MonComposant />);

    const container = screen.getByTestId('stable-container');
    expect(container).toHaveClass('theme-light');
  });

  it('devrait appliquer le thème sombre quand spécifié', () => {
    render(<MonComposant theme="dark" />);

    const container = screen.getByTestId('stable-container');
    expect(container).toHaveClass('theme-dark');
  });

  it('devrait avoir la structure HTML correcte', () => {
    render(<MonComposant />);

    expect(screen.getByTestId('stable-container')).toBeInTheDocument();
    expect(screen.getByTestId('stable-header')).toBeInTheDocument();
    expect(screen.getByTestId('stable-content')).toBeInTheDocument();
  });
});
```

### Exemple de Documentation (README.md)

```markdown
# MonComposant

Composant React suivant les bonnes pratiques établies.

## Structure du Dossier

[Voir arborescence ci-dessus]

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

## Disposition et Mise en Page

### Structure de Base

```typescript
<div
  className="stable-layout"
  id="test-layout"
  data-testid="stable-layout"
  role="region"
  aria-label="Zone de mise en page"
>
  <div
    className="stable-layout-row"
    id="test-layout-row"
    data-testid="stable-layout-row"
    role="group"
    aria-label="Ligne de contenu"
  >
    <div
      className="stable-layout-col"
      id="test-layout-col-1"
      data-testid="stable-layout-col-1"
      role="group"
      aria-label="Colonne 1"
    >
      Contenu 1
    </div>
    <div
      className="stable-layout-col"
      id="test-layout-col-2"
      data-testid="stable-layout-col-2"
      role="group"
      aria-label="Colonne 2"
    >
      Contenu 2
    </div>
  </div>
</div>
```

### Styles CSS

```css
/* Container principal */
.stable-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: var(--spacing-md);
  padding: calc(var(--spacing-md));
  background-color: var(--bg-primary);
}

/* Ligne */
.stable-layout-row {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: var(--spacing-md);
  min-height: 0;
  flex: 1;
}

/* Colonne */
.stable-layout-col {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--spacing-sm);
  padding: calc(var(--spacing-sm));
  background-color: var(--bg-secondary);
  border-radius: calc(var(--spacing-xs));
  overflow: hidden;
}

/* Gestion du responsive */
@media (max-width: 768px) {
  .stable-layout-row {
    flex-direction: column;
  }

  .stable-layout-col {
    width: 100%;
  }
}
```

## Typographie

### Configuration de Base

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

### Exemple d'Utilisation

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
    Texte de paragraphe
  </p>
  <span
    className="stable-text-sm"
    id="test-text-sm"
    data-testid="stable-text-sm"
  >
    Petit texte
  </span>
</div>
```

### Styles Typographiques

```css
/* Styles de base */
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

/* Textes */
.stable-text-md {
  font-size: var(--font-md);
  line-height: var(--line-height-md);
  font-weight: var(--font-weight-normal);
  margin-bottom: calc(var(--spacing-sm));
  color: var(--text-secondary);
}

.stable-text-sm {
  font-size: var(--font-sm);
  line-height: var(--line-height-sm);
  font-weight: var(--font-weight-normal);
  color: var(--text-secondary);
}
```

## Système de Couleurs et Thèmes

### Variables de Base

```css
:root {
  /* Couleurs de base */
  --color-primary-50: hsl(var(--hue-primary), 80%, 95%);
  --color-primary-100: hsl(var(--hue-primary), 80%, 90%);
  --color-primary-200: hsl(var(--hue-primary), 80%, 80%);
  --color-primary-300: hsl(var(--hue-primary), 80%, 70%);
  --color-primary-400: hsl(var(--hue-primary), 80%, 60%);
  --color-primary-500: hsl(var(--hue-primary), 80%, 50%);
  --color-primary-600: hsl(var(--hue-primary), 80%, 40%);
  --color-primary-700: hsl(var(--hue-primary), 80%, 30%);
  --color-primary-800: hsl(var(--hue-primary), 80%, 20%);
  --color-primary-900: hsl(var(--hue-primary), 80%, 10%);

  /* Teintes de gris */
  --color-gray-50: hsl(var(--hue-gray), 10%, 95%);
  --color-gray-100: hsl(var(--hue-gray), 10%, 90%);
  --color-gray-200: hsl(var(--hue-gray), 10%, 80%);
  --color-gray-300: hsl(var(--hue-gray), 10%, 70%);
  --color-gray-400: hsl(var(--hue-gray), 10%, 60%);
  --color-gray-500: hsl(var(--hue-gray), 10%, 50%);
  --color-gray-600: hsl(var(--hue-gray), 10%, 40%);
  --color-gray-700: hsl(var(--hue-gray), 10%, 30%);
  --color-gray-800: hsl(var(--hue-gray), 10%, 20%);
  --color-gray-900: hsl(var(--hue-gray), 10%, 10%);

  /* Teintes */
  --hue-primary: 220;
  --hue-gray: 220;
}
```

### Application des Thèmes

```css
/* Thème clair */
.theme-light {
  /* Arrière-plans */
  --bg-primary: var(--color-gray-50);
  --bg-secondary: var(--color-gray-100);
  --bg-tertiary: var(--color-gray-200);
  --bg-accent: var(--color-primary-100);

  /* Textes */
  --text-primary: var(--color-gray-900);
  --text-secondary: var(--color-gray-700);
  --text-tertiary: var(--color-gray-500);
  --text-accent: var(--color-primary-700);

  /* Bordures */
  --border-color: var(--color-gray-200);
  --border-color-hover: var(--color-gray-300);

  /* États */
  --state-hover: var(--color-gray-100);
  --state-active: var(--color-gray-200);
  --state-focus: var(--color-primary-100);
}

/* Thème sombre */
.theme-dark {
  /* Arrière-plans */
  --bg-primary: var(--color-gray-900);
  --bg-secondary: var(--color-gray-800);
  --bg-tertiary: var(--color-gray-700);
  --bg-accent: var(--color-primary-900);

  /* Textes */
  --text-primary: var(--color-gray-50);
  --text-secondary: var(--color-gray-300);
  --text-tertiary: var(--color-gray-500);
  --text-accent: var(--color-primary-300);

  /* Bordures */
  --border-color: var(--color-gray-700);
  --border-color-hover: var(--color-gray-600);

  /* États */
  --state-hover: var(--color-gray-800);
  --state-active: var(--color-gray-700);
  --state-focus: var(--color-primary-800);
}
```

### Exemple d'Utilisation

```typescript
<div
  className="stable-theme-example theme-light"
  id="test-theme-example"
  data-testid="stable-theme-example"
  role="region"
  aria-label="Exemple de thème"
>
  <div
    className="stable-card"
    id="test-card"
    data-testid="stable-card"
    role="article"
  >
    <h3
      className="stable-card-title"
      id="test-card-title"
      data-testid="stable-card-title"
    >
      Titre de la carte
    </h3>
    <p
      className="stable-card-text"
      id="test-card-text"
      data-testid="stable-card-text"
    >
      Contenu de la carte
    </p>
  </div>
</div>
```

### Styles des Composants

```css
.stable-card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: calc(var(--spacing-xs));
  padding: calc(var(--spacing-md));
  transition: all 0.2s ease;
}

.stable-card:hover {
  background-color: var(--state-hover);
  border-color: var(--border-color-hover);
}

.stable-card-title {
  color: var(--text-primary);
  font-size: var(--font-lg);
  margin-bottom: calc(var(--spacing-sm));
}

.stable-card-text {
  color: var(--text-secondary);
  font-size: var(--font-md);
}
```
