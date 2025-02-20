import { observer } from '../core/Observer';
import { modulesManager } from '../modules/ModulesManager';
import * as chokidar from 'chokidar';
import * as path from 'path';
import { analyzeComponent } from '../modules/FileAnalyzer';
import { reportManager } from '../modules/ReportManager';

class WatchSystem {
  private static instance: WatchSystem;
  private isWatching: boolean = false;
  private watcher: chokidar.FSWatcher | null = null;
  private analysisQueue: Set<string> = new Set();
  private processingTimeout: NodeJS.Timeout | null = null;
  private readonly DEBOUNCE_DELAY = 300; // Réduit à 300ms pour plus de réactivité

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

    try {
      // Initialisation des modules
      const modules = modulesManager.getAllModules();
      modules.forEach((module) => {
        observer.registerModule(module);
        console.log(`📦 Module chargé : ${module.name}`);
      });

      // Configuration et démarrage de la surveillance
      const componentsPath = path.join(process.cwd(), 'src', 'components');
      await this.initializeWatcher(componentsPath);

      this.isWatching = true;
      console.log('\n✅ Système de surveillance actif\n');
    } catch (error) {
      console.error('❌ Erreur lors du démarrage du système :', error);
      throw error;
    }
  }

  private async initializeWatcher(directory: string): Promise<void> {
    // Configuration de chokidar
    this.watcher = chokidar.watch(directory, {
      ignored: /(^|[/\\])\../, // Ignore les fichiers cachés
      persistent: true,
      ignoreInitial: false,
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 100,
      },
      depth: 99,
    });

    // Gestion des événements
    this.watcher
      .on('add', (filePath) => this.handleFileEvent('add', filePath))
      .on('change', (filePath) => this.handleFileEvent('change', filePath))
      .on('unlink', (filePath) => this.handleFileEvent('unlink', filePath))
      .on('error', (error) => console.error('Erreur de surveillance :', error));
  }

  private handleFileEvent(event: string, filePath: string): void {
    const componentPath = path.dirname(filePath);
    const fileName = path.basename(filePath);

    // Ignore les fichiers qui ne sont pas pertinents
    if (fileName.startsWith('.') || fileName.endsWith('.map')) {
      return;
    }

    console.log(
      `\n🔄 ${event === 'add' ? 'Nouveau fichier' : event === 'change' ? 'Fichier modifié' : 'Fichier supprimé'} : ${fileName}`
    );

    // Ajoute le composant à la file d'attente
    this.analysisQueue.add(componentPath);
    this.scheduleAnalysis();
  }

  private scheduleAnalysis(): void {
    if (this.processingTimeout) {
      clearTimeout(this.processingTimeout);
    }

    this.processingTimeout = setTimeout(async () => {
      await this.processAnalysisQueue();
    }, this.DEBOUNCE_DELAY);
  }

  private async processAnalysisQueue(): Promise<void> {
    if (this.analysisQueue.size === 0) return;

    console.log(`\n📊 Traitement de ${this.analysisQueue.size} composant(s) en attente...`);

    for (const componentPath of this.analysisQueue) {
      try {
        console.log(`\n🔍 Analyse de : ${path.basename(componentPath)}`);
        await analyzeComponent(componentPath);
      } catch (error) {
        console.error(`❌ Erreur lors de l'analyse de ${path.basename(componentPath)} :`, error);
      }
    }

    // Vide la file d'attente
    this.analysisQueue.clear();
  }

  public stop(): void {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
    this.isWatching = false;
    reportManager.clearCache();
    console.log('\n🛑 Système de surveillance arrêté');
  }
}

// Gestion des signaux pour un arrêt propre
process.on('SIGINT', () => {
  const watchSystem = WatchSystem.getInstance();
  watchSystem.stop();
  process.exit(0);
});

// Démarrage du système
const watchSystem = WatchSystem.getInstance();
watchSystem.start().catch((error) => {
  console.error('❌ Erreur lors du démarrage du système :', error);
  process.exit(1);
});
