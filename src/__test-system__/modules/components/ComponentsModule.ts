import { ObserverModule, ObservationRule, ObservationResult } from '../../core/Observer';
import { ReactElement } from 'react';
import * as path from 'path';
import * as fs from 'fs';

export class ComponentsModule {
  private rules: ObservationRule[] = [];
  private requiredTestIds = [
    'stable-container',
    'stable-header',
    'stable-button',
    'stable-content',
    'stable-item-row',
    'stable-item-column',
  ];

  constructor() {
    this.initializeRules();
  }

  private initializeRules(): void {
    this.rules = [
      {
        id: 'detector',
        name: 'Détecteur de Structure des Composants',
        description: 'Vérifie la présence et la structure des fichiers du composant',
        check: (element: ReactElement): ObservationResult => {
          const componentName = element.props['data-component-name'];
          const componentPath = path.join(process.cwd(), 'src', 'components', componentName);

          const files = {
            component: fs.existsSync(path.join(componentPath, `${componentName}.tsx`)),
            style: fs.existsSync(path.join(componentPath, `${componentName}.css`)),
            test: fs.existsSync(path.join(componentPath, `${componentName}.test.tsx`)),
            index: fs.existsSync(path.join(componentPath, 'index.ts')),
          };

          const missingFiles = Object.entries(files)
            .filter(([, exists]) => !exists)
            .map(([type]) => type);

          return {
            passed: missingFiles.length === 0,
            messages:
              missingFiles.length === 0
                ? ['Structure des fichiers conforme']
                : [`Fichiers manquants : ${missingFiles.join(', ')}`],
            severity: missingFiles.length === 0 ? 'info' : 'error',
          };
        },
      },
      {
        id: 'data-testid-validator',
        name: 'Validation des data-testid',
        description: 'Vérifie la présence des data-testid requis',
        check: (element: ReactElement): ObservationResult => {
          const componentName = element.props['data-component-name'];
          const componentPath = path.join(
            process.cwd(),
            'src',
            'components',
            componentName,
            `${componentName}.tsx`
          );

          if (!fs.existsSync(componentPath)) {
            return {
              passed: false,
              messages: ['Fichier composant non trouvé'],
              severity: 'error',
            };
          }

          const content = fs.readFileSync(componentPath, 'utf-8');
          const missingTestIds = this.requiredTestIds.filter(
            (testId) => !content.includes(`data-testid="${testId}"`)
          );

          return {
            passed: missingTestIds.length === 0,
            messages:
              missingTestIds.length === 0
                ? ['Tous les data-testid sont présents']
                : [`data-testid manquants : ${missingTestIds.join(', ')}`],
            severity: missingTestIds.length === 0 ? 'info' : 'error',
          };
        },
      },
      {
        id: 'hierarchy-validator',
        name: 'Validation de la Hiérarchie',
        description: 'Vérifie la structure hiérarchique des composants',
        check: (element: ReactElement): ObservationResult => {
          const componentName = element.props['data-component-name'];
          const componentPath = path.join(
            process.cwd(),
            'src',
            'components',
            componentName,
            `${componentName}.tsx`
          );

          if (!fs.existsSync(componentPath)) {
            return {
              passed: false,
              messages: ['Fichier composant non trouvé'],
              severity: 'error',
            };
          }

          const content = fs.readFileSync(componentPath, 'utf-8');

          // Vérification de la hiérarchie
          const hasContainer = content.includes('data-testid="stable-container"');
          const hasHeader = content.includes('data-testid="stable-header"');
          const hasContent = content.includes('data-testid="stable-content"');
          const hasItems =
            content.includes('data-testid="stable-item-row"') &&
            content.includes('data-testid="stable-item-column"');

          const hierarchyValid = hasContainer && hasHeader && hasContent && hasItems;

          return {
            passed: hierarchyValid,
            messages: hierarchyValid
              ? ['Structure hiérarchique conforme']
              : ['La hiérarchie des composants ne respecte pas la structure requise'],
            severity: hierarchyValid ? 'info' : 'error',
          };
        },
      },
    ];
  }

  public getModule(): ObserverModule {
    return {
      id: 'components',
      name: 'Module de Composants',
      rules: this.rules,
      isEnabled: true,
    };
  }
}
