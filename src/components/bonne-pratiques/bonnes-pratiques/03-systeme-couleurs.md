# Système de Couleurs et Thèmes

## Principes Fondamentaux

1. **Centralisation des Couleurs**

   - Toutes les couleurs DOIVENT être définies dans le fichier thème
   - Utiliser des variables CSS pour la réutilisabilité
   - Jamais de valeurs hexadécimales en dur dans les styles

2. **Gestion des Thèmes**
   - Thème clair et sombre obligatoires
   - Transition fluide entre les thèmes
   - Support du mode sombre système

## Structure des Variables

```css
:root {
  /* 1. Couleurs de Base */
  --color-primary-100: #e3f2fd;
  --color-primary-500: #2196f3;
  --color-primary-900: #0d47a1;

  --color-neutral-100: #f5f5f5;
  --color-neutral-500: #9e9e9e;
  --color-neutral-900: #212121;

  /* 2. Couleurs Sémantiques */
  --color-success: #4caf50;
  --color-warning: #ffc107;
  --color-error: #f44336;
  --color-info: #2196f3;

  /* 3. Couleurs d'État */
  --color-hover: rgba(0, 0, 0, 0.1);
  --color-active: rgba(0, 0, 0, 0.2);
  --color-disabled: rgba(0, 0, 0, 0.38);

  /* 4. Variables Thématiques */
  --background: var(--color-neutral-100);
  --text-primary: var(--color-neutral-900);
  --text-secondary: var(--color-neutral-500);
  --border: var(--color-neutral-200);
}

/* Thème Sombre */
.theme-dark {
  --background: var(--color-neutral-900);
  --text-primary: var(--color-neutral-100);
  --text-secondary: var(--color-neutral-500);
  --border: var(--color-neutral-700);
}
```

## Utilisation dans les Composants

```css
/* MonComposant.css */
.header-block {
  background: var(--background);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.header-block__title {
  color: var(--text-primary);
}

.header-block__subtitle {
  color: var(--text-secondary);
}
```

## Gestion du Mode Sombre

```css
/* Détection automatique du mode sombre système */
@media (prefers-color-scheme: dark) {
  :root {
    --background: var(--color-neutral-900);
    --text-primary: var(--color-neutral-100);
    --text-secondary: var(--color-neutral-500);
  }
}
```

## Transitions

```css
/* Transition fluide entre les thèmes */
:root {
  --transition-duration: 200ms;
}

* {
  transition:
    background-color var(--transition-duration) ease,
    color var(--transition-duration) ease,
    border-color var(--transition-duration) ease;
}
```

## Bonnes Pratiques

1. **Nommage des Variables**
   - Utiliser des noms sémantiques
   - Suivre une convention cohérente
   - Préfixer les variables par leur usage

```css
/* ❌ INCORRECT */
--blue: #2196f3;
--dark: #212121;

/* ✅ CORRECT */
--color-primary-500: #2196f3;
--color-neutral-900: #212121;
```

2. **Accessibilité**

   - Maintenir un contraste WCAG AA minimum
   - Tester les combinaisons de couleurs
   - Prévoir des alternatives pour le daltonisme

3. **Organisation**

   - Séparer les couleurs de base des variables thématiques
   - Grouper les variables par fonction
   - Documenter les choix de couleurs

4. **Tests**
   - Tester dans les deux thèmes
   - Vérifier les transitions
   - Valider l'accessibilité

## Exemple Complet

```typescript
// MonComposant_theme.css
:root {
  --color-primary-500: #2196F3;
  --color-neutral-100: #F5F5F5;
  --color-neutral-900: #212121;

  --background: var(--color-neutral-100);
  --text-primary: var(--color-neutral-900);
}

.theme-dark {
  --background: var(--color-neutral-900);
  --text-primary: var(--color-neutral-100);
}

// MonComposant.css
.header-block {
  background: var(--background);
  color: var(--text-primary);
  transition: all 200ms ease;
}

// MonComposant.tsx
export const MonComposant = () => {
  const [theme, setTheme] = useState('light');

  return (
    <div className={`header-block theme-${theme}`}>
      <span className="header-block__title">
        Titre avec thème
      </span>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Changer de thème
      </button>
    </div>
  );
};
```

## Validation des Couleurs

Pour chaque couleur :

1. Vérifier le contraste (WCAG AA)
2. Tester en mode sombre
3. Valider avec les outils d'accessibilité
4. Documenter les ratios de contraste
