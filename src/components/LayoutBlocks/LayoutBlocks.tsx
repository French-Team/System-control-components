// @ts-expect-error React est nécessaire pour JSX
import React, { useState } from 'react';
import './LayoutBlocks.styles.css';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import StableLayout from '../bonne-pratiques/good-practices';

export default function LayoutBlocks() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  return (
    <div
      data-testid="stable-container"
      className={`layout-container theme-${theme}`}
      role="main"
      aria-label="Layout principal"
    >
      <header
        data-testid="stable-header"
        className="layout-header"
        role="banner"
        aria-label="En-tête de la page"
      >
        <div className="header-blocks">
          <div
            data-testid="stable-header-block"
            className="header-block"
            role="region"
            aria-label="Bloc d'en-tête 1"
          >
            <h1>Test de la Nouvelle Détection</h1>
          </div>
          <div
            data-testid="stable-header-block"
            className="header-block"
            role="region"
            aria-label="Bloc d'en-tête 2"
          >
            des Modifications
          </div>
          <div
            data-testid="stable-header-block"
            className="header-block"
            role="region"
            aria-label="Bloc d'en-tête 3"
          >
            Block 3
          </div>
          <div
            data-testid="stable-header-block"
            className="header-block"
            role="region"
            aria-label="Bloc d'en-tête 4"
          >
            Block 4
          </div>
          <div
            data-testid="stable-header-block"
            className="header-block"
            role="region"
            aria-label="Bloc d'en-tête 5"
          >
            <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
          </div>
        </div>
      </header>

      <section data-testid="stable-content" className="layout-main" aria-label="Contenu principal">
        <div
          data-testid="stable-item-row"
          className="layout-main-row"
          role="group"
          aria-label="Sections principales"
        >
          <div
            data-testid="stable-item-column"
            className="layout-main1"
            role="region"
            aria-label="Section principale 1"
          >
            <StableLayout theme={theme} />
          </div>
          <div
            data-testid="stable-item-column"
            className="layout-main2"
            role="region"
            aria-label="Section principale 2"
          >
            Main 2
          </div>
        </div>
      </section>

      <footer
        data-testid="stable-button"
        className="layout-footer"
        role="contentinfo"
        aria-label="Pied de page"
      >
        Footer
      </footer>
    </div>
  );
}
