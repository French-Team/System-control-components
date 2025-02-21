# Guide des Tests React

> ⚠️ **RAPPEL : Test-Driven Development (TDD)**
>
> Tout développement DOIT suivre la méthode TDD :
>
> 1. ❌ RED - Écrire le test d'abord (et le voir échouer)
> 2. ✅ GREEN - Écrire le minimum de code pour faire passer le test
> 3. 🔄 REFACTOR - Améliorer le code en gardant les tests verts
>
> Cette règle est non négociable et s'applique à TOUTES les modifications de code.

## Méthode TDD (Test-Driven Development)

La méthode TDD est **obligatoire** pour tout nouveau développement ou modification. Elle suit le cycle RED-GREEN-REFACTOR :

### 1. RED - Écrire le test d'abord

```typescript
describe('MonComposant', () => {
  it('devrait avoir un comportement spécifique', () => {
    // 1. Arrange - Préparer les données
    const props = { /* ... */ };

    // 2. Act - Effectuer l'action
    render(<MonComposant {...props} />);

    // 3. Assert - Vérifier le résultat
    expect(/* ... */).toBe(/* ... */);
  });
});
```

### 2. GREEN - Implémenter le minimum

- Écrire **uniquement** le code nécessaire pour faire passer le test
- Ne pas anticiper les besoins futurs
- Accepter que le code ne soit pas parfait

### 3. REFACTOR - Améliorer le code

- Nettoyer le code sans changer son comportement
- Exécuter les tests après chaque modification
- S'assurer que tous les tests restent verts

### Bonnes Pratiques TDD

1. **Petits Incréments**

   - Un test à la fois
   - Une fonctionnalité à la fois
   - Valider chaque étape

2. **Tests Significatifs**

   - Tester le comportement, pas l'implémentation
   - Nommer les tests de manière descriptive
   - Un seul concept par test

3. **Maintenance**
   - Mettre à jour les tests quand les exigences changent
   - Supprimer les tests obsolètes
   - Garder la suite de tests propre

## Configuration du Projet

```typescript
// Utilisation de Vitest (pas Jest)
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
```

## Convention de Nommage et Structure

### IDs et Data Attributes

```typescript
// Toujours inclure id ET data-testid avec des préfixes différents
<div
  id="test-container"           // Préfixe 'test-' pour les IDs
  data-testid="stable-container" // Préfixe 'stable-' pour data-testid
>
```

### Hiérarchie des Identifiants

- Structure hiérarchique cohérente :

```typescript
// IDs
test-container
├── test-header
├── test-content
│   └── test-item-row
│       ├── test-item-content-row
│       └── test-item-children-row

// data-testid
stable-container
├── stable-header
├── stable-content
│   └── stable-item-row
│       ├── stable-item-content-row
│       └── stable-item-children-row
```

### Gestion des Duplicatas

- Pour les éléments répétés, ajouter un suffixe numérique :

```typescript
data-testid="stable-block-1"
data-testid="stable-block-2"
data-testid="stable-block-3"
```

## Structure des Tests

### Organisation des Tests

```typescript
describe('MonComposant', () => {
  // 1. Tests de rendu initial
  describe('Rendu initial', () => {
    it('devrait rendre avec les props par défaut', () => {});
  });

  // 2. Tests de structure
  describe('Structure de base', () => {
    beforeEach(() => {
      render(<MonComposant />);
    });

    it('devrait avoir une structure HTML sémantique', () => {});
    it('devrait avoir les data-testid appropriés', () => {});
  });

  // 3. Tests des props et du state
  describe('Gestion du state', () => {
    it('devrait gérer les changements de state', () => {});
  });

  // 4. Tests d'accessibilité
  describe('Accessibilité', () => {
    it('devrait avoir les rôles ARIA corrects', () => {});
  });
});
```

### Bonnes Pratiques de Test

1. **Sélection des Éléments**

```typescript
// CORRECT : Utiliser getAllByTestId pour les éléments multiples
const blocks = screen.getAllByTestId(/^stable-block-/);

// CORRECT : Utiliser getByTestId pour les éléments uniques
const container = screen.getByTestId('stable-container');

// CORRECT : Vérifier les rôles ARIA
expect(screen.getByRole('main')).toBeInTheDocument();
```

2. **Vérification des Attributs**

```typescript
// Vérifier les classes
expect(element).toHaveClass('ma-classe');

// Vérifier les attributs ARIA
expect(element).toHaveAttribute('aria-label', 'Mon label');

// Vérifier le contenu
expect(element).toHaveTextContent('Mon texte');
```

3. **Tests d'Interaction**

```typescript
// Simuler les clics
fireEvent.click(screen.getByTestId('stable-button'));

// Vérifier les callbacks
const onThemeChange = vi.fn();
render(<MonComposant onThemeChange={onThemeChange} />);
expect(onThemeChange).toHaveBeenCalledWith('dark');
```

## Résolution des Problèmes Courants

### Erreurs de Sélecteurs Multiples

- Utiliser `getAllByTestId` au lieu de `getByTestId` pour les éléments répétés
- Ajouter des suffixes numériques aux data-testid
- Vérifier la longueur du tableau retourné : `expect(elements).toHaveLength(5)`

### Conflits de Rôles ARIA

- Ne pas dupliquer les rôles principaux (`main`, `banner`, etc.)
- Utiliser des rôles appropriés pour la hiérarchie (`region`, `article`, etc.)
- Toujours fournir des `aria-label` descriptifs

### Tests Instables

- Utiliser `beforeEach` pour réinitialiser le composant
- Nettoyer les mocks après chaque test
- Éviter les assertions sur des styles calculés

## Mocking

### Composants Enfants

```typescript
// __mocks__/MonComposant.tsx
export const MonComposant = vi.fn().mockImplementation(({ theme }) => (
  <div data-testid="mock-composant" className={`theme-${theme}`}>
    Mock Component
  </div>
));
```

### Fonctions et Callbacks

```typescript
const mockCallback = vi.fn();
render(<MonComposant onChange={mockCallback} />);
```

# Guide d'Identification pour les Tests

## Principes Fondamentaux

1. **Test-Driven Development (TDD)**

   - Écrire les tests AVANT le code
   - Suivre le cycle RED-GREEN-REFACTOR
   - Documenter les cas de test

2. **Identification Unique**
   - Chaque élément testable doit avoir un identifiant unique
   - Utiliser des préfixes cohérents
   - Éviter les sélecteurs CSS pour les tests

## Convention de Nommage

### 1. Attributs data-testid

```typescript
// 1. Structure de Base
data-testid="[préfixe]-[composant]-[élément]"

// 2. Exemples
data-testid="stable-header-block"        // Bloc principal
data-testid="stable-header-title"        // Titre du header
data-testid="stable-content-container"   // Conteneur de contenu
```

### 2. Préfixes Standards

```typescript
// 1. Composants Stables
'stable-*'; // Composants de base testés
'test-*'; // Composants en cours de test
'mock-*'; // Composants simulés

// 2. États
'loading-*'; // États de chargement
'error-*'; // États d'erreur
'success-*'; // États de succès
```

## Structure des Tests

```typescript
// MonComposant.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MonComposant } from './MonComposant';

describe('MonComposant', () => {
  // 1. Rendu Initial
  it('devrait rendre correctement', () => {
    render(<MonComposant />);

    expect(
      screen.getByTestId('stable-header-block')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('stable-header-title')
    ).toHaveTextContent('Titre');
  });

  // 2. Interactions
  it('devrait gérer les interactions', async () => {
    render(<MonComposant />);

    const button = screen.getByTestId('stable-theme-toggle');
    await userEvent.click(button);

    expect(
      screen.getByTestId('stable-header-block')
    ).toHaveClass('theme-dark');
  });

  // 3. États
  it('devrait gérer les états', () => {
    render(<MonComposant isLoading />);

    expect(
      screen.getByTestId('loading-spinner')
    ).toBeInTheDocument();
  });
});
```

## Bonnes Pratiques

### 1. Identification des Éléments

```typescript
// ❌ INCORRECT
<div className="header">
<div id="header">
<div data-cy="header">

// ✅ CORRECT
<div data-testid="stable-header-block">
```

### 2. Tests Accessibles

```typescript
// ❌ INCORRECT
screen.getByText('Cliquez-moi');
screen.getByClassName('button');

// ✅ CORRECT
screen.getByRole('button', { name: 'Cliquez-moi' });
screen.getByTestId('stable-action-button');
```

### 3. Tests Asynchrones

```typescript
// ❌ INCORRECT
test('chargement', () => {
  render(<MonComposant />);
  expect(screen.getByText('Chargé')).toBeInTheDocument();
});

// ✅ CORRECT
test('chargement', async () => {
  render(<MonComposant />);
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  await screen.findByTestId('stable-content');
  expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
});
```

## Exemple Complet

```typescript
// MonComposant.tsx
export const MonComposant = ({ isLoading = false }) => (
  <div
    data-testid="stable-container"
    className="container"
  >
    <header
      data-testid="stable-header-block"
      className="header-block"
    >
      <h1
        data-testid="stable-header-title"
        className="header-block__title"
      >
        Titre
      </h1>
      <button
        data-testid="stable-theme-toggle"
        className="theme-toggle"
        onClick={toggleTheme}
      >
        Thème
      </button>
    </header>

    <main
      data-testid="stable-content-block"
      className="content-block"
    >
      {isLoading ? (
        <div data-testid="loading-spinner">
          Chargement...
        </div>
      ) : (
        <div data-testid="stable-content">
          Contenu
        </div>
      )}
    </main>
  </div>
);

// MonComposant.test.tsx
describe('MonComposant', () => {
  it('devrait gérer le cycle de vie complet', async () => {
    // 1. Rendu Initial
    render(<MonComposant isLoading />);
    expect(
      screen.getByTestId('loading-spinner')
    ).toBeInTheDocument();

    // 2. Chargement Terminé
    await screen.findByTestId('stable-content');
    expect(
      screen.queryByTestId('loading-spinner')
    ).not.toBeInTheDocument();

    // 3. Interaction Thème
    const themeToggle = screen.getByTestId('stable-theme-toggle');
    await userEvent.click(themeToggle);
    expect(
      screen.getByTestId('stable-container')
    ).toHaveClass('theme-dark');
  });
});
```

## Validation des Tests

1. **Couverture**

   - Tests unitaires pour chaque composant
   - Tests d'intégration pour les interactions
   - Tests de snapshot pour le rendu

2. **Performance**

   - Regrouper les tests similaires
   - Éviter les attentes inutiles
   - Nettoyer après chaque test

3. **Maintenance**
   - Documenter les cas complexes
   - Utiliser des helpers réutilisables
   - Maintenir les snapshots à jour
