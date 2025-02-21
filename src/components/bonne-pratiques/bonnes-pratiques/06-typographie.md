# Application de la Typographie

## Hiérarchie des Textes

```typescript
<div
  className="stable-typography"
  id="test-typography"
  data-testid="stable-typography"
  role="region"
  aria-label="Exemple de hiérarchie typographique"
>
  {/* Niveau 1 - Titre Principal */}
  <h1
    className="stable-title-xl"
    id="test-title-xl"
    data-testid="stable-title-xl"
  >
    Titre Principal
  </h1>

  {/* Niveau 2 - Sous-sections */}
  <div className="stable-section" id="test-section" data-testid="stable-section">
    <h2
      className="stable-title-lg"
      id="test-title-lg"
      data-testid="stable-title-lg"
    >
      Sous-section
    </h2>
    <p
      className="stable-text-md"
      id="test-text-md"
      data-testid="stable-text-md"
    >
      Texte descriptif de la section avec une taille moyenne pour une bonne
      lisibilité.
    </p>
  </div>

  {/* Niveau 3 - Contenus */}
  <div
    className="stable-content"
    id="test-content"
    data-testid="stable-content"
  >
    <h3
      className="stable-title-md"
      id="test-title-md"
      data-testid="stable-title-md"
    >
      Titre de Contenu
    </h3>
    <p
      className="stable-text-sm"
      id="test-text-sm"
      data-testid="stable-text-sm"
    >
      Texte de contenu plus compact pour les informations détaillées.
    </p>
  </div>

  {/* Niveau 4 - Métadonnées */}
  <div className="stable-meta" id="test-meta" data-testid="stable-meta">
    <span
      className="stable-text-xs"
      id="test-text-xs"
      data-testid="stable-text-xs"
    >
      Informations complémentaires en plus petit
    </span>
  </div>
</div>
```

## Styles CSS

```css
/* Base Typographique */
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

.stable-title-md {
  font-size: var(--font-md);
  line-height: var(--line-height-md);
  font-weight: var(--font-weight-medium);
  margin-bottom: calc(var(--spacing-sm));
  color: var(--text-primary);
}

/* Textes */
.stable-text-md {
  font-size: var(--font-md);
  line-height: var(--line-height-md);
  margin-bottom: calc(var(--spacing-md));
  color: var(--text-secondary);
}

.stable-text-sm {
  font-size: var(--font-sm);
  line-height: var(--line-height-sm);
  margin-bottom: calc(var(--spacing-sm));
  color: var(--text-secondary);
}

.stable-text-xs {
  font-size: var(--font-xs);
  line-height: var(--line-height-xs);
  color: var(--text-tertiary);
}

/* Conteneurs */
.stable-section {
  margin-bottom: calc(var(--spacing-xl));
}

.stable-content {
  margin-bottom: calc(var(--spacing-lg));
}

.stable-meta {
  margin-top: calc(var(--spacing-md));
  padding-top: calc(var(--spacing-sm));
  border-top: 1px solid var(--border-color);
}
```

## Bonnes Pratiques

1. **Hiérarchie Visuelle**

   - Maintenir une progression claire des tailles
   - Utiliser les bons niveaux de titres (h1-h6)
   - Espacements proportionnels à la taille du texte

2. **Lisibilité**

   - Longueur de ligne optimale (45-75 caractères)
   - Contraste suffisant entre texte et fond
   - Hauteurs de ligne adaptées à la taille du texte

3. **Responsive**

   - Utiliser des unités relatives (rem, em)
   - Ajuster les tailles selon les breakpoints
   - Tester sur différents appareils

4. **Accessibilité**

   - Structure sémantique des titres
   - Taille de police minimum de 12px
   - Espacement suffisant entre les lignes
   - Contraste conforme aux normes WCAG

5. **Maintenance**
   - Utiliser les variables CSS
   - Nommer les classes de manière cohérente
   - Documenter les choix typographiques
