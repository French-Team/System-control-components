import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LayoutBlocks from './LayoutBlocks';

describe('LayoutBlocks', () => {
  describe('Structure de base', () => {
    beforeEach(() => {
      render(<LayoutBlocks />);
    });

    it('devrait rendre tous les éléments requis avec les data-testid', () => {
      expect(screen.getByTestId('stable-container')).toBeDefined();
      expect(screen.getByTestId('stable-header')).toBeDefined();
      expect(screen.getByTestId('stable-content')).toBeDefined();
      expect(screen.getByTestId('stable-item-row')).toBeDefined();
      expect(screen.getAllByTestId('stable-item-column')).toHaveLength(2);
      expect(screen.getByTestId('stable-button')).toBeDefined();
      expect(screen.getAllByTestId('stable-header-block')).toHaveLength(5);
    });

    it('devrait avoir la structure sémantique correcte', () => {
      const container = screen.getByTestId('stable-container');
      const header = screen.getByTestId('stable-header');
      const content = screen.getByTestId('stable-content');
      const footer = screen.getByTestId('stable-button');

      expect(header.tagName.toLowerCase()).toBe('header');
      expect(content.tagName.toLowerCase()).toBe('section');
      expect(footer.tagName.toLowerCase()).toBe('footer');

      expect(container.contains(header)).toBe(true);
      expect(container.contains(content)).toBe(true);
      expect(container.contains(footer)).toBe(true);
    });

    it('devrait avoir le contenu textuel correct', () => {
      expect(screen.getByText('Test de la Nouvelle Détection')).toBeDefined();
      expect(screen.getByText('des Modifications')).toBeDefined();
      expect(screen.getByText('Block 3')).toBeDefined();
      expect(screen.getByText('Block 4')).toBeDefined();
      expect(screen.getByText('Main 1')).toBeDefined();
      expect(screen.getByText('Main 2')).toBeDefined();
      expect(screen.getByText('Footer')).toBeDefined();
    });
  });

  describe('Style et thème', () => {
    it('devrait avoir les classes CSS appropriées', () => {
      render(<LayoutBlocks />);

      expect(screen.getByTestId('stable-container').className).toContain('layout-container');
      expect(screen.getByTestId('stable-header').className).toContain('layout-header');
      expect(screen.getByTestId('stable-content').className).toContain('layout-main');
      expect(screen.getByTestId('stable-item-row').className).toContain('layout-main-row');
      expect(screen.getAllByTestId('stable-item-column')[0].className).toContain('layout-main1');
      expect(screen.getAllByTestId('stable-item-column')[1].className).toContain('layout-main2');
      expect(screen.getByTestId('stable-button').className).toContain('layout-footer');
    });

    it('devrait avoir la structure correcte pour le layout flexible', () => {
      render(<LayoutBlocks />);

      const container = screen.getByTestId('stable-container');
      const content = screen.getByTestId('stable-content');
      const mainRow = screen.getByTestId('stable-item-row');
      const mainColumns = screen.getAllByTestId('stable-item-column');
      const headerBlocks = screen.getAllByTestId('stable-header-block');

      expect(container.contains(content)).toBe(true);
      expect(content.contains(mainRow)).toBe(true);
      mainColumns.forEach((column) => {
        expect(mainRow.contains(column)).toBe(true);
        expect(column).toBeDefined();
      });
      expect(headerBlocks).toHaveLength(5);
    });
  });

  describe('Thème', () => {
    it('devrait changer de thème lors du clic sur les boutons', () => {
      render(<LayoutBlocks />);

      const container = screen.getByTestId('stable-container');
      const themeButtons = screen.getAllByRole('button');

      // Vérifier le thème initial (light)
      expect(container.className).toContain('theme-light');

      // Cliquer sur le bouton thème sombre
      fireEvent.click(themeButtons[1]);
      expect(container.className).toContain('theme-dark');

      // Cliquer sur le bouton thème clair
      fireEvent.click(themeButtons[0]);
      expect(container.className).toContain('theme-light');
    });
  });

  describe('Accessibilité', () => {
    it('devrait avoir une structure accessible', () => {
      render(<LayoutBlocks />);

      expect(screen.getByTestId('stable-container').getAttribute('role')).toBe('main');
      expect(screen.getByTestId('stable-header').getAttribute('role')).toBe('banner');
      expect(screen.getByTestId('stable-content').getAttribute('aria-label')).toBe(
        'Contenu principal'
      );
      expect(screen.getByTestId('stable-button').getAttribute('role')).toBe('contentinfo');

      const headerBlocks = screen.getAllByTestId('stable-header-block');
      headerBlocks.forEach((block, index) => {
        expect(block.getAttribute('role')).toBe('region');
        expect(block.getAttribute('aria-label')).toBe(`Bloc d'en-tête ${index + 1}`);
      });
    });
  });
});
