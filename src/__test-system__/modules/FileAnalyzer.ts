import * as fs from 'fs';
import * as path from 'path';
import crypto from 'crypto';
import { reportManager } from './ReportManager';
import { validateStyles } from './StyleRules';

interface ComponentAnalysis {
  testAnalysis: TestAnalysis;
  structureAnalysis: StructureAnalysis;
  styleAnalysis: StyleAnalysis;
  timestamp: string;
}

interface TestAnalysis {
  coverage: {
    elements: number;
    testedElements: number;
    percentage: number;
  };
  testCases: Array<{
    description: string;
    type: 'render' | 'interaction' | 'integration';
    coverage: string[];
  }>;
  suggestions: string[];
}

interface StructureAnalysis {
  hierarchy: {
    depth: number;
    elements: Array<{
      tag: string;
      testId?: string;
      children: number;
      semanticRole?: string;
    }>;
  };
  accessibility: {
    ariaAttributes: string[];
    semanticTags: string[];
    issues: string[];
  };
  semantics: {
    validUsage: boolean;
    issues: string[];
  };
  suggestions: string[];
}

interface StyleAnalysis {
  themeSupport: {
    hasThemes: boolean;
    themes: string[];
    variables: string[];
  };
  cssVariables: {
    total: number;
    usage: Array<{
      name: string;
      occurrences: number;
    }>;
  };
  layout: {
    type: 'flex' | 'grid' | 'other';
    properties: string[];
  };
  responsiveness: {
    hasMediaQueries: boolean;
    breakpoints: string[];
  };
  suggestions: string[];
}

interface PresenceAnalysis {
  files: Array<{
    name: string;
    present: boolean;
  }>;
}

// Cache pour les rapports
const reportCache = new Map<string, { hash: string; analysis: ComponentAnalysis }>();

export async function analyzeComponent(componentDir: string): Promise<ComponentAnalysis> {
  const files = fs.readdirSync(componentDir);
  const componentName = path.basename(componentDir);

  // Calcul du hash des fichiers pour détecter les changements
  const contentHash = calculateDirectoryHash(componentDir);

  // Vérification du cache
  const cached = reportCache.get(componentDir);
  if (cached && cached.hash === contentHash) {
    console.log(`📋 Utilisation du rapport en cache pour ${componentName}`);
    return cached.analysis;
  }

  console.log(`🔄 Génération d'un nouveau rapport pour ${componentName}`);

  // Analyse des tests
  const testAnalysis = await analyzeTests(componentDir, files);

  // Analyse de la structure
  const structureAnalysis = await analyzeStructure(componentDir, files);

  // Analyse des styles
  const styleAnalysis = await analyzeStyles(componentDir, files);

  // Analyse de la présence des fichiers
  const presenceAnalysis = analyzePresence(componentDir, files);

  // Création de l'analyse complète
  const analysis: ComponentAnalysis = {
    testAnalysis,
    structureAnalysis,
    styleAnalysis,
    timestamp: new Date().toLocaleString('fr-FR'),
  };

  // Génération du rapport unifié via le ReportManager
  await reportManager.generateReport(componentDir, {
    structure: structureAnalysis,
    tests: testAnalysis,
    styles: styleAnalysis,
    presence: presenceAnalysis,
  });

  // Mise à jour du cache
  reportCache.set(componentDir, { hash: contentHash, analysis });

  // Sauvegarde du rapport
  await saveReport(componentName, analysis);

  return analysis;
}

function calculateDirectoryHash(directory: string): string {
  const hash = crypto.createHash('md5');
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isFile()) {
      const content = fs.readFileSync(filePath);
      hash.update(content);
    }
  }

  return hash.digest('hex');
}

async function analyzeTests(componentDir: string, files: string[]): Promise<TestAnalysis> {
  const testFiles = files.filter((f) => f.match(/\.(test|spec)\.(jsx?|tsx?)$/));
  const componentFiles = files.filter((f) => f.match(/\.(jsx?|tsx?)$/) && !f.includes('.test.'));

  const analysis: TestAnalysis = {
    coverage: { elements: 0, testedElements: 0, percentage: 0 },
    testCases: [],
    suggestions: [],
  };

  for (const testFile of testFiles) {
    const content = fs.readFileSync(path.join(componentDir, testFile), 'utf-8');

    // Analyse des cas de test
    const testCases = content.match(/it\(['"](.+?)['"]/g) || [];
    const testDescriptions = testCases.map((tc) => {
      const match = tc.match(/it\(['"](.+?)['"]/);
      return match ? match[1] : '';
    });

    // Analyse de la couverture
    const dataTestIds = content.match(/getByTestId\(['"](.+?)['"]\)/g) || [];
    const testedElements = dataTestIds.map((id) => {
      const match = id.match(/getByTestId\(['"](.+?)['"]\)/);
      return match ? match[1] : '';
    });

    // Analyse des interactions
    const interactions = content.match(/fireEvent\.(\w+)/g) || [];

    analysis.testCases = testDescriptions.map((desc, i) => ({
      description: desc,
      type: interactions[i] ? 'interaction' : 'render',
      coverage: testedElements,
    }));
  }

  // Calcul de la couverture
  const totalElements = componentFiles.reduce((acc, file) => {
    const content = fs.readFileSync(path.join(componentDir, file), 'utf-8');
    const elements = (content.match(/data-testid=/g) || []).length;
    return acc + elements;
  }, 0);

  // Obtenir la liste unique des éléments testés
  const uniqueTestedElements = new Set(analysis.testCases.flatMap((tc) => tc.coverage));

  analysis.coverage = {
    elements: totalElements,
    testedElements: uniqueTestedElements.size,
    percentage: Math.round((uniqueTestedElements.size / totalElements) * 100),
  };

  // Suggestions d'amélioration
  if (analysis.coverage.percentage < 100) {
    analysis.suggestions.push(
      `Augmenter la couverture de test (actuellement ${analysis.coverage.percentage}%)`
    );
  }
  if (!analysis.testCases.some((tc) => tc.type === 'interaction')) {
    analysis.suggestions.push("Ajouter des tests d'interaction utilisateur");
  }

  return analysis;
}

async function analyzeStructure(componentDir: string, files: string[]): Promise<StructureAnalysis> {
  const componentFiles = files.filter((f) => f.match(/\.(jsx?|tsx?)$/) && !f.includes('.test.'));

  const analysis: StructureAnalysis = {
    hierarchy: { depth: 0, elements: [] },
    accessibility: { ariaAttributes: [], semanticTags: [], issues: [] },
    semantics: { validUsage: true, issues: [] },
    suggestions: [],
  };

  for (const file of componentFiles) {
    const content = fs.readFileSync(path.join(componentDir, file), 'utf-8');

    // Analyse de la hiérarchie
    const elements = content.match(/<([A-Z]\w+|[a-z]+)([^>]*?)>/g) || [];
    const depth =
      content.split('\n').reduce((max, line) => {
        const match = line.match(/^\s*/);
        const indent = match ? match[0].length : 0;
        return Math.max(max, indent);
      }, 0) / 2;

    // Analyse des éléments
    elements.forEach((el) => {
      const tagMatch = el.match(/<([A-Z]\w+|[a-z]+)/);
      const tag = tagMatch ? tagMatch[1] : 'div';
      const testId = el.match(/data-testid=["']([^"']+)["']/)?.[1];
      const ariaAttrs = el.match(/aria-[a-z]+=/g) || [];

      analysis.hierarchy.elements.push({
        tag,
        testId,
        children: 0,
        semanticRole: isSemanticTag(tag) ? tag : undefined,
      });

      if (ariaAttrs.length > 0) {
        analysis.accessibility.ariaAttributes.push(...ariaAttrs);
      }
      if (isSemanticTag(tag)) {
        analysis.accessibility.semanticTags.push(tag);
      }
    });

    analysis.hierarchy.depth = depth;
  }

  // Validation sémantique
  if (!analysis.accessibility.semanticTags.includes('header')) {
    analysis.semantics.issues.push('Pas de balise header sémantique');
  }
  if (
    !analysis.accessibility.semanticTags.includes('main') &&
    !analysis.accessibility.semanticTags.includes('section')
  ) {
    analysis.semantics.issues.push('Pas de balise main ou section pour le contenu principal');
  }

  // Suggestions
  if (analysis.accessibility.ariaAttributes.length === 0) {
    analysis.suggestions.push("Ajouter des attributs ARIA pour améliorer l'accessibilité");
  }
  if (analysis.semantics.issues.length > 0) {
    analysis.suggestions.push('Utiliser des balises HTML sémantiques appropriées');
  }

  return analysis;
}

async function analyzeStyles(componentDir: string, files: string[]): Promise<StyleAnalysis> {
  const styleFiles = files.filter((f) => f.match(/\.styles\.(css|scss)$/));

  const analysis: StyleAnalysis = {
    themeSupport: {
      hasThemes: false,
      themes: [],
      variables: [],
    },
    cssVariables: {
      total: 0,
      usage: [],
    },
    layout: {
      type: 'flex',
      properties: [],
    },
    responsiveness: {
      hasMediaQueries: false,
      breakpoints: [],
    },
    suggestions: [],
  };

  if (styleFiles.length === 0) {
    analysis.suggestions.push('Aucun fichier de style trouvé');
    return analysis;
  }

  // Validation des règles de style
  const { valid, issues } = validateStyles(componentDir);
  if (!valid) {
    analysis.suggestions.push(...issues);
  }

  // Analyse du contenu des fichiers de style
  for (const file of styleFiles) {
    const content = fs.readFileSync(path.join(componentDir, file), 'utf-8');

    // Analyse du support des thèmes
    analysis.themeSupport.hasThemes =
      content.includes('.theme-light') || content.includes('.theme-dark');
    if (content.includes('.theme-light')) analysis.themeSupport.themes.push('light');
    if (content.includes('.theme-dark')) analysis.themeSupport.themes.push('dark');

    // Analyse des variables CSS
    const variables = content.match(/--[a-zA-Z0-9-]+/g) || [];
    analysis.cssVariables.total = variables.length;
    analysis.cssVariables.usage = variables.map((v) => ({
      name: v,
      occurrences: (content.match(new RegExp(v, 'g')) || []).length,
    }));

    // Analyse du layout
    analysis.layout.type = content.includes('display: flex') ? 'flex' : 'other';
    const flexProperties = content.match(/flex[a-zA-Z-]+:[^;]+/g) || [];
    analysis.layout.properties = flexProperties;

    // Analyse de la réactivité
    analysis.responsiveness.hasMediaQueries = content.includes('@media');
    const breakpoints = content.match(/--breakpoint-[a-zA-Z-]+/g) || [];
    analysis.responsiveness.breakpoints = breakpoints;
  }

  return analysis;
}

function isSemanticTag(tag: string): boolean {
  const semanticTags = ['header', 'nav', 'main', 'article', 'section', 'aside', 'footer'];
  return semanticTags.includes(tag.toLowerCase());
}

async function saveReport(componentName: string, analysis: ComponentAnalysis): Promise<void> {
  const reportsDir = path.join(
    process.cwd(),
    'src',
    '__test-system__',
    '__reports__',
    componentName
  );

  // Création du dossier des rapports si nécessaire
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Génération du rapport en Markdown
  let report = `# Rapport d'Analyse pour ${componentName}\n`;
  report += `Date: ${analysis.timestamp}\n\n`;

  // Ajout des sections du rapport...
  report += generateReportContent(analysis);

  // Sauvegarde du rapport
  const reportPath = path.join(reportsDir, 'rapport_complet.md');
  await fs.promises.writeFile(reportPath, report);

  console.log(`📝 Rapport sauvegardé : ${reportPath}`);
}

function generateReportContent(analysis: ComponentAnalysis): string {
  let content = '';

  // Section Tests
  content += `## 1. Analyse des Tests\n`;
  content += `- Couverture: ${analysis.testAnalysis.coverage.percentage}%\n`;
  content += `- Éléments testés: ${analysis.testAnalysis.coverage.testedElements}/${analysis.testAnalysis.coverage.elements}\n\n`;
  content += `### Cas de Test\n`;
  analysis.testAnalysis.testCases.forEach((tc) => {
    content += `- ${tc.description} (${tc.type})\n`;
    content += `  Éléments couverts: ${tc.coverage.join(', ')}\n`;
  });
  content += `\n### Suggestions pour les Tests\n`;
  analysis.testAnalysis.suggestions.forEach((s) => (content += `- ${s}\n`));

  // Section Structure
  content += `\n## 2. Analyse de la Structure\n`;
  content += `### Hiérarchie (Profondeur: ${analysis.structureAnalysis.hierarchy.depth})\n`;
  analysis.structureAnalysis.hierarchy.elements.forEach((el) => {
    content += `- <${el.tag}>${el.testId ? ` [data-testid="${el.testId}"]` : ''}${el.semanticRole ? ` (${el.semanticRole})` : ''}\n`;
  });
  content += `\n### Accessibilité\n`;
  content += `- Tags sémantiques: ${analysis.structureAnalysis.accessibility.semanticTags.join(', ')}\n`;
  content += `- Attributs ARIA: ${analysis.structureAnalysis.accessibility.ariaAttributes.join(', ') || 'Aucun'}\n`;
  if (analysis.structureAnalysis.semantics.issues.length > 0) {
    content += `\n### Problèmes Sémantiques\n`;
    analysis.structureAnalysis.semantics.issues.forEach((i) => (content += `- ${i}\n`));
  }
  content += `\n### Suggestions pour la Structure\n`;
  analysis.structureAnalysis.suggestions.forEach((s) => (content += `- ${s}\n`));

  // Section Styles
  content += `\n## 3. Analyse des Styles\n`;
  content += `### Support des Thèmes\n`;
  content += `- Thèmes détectés: ${analysis.styleAnalysis.themeSupport.themes.join(', ') || 'Aucun'}\n`;
  content += `- Variables utilisées: ${analysis.styleAnalysis.themeSupport.variables.join(', ')}\n`;
  content += `\n### Mise en Page\n`;
  content += `- Type: ${analysis.styleAnalysis.layout.type}\n`;
  content += `- Propriétés: ${analysis.styleAnalysis.layout.properties.join(', ')}\n`;
  content += `\n### Réactivité\n`;
  content += `- Media Queries: ${analysis.styleAnalysis.responsiveness.breakpoints.join(', ') || 'Aucune'}\n`;
  content += `\n### Suggestions pour les Styles\n`;
  analysis.styleAnalysis.suggestions.forEach((s) => (content += `- ${s}\n`));

  return content;
}

function analyzePresence(componentDir: string, files: string[]): PresenceAnalysis {
  const componentName = path.basename(componentDir);
  const requiredFiles = [
    `${componentName}.tsx`,
    `${componentName}.test.tsx`,
    `${componentName}.styles.css`,
    'index.ts',
  ];

  return {
    files: requiredFiles.map((file) => ({
      name: file,
      present: files.includes(file),
    })),
  };
}

// Export des types pour les tests
export type { ComponentAnalysis, TestAnalysis, StructureAnalysis, StyleAnalysis };
