# Identification pour les Tests

## IDs et Data Attributes

```typescript
// Toujours inclure id ET data-testid
<div
  id="test-container"
  data-testid="stable-container"
>
```

## Convention de Nommage des IDs

- Préfixe `test-` pour tous les IDs
- Structure hiérarchique :
  ```
  test-container
  ├── test-header
  ├── test-content
  │   └── test-item-row
  │       ├── test-item-content-row
  │       └── test-item-children-row
  ```
