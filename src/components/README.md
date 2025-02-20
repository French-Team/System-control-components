# Guide de Création d'un Nouveau Module

Ce guide détaille la procédure à suivre pour créer un nouveau module conforme aux standards de notre application. Il fait référence aux bonnes pratiques définies dans `../__test-system__/guide.md`.

## 1. Structure des Fichiers

Pour chaque nouveau module, créez un dossier avec les fichiers suivants :

```bash
MonModule/
├── MonModule.tsx        # Composant principal
├── MonModule.styles.css # Styles du composant
├── MonModule.test.tsx   # Tests du composant
└── index.ts            # Point d'entrée pour l'export
```

## 2. Structure du Composant Principal (MonModule.tsx)

### ✅ Bonnes Pratiques

```tsx
import React from 'react';
import './MonModule.styles.css';

export default function MonModule() {
  return (
    <div data-testid="stable-container">
      <header data-testid="stable-header">
        <h1>Titre du Module</h1>
      </header>

      <button data-testid="stable-button">Action Principale</button>

      <section data-testid="stable-content">
        <div data-testid="stable-item-row">
          <div data-testid="stable-item-column">Contenu du Module</div>
        </div>
      </section>
    </div>
  );
}
```

### ❌ Pratiques à Éviter

```tsx
// Structure non conforme à éviter
export default function MonModule() {
  return (
    <div className="container">
      {' '}
      {/* ❌ Pas de data-testid */}
      <div>
        {' '}
        {/* ❌ Structure non standardisée */}
        Contenu non structuré
      </div>
    </div>
  );
}
```

## 3. Styles (MonModule.styles.css)

### ✅ Bonnes Pratiques

```css
/* Utilisation des variables CSS */
.stable-container {
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  padding: var(--spacing-medium);
}

/* Support des thèmes */
.theme-light {
  --background-color: var(--color-light);
}

.theme-dark {
  --background-color: var(--color-dark);
}
```

### ❌ Pratiques à Éviter

```css
/* Styles à ne pas utiliser */
.container {
  display: block; /* ❌ Utiliser flex */
  background-color: #ffffff; /* ❌ Pas de couleurs en dur */
  width: 300px; /* ❌ Pas de dimensions fixes */
  padding: 20px; /* ❌ Pas de valeurs en dur */
  transition: all 1s; /* ❌ Pas de transitions longues */
  cursor: default; /* ❌ Éviter cursor: default */
  overflow: visible; /* ❌ Gérer l'overflow explicitement */
}
```

## 4. Tests (MonModule.test.tsx)

```tsx
import { render, screen } from '@testing-library/react';
import MonModule from './MonModule';

describe('MonModule', () => {
  it('devrait rendre tous les éléments requis', () => {
    render(<MonModule />);

    // Vérification des data-testid requis
    expect(screen.getByTestId('stable-container')).toBeInTheDocument();
    expect(screen.getByTestId('stable-header')).toBeInTheDocument();
    expect(screen.getByTestId('stable-button')).toBeInTheDocument();
    expect(screen.getByTestId('stable-content')).toBeInTheDocument();
    expect(screen.getByTestId('stable-item-row')).toBeInTheDocument();
    expect(screen.getByTestId('stable-item-column')).toBeInTheDocument();
  });
});
```

## 5. Export (index.ts)

```typescript
export { default } from './MonModule';
```

## Points de Contrôle

Avant de commiter votre nouveau module, vérifiez que :

1. **Structure**

   - [ ] Tous les fichiers requis sont présents
   - [ ] Les data-testid sont correctement implémentés
   - [ ] La hiérarchie des composants est respectée

2. **Styles**

   - [ ] Utilisation de variables CSS pour les couleurs
   - [ ] Pas de valeurs en dur (couleurs, dimensions, espacements)
   - [ ] Support des thèmes (light/dark) implémenté
   - [ ] Utilisation de display: flex pour la mise en page

3. **Tests**
   - [ ] Tous les data-testid sont testés
   - [ ] Les tests passent avec succès

## Système de Surveillance

Le système de surveillance (`../__test-system__/scripts/watch.ts`) vérifiera automatiquement :

- La présence des fichiers requis
- La conformité de la structure (data-testid)
- Les bonnes pratiques de style
- La génération des rapports d'analyse

## En Cas d'Erreur

Si le système détecte des non-conformités :

1. Consultez les rapports générés dans `../__test-system__/__reports__/`
2. Corrigez les problèmes signalés
3. Référez-vous au guide des standards pour plus de détails

## Ressources

- [Guide Complet des Standards](../__test-system__/guide.md)
- [Notes d'amélioration](../__test-system__/amelioration-notes.md)
- [Documentation du système de surveillance](../__test-system__/scripts/watch.ts)
