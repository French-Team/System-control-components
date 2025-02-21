import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

interface FilePresence {
  name: string;
  present: boolean;
}

interface StructureAnalysis {
  hierarchy?: {
    depth: number;
    elements: Array<{
      tag: string;
      testId?: string;
      children?: number;
    }>;
  };
}

interface TestAnalysis {
  coverage?: {
    elements: number;
    testedElements: number;
    percentage: number;
  };
}

interface StyleAnalysis {
  themeSupport?: {
    hasThemes: boolean;
    themes: string[];
  };
  cssVariables?: {
    total: number;
    usage: Array<{ name: string; occurrences: number }>;
  };
  layout?: {
    type: string;
    properties: string[];
  };
  responsiveness?: {
    hasMediaQueries: boolean;
    breakpoints: string[];
  };
  suggestions?: string[];
}

interface PresenceAnalysis {
  files: FilePresence[];
}

interface Report {
  componentName: string;
  timestamp: string;
  structure: StructureAnalysis;
  tests: TestAnalysis;
  styles: StyleAnalysis;
  presence: PresenceAnalysis;
}

interface AnalysisResults {
  structure: StructureAnalysis;
  tests: TestAnalysis;
  styles: StyleAnalysis;
  presence: PresenceAnalysis;
}

class ReportManager {
  private static instance: ReportManager;
  private reportCache: Map<string, { hash: string; report: Report }> = new Map();
  private readonly reportsBaseDir: string;

  private constructor() {
    this.reportsBaseDir = path.join(process.cwd(), 'src', '__test-system__', '__reports__');
  }

  public static getInstance(): ReportManager {
    if (!ReportManager.instance) {
      ReportManager.instance = new ReportManager();
    }
    return ReportManager.instance;
  }

  public async generateReport(
    componentDir: string,
    analysisResults: AnalysisResults
  ): Promise<void> {
    const componentName = path.basename(componentDir);
    const contentHash = this.calculateDirectoryHash(componentDir);

    // Vérifier si le rapport existe déjà et n'a pas changé
    const cached = this.reportCache.get(componentDir);
    if (cached && cached.hash === contentHash) {
      console.log(`📋 Rapport existant à jour pour ${componentName}`);
      return;
    }

    // Créer le rapport unifié
    const report: Report = {
      componentName,
      timestamp: new Date().toLocaleString('fr-FR'),
      structure: analysisResults.structure,
      tests: analysisResults.tests,
      styles: analysisResults.styles,
      presence: analysisResults.presence,
    };

    // Mettre à jour le cache
    this.reportCache.set(componentDir, { hash: contentHash, report });

    // Sauvegarder le rapport
    await this.saveReport(componentName, report);
  }

  private calculateDirectoryHash(directory: string): string {
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

  private async saveReport(componentName: string, report: Report): Promise<void> {
    const componentReportDir = path.join(this.reportsBaseDir, componentName);

    // Créer le dossier si nécessaire
    if (!fs.existsSync(componentReportDir)) {
      fs.mkdirSync(componentReportDir, { recursive: true });
    }

    // Générer le contenu du rapport
    const content = this.generateReportContent(report);

    // Sauvegarder le rapport principal
    const reportPath = path.join(componentReportDir, 'rapport.md');
    await fs.promises.writeFile(reportPath, content);

    console.log(`📝 Rapport mis à jour : ${reportPath}`);
  }

  private generateReportContent(report: Report): string {
    let content = `# Rapport d'Analyse pour ${report.componentName}\n`;
    content += `Date: ${report.timestamp}\n\n`;

    // Section Structure
    content += `## 1. Structure du Composant\n`;
    if (report.structure) {
      content += this.formatStructureSection(report.structure);
    }

    // Section Tests
    content += `\n## 2. Tests\n`;
    if (report.tests) {
      content += this.formatTestsSection(report.tests);
    }

    // Section Styles
    content += `\n## 3. Styles\n`;
    if (report.styles) {
      content += this.formatStylesSection(report.styles);
    }

    // Section Présence des Fichiers
    content += `\n## 4. Fichiers du Composant\n`;
    if (report.presence) {
      content += this.formatPresenceSection(report.presence);
    }

    return content;
  }

  private formatStructureSection(structure: StructureAnalysis): string {
    let content = '';
    if (structure.hierarchy) {
      content += `### Hiérarchie\n`;
      content += `- Profondeur: ${structure.hierarchy.depth} niveaux\n`;
      structure.hierarchy.elements.forEach((el) => {
        content += `- <${el.tag}>${el.testId ? ` [data-testid="${el.testId}"]` : ''}\n`;
      });
    }
    return content;
  }

  private formatTestsSection(tests: TestAnalysis): string {
    let content = '';
    if (tests.coverage) {
      content += `### Couverture\n`;
      content += `- Total: ${tests.coverage.percentage}%\n`;
      content += `- Éléments testés: ${tests.coverage.testedElements}/${tests.coverage.elements}\n`;
    }
    return content;
  }

  private formatStylesSection(styles: StyleAnalysis): string {
    let content = '';

    // Support des thèmes
    if (styles.themeSupport) {
      content += `### Thèmes\n`;
      content += `- Support: ${styles.themeSupport.hasThemes ? 'Oui' : 'Non'}\n`;
      if (styles.themeSupport.themes.length > 0) {
        content += `- Thèmes: ${styles.themeSupport.themes.join(', ')}\n`;
      }
    }

    // Variables CSS
    if (styles.cssVariables) {
      content += `\n### Variables CSS\n`;
      content += `- Total: ${styles.cssVariables.total}\n`;
      if (styles.cssVariables.usage.length > 0) {
        content += `- Variables les plus utilisées:\n`;
        styles.cssVariables.usage
          .sort((a, b) => b.occurrences - a.occurrences)
          .slice(0, 5)
          .forEach(({ name, occurrences }) => {
            content += `  - ${name}: ${occurrences} fois\n`;
          });
      }
    }

    // Layout
    if (styles.layout) {
      content += `\n### Mise en Page\n`;
      content += `- Type: ${styles.layout.type}\n`;
      if (styles.layout.properties.length > 0) {
        content += `- Propriétés:\n`;
        styles.layout.properties.forEach((prop) => {
          content += `  - ${prop}\n`;
        });
      }
    }

    // Réactivité
    if (styles.responsiveness) {
      content += `\n### Réactivité\n`;
      content += `- Media Queries: ${styles.responsiveness.hasMediaQueries ? 'Oui' : 'Non'}\n`;
      if (styles.responsiveness.breakpoints.length > 0) {
        content += `- Points de rupture: ${styles.responsiveness.breakpoints.join(', ')}\n`;
      }
    }

    // Suggestions et problèmes
    if (styles.suggestions && styles.suggestions.length > 0) {
      content += `\n### Suggestions d'Amélioration\n`;
      styles.suggestions.forEach((suggestion) => {
        content += `- ${suggestion}\n`;
      });
    }

    return content;
  }

  private formatPresenceSection(presence: PresenceAnalysis): string {
    let content = '';
    if (presence.files) {
      content += `### Fichiers Requis\n`;
      presence.files.forEach((file) => {
        content += `- ${file.name}: ${file.present ? '✅' : '❌'}\n`;
      });
    }
    return content;
  }

  public clearCache(): void {
    this.reportCache.clear();
    console.log('🧹 Cache des rapports vidé');
  }
}

export const reportManager = ReportManager.getInstance();
