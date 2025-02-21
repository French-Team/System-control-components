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
