import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeSelector from './ThemeSelector';

describe('ThemeSelector', () => {
  describe('Structure de base', () => {
    beforeEach(() => {
      render(<ThemeSelector currentTheme="light" onThemeChange={() => {}} />);
    });

    it('devrait rendre tous les éléments requis avec les data-testid', () => {
      expect(screen.getByTestId('stable-container')).toBeDefined();
      expect(screen.getByTestId('stable-button')).toBeDefined();
      expect(screen.getByTestId('stable-button-dark')).toBeDefined();
    });

    it('devrait avoir la structure sémantique correcte', () => {
      const container = screen.getByTestId('stable-container');
      expect(container.getAttribute('role')).toBe('region');
      expect(container.getAttribute('aria-label')).toBe('Sélecteur de thème');
    });

    it('devrait avoir les boutons avec les attributs ARIA corrects', () => {
      const lightButton = screen.getByTestId('stable-button');
      const darkButton = screen.getByTestId('stable-button-dark');

      expect(lightButton.getAttribute('aria-pressed')).toBe('true');
      expect(lightButton.getAttribute('aria-label')).toBe('Thème clair');
      expect(darkButton.getAttribute('aria-pressed')).toBe('false');
      expect(darkButton.getAttribute('aria-label')).toBe('Thème sombre');
    });

    it('devrait avoir la structure de layout correcte', () => {
      const container = screen.getByTestId('stable-container');
      expect(container.className).toContain('theme-selector-container');

      // Vérifie que le conteneur a les classes de base
      const containerClasses = container.className.split(' ');
      expect(containerClasses.some((c) => c.startsWith('theme-selector'))).toBe(true);

      // Vérifie les boutons
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button.className).toContain('theme-selector-button');

        // Vérifie que les boutons ont les bonnes dimensions
        const buttonClasses = button.className.split(' ');
        expect(buttonClasses.includes('theme-selector-button')).toBe(true);
      });
    });
  });

  describe('Fonctionnalités', () => {
    it('devrait appeler onThemeChange avec le bon thème lors du clic', () => {
      const onThemeChange = vi.fn();
      render(<ThemeSelector currentTheme="light" onThemeChange={onThemeChange} />);

      // Test du changement vers le thème sombre
      fireEvent.click(screen.getByTestId('stable-button-dark'));
      expect(onThemeChange).toHaveBeenCalledWith('dark');

      // Test du changement vers le thème clair
      fireEvent.click(screen.getByTestId('stable-button'));
      expect(onThemeChange).toHaveBeenCalledWith('light');
    });

    it('devrait mettre à jour les états aria-pressed selon le thème actuel', () => {
      const { rerender } = render(<ThemeSelector currentTheme="light" onThemeChange={() => {}} />);

      // Vérification du thème clair
      expect(screen.getByTestId('stable-button').getAttribute('aria-pressed')).toBe('true');
      expect(screen.getByTestId('stable-button-dark').getAttribute('aria-pressed')).toBe('false');

      // Changement vers le thème sombre
      rerender(<ThemeSelector currentTheme="dark" onThemeChange={() => {}} />);
      expect(screen.getByTestId('stable-button').getAttribute('aria-pressed')).toBe('false');
      expect(screen.getByTestId('stable-button-dark').getAttribute('aria-pressed')).toBe('true');
    });
  });

  describe('Style et thème', () => {
    it('devrait avoir les classes CSS appropriées', () => {
      render(<ThemeSelector currentTheme="light" onThemeChange={() => {}} />);

      const container = screen.getByTestId('stable-container');
      expect(container.className).toContain('theme-selector-container');

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button.className).toContain('theme-selector-button');
      });
    });

    it('devrait appliquer la classe active au bouton du thème actuel', () => {
      const { rerender } = render(<ThemeSelector currentTheme="light" onThemeChange={() => {}} />);

      // Vérification du thème clair
      expect(screen.getByTestId('stable-button').className).toContain('active');
      expect(screen.getByTestId('stable-button-dark').className).not.toContain('active');

      // Changement vers le thème sombre
      rerender(<ThemeSelector currentTheme="dark" onThemeChange={() => {}} />);
      expect(screen.getByTestId('stable-button').className).not.toContain('active');
      expect(screen.getByTestId('stable-button-dark').className).toContain('active');
    });

    it('devrait maintenir les dimensions correctes des boutons', () => {
      render(<ThemeSelector currentTheme="light" onThemeChange={() => {}} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        const style = window.getComputedStyle(button);
        expect(style.width).toBe(style.height); // Vérifie que le bouton est carré
        expect(button.style.minWidth).toBe(button.style.width); // Vérifie les dimensions minimales
      });
    });
  });
});
