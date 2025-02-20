import { render, screen } from '@testing-library/react';
import LayoutBlocks from './LayoutBlocks';

describe('LayoutBlocks', () => {
  describe('Structure de base', () => {
    beforeEach(() => {
      render(<LayoutBlocks />);
    });

    it('devrait rendre tous les éléments requis avec les data-testid', () => {
      // Vérification des data-testid requis
      expect(screen.getByTestId('stable-container')).toBeInTheDocument();
      expect(screen.getByTestId('stable-header')).toBeInTheDocument();
      expect(screen.getByTestId('stable-content')).toBeInTheDocument();
      expect(screen.getByTestId('stable-item-row')).toBeInTheDocument();
      expect(screen.getAllByTestId('stable-item-column')).toHaveLength(2);
      expect(screen.getByTestId('stable-button')).toBeInTheDocument();
    });

    it('devrait avoir la structure sémantique correcte', () => {
      const container = screen.getByTestId('stable-container');
      const header = screen.getByTestId('stable-header');
      const content = screen.getByTestId('stable-content');
      const footer = screen.getByTestId('stable-button');

      // Vérification des balises sémantiques
      expect(header.tagName.toLowerCase()).toBe('header');
      expect(content.tagName.toLowerCase()).toBe('section');
      expect(footer.tagName.toLowerCase()).toBe('footer');

      // Vérification de la hiérarchie
      expect(container).toContainElement(header);
      expect(container).toContainElement(content);
      expect(container).toContainElement(footer);
    });

    it('devrait avoir le contenu textuel correct', () => {
      // Vérification du titre
      expect(
        screen.getByText('Test de la Nouvelle Détection des Modifications')
      ).toBeInTheDocument();

      // Vérification des sections principales
      expect(screen.getByText('Main 1')).toBeInTheDocument();
      expect(screen.getByText('Main 2')).toBeInTheDocument();

      // Vérification du footer
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });

  describe('Style et thème', () => {
    it('devrait avoir les classes CSS appropriées', () => {
      render(<LayoutBlocks />);

      // Vérification des classes CSS
      expect(screen.getByTestId('stable-container')).toHaveClass('layout-container');
      expect(screen.getByTestId('stable-header')).toHaveClass('layout-header');
      expect(screen.getByTestId('stable-content')).toHaveClass('layout-main');
      expect(screen.getByTestId('stable-item-row')).toHaveClass('layout-main-row');
      expect(screen.getAllByTestId('stable-item-column')[0]).toHaveClass('layout-main1');
      expect(screen.getAllByTestId('stable-item-column')[1]).toHaveClass('layout-main2');
      expect(screen.getByTestId('stable-button')).toHaveClass('layout-footer');
    });
  });

  describe('Accessibilité', () => {
    it('devrait avoir une structure accessible', () => {
      render(<LayoutBlocks />);

      // Vérification de la présence d'un titre principal
      const header = screen.getByTestId('stable-header');
      expect(header).toContainElement(screen.getByRole('heading', { level: 1 }));

      // Vérification de la structure de navigation
      expect(screen.getByTestId('stable-content')).toBeVisible();
      expect(screen.getByTestId('stable-button')).toBeVisible();
    });
  });
});
