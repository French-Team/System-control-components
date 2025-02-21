import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { describe, it, expect } from 'vitest';
import { LayoutBlocks } from './LayoutBlocks';

describe('LayoutBlocks - TDD', () => {
  // 1. Test de rendu initial
  describe('Rendu initial', () => {
    it('devrait rendre le composant avec un thème par défaut', () => {
      render(<LayoutBlocks />);
      const container = screen.getByTestId('stable-opt-container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('theme-light');
    });
  });

  // 2. Test de la structure de base
  describe('Structure de base', () => {
    it('devrait avoir une structure HTML sémantique', () => {
      render(<LayoutBlocks />);

      expect(screen.getByRole('application')).toBeInTheDocument(); // container
      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
      expect(screen.getByRole('main')).toBeInTheDocument(); // main
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
    });

    it('devrait avoir les data-testid appropriés', () => {
      render(<LayoutBlocks />);

      expect(screen.getByTestId('stable-opt-container')).toBeInTheDocument();
      expect(screen.getByTestId('stable-opt-header')).toBeInTheDocument();
      expect(screen.getByTestId('stable-opt-content')).toBeInTheDocument();
      expect(screen.getByTestId('stable-opt-footer')).toBeInTheDocument();
    });
  });

  // 3. Test des props et du state
  describe('Gestion du thème', () => {
    it('devrait accepter un thème initial via les props', () => {
      render(<LayoutBlocks theme="dark" />);
      expect(screen.getByTestId('stable-opt-container')).toHaveClass('theme-dark');
    });

    it('devrait notifier des changements de thème', () => {
      const onThemeChange = vi.fn();
      render(<LayoutBlocks onThemeChange={onThemeChange} />);

      const themeToggle = screen.getByTestId('theme-toggle');
      fireEvent.click(themeToggle);

      expect(onThemeChange).toHaveBeenCalledWith('dark');
    });
  });

  // 4. Test de l'accessibilité
  describe('Accessibilité', () => {
    it('devrait avoir les rôles ARIA de base', () => {
      render(<LayoutBlocks />);

      expect(screen.getByRole('application')).toHaveAttribute('aria-label', 'Layout optimisé');
      expect(screen.getByRole('banner')).toHaveAttribute('aria-label', 'En-tête optimisé');
      expect(screen.getByRole('main')).toHaveAttribute('aria-label', 'Contenu optimisé');
      expect(screen.getByRole('contentinfo')).toHaveAttribute(
        'aria-label',
        'Pied de page optimisé'
      );
    });

    it('devrait avoir des sections avec des labels descriptifs', () => {
      render(<LayoutBlocks />);

      const regions = screen.getAllByRole('region');
      expect(regions.length).toBeGreaterThan(0);
      regions.forEach((region) => {
        expect(region).toHaveAttribute('aria-label');
      });
    });
  });

  // 5. Test du contenu
  describe('Contenu', () => {
    it('devrait afficher les titres des sections', () => {
      render(<LayoutBlocks />);

      expect(screen.getByText('Optimisation du Layout')).toBeInTheDocument();
      expect(screen.getByText('Version 1.0')).toBeInTheDocument();
      expect(screen.getByText('Améliorations')).toBeInTheDocument();
      expect(screen.getByText('Performances')).toBeInTheDocument();
    });
  });

  // 6. Test de la structure de navigation
  describe('Navigation', () => {
    it('devrait avoir une structure de navigation avec des blocs', () => {
      render(<LayoutBlocks />);

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Navigation optimisée');

      const blocks = [
        screen.getByTestId('stable-opt-block-1'),
        screen.getByTestId('stable-opt-block-2'),
        screen.getByTestId('stable-opt-block-3'),
        screen.getByTestId('stable-opt-block-4'),
        screen.getByTestId('stable-opt-block-5'),
      ];

      blocks.forEach((block) => {
        expect(block).toBeInTheDocument();
        expect(block).toHaveAttribute('role', 'region');
      });
    });
  });
});
