# Système de Couleurs et Thèmes

## Variables de Base

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

## Application des Thèmes

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

## Exemple d'Utilisation

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

## Styles des Composants

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
