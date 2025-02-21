import * as fs from 'fs';
import * as path from 'path';

export interface StyleRule {
  name: string;
  description: string;
  validate: (content: string) => { valid: boolean; issues: string[] };
}

export const styleRules: StyleRule[] = [
  {
    name: 'flex-center-rule',
    description: 'Les éléments layout doivent être centrés en largeur et hauteur',
    validate: (content: string) => {
      const issues: string[] = [];
      const hasLayoutSelector = content.includes("[class^='layout-']");
      const hasFlexCenter =
        content.includes('display: flex') &&
        content.includes('align-items: center') &&
        content.includes('justify-content: center');
      const hasFullSize =
        content.includes('width: 100%') &&
        content.includes('height: 100%') &&
        content.includes('flex: 1');

      if (!hasLayoutSelector) {
        issues.push("Manque le sélecteur [class^='layout-'] pour les éléments de layout");
      }
      if (!hasFlexCenter) {
        issues.push(
          'Les éléments de layout doivent être centrés (display: flex, align-items: center, justify-content: center)'
        );
      }
      if (!hasFullSize) {
        issues.push(
          "Les éléments de layout doivent occuper tout l'espace disponible (width: 100%, height: 100%, flex: 1)"
        );
      }

      return {
        valid: issues.length === 0,
        issues,
      };
    },
  },
  {
    name: 'css-variables-organization',
    description: 'Les variables CSS doivent être organisées par catégories',
    validate: (content: string) => {
      const issues: string[] = [];
      const categories = [
        'Espacements',
        'Dimensions',
        'Points de rupture',
        'Bordures',
        'Z-index',
        'Couleurs',
      ];

      const rootSection = content.match(/:root\s*{([^}]+)}/s)?.[1] || '';

      categories.forEach((category) => {
        if (!rootSection.includes(`/* ${category} */`)) {
          issues.push(`Manque la catégorie "${category}" dans les variables CSS`);
        }
      });

      return {
        valid: issues.length === 0,
        issues,
      };
    },
  },
  {
    name: 'theme-support',
    description: 'Le composant doit supporter les thèmes light et dark',
    validate: (content: string) => {
      const issues: string[] = [];
      const hasThemeLight = content.includes('.theme-light');
      const hasThemeDark = content.includes('.theme-dark');
      const hasBackgroundVar = content.includes('--background-color');

      if (!hasThemeLight || !hasThemeDark) {
        issues.push('Manque le support des thèmes light et/ou dark');
      }
      if (!hasBackgroundVar) {
        issues.push('Les couleurs doivent être définies via des variables CSS');
      }

      return {
        valid: issues.length === 0,
        issues,
      };
    },
  },
  {
    name: 'responsive-design',
    description: 'Le composant doit être responsive avec des media queries',
    validate: (content: string) => {
      const issues: string[] = [];
      const hasTabletBreakpoint = content.includes('--breakpoint-tablet');
      const hasMobileBreakpoint = content.includes('--breakpoint-mobile');
      const hasMediaQueries = content.includes('@media');

      if (!hasTabletBreakpoint || !hasMobileBreakpoint) {
        issues.push('Manque les points de rupture pour tablette et/ou mobile');
      }
      if (!hasMediaQueries) {
        issues.push('Manque les media queries pour la réactivité');
      }

      return {
        valid: issues.length === 0,
        issues,
      };
    },
  },
  {
    name: 'adaptive-sizing-rule',
    description: 'Les tailles doivent être calculées de manière adaptative avec clamp() et calc()',
    validate: (content: string) => {
      const issues: string[] = [];

      // Vérification des variables de taille de base
      const hasBaseSizes =
        content.includes('--font-size-base') &&
        content.includes('--font-size-small') &&
        content.includes('--font-size-large') &&
        content.includes('--font-size-header');

      // Vérification de l'utilisation de clamp()
      const hasClamp = content.match(/clamp\([^)]+\)/g);

      // Vérification des calculs proportionnels
      const hasCalcProportions = content.match(/calc\([^)]*100%[^)]*\)/g);

      // Vérification des media queries pour l'adaptation
      const hasMediaQueries =
        content.includes('@media') &&
        content.includes('var(--breakpoint-tablet)') &&
        content.includes('var(--breakpoint-mobile)');

      // Vérification du comportement du texte
      const hasTextBehavior =
        content.includes('text-overflow: ellipsis') &&
        content.includes('white-space: nowrap') &&
        content.includes('overflow: hidden');

      if (!hasBaseSizes) {
        issues.push(
          'Les variables de taille de base doivent être définies (--font-size-base, etc.)'
        );
      }

      if (!hasClamp) {
        issues.push('Utiliser clamp() pour des tailles adaptatives avec limites min/max');
      }

      if (!hasCalcProportions) {
        issues.push('Utiliser calc() avec des pourcentages pour des proportions adaptatives');
      }

      if (!hasMediaQueries) {
        issues.push('Définir des adaptations pour tablette et mobile avec @media');
      }

      if (!hasTextBehavior) {
        issues.push('Gérer le comportement du texte long (ellipsis, nowrap, overflow)');
      }

      // Vérification des tailles minimales
      const fontSizes = content.match(/font-size:\s*[^;]+/g) || [];
      const tooSmallFont = fontSizes.some((size) => {
        const clampMatch = size.match(/clamp\((\d+)px/);
        return clampMatch && parseInt(clampMatch[1]) < 12;
      });

      if (tooSmallFont) {
        issues.push('La taille minimale du texte ne doit pas être inférieure à 12px');
      }

      return {
        valid: issues.length === 0,
        issues,
      };
    },
  },
];

export function validateStyles(componentDir: string): { valid: boolean; issues: string[] } {
  const styleFile = fs
    .readdirSync(componentDir)
    .find((file) => file.match(/\.styles\.(css|scss)$/));

  if (!styleFile) {
    return {
      valid: false,
      issues: ['Fichier de styles non trouvé'],
    };
  }

  const content = fs.readFileSync(path.join(componentDir, styleFile), 'utf-8');
  const allIssues: string[] = [];

  styleRules.forEach((rule) => {
    const { valid, issues } = rule.validate(content);
    if (!valid) {
      allIssues.push(`[${rule.name}] ${issues.join(', ')}`);
    }
  });

  return {
    valid: allIssues.length === 0,
    issues: allIssues,
  };
}
