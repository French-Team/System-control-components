# Gestion des Overlays

## Principes Fondamentaux

1. **Accessibilité**

   - Gestion du focus
   - Support du clavier
   - Annonces pour les lecteurs d'écran

2. **Performance**
   - Portail React pour le rendu
   - Gestion des animations
   - Nettoyage des événements

## Structure de Base

```typescript
// 1. Types
interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  ariaLabel?: string;
}

// 2. Composant
export const Overlay = ({
  isOpen,
  onClose,
  children,
  title,
  ariaLabel = title,
}: OverlayProps) => {
  // Refs pour la gestion du focus
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Effet pour la gestion du focus
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      overlayRef.current?.focus();
      return () => {
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen]);

  // Gestion des touches clavier
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  // Portail React
  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-label={ariaLabel}
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      data-testid="stable-overlay"
      className={`overlay ${isOpen ? 'overlay--open' : ''}`}
    >
      <div
        className="overlay__backdrop"
        onClick={onClose}
        data-testid="stable-overlay-backdrop"
      />
      <div
        className="overlay__content"
        data-testid="stable-overlay-content"
      >
        <header className="overlay__header">
          <h2
            className="overlay__title"
            data-testid="stable-overlay-title"
          >
            {title}
          </h2>
          <button
            className="overlay__close"
            onClick={onClose}
            aria-label="Fermer"
            data-testid="stable-overlay-close"
          >
            ×
          </button>
        </header>
        <div className="overlay__body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
```

## Styles

```css
/* 1. Variables */
:root {
  --overlay-z-index: 1000;
  --overlay-backdrop-color: rgba(0, 0, 0, 0.5);
  --overlay-bg: var(--color-neutral-100);
  --overlay-border-radius: 8px;
  --overlay-padding: var(--spacing-md);
  --overlay-transition: 200ms ease;
}

/* 2. Base */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--overlay-z-index);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity var(--overlay-transition),
    visibility var(--overlay-transition);
}

.overlay--open {
  opacity: 1;
  visibility: visible;
}

/* 3. Backdrop */
.overlay__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--overlay-backdrop-color);
}

/* 4. Contenu */
.overlay__content {
  position: relative;
  background: var(--overlay-bg);
  border-radius: var(--overlay-border-radius);
  padding: var(--overlay-padding);
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  transform: translateY(20px);
  transition: transform var(--overlay-transition);
}

.overlay--open .overlay__content {
  transform: translateY(0);
}
```

## Bonnes Pratiques

### 1. Gestion du Focus

```typescript
// ❌ INCORRECT
const Overlay = () => (
  <div className="overlay">
    <button onClick={close}>Fermer</button>
  </div>
);

// ✅ CORRECT
const Overlay = () => {
  useEffect(() => {
    const previousFocus = document.activeElement;
    return () => {
      (previousFocus as HTMLElement)?.focus();
    };
  }, []);

  return (
    <div
      className="overlay"
      tabIndex={-1}
      ref={overlayRef}
    >
      <button
        onClick={close}
        aria-label="Fermer"
      >
        Fermer
      </button>
    </div>
  );
};
```

### 2. Gestion du Clavier

```typescript
// ❌ INCORRECT
const handleKeyDown = (e) => {
  if (e.keyCode === 27) close();
};

// ✅ CORRECT
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    close();
  }
};
```

### 3. Annonces ARIA

```typescript
// ❌ INCORRECT
<div className="overlay">
  <h2>Titre</h2>
</div>

// ✅ CORRECT
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="overlay-title"
>
  <h2 id="overlay-title">Titre</h2>
</div>
```

## Exemple Complet

```typescript
// useOverlay.ts
export const useOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  return { isOpen, open, close };
};

// MonComposant.tsx
export const MonComposant = () => {
  const { isOpen, open, close } = useOverlay();

  return (
    <>
      <button
        onClick={open}
        data-testid="stable-overlay-trigger"
      >
        Ouvrir
      </button>

      <Overlay
        isOpen={isOpen}
        onClose={close}
        title="Mon Overlay"
      >
        <div data-testid="stable-overlay-content">
          Contenu de l'overlay
        </div>
      </Overlay>
    </>
  );
};

// MonComposant.test.tsx
describe('MonComposant avec Overlay', () => {
  it('devrait gérer le cycle de vie de l\'overlay', async () => {
    render(<MonComposant />);

    // 1. Ouverture
    const trigger = screen.getByTestId('stable-overlay-trigger');
    await userEvent.click(trigger);
    expect(
      screen.getByTestId('stable-overlay')
    ).toHaveClass('overlay--open');

    // 2. Fermeture avec Escape
    await userEvent.keyboard('{Escape}');
    expect(
      screen.getByTestId('stable-overlay')
    ).not.toHaveClass('overlay--open');

    // 3. Focus retourné
    expect(document.activeElement).toBe(trigger);
  });
});
```

## Tests à Effectuer

1. **Accessibilité**

   - Navigation au clavier
   - Annonces ARIA
   - Retour du focus

2. **Interactions**

   - Ouverture/Fermeture
   - Clic sur le backdrop
   - Touche Escape

3. **Performance**
   - Animations fluides
   - Nettoyage des événements
   - Gestion du scroll
