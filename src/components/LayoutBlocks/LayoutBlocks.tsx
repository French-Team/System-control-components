import React from 'react';
import './LayoutBlocks.styles.css';

export default function LayoutBlocks() {
  return (
    <div data-testid="stable-container" className="layout-container">
      <header data-testid="stable-header" className="layout-header">
        <h1>Test de la Nouvelle Détection des Modifications</h1>
      </header>

      <section data-testid="stable-content" className="layout-main">
        <div data-testid="stable-item-row" className="layout-main-row">
          <div data-testid="stable-item-column" className="layout-main1">
            Main 1
          </div>
          <div data-testid="stable-item-column" className="layout-main2">
            Main 2
          </div>
        </div>
      </section>

      <footer data-testid="stable-button" className="layout-footer">
        Footer
      </footer>
    </div>
  );
}
