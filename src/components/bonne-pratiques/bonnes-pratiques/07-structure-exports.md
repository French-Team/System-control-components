# Structure des Exports

## Principes Fondamentaux

1. **Organisation**

   - Un point d'entrée unique par composant
   - Exports nommés plutôt que par défaut
   - Types exportés séparément

2. **Isolation**
   - Encapsulation des implémentations
   - Exposition minimale de l'API
   - Documentation des interfaces publiques

## Structure de Base

```typescript
// 1. Point d'Entrée (index.ts)
export { MonComposant } from './MonComposant';
export type { MonComposantProps } from './MonComposant.types';

// 2. Types (MonComposant.types.ts)
export interface MonComposantProps {
  title: string;
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

// 3. Styles
export * from './MonComposant.styles';

// 4. Hooks
export * from './hooks';

// 5. Utils
export * from './utils';
```

## Bonnes Pratiques

### 1. Organisation des Fichiers

```typescript
MonComposant/
├── index.ts                     // Point d'entrée
├── MonComposant.tsx            // Composant principal
├── MonComposant.types.ts       // Types et interfaces
├── MonComposant.styles.ts      // Styles (si CSS-in-JS)
├── MonComposant.css            // Styles (si CSS modules)
├── MonComposant.test.tsx       // Tests
├── hooks/                      // Hooks personnalisés
│   ├── index.ts
│   ├── useMonHook.ts
│   └── useMonHook.test.ts
└── utils/                      // Utilitaires
    ├── index.ts
    ├── helpers.ts
    └── helpers.test.ts
```

### 2. Exports Nommés

```typescript
// ❌ INCORRECT
export default function MonComposant() {}

// ✅ CORRECT
export function MonComposant() {}
export type { MonComposantProps };
```

### 3. Barrel Exports

```typescript
// index.ts
export * from './MonComposant';
export * from './MonComposant.types';
export * from './hooks';
export * from './utils';
```

## Exemple Complet

```typescript
// MonComposant.types.ts
export interface MonComposantProps {
  title: string;
  children: React.ReactNode;
}

export type Theme = 'light' | 'dark';

export interface MonComposantRef {
  focus: () => void;
  reset: () => void;
}

// MonComposant.tsx
import type { MonComposantProps, MonComposantRef } from './MonComposant.types';
import { useMonHook } from './hooks';
import { formatTitle } from './utils';
import './MonComposant.css';

export const MonComposant = forwardRef<MonComposantRef, MonComposantProps>(
  ({ title, children }, ref) => {
    // Implémentation...
  }
);

// hooks/useMonHook.ts
export const useMonHook = () => {
  // Implémentation...
};

// utils/helpers.ts
export const formatTitle = (title: string) => {
  // Implémentation...
};

// index.ts
export { MonComposant } from './MonComposant';
export type { MonComposantProps, MonComposantRef, Theme } from './MonComposant.types';
export { useMonHook } from './hooks';
export { formatTitle } from './utils';
```

## Tests

```typescript
// MonComposant.test.tsx
import { MonComposant } from './MonComposant';
import type { MonComposantProps } from './MonComposant.types';

describe('MonComposant', () => {
  const defaultProps: MonComposantProps = {
    title: 'Test',
    children: 'Content'
  };

  it('devrait rendre correctement', () => {
    render(<MonComposant {...defaultProps} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

// hooks/useMonHook.test.ts
import { useMonHook } from './useMonHook';

describe('useMonHook', () => {
  it('devrait fonctionner correctement', () => {
    const { result } = renderHook(() => useMonHook());
    expect(result.current).toBeDefined();
  });
});
```

## Documentation

````typescript
/**
 * MonComposant - Description du composant
 *
 * @example
 * ```tsx
 * <MonComposant title="Mon Titre">
 *   Contenu
 * </MonComposant>
 * ```
 */
export const MonComposant = ({ title, children }: MonComposantProps) => {
  // Implémentation...
};

/**
 * Hook personnalisé pour la gestion de...
 *
 * @returns {object} État et méthodes du hook
 */
export const useMonHook = () => {
  // Implémentation...
};
````

## Validation

1. **Types**

   - Vérifier la cohérence des interfaces
   - Tester les cas limites
   - Documenter les contraintes

2. **Exports**

   - Vérifier l'isolation des implémentations
   - Tester l'API publique
   - Valider la documentation

3. **Tests**
   - Couvrir tous les exports
   - Tester les hooks séparément
   - Vérifier les utilitaires

Le dossier `bonne-pratiques` contient l'implémentation de référence qui suit toutes les bonnes pratiques :

```typescript
// index.ts - Composant de référence
export { default as StableLayout } from './good-practices'; // Implémentation de référence
```

## Objectif

- **StableLayout** (`good-practices.tsx`) :
  - Implémentation de référence des bonnes pratiques
  - Sert de modèle pour tous les nouveaux composants
  - Démontre l'utilisation correcte des patterns React et CSS
