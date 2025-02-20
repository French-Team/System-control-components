import * as fs from 'fs';
import * as path from 'path';

/**
 * Ce module analyse la structure d'un fichier de composant (.tsx ou .jsx) afin de vérifier qu'il respecte le modèle par défaut.
 * Il vérifie la présence des attributs data-testid essentiels :
 *   - stable-container
 *   - stable-header
 *   - stable-button
 *   - stable-content
 *   - stable-item-row
 *   - stable-item-column
 * 
 * Un rapport est généré et sauvegardé dans :
 *   src/__test-system__/__reports__/<NomDuModuleSecurise>/rapport_structure_[nom_du_fichier].md
 */

interface StructureElement {
  tag: string;
  found: boolean;
  expectedTestId?: string;
  currentTestId?: string;
}

export function analyzeStructure(filePath: string): void {
  const fileName = path.basename(filePath);
  const dateActuelle = new Date().toLocaleString('fr-FR');
  let reportContent = `Rapport d'analyse de la structure pour ${fileName}\n`;
  reportContent += `Date de l'analyse : ${dateActuelle}\n\n`;

  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    console.error(`Erreur lors de la lecture du fichier ${filePath}:`, err);
    reportContent += 'Erreur lors de la lecture du fichier.\n';
    return;
  }

  // Analyse des éléments existants dans le composant
  const existingElements: StructureElement[] = [];
  const elementRegex = /<(\w+)[^>]*>/g;
  let match;
  
  while ((match = elementRegex.exec(content)) !== null) {
    const tag = match[1];
    const fullElement = match[0];
    const testIdMatch = fullElement.match(/data-testid=["']([^"']+)["']/);
    
    existingElements.push({
      tag,
      found: true,
      currentTestId: testIdMatch ? testIdMatch[1] : undefined
    });
  }

  reportContent += "Structure actuelle détectée :\n";
  existingElements.forEach(element => {
    reportContent += `- <${element.tag}>${element.currentTestId ? ` avec data-testid="${element.currentTestId}"` : ' sans data-testid'}\n`;
  });
  reportContent += "\n";

  // Définition des règles de structure attendues avec suggestions
  const structureRules = [
    {
      description: 'Container principal',
      expectedTag: 'div',
      testId: 'stable-container',
      suggestion: 'Ajouter data-testid="stable-container" sur le div principal'
    },
    {
      description: 'En-tête',
      expectedTag: 'header',
      testId: 'stable-header',
      suggestion: 'Ajouter data-testid="stable-header" sur la balise header'
    },
    {
      description: 'Bouton d\'action',
      expectedTag: 'button',
      testId: 'stable-button',
      suggestion: 'Ajouter data-testid="stable-button" sur le bouton principal'
    },
    {
      description: 'Contenu principal',
      expectedTag: 'section',
      testId: 'stable-content',
      suggestion: 'Ajouter data-testid="stable-content" sur la section principale'
    },
    {
      description: 'Conteneur de ligne',
      expectedTag: 'div',
      testId: 'stable-item-row',
      suggestion: 'Ajouter des conteneurs de ligne avec data-testid="stable-item-row"'
    },
    {
      description: 'Conteneur de colonne',
      expectedTag: 'div',
      testId: 'stable-item-column',
      suggestion: 'Ajouter des conteneurs de colonne avec data-testid="stable-item-column"'
    }
  ];

  reportContent += "Analyse des règles de structure :\n";
  let hasError = false;

  structureRules.forEach(rule => {
    const elementExists = existingElements.some(el => el.tag === rule.expectedTag);
    const testIdExists = content.includes(`data-testid="${rule.testId}"`);
    
    if (!testIdExists) {
      hasError = true;
      reportContent += `❌ ${rule.description} : Non conforme\n`;
      reportContent += `   - Élément <${rule.expectedTag}> ${elementExists ? 'trouvé' : 'manquant'}\n`;
      reportContent += `   - data-testid="${rule.testId}" manquant\n`;
      reportContent += `   - Suggestion : ${rule.suggestion}\n`;
    } else {
      reportContent += `✅ ${rule.description} : Conforme\n`;
    }
  });

  reportContent += "\nExemple de structure conforme :\n";
  reportContent += `
<div data-testid="stable-container">
  <header data-testid="stable-header">
    <h1>Titre du composant</h1>
  </header>
  <button data-testid="stable-button">Action</button>
  <section data-testid="stable-content">
    <div data-testid="stable-item-row">
      <div data-testid="stable-item-column">
        Contenu
      </div>
    </div>
  </section>
</div>
`;

  reportContent += `\nConclusion : ${hasError ? 'Structure non conforme.' : 'Structure conforme.'}\n`;
  if (hasError) {
    reportContent += "Actions requises :\n";
    reportContent += "1. Ajouter les data-testid manquants sur les éléments existants\n";
    reportContent += "2. Restructurer le composant selon l'exemple fourni si nécessaire\n";
    reportContent += "3. Consulter guide.md pour plus de détails sur la structure attendue\n";
  }

  // Sauvegarde du rapport
  const moduleName = path.basename(path.dirname(filePath));
  const nomModuleSecurise = moduleName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const rapportDir = path.join(
    process.cwd(),
    'src',
    '__test-system__',
    '__reports__',
    nomModuleSecurise
  );

  if (!fs.existsSync(rapportDir)) {
    fs.mkdirSync(rapportDir, { recursive: true });
  }

  const rapportFilePath = path.join(rapportDir, `rapport_structure_${fileName}.md`);
  try {
    fs.writeFileSync(rapportFilePath, reportContent);
    console.log(`Rapport de structure généré pour ${fileName} : ${rapportFilePath}`);
  } catch (err) {
    console.error(`Erreur lors de l'écriture du rapport pour ${fileName}:`, err);
  }
}

// Pour faciliter le test direct du module
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const testFilePath = process.argv[2];
  if (!testFilePath) {
    console.error('Veuillez fournir un chemin de fichier en argument.');
    process.exit(1);
  }
  analyzeStructure(testFilePath);
} 