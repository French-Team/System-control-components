import { ObserverModule, ObservationRule, ObservationResult } from '../../core/Observer';
import * as path from 'path';
import * as fs from 'fs';
import {
  analyzeComponent,
  watchComponents as watchComponentsSurveillance,
} from '../../surveillance-system';

interface ComponentInfo {
  name: string;
  path: string;
  files: string[];
  type: 'stress-test' | 'component';
}

export class StartupModule {
  private rules: ObservationRule[] = [];
  private componentsInfo: ComponentInfo[] = [];

  constructor() {
    this.initializeRules();
    this.scanComponents();
    this.startMonitoring();
  }

  private scanComponents(): void {
    const componentsPath = path.join(process.cwd(), 'src', 'components');

    if (!fs.existsSync(componentsPath)) {
      console.log('❌ Dossier components non trouvé');
      return;
    }

    // Lecture du dossier components
    const entries = fs.readdirSync(componentsPath, { withFileTypes: true });

    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        const componentPath = path.join(componentsPath, entry.name);
        const files = fs.readdirSync(componentPath);

        this.componentsInfo.push({
          name: entry.name,
          path: componentPath,
          files: files,
          type: entry.name === '@stress-test' ? 'stress-test' : 'component',
        });
      }
    });

    // Affichage des informations au démarrage
    console.log('\n📂 Scan des composants :');
    this.componentsInfo.forEach((info) => {
      console.log(`\n${info.type === 'stress-test' ? '🧪' : '📦'} ${info.name}`);
      console.log('   Files:');
      info.files.forEach((file) => {
        console.log(`   - ${file}`);
      });
    });
    console.log('\n');

    // Analyse immédiate de chaque composant scanné
    this.componentsInfo.forEach((info) => {
      analyzeComponent(info.path).catch((err: unknown) => {
        if (err instanceof Error) {
          console.error(`Erreur lors de l'analyse du composant ${info.name}:`, err.message);
        } else {
          console.error(`Erreur lors de l'analyse du composant ${info.name}:`, err);
        }
      });
    });
  }

  private initializeRules(): void {
    this.rules = [
      {
        id: 'components-scan',
        name: 'Scanner de Composants',
        description: 'Vérifie la présence et la structure des composants au démarrage',
        check: (): ObservationResult => {
          const hasComponents = this.componentsInfo.length > 0;
          const hasStressTest = this.componentsInfo.some((info) => info.type === 'stress-test');

          const messages: string[] = [];
          if (hasComponents) {
            messages.push(`${this.componentsInfo.length} composant(s) trouvé(s)`);
            this.componentsInfo.forEach((info) => {
              messages.push(`- ${info.name} (${info.files.length} fichiers)`);
            });
          }

          return {
            passed: hasComponents && hasStressTest,
            messages: hasComponents
              ? messages
              : ['Aucun composant trouvé dans le dossier components'],
            severity: hasComponents && hasStressTest ? 'info' : 'warning',
          };
        },
      },
    ];
  }

  public getModule(): ObserverModule {
    return {
      id: 'startup',
      name: 'Module de Démarrage',
      rules: this.rules,
      isEnabled: true,
    };
  }

  public getComponentsInfo(): ComponentInfo[] {
    return this.componentsInfo;
  }

  private startMonitoring(): void {
    // Lancer la surveillance continue via surveillance-system (watchComponents)
    watchComponentsSurveillance();
    console.log('🔄 Surveillance continue des composants activée');
  }
}
