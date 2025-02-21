import React, { useState } from 'react';
import './LayoutBlocks.styles.css';
import './LayoutBlocks_theme.css';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import StableLayout from '../bonne-pratiques/good-practices';
import { ImageBlock } from './components/ImageBlock';

export interface LayoutBlocksProps {
  theme?: 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

export const LayoutBlocks: React.FC<LayoutBlocksProps> = ({
  theme: initialTheme = 'light',
  onThemeChange,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  return (
    <div
      className={`layout-container theme-${theme}`}
      id="opt-layout-container"
      data-testid="stable-container"
      role="main"
      aria-label="Layout principal"
    >
      <header
        className="layout-header"
        id="opt-layout-header"
        data-testid="stable-header"
        role="banner"
        aria-label="En-tête de la page"
      >
        <nav
          className="header-blocks"
          id="opt-header-blocks"
          data-testid="stable-blocks"
          role="navigation"
          aria-label="Navigation principale"
        >
          <div
            className="header-block"
            id="opt-header-block-1"
            data-testid="stable-header-block-1"
            role="region"
            aria-label="Bloc d'en-tête 1"
          >
            <span className="header-title">Test de la Nouvelle Détection</span>
          </div>
          <div
            className="header-block"
            id="opt-header-block-2"
            data-testid="stable-header-block-2"
            role="region"
            aria-label="Bloc d'en-tête 2"
          >
            des Modifications
          </div>
          <div
            className="header-block"
            id="opt-header-block-3"
            data-testid="stable-header-block-3"
            role="region"
            aria-label="Bloc d'en-tête 3"
          >
            Block 3
          </div>
          <div
            className="header-block"
            id="opt-header-block-4"
            data-testid="stable-header-block-4"
            role="region"
            aria-label="Bloc d'en-tête 4"
          >
            Block 4
          </div>
          <div
            className="header-block"
            id="opt-header-block-theme"
            data-testid="stable-header-block-5"
            role="region"
            aria-label="Bloc d'en-tête 5"
          >
            <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
          </div>
        </nav>
      </header>

      <main
        className="layout-main"
        id="opt-layout-main"
        data-testid="stable-content"
        role="main"
        aria-label="Contenu principal"
      >
        <div
          className="layout-main-row"
          id="opt-layout-main-row"
          data-testid="stable-item-row"
          role="group"
          aria-label="Sections principales"
        >
          <section
            className="layout-main1"
            id="opt-layout-main1"
            data-testid="stable-item-column-1"
            aria-label="Section principale 1"
          >
            <StableLayout theme={theme} />
          </section>
          <section
            className="layout-main2"
            id="opt-layout-main2"
            data-testid="stable-item-column-2"
            aria-label="Section principale 2"
          >
            <div className="layout-main2__grid">
              <div className="layout-main2__row">
                <div className="layout-main2__block">Block 1</div>
                <div className="layout-main2__block">Block 2</div>
              </div>
              <div className="layout-main2__row">
                <div className="layout-main2__block">Block 3</div>
                <div className="layout-main2__block">
                  <ImageBlock src="/apercu.jpg" alt="Aperçu" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer
        className="layout-footer"
        id="opt-layout-footer"
        data-testid="stable-button"
        role="contentinfo"
        aria-label="Pied de page"
      >
        Footer
      </footer>
    </div>
  );
};
