/*
  FileMissingDetector.ts
  ------------------------
  Ce module détecte les fichiers manquants dans un dossier composant et écrit un rapport de contrôle.
  Il se conforme à la Procédure de Développement décrite dans Procédure.md.
  Pour chaque composant, il vérifie la présence des fichiers obligatoires suivants :
    - Composant principal : <NomComposant>.jsx ou <NomComposant>.tsx
    - Fichier de styles : <NomComposant>.styles.css, <NomComposant>.styles.js, <NomComposant>.styles.ts ou <NomComposant>.styles.jsx
    - Fichier de test : <NomComposant>.test.jsx ou <NomComposant>.test.tsx
    - Fichier d'index : index.js ou index.ts

  Le rapport est sauvegardé dans :
    src/test-system/__reports__/<NomDuModuleSecurise>/rapport_fichiers_manquants.md
*/

import * as fs from 'fs';
import * as path from 'path';

// Interface pour définir les fichiers obligatoires par catégorie
interface FichiersObligatoires {
  [categorie: string]: string[];
}

/**
 * Fonction qui détecte les fichiers manquants dans un dossier composant et écrit un rapport.
 * @param cheminDuComposant - Chemin absolu vers le dossier du composant.
 */
export function detecterFichiersManquants(cheminDuComposant: string): void {
  // Détermination du nom du module à partir du dossier
  const nomModule = path.basename(cheminDuComposant);

  // Définition des fichiers obligatoires pour le composant
  const fichiersObligatoires: FichiersObligatoires = {
    composant: [`${nomModule}.jsx`, `${nomModule}.tsx`],
    styles: [
      `${nomModule}.styles.css`,
      `${nomModule}.styles.js`,
      `${nomModule}.styles.ts`,
      `${nomModule}.styles.jsx`,
    ],
    test: [`${nomModule}.test.jsx`, `${nomModule}.test.tsx`],
    index: ['index.js', 'index.ts'],
  };

  // Lecture du contenu du dossier du composant
  let fichiers: string[] = [];
  try {
    fichiers = fs.readdirSync(cheminDuComposant);
  } catch (error) {
    console.error(`Erreur lors de la lecture du dossier ${cheminDuComposant}:`, error);
    return;
  }

  // Détection des fichiers manquants
  let nbErreurs = 0;
  let rapportManquants = '';

  // Pour chaque catégorie de fichiers obligatoires
  for (const [categorie, listeFichiers] of Object.entries(fichiersObligatoires)) {
    let fichierTrouve = false;
    for (const fichier of listeFichiers) {
      if (fichiers.includes(fichier)) {
        fichierTrouve = true;
        break;
      }
    }
    if (!fichierTrouve) {
      nbErreurs++;
      rapportManquants += `Catégorie: ${categorie} - Erreur: Fichier(s) obligatoire(s) manquant(s). Fichiers attendus: ${listeFichiers.join(', ')}.\n`;
    }
  }

  // S'il y a des erreurs, écrire le rapport
  if (nbErreurs > 0) {
    const dateActuelle = new Date().toLocaleString('fr-FR');
    const entete = `Nom du module: ${nomModule}\nDate: ${dateActuelle}\nNombre d'erreurs: ${nbErreurs}\n\n`;
    const contenuRapport = entete + rapportManquants;

    // Créer un nom sécurisé pour le répertoire de rapport
    const nomModuleSecurise = nomModule.replace(/[^a-zA-Z0-9_-]/g, '_');
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

    const cheminRapport = path.join(dossierRapport, 'rapport_fichiers_manquants.md');

    try {
      fs.writeFileSync(cheminRapport, contenuRapport);
      console.log(`Rapport des fichiers manquants sauvegardé dans: ${cheminRapport}`);
    } catch (error) {
      console.error(`Impossible d'écrire le rapport dans ${cheminRapport}:`, error);
    }
  } else {
    console.log(`Aucun fichier manquant détecté pour le module ${nomModule}.`);
  }
}

// Pour faciliter le test du module, si ce script est exécuté directement, on peut lancer une détection sur un dossier spécifique
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const cheminTest = process.argv[2] || path.join(process.cwd(), 'src', 'components', 'exemple');
  console.log(`Lancement de la détection des fichiers manquants pour: ${cheminTest}`);
  detecterFichiersManquants(cheminTest);
}
