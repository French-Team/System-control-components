# Rapport d'Analyse pour LayoutBlocks

Date: 21/02/2025 10:33:20

## 1. Analyse des Tests

- Couverture: 42%
- Éléments testés: 5/12

### Cas de Test

- devrait rendre tous les éléments requis avec les data-testid (interaction)
  Éléments couverts: stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-header, stable-content, stable-button, stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-content, stable-item-row, stable-container, stable-container, stable-header, stable-content, stable-button
- devrait avoir la structure sémantique correcte (interaction)
  Éléments couverts: stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-header, stable-content, stable-button, stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-content, stable-item-row, stable-container, stable-container, stable-header, stable-content, stable-button
- devrait avoir le contenu textuel correct (render)
  Éléments couverts: stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-header, stable-content, stable-button, stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-content, stable-item-row, stable-container, stable-container, stable-header, stable-content, stable-button
- devrait avoir les classes CSS appropriées (render)
  Éléments couverts: stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-header, stable-content, stable-button, stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-content, stable-item-row, stable-container, stable-container, stable-header, stable-content, stable-button
- devrait avoir la structure correcte pour le layout flexible (render)
  Éléments couverts: stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-header, stable-content, stable-button, stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-content, stable-item-row, stable-container, stable-container, stable-header, stable-content, stable-button
- devrait changer de thème lors du clic sur les boutons (render)
  Éléments couverts: stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-header, stable-content, stable-button, stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-content, stable-item-row, stable-container, stable-container, stable-header, stable-content, stable-button
- devrait avoir une structure accessible (render)
  Éléments couverts: stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-header, stable-content, stable-button, stable-container, stable-header, stable-content, stable-item-row, stable-button, stable-container, stable-content, stable-item-row, stable-container, stable-container, stable-header, stable-content, stable-button

### Suggestions pour les Tests

- Augmenter la couverture de test (actuellement 42%)

## 2. Analyse de la Structure

### Hiérarchie (Profondeur: 6)

- <div> [data-testid="stable-container"]
- <header> [data-testid="stable-header"] (header)
- <div>
- <div> [data-testid="stable-header-block"]
- <h>
- <div> [data-testid="stable-header-block"]
- <div> [data-testid="stable-header-block"]
- <div> [data-testid="stable-header-block"]
- <div> [data-testid="stable-header-block"]
- <ThemeSelector>
- <section> [data-testid="stable-content"] (section)
- <div> [data-testid="stable-item-row"]
- <div> [data-testid="stable-item-column"]
- <StableLayout>
- <div> [data-testid="stable-item-column"]
- <footer> [data-testid="stable-button"] (footer)

### Accessibilité

- Tags sémantiques: header, section, footer
- Attributs ARIA: aria-label=, aria-label=, aria-label=, aria-label=, aria-label=, aria-label=, aria-label=, aria-label=, aria-label=, aria-label=, aria-label=, aria-label=

### Suggestions pour la Structure

## 3. Analyse des Styles

### Support des Thèmes

- Thèmes détectés: light, dark
- Variables utilisées:

### Mise en Page

- Type: flex
- Propriétés: flex-direction: column, flex-direction: column, flex-direction: column, flex-wrap: wrap, flex-direction: column, flex-direction: column

### Réactivité

- Media Queries: --breakpoint-tablet, --breakpoint-mobile, --breakpoint-tablet, --breakpoint-mobile

### Suggestions pour les Styles

- [adaptive-sizing-rule] La taille minimale du texte ne doit pas être inférieure à 12px
