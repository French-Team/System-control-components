/* eslint-disable linebreak-style */
/* surveillance-system.ts
   Ce module surveille les nouveaux composants ajoutés dans src/components et vérifie qu'ils respectent les bonnes pratiques définies dans la version stable,
   et qu'ils n'intègrent pas les mauvaises pratiques définies dans la version unstable.
   Il analyse le contenu des fichiers de style associés à chaque composant et génère un rapport de contrôle.
*/

import * as fs from 'fs';
import * as path from 'path';
import * as chokidar from 'chokidar';
import { detecterFichiersManquants } from './modules/FileMissingDetector';
import { analyserFichiersPresent } from './modules/FilePresenceAnalyzer';
import { analyzeStructure } from './modules/FileStructureAnalyzer';

// Déclaration d'une interface pour une règle de contrôle
interface Rule {
  category: string;
  description: string;
  regex: RegExp;
  expected: string;
  type: 'good' | 'bad';
}

// Interface pour le résultat d'une vérification sur une règle
interface RuleResult {
  rule: Rule;
  passed: boolean;
  details: string;
}

// Liste des règles pour les bonnes pratiques (version stable)
// On peut imaginer étendre cette liste pour atteindre environ 100 propriétés
const goodRules: Rule[] = [
  {
    category: 'Structure',
    description: "Doit contenir le data-testid 'stable-container'",
    regex: /data-testid=['"]stable-container['"]/,
    expected: 'présent',
    type: 'good',
  },
  {
    category: 'Structure',
    description: "Doit contenir le data-testid 'stable-header'",
    regex: /data-testid=['"]stable-header['"]/,
    expected: 'présent',
    type: 'good',
  },
  {
    category: 'Structure',
    description: "Doit contenir le data-testid 'stable-button'",
    regex: /data-testid=['"]stable-button['"]/,
    expected: 'présent',
    type: 'good',
  },
  {
    category: 'Structure',
    description: "Doit contenir le data-testid 'stable-content'",
    regex: /data-testid=['"]stable-content['"]/,
    expected: 'présent',
    type: 'good',
  },
  {
    category: 'Structure',
    description: "Doit contenir le data-testid 'stable-item-row'",
    regex: /data-testid=['"]stable-item-row['"]/,
    expected: 'présent',
    type: 'good',
  },
  {
    category: 'Structure',
    description: "Doit contenir le data-testid 'stable-item-column'",
    regex: /data-testid=['"]stable-item-column['"]/,
    expected: 'présent',
    type: 'good',
  },
  {
    category: 'Variables',
    description: 'Utilisation des variables CSS pour les couleurs',
    regex: /var\(--[a-zA-Z0-9-_]+\)/,
    expected: 'utilisé',
    type: 'good',
  },
  {
    category: 'Display',
    description: 'Affichage en flex pour le container',
    regex: /display:\s*flex/,
    expected: 'présent',
    type: 'good',
  },
  {
    category: 'Thème',
    description: 'Classe de thème (theme-light ou theme-dark) présente',
    regex: /theme-(light|dark)/,
    expected: 'présent',
    type: 'good',
  },
  // ... autres règles de bonnes pratiques pouvant être ajoutées
];

// Liste des règles pour les mauvaises pratiques (version unstable)
const badRules: Rule[] = [
  {
    category: 'Mauvaises Pratiques',
    description: 'Valeur en dur pour background-color',
    regex: /background-color:\s*#[0-9a-fA-F]{6}/,
    expected: 'éviter',
    type: 'bad',
  },
  {
    category: 'Display',
    description: 'Utilisation de display: block au lieu de flex',
    regex: /display:\s*block/,
    expected: 'éviter',
    type: 'bad',
  },
  {
    category: 'Dimensions',
    description: 'Utilisation de dimensions fixes en pixels',
    regex: /width:\s*\d+px/,
    expected: 'éviter',
    type: 'bad',
  },
  {
    category: 'Transitions',
    description: "Utilisation d'une transition longue (all 1s)",
    regex: /transition:\s*all\s*1s/,
    expected: 'éviter',
    type: 'bad',
  },
  {
    category: 'Interactions',
    description: 'Curseur défini sur default',
    regex: /cursor:\s*default/,
    expected: 'éviter',
    type: 'bad',
  },
  {
    category: 'Débordement',
    description: 'Overflow visible',
    regex: /overflow:\s*visible/,
    expected: 'éviter',
    type: 'bad',
  },
  // ... autres règles de mauvaises pratiques pouvant être ajoutées
];

// Fonction qui analyse le contenu CSS selon les règles définies
function analyzeCss(cssContent: string): RuleResult[] {
  const results: RuleResult[] = [];
  // Vérification des bonnes pratiques
  goodRules.forEach((rule) => {
    const passed = rule.regex.test(cssContent);
    results.push({
      rule,
      passed,
      details: passed
        ? 'Conforme'
        : `Non conforme: ${rule.description} doit être ${rule.expected}.`,
    });
  });
  // Vérification des mauvaises pratiques
  badRules.forEach((rule) => {
    const passed = !rule.regex.test(cssContent); // on attend que le pattern ne corresponde pas
    results.push({
      rule,
      passed,
      details: passed ? 'Bonne pratique' : `Mauvaise pratique détectée: ${rule.description}.`,
    });
  });
  return results;
}

// Fonction qui analyse un composant en regardant son fichier de style (.styles.css, .styles.js, etc.)
async function analyzeComponent(filePath: string): Promise<void> {
  // Utilise filePath directement comme dossier du composant
  const componentDir = filePath;
  // Le nom du module correspond au nom du dossier du composant
  const moduleName = path.basename(filePath);

  // Si le dossier est le dossier racine 'components', on ignore l'analyse
  if (moduleName.toLowerCase() === 'components') {
    console.log("Dossier racine 'components' ignoré pour l'analyse.");
    return;
  }

  console.log(`📊 Analyse du composant : ${moduleName}\n`);

  // Liste de tous les fichiers présents dans le dossier du composant
  const files = fs.readdirSync(componentDir);

  // Analyse de la structure pour les fichiers .tsx et .jsx
  files.forEach((file) => {
    if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      const fullPath = path.join(componentDir, file);
      analyzeStructure(fullPath);
    }
  });

  // Définition des fichiers obligatoires pour la version stable
  const mandatoryFiles: { [key: string]: string[] } = {
    component: [`${moduleName}.jsx`, `${moduleName}.tsx`],
    test: [`${moduleName}.test.jsx`, `${moduleName}.test.tsx`],
    styles: [
      `${moduleName}.styles.js`,
      `${moduleName}.styles.jsx`,
      `${moduleName}.styles.ts`,
      `${moduleName}.styles.css`,
    ],
    index: ['index.js', 'index.ts'],
  };

  // Vérification de la présence des fichiers obligatoires
  for (const [key, fileList] of Object.entries(mandatoryFiles)) {
    let found = false;
    for (const fname of fileList) {
      if (files.includes(fname)) {
        found = true;
        break;
      }
    }
    if (!found) {
      console.log(`Missing file for ${key} component`);
    }
  }

  // Analyse des fichiers de style présents et génération des rapports d'erreurs
  const styleErrorReports: { fileName: string; reportText: string; totalErrors: number }[] = [];
  files.forEach((file) => {
    if (file.includes('.styles.')) {
      const fullFilePath = path.join(componentDir, file);
      const content = fs.readFileSync(fullFilePath, 'utf-8');
      const results = analyzeCss(content);
      let styleReportText = '';
      let totalStyleErrors = 0;
      results.forEach((result) => {
        if (!result.passed) {
          totalStyleErrors++;
          let lineNumber = 'inconnue';
          const match = result.rule.regex.exec(content);
          if (match && match.index !== undefined) {
            lineNumber = content.substring(0, match.index).split('\n').length.toString();
          }
          styleReportText += `Propriété: ${result.rule.description} - Ligne: ${lineNumber} - Erreur: ${result.details}\n`;
          styleReportText += `Conseil: Veuillez consulter guide.md pour le conseil relatif à "${result.rule.description}".\n`;
        }
      });
      if (totalStyleErrors > 0) {
        styleErrorReports.push({
          fileName: file,
          reportText: styleReportText,
          totalErrors: totalStyleErrors,
        });
      }
    }
  });

  // À la fin de l'analyse du composant, intégrer la détection des fichiers manquants via FileMissingDetector
  detecterFichiersManquants(componentDir);
  analyserFichiersPresent(componentDir);
}

// Fonction pour scanner le dossier des composants et lancer l'analyse
function scanComponents(): void {
  const componentsDir = path.join(process.cwd(), 'src', 'components');
  const componentFolders = fs
    .readdirSync(componentsDir)
    .map((name) => path.join(componentsDir, name))
    .filter((source) => fs.lstatSync(source).isDirectory());
  componentFolders.forEach((folder) => {
    analyzeComponent(folder);
  });
}

// Mise en place d'un watcher pour surveiller les nouveaux composants
function watchComponents(): void {
  const componentsDir = path.join(process.cwd(), 'src', 'components');
  console.log(`Surveillance du dossier des composants : ${componentsDir}`);
  const watcher = chokidar.watch(componentsDir, {
    ignored: /(^|[/\\])\../, // ignorer les fichiers cachés
    persistent: true,
  });

  watcher.on('addDir', (dirPath) => {
    console.log(`Nouveau composant détecté : ${dirPath}`);
    analyzeComponent(dirPath);
  });

  // Détecter les modifications sur les fichiers existants
  watcher.on('change', (filePath) => {
    console.log(`Fichier modifié : ${filePath}`);
    const componentDir = path.dirname(filePath);
    analyzeComponent(componentDir);
  });

  // Détecter l'ajout d'un nouveau fichier
  watcher.on('add', (filePath) => {
    console.log(`Nouveau fichier ajouté : ${filePath}`);
    const componentDir = path.dirname(filePath);
    analyzeComponent(componentDir);
  });
}

// Exécution principale : on peut choisir le mode scan unique ou surveillance continue
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const mode = process.argv[2];
  if (mode === 'watch') {
    watchComponents();
  } else {
    scanComponents();
  }
}

export { analyzeCss, analyzeComponent, scanComponents, watchComponents };
