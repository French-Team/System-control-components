import { ObserverModule, ObservationRule, ObservationResult } from '../../core/Observer';
import { ReactElement } from 'react';
import * as path from 'path';
import * as fs from 'fs';

export class StructureModule {
  private rules: ObservationRule[] = [];

  constructor() {
    this.initializeRules();
  }

  private initializeRules(): void {
    this.rules = [
      {
        id: 'component-structure',
        name: 'Structure du Composant',
        description: 'Vérifie la structure globale du composant',
        check: (element: ReactElement): ObservationResult => {
          const componentName = element.props['data-component-name'];
          const componentPath = path.join(process.cwd(), 'src', 'components', componentName);

          // Vérification de la structure des dossiers
          const structure = {
            src: fs.existsSync(path.join(componentPath, 'src')),
            tests: fs.existsSync(path.join(componentPath, 'tests')),
            styles: fs.existsSync(path.join(componentPath, 'styles')),
            docs: fs.existsSync(path.join(componentPath, 'docs')),
          };

          const missingDirs = Object.entries(structure)
            .filter(([, exists]) => !exists)
            .map(([dir]) => dir);

          return {
            passed: missingDirs.length === 0,
            messages:
              missingDirs.length === 0
                ? ['Structure des dossiers conforme']
                : [`Dossiers manquants : ${missingDirs.join(', ')}`],
            severity: missingDirs.length === 0 ? 'info' : 'error',
          };
        },
      },
      {
        id: 'test-structure',
        name: 'Structure des Tests',
        description: "Vérifie la structure et l'organisation des tests",
        check: (element: ReactElement): ObservationResult => {
          const componentName = element.props['data-component-name'];
          const testFile = path.join(
            process.cwd(),
            'src',
            'components',
            componentName,
            `${componentName}.test.tsx`
          );

          if (!fs.existsSync(testFile)) {
            return {
              passed: false,
              messages: ['Fichier de test non trouvé'],
              severity: 'error',
            };
          }

          const content = fs.readFileSync(testFile, 'utf-8');

          // Vérification des sections de test requises
          const requiredSections = [
            'Structure du Layout',
            'Styles CSS',
            'Support des Thèmes',
            'Dimensions et Espacements',
          ];

          const missingSections = requiredSections.filter(
            (section) => !content.includes(`describe('${section}'`)
          );

          // Vérification de la présence de beforeEach
          const hasBeforeEach = content.includes('beforeEach');

          // Vérification des imports nécessaires
          const hasRequiredImports =
            content.includes('@testing-library/react') &&
            content.includes('expect') &&
            content.includes('describe') &&
            content.includes('it');

          const structureValid =
            missingSections.length === 0 && hasBeforeEach && hasRequiredImports;

          return {
            passed: structureValid,
            messages: structureValid
              ? ['Structure des tests conforme']
              : [
                  'Structure des tests incomplète :',
                  ...missingSections.map((section) => `- Section manquante : ${section}`),
                  !hasBeforeEach ? '- beforeEach manquant' : '',
                  !hasRequiredImports ? '- Imports requis manquants' : '',
                ].filter((msg) => msg !== ''),
            severity: structureValid ? 'info' : 'error',
          };
        },
      },
      {
        id: 'component-organization',
        name: 'Organisation du Composant',
        description: "Vérifie l'organisation interne du composant",
        check: (element: ReactElement): ObservationResult => {
          const componentName = element.props['data-component-name'];
          const componentFile = path.join(
            process.cwd(),
            'src',
            'components',
            componentName,
            `${componentName}.tsx`
          );

          if (!fs.existsSync(componentFile)) {
            return {
              passed: false,
              messages: ['Fichier composant non trouvé'],
              severity: 'error',
            };
          }

          const content = fs.readFileSync(componentFile, 'utf-8');

          // Vérification de l'organisation du code
          const hasProps = content.includes('interface') || content.includes('type');
          const hasDefaultExport = content.includes('export default');
          const hasNamedComponent =
            content.includes(`function ${componentName}`) ||
            content.includes(`const ${componentName}`);
          const hasComments = content.includes('/**') || content.includes('//');

          const organizationValid =
            hasProps && hasDefaultExport && hasNamedComponent && hasComments;

          return {
            passed: organizationValid,
            messages: organizationValid
              ? ['Organisation du composant conforme']
              : [
                  'Organisation du composant incomplète :',
                  !hasProps ? '- Interface/Type des props manquant' : '',
                  !hasDefaultExport ? '- Export par défaut manquant' : '',
                  !hasNamedComponent ? '- Déclaration du composant incorrecte' : '',
                  !hasComments ? '- Documentation/Commentaires manquants' : '',
                ].filter((msg) => msg !== ''),
            severity: organizationValid ? 'info' : 'warning',
          };
        },
      },
    ];
  }

  public getModule(): ObserverModule {
    return {
      id: 'structure',
      name: 'Module de Structure',
      rules: this.rules,
      isEnabled: true,
    };
  }
}
