import React from 'react';
import './ThemeSelector.styles.css';

interface ThemeSelectorProps {
  currentTheme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div
      data-testid="stable-container"
      className="theme-selector-container"
      role="region"
      aria-label="Sélecteur de thème"
    >
      <button
        data-testid="stable-button"
        className={`theme-selector-button ${currentTheme === 'light' ? 'active' : ''}`}
        onClick={() => onThemeChange('light')}
        aria-pressed={currentTheme === 'light'}
        aria-label="Thème clair"
      >
        ☀️
      </button>
      <button
        data-testid="stable-button-dark"
        className={`theme-selector-button ${currentTheme === 'dark' ? 'active' : ''}`}
        onClick={() => onThemeChange('dark')}
        aria-pressed={currentTheme === 'dark'}
        aria-label="Thème sombre"
      >
        🌙
      </button>
    </div>
  );
}
