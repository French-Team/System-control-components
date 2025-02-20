import { observer } from '../core/Observer';
import { modulesManager } from '../modules/ModulesManager';
import { watch } from 'fs';
import * as path from 'path';

class WatchSystem {
  private static instance: WatchSystem;
  private isWatching: boolean = false;

  private constructor() {}

  public static getInstance(): WatchSystem {
    if (!WatchSystem.instance) {
      WatchSystem.instance = new WatchSystem();
    }
    return WatchSystem.instance;
  }

  public async start(): Promise<void> {
    if (this.isWatching) {
      console.log('🔍 Le système de surveillance est déjà actif');
      return;
    }

    console.log('🚀 Démarrage du système de surveillance...\n');

    // Initialisation des modules
    const modules = modulesManager.getAllModules();
    modules.forEach((module) => {
      observer.registerModule(module);
      console.log(`📦 Module chargé : ${module.name}`);
    });

    // Démarrage de la surveillance
    const componentsPath = path.join(process.cwd(), 'src', 'components');
    this.watchDirectory(componentsPath);

    this.isWatching = true;
    console.log('\n✅ Système de surveillance actif\n');
  }

  private watchDirectory(directory: string): void {
    watch(directory, { recursive: true }, (_eventType, filename) => {
      if (filename) {
        console.log(`\n🔄 Changement détecté : ${filename}`);
        this.analyzeComponent(path.join(directory, filename));
      }
    });
  }

  private async analyzeComponent(filePath: string): Promise<void> {
    const componentName = path.basename(path.dirname(filePath));
    console.log(`📊 Analyse du composant : ${componentName}\n`);

    // Création d'un élément mock pour l'analyse
    const mockElement = {
      type: 'div',
      key: filePath,
      props: {
        'data-component-name': componentName,
        'data-file-path': filePath,
      },
    };

    // Observation du composant
    const results = observer.observe(mockElement);

    // Affichage des résultats
    console.log("📝 Résultats de l'analyse :");
    if (results.errors.length > 0) {
      console.log('\n❌ Erreurs :');
      results.errors.forEach((error) => console.log(`  - ${error.messages[0]}`));
    }

    if (results.warnings.length > 0) {
      console.log('\n⚠️ Avertissements :');
      results.warnings.forEach((warning) => console.log(`  - ${warning.messages[0]}`));
    }

    if (results.info.length > 0) {
      console.log('\nℹ️ Informations :');
      results.info.forEach((info) => console.log(`  - ${info.messages[0]}`));
    }

    console.log('\n-----------------------------------\n');
  }
}

// Démarrage du système
const watchSystem = WatchSystem.getInstance();
watchSystem.start().catch((error) => {
  console.error('❌ Erreur lors du démarrage du système :', error);
});
