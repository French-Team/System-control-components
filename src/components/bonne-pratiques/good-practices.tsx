import React, { useState } from 'react';
import './good-practices.css';
import './good-practices_theme.css';

interface StableLayoutProps {
  theme?: 'light' | 'dark';
}

const StableLayout: React.FC<StableLayoutProps> = ({ theme = 'light' }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div
      className={`stable-container theme-${theme}`}
      id="test-container"
      data-testid="stable-container"
    >
      <div className="stable-header" id="test-header" data-testid="stable-header">
        <button
          className="stable-button"
          data-testid="stable-button"
          onClick={() => setShowOverlay(true)}
        >
          Action
        </button>
      </div>

      <div className="stable-content" id="test-content" data-testid="stable-content">
        <div className="stable-item" data-testid="stable-item-row" id="test-item-row">
          <div className="stable-item-content" id="test-item-content-row">
            Niveau 1 (Row)
          </div>
          <div className="stable-item-children" id="test-item-children-row">
            <div className="stable-item-child" id="test-item-child-row-1">
              <div className="stable-child-content" id="test-child-content-row-1">
                Niveau 2.1
              </div>
              <div className="stable-child-items row" id="test-child-items-row-1">
                <div className="stable-child-item" id="test-child-item-row-1-1">
                  <div className="stable-item-title" id="test-item-title-row-1-1">
                    Niveau 3.1
                  </div>
                  <div className="stable-item-subitems" id="test-item-subitems-row-1-1">
                    <div className="stable-subitem" id="test-subitem-row-1-1-1">
                      Sous-item 3.1.1
                    </div>
                    <div className="stable-subitem" id="test-subitem-row-1-1-2">
                      Sous-item 3.1.2
                    </div>
                  </div>
                </div>
                <div className="stable-child-item" id="test-child-item-row-1-2">
                  <div className="stable-item-title" id="test-item-title-row-1-2">
                    Niveau 3.2
                  </div>
                  <div className="stable-item-subitems" id="test-item-subitems-row-1-2">
                    <div className="stable-subitem" id="test-subitem-row-1-2-1">
                      Sous-item 3.2.1
                    </div>
                    <div className="stable-subitem" id="test-subitem-row-1-2-2">
                      Sous-item 3.2.2
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="stable-item-child" id="test-item-child-row-2">
              <div className="stable-child-content" id="test-child-content-row-2">
                Niveau 2.2
              </div>
              <div className="stable-child-items row" id="test-child-items-row-2">
                <div className="stable-child-item" id="test-child-item-row-2-1">
                  <div className="stable-item-title" id="test-item-title-row-2-1">
                    Niveau 3.3
                  </div>
                  <div className="stable-item-subitems" id="test-item-subitems-row-2-1">
                    <div className="stable-subitem" id="test-subitem-row-2-1-1">
                      Sous-item 3.3.1
                    </div>
                    <div className="stable-subitem" id="test-subitem-row-2-1-2">
                      Sous-item 3.3.2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stable-item" data-testid="stable-item-column" id="test-item-column">
          <div className="stable-item-content" id="test-item-content-column">
            Niveau 1 (Column)
          </div>
          <div className="stable-item-children" id="test-item-children-column">
            <div className="stable-item-child" id="test-item-child-column-1">
              <div className="stable-child-content" id="test-child-content-column-1">
                Niveau 2.1
              </div>
              <div className="stable-child-items column" id="test-child-items-column-1">
                <div className="stable-child-item" id="test-child-item-column-1-1">
                  <div className="stable-item-title" id="test-item-title-column-1-1">
                    Niveau 3.1
                  </div>
                  <div className="stable-item-subitems" id="test-item-subitems-column-1-1">
                    <div className="stable-subitem" id="test-subitem-column-1-1-1">
                      Sous-item 3.1.1
                    </div>
                    <div className="stable-subitem" id="test-subitem-column-1-1-2">
                      Sous-item 3.1.2
                    </div>
                  </div>
                </div>
                <div className="stable-child-item" id="test-child-item-column-1-2">
                  <div className="stable-item-title" id="test-item-title-column-1-2">
                    Niveau 3.2
                  </div>
                  <div className="stable-item-subitems" id="test-item-subitems-column-1-2">
                    <div className="stable-subitem" id="test-subitem-column-1-2-1">
                      Sous-item 3.2.1
                    </div>
                    <div className="stable-subitem" id="test-subitem-column-1-2-2">
                      Sous-item 3.2.2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showOverlay && (
        <div className="stable-overlay" id="test-overlay" data-testid="stable-overlay">
          <div className="stable-overlay-content">
            <button
              className="stable-button stable-close-button"
              onClick={() => setShowOverlay(false)}
              aria-label="Fermer"
            >
              ✕
            </button>
            <p>Message de superposition</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StableLayout;
