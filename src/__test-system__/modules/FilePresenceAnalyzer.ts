import * as fs from 'fs';
import * as path from 'path';
import { analyzeCss } from '../surveillance-system';

/**
 * Analyse les fichiers présents dans un dossier composant et génère un rapport pour chaque fichier.
 * Le rapport est sauvegardé dans :
 *   src/__test-system__/__reports__/<NomDuModuleSecurise>/rapport_[nom_du_fichier].md
 *
 * Pour les fichiers de styles (extension .styles.css, .styles.js, .styles.ts, .styles.jsx), la fonction analyzeCss est utilisée.
 * Pour les autres fichiers, des informations basiques (taille, date de modification) sont enregistrées.
 */
export function analyserFichiersPresent(cheminDuComposant: string): void {
  const moduleName = path.basename(cheminDuComposant);
  const files = fs.readdirSync(cheminDuComposant);
  const nomModuleSecurise = moduleName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const dossierRapport = path.join(
    process.cwd(),
    'src',
    '__test-system__',
    '__reports__',
    nomModuleSecurise
  );

  if (!fs.existsSync(dossierRapport)) {
    fs.mkdirSync(dossierRapport, { recursive: true });
  }

  files.forEach((file) => {
    const filePath = path.join(cheminDuComposant, file);
    const dateActuelle = new Date().toLocaleString('fr-FR');
    let reportContent = `Rapport d'analyse pour le fichier ${file}\nDate de l'analyse : ${dateActuelle}\n\n`;

    // Si le fichier est un fichier de styles
    if (file.match(/\.styles\.(css|js|ts|jsx)$/)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const results = analyzeCss(content);
      reportContent += 'Analyse des styles :\n';
      results.forEach((result) => {
        let lineNumber = 'inconnue';
        const match = result.rule.regex.exec(content);
        if (match && match.index !== undefined) {
          lineNumber = content.substring(0, match.index).split('\n').length.toString();
        }
        reportContent += `Propriété: ${result.rule.description} - ${result.passed ? 'Conforme' : 'Non conforme'} - Ligne: ${lineNumber} - Détails: ${result.details}\n`;
      });
    } else {
      // Pour les autres fichiers, effectuer des vérifications de base
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath, 'utf-8');
      let detailedReport = '';

      if (/index\.(ts|js)$/.test(file)) {
        if (content.includes('export')) {
          detailedReport = 'Le fichier contient des exportations. Conforme.';
        } else {
          detailedReport = 'Aucune exportation trouvée. Non conforme.';
        }
      } else if (/theme\.css$/.test(file)) {
        if (content.match(/\.theme-(light|dark)/)) {
          detailedReport = 'Le fichier theme contient des classes de thème. Conforme.';
        } else {
          detailedReport =
            'Le fichier theme ne semble pas contenir les classes de thème attendues. Non conforme.';
        }
      } else {
        detailedReport = 'Fichier présent et conforme.';
      }

      if (stats.size === 0) {
        detailedReport = 'Fichier présent mais vide. Non conforme.';
      }

      reportContent +=
        detailedReport +
        ` Taille : ${stats.size} octets. Dernière modification : ${stats.mtime}.
`;
    }

    const reportFilePath = path.join(dossierRapport, `rapport_${file}.md`);
    fs.writeFileSync(reportFilePath, reportContent);
    console.log(`Rapport généré pour le fichier ${file} : ${reportFilePath}`);
  });
}

// Pour faciliter le test direct du module.
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const cheminTest = process.argv[2] || path.join(process.cwd(), 'src', 'components', 'exemple');
  console.log(`Lancement de l'analyse des fichiers présents pour : ${cheminTest}`);
  analyserFichiersPresent(cheminTest);
}
