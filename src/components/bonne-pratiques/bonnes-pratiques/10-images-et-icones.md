# Gestion des Images et Icônes

## Principes Fondamentaux

1. **Hiérarchie des Conteneurs**

   - Container 1 (Parent) : Définit l'espace disponible total
   - Container 2 (Image) : S'adapte à l'espace fourni par son parent
   - L'image elle-même : S'adapte à son conteneur direct

2. **Règle d'Or**
   - L'image ne définit JAMAIS ses propres dimensions
   - Le conteneur parent dicte TOUJOURS l'espace disponible
   - Les calculs se font toujours par rapport au parent

## Structure de Base

```typescript
interface ImageContainerProps {
  src: string;
  alt: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ src, alt }) => (
  <div className="image-container">
    <img src={src} alt={alt} className="responsive-image" />
  </div>
);
```

## CSS Adaptatif

```css
/* Variables de Base */
:root {
  /* Calculs de Base */
  --vw: calc(100vw * 0.01);
  --vh: calc(100vh * 0.01);

  /* Espacements */
  --spacing-base: calc(var(--vw) * 1);
  --spacing-inner: calc(var(--spacing-base) * 0.5);
}

/* Container Principal - S'adapte à son parent */
.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Image - S'adapte à son conteneur */
.responsive-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* ou cover selon le besoin */
}
```

## Bonnes Pratiques

1. **Adaptation au Conteneur**

   ```css
   /* ✅ CORRECT */
   .parent-container {
     width: calc(var(--vw) * 50);
     height: calc(var(--vh) * 50);
   }

   .image-container {
     width: 100%;
     height: 100%;
   }

   /* ❌ INCORRECT */
   .image-container {
     width: 300px;
     height: 300px;
   }
   ```

2. **Gestion des Proportions**

   ```css
   /* ✅ CORRECT */
   .image-container {
     aspect-ratio: inherit; /* Hérite du parent */
   }

   /* ❌ INCORRECT */
   .image-container {
     aspect-ratio: 1 / 1; /* Force un ratio */
   }
   ```

3. **Positionnement**

   ```css
   /* ✅ CORRECT */
   .image-container {
     display: flex;
     align-items: center;
     justify-content: center;
   }

   /* ❌ INCORRECT */
   .image-container {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
   ```

## Utilisation dans une Grille

```css
/* Container Parent (Niveau 1) */
.grid-cell {
  width: calc((100% - var(--gap)) / var(--columns));
  height: calc((100% - var(--gap)) / var(--rows));
}

/* Container Image (Niveau 2) */
.image-container {
  width: 100%;
  height: 100%;
  padding: var(--spacing-inner);
}

/* Image (Niveau 3) */
.responsive-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

## Tests à Effectuer

1. **Adaptation au Parent**

   - Vérifier que l'image s'adapte quand le parent change de taille
   - Tester avec différentes tailles de conteneur parent
   - Valider le comportement avec différents ratios d'aspect

2. **Qualité Visuelle**

   - Vérifier que l'image reste nette
   - S'assurer qu'il n'y a pas de déformation
   - Tester différentes valeurs de object-fit

3. **Performance**
   - Utiliser loading="lazy" pour le chargement différé
   - Optimiser les images pour le web
   - Tester les temps de chargement

## Exemple dans un Layout Complexe

```typescript
const ComplexLayout: React.FC = () => (
  <div className="grid">
    <div className="grid__row">
      <div className="grid__cell">
        <ImageContainer src="image1.jpg" alt="Image 1" />
      </div>
      <div className="grid__cell">Contenu 2</div>
    </div>
    <div className="grid__row">
      <div className="grid__cell">Contenu 3</div>
      <div className="grid__cell">
        <ImageContainer src="image4.jpg" alt="Image 4" />
      </div>
    </div>
  </div>
);
```

## Points Clés à Retenir

1. **Hiérarchie Stricte**

   - Le parent définit l'espace
   - Le conteneur s'adapte
   - L'image suit son conteneur

2. **Calculs Adaptatifs**

   - Utiliser des unités relatives
   - Éviter les dimensions fixes
   - Respecter les calculs du parent

3. **Maintenance**
   - Documenter les choix de object-fit
   - Utiliser des classes BEM
   - Tester sur différents viewports
