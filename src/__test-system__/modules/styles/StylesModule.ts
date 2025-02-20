import { ObserverModule, ObservationRule, ObservationResult } from '../../core/Observer';
import { ReactElement } from 'react';
import * as path from 'path';
import * as fs from 'fs';

export class StylesModule {
  private rules: ObservationRule[] = [];

  constructor() {
    this.initializeRules();
  }

  private initializeRules(): void {
    this.rules = [
      {
        id: 'css-classes',
        name: 'Validation des Classes CSS',
        description: "Vérifie la présence et l'utilisation des classes CSS requises",
        check: (element: ReactElement): ObservationResult => {
          const componentName = element.props['data-component-name'];
          const componentPath = path.join(process.cwd(), 'src', 'components', componentName);
          const styleFile = path.join(componentPath, `${componentName}.css`);
          const componentFile = path.join(componentPath, `${componentName}.tsx`);

          if (!fs.existsSync(styleFile) || !fs.existsSync(componentFile)) {
            return {
              passed: false,
              messages: ['Fichiers de style ou de composant manquants'],
              severity: 'error',
            };
          }

          const styleContent = fs.readFileSync(styleFile, 'utf-8');
          const componentContent = fs.readFileSync(componentFile, 'utf-8');

          const requiredClasses = [
            'stable-container',
            'stable-header',
            'stable-content',
            'theme-light',
          ];

          const missingClasses = requiredClasses.filter(
            (className) =>
              !styleContent.includes(className) || !componentContent.includes(className)
          );

          return {
            passed: missingClasses.length === 0,
            messages:
              missingClasses.length === 0
                ? ['Toutes les classes CSS requises sont présentes et utilisées']
                : [`Classes CSS manquantes : ${missingClasses.join(', ')}`],
            severity: missingClasses.length === 0 ? 'info' : 'error',
          };
        },
      },
      {
        id: 'flexbox-usage',
        name: 'Validation Flexbox',
        description: "Vérifie l'utilisation correcte de Flexbox",
        check: (element: ReactElement): ObservationResult => {
          const componentName = element.props['data-component-name'];
          const styleFile = path.join(
            process.cwd(),
            'src',
            'components',
            componentName,
            `${componentName}.css`
          );

          if (!fs.existsSync(styleFile)) {
            return {
              passed: false,
              messages: ['Fichier de style non trouvé'],
              severity: 'error',
            };
          }

          const content = fs.readFileSync(styleFile, 'utf-8');
          const flexboxProperties = [
            'display: flex',
            'flex-direction',
            'justify-content',
            'align-items',
          ];

          const missingFlexbox = flexboxProperties.filter((prop) => !content.includes(prop));

          return {
            passed: missingFlexbox.length === 0,
            messages:
              missingFlexbox.length === 0
                ? ['Utilisation correcte de Flexbox']
                : [`Propriétés Flexbox manquantes : ${missingFlexbox.join(', ')}`],
            severity: missingFlexbox.length === 0 ? 'info' : 'warning',
          };
        },
      },
      {
        id: 'theme-support',
        name: 'Support des Thèmes',
        description: "Vérifie le support et l'implémentation des thèmes",
        check: (element: ReactElement): ObservationResult => {
          const componentName = element.props['data-component-name'];
          const componentFile = path.join(
            process.cwd(),
            'src',
            'components',
            componentName,
            `${componentName}.tsx`
          );
          const styleFile = path.join(
            process.cwd(),
            'src',
            'components',
            componentName,
            `${componentName}.css`
          );

          if (!fs.existsSync(componentFile) || !fs.existsSync(styleFile)) {
            return {
              passed: false,
              messages: ['Fichiers requis non trouvés'],
              severity: 'error',
            };
          }

          const componentContent = fs.readFileSync(componentFile, 'utf-8');
          const styleContent = fs.readFileSync(styleFile, 'utf-8');

          const hasThemeProps =
            componentContent.includes('theme:') || componentContent.includes('theme=');
          const hasThemeClasses =
            styleContent.includes('theme-light') || styleContent.includes('theme-dark');
          const hasThemeVars = styleContent.includes('var(--');

          const themeValid = hasThemeProps && hasThemeClasses && hasThemeVars;

          return {
            passed: themeValid,
            messages: themeValid
              ? ['Support des thèmes correctement implémenté']
              : ['Le support des thèmes est incomplet'],
            severity: themeValid ? 'info' : 'warning',
          };
        },
      },
      {
        id: 'dimensions-spacing',
        name: 'Dimensions et Espacements',
        description: "Vérifie l'utilisation des unités relatives et des espacements",
        check: (element: ReactElement): ObservationResult => {
          const componentName = element.props['data-component-name'];
          const styleFile = path.join(
            process.cwd(),
            'src',
            'components',
            componentName,
            `${componentName}.css`
          );

          if (!fs.existsSync(styleFile)) {
            return {
              passed: false,
              messages: ['Fichier de style non trouvé'],
              severity: 'error',
            };
          }

          const content = fs.readFileSync(styleFile, 'utf-8');

          const hasRelativeUnits =
            content.includes('rem') || content.includes('em') || content.includes('%');
          const hasSpacingVars = content.includes('var(--spacing-') || content.includes('gap:');
          const hasOverflow = content.includes('overflow');

          const validDimensions = hasRelativeUnits && hasSpacingVars && hasOverflow;

          return {
            passed: validDimensions,
            messages: validDimensions
              ? ['Dimensions et espacements correctement définis']
              : ['Les dimensions ou espacements ne respectent pas les bonnes pratiques'],
            severity: validDimensions ? 'info' : 'warning',
          };
        },
      },
    ];
  }

  public getModule(): ObserverModule {
    return {
      id: 'styles',
      name: 'Module de Styles',
      rules: this.rules,
      isEnabled: true,
    };
  }
}
