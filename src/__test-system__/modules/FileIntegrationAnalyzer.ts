import * as fs from 'fs';
import * as path from 'path';

/**
 * Récupère de manière récursive tous les fichiers .ts à partir d'un répertoire donné.
 * @param directory Répertoire de départ
 * @returns Liste des chemins absolus des fichiers .ts
 */
function getAllTSFiles(directory: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(directory);
  list.forEach((file) => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getAllTSFiles(fullPath));
    } else if (file.endsWith('.ts')) {
      results.push(fullPath);
    }
  });
  return results;
}

/**
 * Vérifie si un fichier est intégré dans le système, c'est-à-dire référencé par un import dans un autre fichier .ts.
 * @param file Chemin absolu du fichier à vérifier
 * @param allTSFiles Liste de tous les fichiers .ts du projet
 * @returns true si le fichier est intégré, false sinon.
 */
function isFileIntegrated(file: string, allTSFiles: string[]): boolean {
  const baseName = path.basename(file, '.ts');
  // Expression régulière pour chercher un import qui mentionne le nom du fichier (sans extension)
  const regex = new RegExp(`["'][^"']*${baseName}[^"']*["']`);

  // Vérifier dans chaque fichier .ts (sauf le fichier lui-même)
  for (const tsFile of allTSFiles) {
    if (tsFile === file) continue;
    const content = fs.readFileSync(tsFile, 'utf-8');
    if (regex.test(content)) {
      return true;
    }
  }
  return false;
}

/**
 * Analyse l'intégration des fichiers .ts dans le projet et génère un rapport.
 * Le rapport est sauvegardé dans :
 *   src/__test-system__/__reports__/integration_report.txt
 * @param projectDir Répertoire racine du projet
 */
export function analyzeIntegration(projectDir: string): void {
  // On suppose que le répertoire de projet contient le dossier 'src'
  const srcDir = path.join(projectDir, 'src');
  const allTSFiles = getAllTSFiles(srcDir);

  let report = "Analyse d'intégration des fichiers .ts\n";
  report += `Total fichiers .ts trouvés : ${allTSFiles.length}\n\n`;

  let integratedCount = 0;
  let notIntegratedCount = 0;

  allTSFiles.forEach((file) => {
    const integrated = isFileIntegrated(file, allTSFiles);
    const relativePath = path.relative(projectDir, file);
    if (integrated) {
      report += `${relativePath} : Intégré.\n`;
      integratedCount++;
    } else {
      report += `${relativePath} : Non intégré.\n`;
      notIntegratedCount++;
    }
  });

  report += `\nStatistiques :\n`;
  report += `Fichiers intégrés : ${integratedCount}\n`;
  report += `Fichiers non intégrés : ${notIntegratedCount}\n`;

  // Définir le chemin du rapport
  const reportDir = path.join(projectDir, 'src', '__test-system__', '__reports__');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  const reportPath = path.join(reportDir, 'integration_report.txt');
  fs.writeFileSync(reportPath, report);
  console.log(`Rapport d'intégration généré : ${reportPath}`);
}

// Pour faciliter le test direct du module
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const projectDir = process.argv[2] || process.cwd();
  console.log(`Lancement de l'analyse d'intégration dans : ${projectDir}`);
  analyzeIntegration(projectDir);
}
