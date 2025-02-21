# Disposition et Mise en Page

## Structure de Base

```typescript
<div
  className="stable-layout"
  id="test-layout"
  data-testid="stable-layout"
  role="region"
  aria-label="Zone de mise en page"
>
  {/* En-tête */}
  <header
    className="stable-layout-header"
    id="test-layout-header"
    data-testid="stable-layout-header"
    role="banner"
  >
    <nav
      className="stable-layout-nav"
      id="test-layout-nav"
      data-testid="stable-layout-nav"
      role="navigation"
    >
      Navigation
    </nav>
  </header>

  {/* Contenu Principal */}
  <main
    className="stable-layout-main"
    id="test-layout-main"
    data-testid="stable-layout-main"
    role="main"
  >
    {/* Grille de Contenu */}
    <div
      className="stable-layout-grid"
      id="test-layout-grid"
      data-testid="stable-layout-grid"
      role="group"
    >
      <div
        className="stable-layout-col"
        id="test-layout-col-1"
        data-testid="stable-layout-col-1"
      >
        Colonne 1
      </div>
      <div
        className="stable-layout-col"
        id="test-layout-col-2"
        data-testid="stable-layout-col-2"
      >
        Colonne 2
      </div>
    </div>
  </main>

  {/* Pied de Page */}
  <footer
    className="stable-layout-footer"
    id="test-layout-footer"
    data-testid="stable-layout-footer"
    role="contentinfo"
  >
    Footer
  </footer>
</div>
```

## Styles CSS

```css
/* Container Principal */
.stable-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-primary);
}

/* En-tête */
.stable-layout-header {
  position: sticky;
  top: 0;
  z-index: var(--z-index-header);
  background-color: var(--bg-secondary);
  padding: calc(var(--spacing-md));
  border-bottom: 1px solid var(--border-color);
}

.stable-layout-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

/* Contenu Principal */
.stable-layout-main {
  flex: 1;
  padding: calc(var(--spacing-md));
  overflow: auto;
}

/* Grille */
.stable-layout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Colonnes */
.stable-layout-col {
  background-color: var(--bg-content);
  padding: calc(var(--spacing-md));
  border-radius: calc(var(--spacing-xs));
  border: 1px solid var(--border-color);
}

/* Pied de Page */
.stable-layout-footer {
  background-color: var(--bg-secondary);
  padding: calc(var(--spacing-md));
  border-top: 1px solid var(--border-color);
}

/* Media Queries */
@media (max-width: 768px) {
  .stable-layout-grid {
    grid-template-columns: 1fr;
  }

  .stable-layout-header,
  .stable-layout-main,
  .stable-layout-footer {
    padding: calc(var(--spacing-sm));
  }
}
```

## Bonnes Pratiques

1. **Structure Sémantique**

   - Utiliser les balises HTML5 appropriées (`header`, `main`, `footer`, etc.)
   - Ajouter des rôles ARIA pour une meilleure accessibilité
   - Maintenir une hiérarchie logique des éléments

2. **Flexibilité et Responsive**

   - Utiliser CSS Grid pour les layouts complexes
   - Flexbox pour l'alignement et la distribution
   - Media queries pour l'adaptation mobile
   - Unités relatives (rem, %, vh/vw) plutôt que fixes

3. **Performance**

   - Position: sticky pour l'en-tête
   - Overflow: auto pour le défilement
   - Utiliser les variables CSS pour la cohérence
   - Éviter les calculs CSS complexes

4. **Accessibilité**
   - Structure de navigation claire
   - Points de repère ARIA
   - Focus visible et navigation au clavier
   - Contrastes suffisants

# Système de Disposition

## Principes Fondamentaux

1. **Adaptation au Conteneur**

   - Les éléments DOIVENT s'adapter à leur conteneur parent
   - Utiliser des unités relatives (%, vw, vh, rem)
   - Éviter les dimensions fixes sauf cas spécifiques

2. **Flexibilité et Grille**
   - Utiliser Flexbox pour les alignements simples
   - Utiliser Grid pour les layouts complexes
   - Combiner les deux selon les besoins

## Variables de Base

```css
:root {
  /* 1. Espacement */
  --spacing-unit: 8px;
  --spacing-xs: calc(var(--spacing-unit) * 0.5); /* 4px */
  --spacing-sm: var(--spacing-unit); /* 8px */
  --spacing-md: calc(var(--spacing-unit) * 2); /* 16px */
  --spacing-lg: calc(var(--spacing-unit) * 3); /* 24px */
  --spacing-xl: calc(var(--spacing-unit) * 4); /* 32px */

  /* 2. Breakpoints */
  --breakpoint-mobile: 480px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;

  /* 3. Conteneurs */
  --container-padding: var(--spacing-md);
  --container-max-width: 1200px;
  --container-width: min(100% - var(--container-padding) * 2, var(--container-max-width));

  /* 4. Grille */
  --grid-columns: 12;
  --grid-gap: var(--spacing-md);
  --column-width: calc(
    (100% - (var(--grid-gap) * (var(--grid-columns) - 1))) / var(--grid-columns)
  );
}
```

## Classes de Base

```css
/* 1. Conteneur Principal */
.container {
  width: var(--container-width);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

/* 2. Grille */
.grid {
  display: grid;
  gap: var(--grid-gap);
  grid-template-columns: repeat(var(--grid-columns), 1fr);
}

/* 3. Flexbox */
.flex {
  display: flex;
  gap: var(--spacing-md);
}

.flex-column {
  flex-direction: column;
}

.flex-center {
  align-items: center;
  justify-content: center;
}
```

## Adaptation des Blocs

```css
/* 1. Header Block */
.header-block {
  width: 100%;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.header-block__title {
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* 2. Content Block */
.content-block {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--grid-gap);
  padding: var(--spacing-md);
}

/* 3. Footer Block */
.footer-block {
  width: 100%;
  padding: var(--spacing-md);
  margin-top: auto;
}
```

## Media Queries

```css
/* 1. Mobile First */
@media screen and (min-width: var(--breakpoint-mobile)) {
  .header-block {
    flex-direction: row;
    align-items: center;
  }
}

/* 2. Tablet */
@media screen and (min-width: var(--breakpoint-tablet)) {
  :root {
    --container-padding: var(--spacing-lg);
  }

  .content-block {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 3. Desktop */
@media screen and (min-width: var(--breakpoint-desktop)) {
  .content-block {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Bonnes Pratiques

1. **Dimensions**

   - ❌ `width: 300px`
   - ✅ `width: min(100%, 300px)`
   - ✅ `width: clamp(200px, 50%, 400px)`

2. **Espacement**

   - Utiliser les variables d'espacement
   - Maintenir une grille cohérente
   - Éviter les marges négatives

3. **Flexibilité**

   - Prévoir l'adaptation du contenu
   - Utiliser `min()`, `max()`, `clamp()`
   - Tester avec différents contenus

4. **Accessibilité**
   - Maintenir l'ordre logique en responsive
   - Préserver les marges de lecture
   - Assurer la lisibilité du contenu

## Exemple Complet

```typescript
// MonComposant.tsx
export const MonComposant = () => (
  <div className="container">
    <header className="header-block">
      <h1 className="header-block__title">
        Titre qui s'adapte
      </h1>
      <nav className="header-block__nav">
        Navigation
      </nav>
    </header>

    <main className="content-block">
      {items.map(item => (
        <article key={item.id} className="content-block__item">
          {item.content}
        </article>
      ))}
    </main>

    <footer className="footer-block">
      Pied de page
    </footer>
  </div>
);

// MonComposant.css
.container {
  width: var(--container-width);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header-block {
  width: 100%;
  padding: var(--spacing-md);
}

.content-block {
  flex: 1;
  display: grid;
  gap: var(--grid-gap);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.footer-block {
  margin-top: auto;
  padding: var(--spacing-md);
}
```

## Tests à Effectuer

1. **Responsive**

   - Tester sur tous les breakpoints
   - Vérifier l'adaptation du contenu
   - Valider les transitions de layout

2. **Contenu**

   - Tester avec du contenu minimal
   - Tester avec du contenu maximal
   - Vérifier les débordements

3. **Performance**
   - Éviter les calculs CSS complexes
   - Minimiser les reflows
   - Optimiser les animations
