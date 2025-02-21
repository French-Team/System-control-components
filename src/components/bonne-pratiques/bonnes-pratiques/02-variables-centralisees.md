# Gestion Centralisée des Variables CSS

> ⚠️ **RAPPEL : Test-Driven Development (TDD)**
>
> Tout développement DOIT suivre la méthode TDD :
>
> 1. ❌ RED - Écrire le test d'abord (et le voir échouer)
> 2. ✅ GREEN - Écrire le minimum de code pour faire passer le test
> 3. 🔄 REFACTOR - Améliorer le code en gardant les tests verts

## Tests à Implémenter en Premier

```typescript
// variables.test.ts
import { describe, it, expect } from 'vitest';

describe('Variables CSS Centralisées', () => {
  // 1. Test de Structure
  describe('Structure du Fichier', () => {
    it('devrait avoir un fichier _variables.css à la racine du composant', () => {
      // Test de l'existence du fichier
    });

    it('devrait être importé dans tous les fichiers CSS du composant', () => {
      // Test des imports dans les fichiers CSS
    });
  });

  // 2. Test des Variables Requises
  describe('Variables Obligatoires', () => {
    it('devrait définir toutes les variables de base', () => {
      const style = window.getComputedStyle(document.documentElement);
      const requiredVars = [
        '--component-spacing-base',
        '--component-color-primary',
        '--component-text-base',
      ];

      requiredVars.forEach((varName) => {
        expect(style.getPropertyValue(varName)).not.toBe('');
      });
    });
  });

  // 3. Test de Nommage
  describe('Convention de Nommage', () => {
    it('devrait suivre la convention de nommage BEM pour les variables', () => {
      const style = window.getComputedStyle(document.documentElement);
      const varNames = Array.from(style).filter((name) => name.startsWith('--'));

      varNames.forEach((name) => {
        expect(name).toMatch(/^--[a-z]+(-[a-z]+)*$/);
      });
    });
  });
});
```

## Structure du Système de Variables

1. **Un Fichier Unique par Composant**

   ```
   MonComposant/
   ├── _variables.css      # TOUTES les variables du composant
   ├── MonComposant.css    # Import des variables uniquement
   └── components/
       └── SousComposant/
           └── SousComposant.css  # Import des variables parent
   ```

2. **Hiérarchie des Variables**

   ```css
   /* _variables.css */
   :root {
     /* 1. Variables de Base du Composant */
     --component-spacing-base: 8px;
     --component-color-primary: #007bff;

     /* 2. Variables Calculées */
     --component-spacing-large: calc(var(--component-spacing-base) * 2);

     /* 3. Variables Spécifiques aux Sous-composants */
     --component-header-height: 60px;
     --component-footer-padding: var(--component-spacing-base);
   }
   ```

## Bonnes Pratiques de Nommage

1. **Préfixage Obligatoire**

   ```css
   /* ✅ CORRECT */
   --component-name-property-variant

   /* ❌ INCORRECT */
   --spacing
   --color-primary
   ```

2. **Dépendances Explicites**

   ```css
   /* ✅ CORRECT */
   --component-header-height: calc(var(--component-spacing-base) * 10);

   /* ❌ INCORRECT */
   --header-height: calc(var(--spacing) * 10);
   ```

## Documentation Requise

```css
/* _variables.css */
/**
 * Variables Centralisées - MonComposant
 * -----------------------------------
 * @description Définit toutes les variables utilisées dans le composant
 * @dependency Aucune - fichier racine
 */

:root {
  /* Variables de Base
   * ----------------
   * @usage Définissent les valeurs fondamentales du composant
   * @example var(--component-spacing-base)
   */
  --component-spacing-base: 8px;

  /* Variables Calculées
   * -----------------
   * @usage Utilisent les variables de base pour des calculs complexes
   * @dependency --component-spacing-base
   */
  --component-spacing-large: calc(var(--component-spacing-base) * 2);
}
```

## Validation et Maintenance

1. **Tests Automatisés**

   - Vérification de la présence des variables
   - Validation des conventions de nommage
   - Tests des calculs et dépendances

2. **Revue de Code**

   - Vérification des imports dans tous les fichiers CSS
   - Validation de la documentation
   - Contrôle des dépendances circulaires

3. **Maintenance**
   - Nettoyage régulier des variables non utilisées
   - Mise à jour de la documentation
   - Vérification des dépendances

## Intégration avec les Autres Standards

1. **Structure et Organisation**

   - Voir [`06-structure-fichiers.md`](./06-structure-fichiers.md) pour l'organisation des fichiers
   - Les variables doivent suivre la structure de fichiers définie

2. **Design System**

   - Voir [`03-systeme-couleurs.md`](./03-systeme-couleurs.md) pour les variables de couleur
   - Voir [`04-typographie.md`](./04-typographie.md) pour les variables typographiques

3. **Composants**
   - Voir [`11-grilles-et-calculs.md`](./11-grilles-et-calculs.md) pour les variables de grille
   - Les composants doivent utiliser les variables définies ici

## Dépendances entre Documents

1. **Ce Document Est Requis Par**

   - `03-systeme-couleurs.md` (utilise les conventions de nommage)
   - `04-typographie.md` (utilise la structure des variables)
   - `11-grilles-et-calculs.md` (utilise les calculs de base)

2. **Ce Document Dépend De**

   - `00-pre-requis.md` (règles de base)
   - `06-structure-fichiers.md` (organisation)

3. **Tests Associés**
   - Voir `05-tests-configuration.md` pour les tests des variables CSS
