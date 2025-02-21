# Grilles et Calculs Adaptatifs

## Principes Fondamentaux

1. **Hiérarchie des Conteneurs**

   - Container 1 : Définit l'espace global disponible
   - Container 2 : S'adapte à l'espace fourni par son parent
   - Container 3 : Gère la disposition interne

2. **Calculs de Distribution**

   ```css
   /* Distribution égale de l'espace */
   .grid {
     --gap: calc(var(--spacing-base) * 0.5);
     --columns: 2;
     --rows: 2;

     /* Calcul de l'espace disponible après gaps */
     --available-width: calc(100% - (var(--gap) * (var(--columns) - 1)));
     --available-height: calc(100% - (var(--gap) * (var(--rows) - 1)));

     /* Taille des cellules */
     --cell-width: calc(var(--available-width) / var(--columns));
     --cell-height: calc(var(--available-height) / var(--rows));
   }
   ```

## Structure de Base

```typescript
interface GridProps {
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ children }) => (
  <div className="grid">
    <div className="grid__row">
      <div className="grid__cell">Cellule 1</div>
      <div className="grid__cell">Cellule 2</div>
    </div>
    <div className="grid__row">
      <div className="grid__cell">Cellule 3</div>
      <div className="grid__cell">Cellule 4</div>
    </div>
  </div>
);
```

## CSS Adaptatif

```css
/* Container Principal */
.grid {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

/* Lignes */
.grid__row {
  display: flex;
  gap: var(--gap);
  height: var(--cell-height);
}

/* Cellules */
.grid__cell {
  width: var(--cell-width);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Bonnes Pratiques

1. **Calculs des Dimensions**

   ```css
   /* ✅ CORRECT */
   .cell {
     width: calc((100% - var(--gap)) / 2);
     height: calc((100% - var(--gap)) / 2);
   }

   /* ❌ INCORRECT */
   .cell {
     width: 50%;
     height: 50%;
   }
   ```

2. **Gestion des Gaps**

   ```css
   /* ✅ CORRECT */
   .grid {
     --total-gap: calc(var(--gap) * (var(--columns) - 1));
     --cell-size: calc((100% - var(--total-gap)) / var(--columns));
   }

   /* ❌ INCORRECT */
   .grid {
     --cell-size: calc(100% / var(--columns));
   }
   ```

3. **Adaptation au Conteneur**

   ```css
   /* ✅ CORRECT */
   .container {
     display: flex;
     flex-direction: column;
   }

   .grid {
     flex: 1;
     min-height: 0;
   }

   /* ❌ INCORRECT */
   .container {
     height: 100vh;
   }

   .grid {
     height: 100%;
   }
   ```

## Tests à Effectuer

1. **Distribution de l'Espace**

   - Vérifier que chaque cellule occupe exactement 1/4 de l'espace
   - Confirmer que les gaps sont uniformes
   - Tester avec différentes tailles de conteneur

2. **Adaptation au Redimensionnement**

   - Vérifier le comportement lors du redimensionnement
   - Tester les limites min/max
   - Valider le maintien des proportions

3. **Responsive Design**

   ```css
   @media screen and (max-width: var(--breakpoint-tablet)) {
     .grid {
       --columns: 2;
       --rows: 2;
     }
   }

   @media screen and (max-width: var(--breakpoint-mobile)) {
     .grid {
       --columns: 1;
       --rows: 4;
     }
   }
   ```

## Exemple Complet

```typescript
// grid.tsx
export const Grid: React.FC = () => (
  <div className="grid">
    {Array.from({ length: 4 }, (_, i) => (
      <div key={i} className="grid__cell">
        Cellule {i + 1}
      </div>
    ))}
  </div>
);

// grid.css
.grid {
  --gap: calc(var(--spacing-base) * 0.5);
  --columns: 2;
  --rows: 2;

  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
  gap: var(--gap);

  width: 100%;
  height: 100%;
}

.grid__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cell-bg);
  border-radius: var(--border-radius);
}
```

## Points Clés à Retenir

1. **Calculs Précis**

   - Toujours soustraire les gaps avant de diviser l'espace
   - Utiliser des variables CSS pour les calculs
   - Éviter les valeurs fixes

2. **Hiérarchie**

   - Respecter la hiérarchie des conteneurs
   - Chaque niveau a une responsabilité unique
   - Le contenu s'adapte au conteneur, pas l'inverse

3. **Maintenance**
   - Documenter les calculs complexes
   - Utiliser des variables pour les valeurs réutilisables
   - Tester sur différentes tailles d'écran
