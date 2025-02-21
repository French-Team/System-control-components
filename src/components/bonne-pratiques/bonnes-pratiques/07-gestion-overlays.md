# Gestion des Overlays

## État et Contrôle

```typescript
const [showOverlay, setShowOverlay] = useState(false);

// Déclencheur
<button
  className="stable-button"
  id="test-action-button"
  data-testid="stable-action-button"
  onClick={() => setShowOverlay(true)}
  aria-label="Ouvrir la fenêtre de dialogue"
>
  Action
</button>

// Overlay
{showOverlay && (
  <div
    className="stable-overlay"
    id="test-overlay"
    data-testid="stable-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="test-overlay-title"
  >
    <div
      className="stable-overlay-content"
      id="test-overlay-content"
      data-testid="stable-overlay-content"
    >
      <h2
        id="test-overlay-title"
        className="stable-overlay-title"
        data-testid="stable-overlay-title"
      >
        Titre de l'overlay
      </h2>
      <button
        className="stable-button stable-close-button"
        id="test-close-button"
        data-testid="stable-close-button"
        onClick={() => setShowOverlay(false)}
        aria-label="Fermer la fenêtre de dialogue"
      >
        ✕
      </button>
      <div
        className="stable-overlay-body"
        id="test-overlay-body"
        data-testid="stable-overlay-body"
      >
        Contenu de l'overlay
      </div>
    </div>
  </div>
)}
```

## Styles CSS

```css
/* Overlay */
.stable-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, calc(var(--opacity-overlay) * 0.5));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-index-overlay);
}

/* Contenu de l'Overlay */
.stable-overlay-content {
  position: relative;
  background: var(--bg-primary);
  border-radius: calc(var(--spacing-xs) * 2);
  padding: calc(var(--spacing-md));
  min-width: clamp(300px, 50vw, 600px);
  max-height: calc(100vh - var(--spacing-xl) * 2);
  overflow-y: auto;
}

/* Titre */
.stable-overlay-title {
  font-size: var(--font-lg);
  line-height: calc(var(--spacing-lg));
  margin-bottom: calc(var(--spacing-md));
  padding-right: calc(var(--spacing-xl));
  color: var(--text-primary);
}

/* Bouton de Fermeture */
.stable-close-button {
  position: absolute;
  top: calc(var(--spacing-xs));
  right: calc(var(--spacing-xs));
  padding: calc(var(--spacing-xs));
  font-size: var(--font-md);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

/* Corps de l'Overlay */
.stable-overlay-body {
  font-size: var(--font-md);
  line-height: calc(var(--font-md) * 1.5);
  color: var(--text-secondary);
}
```

## Bonnes Pratiques

1. **Accessibilité**

   - Utiliser `role="dialog"` et `aria-modal="true"`
   - Ajouter des labels ARIA descriptifs
   - Gérer le focus et le piéger dans l'overlay
   - Permettre la fermeture avec la touche Échap

2. **Gestion du Focus**

   ```typescript
   useEffect(() => {
     if (showOverlay) {
       // Sauvegarder le dernier élément focus
       const lastFocus = document.activeElement;

       // Focus sur le premier élément focusable de l'overlay
       const firstFocusable = overlayRef.current?.querySelector(
         'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
       );
       firstFocusable?.focus();

       return () => {
         // Restaurer le focus à la fermeture
         lastFocus?.focus();
       };
     }
   }, [showOverlay]);
   ```

3. **Gestion du Scroll**

   ```typescript
   useEffect(() => {
     if (showOverlay) {
       // Bloquer le scroll du body
       document.body.style.overflow = 'hidden';

       return () => {
         // Restaurer le scroll à la fermeture
         document.body.style.overflow = '';
       };
     }
   }, [showOverlay]);
   ```

4. **Fermeture avec Échap**

   ```typescript
   useEffect(() => {
     const handleEscape = (event: KeyboardEvent) => {
       if (event.key === 'Escape' && showOverlay) {
         setShowOverlay(false);
       }
     };

     document.addEventListener('keydown', handleEscape);
     return () => document.removeEventListener('keydown', handleEscape);
   }, [showOverlay]);
   ```

5. **Animation**

   ```css
   .stable-overlay {
     animation: fadeIn 0.2s ease;
   }

   .stable-overlay-content {
     animation: slideIn 0.3s ease;
   }

   @keyframes fadeIn {
     from {
       opacity: 0;
     }
     to {
       opacity: 1;
     }
   }

   @keyframes slideIn {
     from {
       opacity: 0;
       transform: translateY(-20px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }
   ```

6. **Responsive**

   ```css
   @media (max-width: 768px) {
     .stable-overlay-content {
       width: 90%;
       min-width: auto;
       margin: var(--spacing-sm);
     }

     .stable-overlay-title {
       font-size: var(--font-md);
     }

     .stable-overlay-body {
       font-size: var(--font-sm);
     }
   }
   ```

7. **Tests**

   ```typescript
   describe('Overlay', () => {
     it('devrait être accessible', () => {
       render(<Overlay />);
       expect(screen.getByRole('dialog')).toBeInTheDocument();
       expect(screen.getByLabelText('Fermer')).toBeInTheDocument();
     });

     it('devrait se fermer avec Échap', () => {
       render(<Overlay />);
       fireEvent.keyDown(document, { key: 'Escape' });
       expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
     });

     it('devrait piéger le focus', () => {
       render(<Overlay />);
       const focusableElements = screen.getAllByRole('button');
       expect(document.activeElement).toBe(focusableElements[0]);
     });
   });
   ```
