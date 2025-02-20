import { ObserverModule } from '../core/Observer';

export class ModulesManager {
  private static instance: ModulesManager;
  private modules: Map<string, ObserverModule> = new Map();

  private constructor() {
    this.initializeModules();
  }

  public static getInstance(): ModulesManager {
    if (!ModulesManager.instance) {
      ModulesManager.instance = new ModulesManager();
    }
    return ModulesManager.instance;
  }

  private initializeModules(): void {
    // Création du module d'analyse unifié
    const analyzerModule: ObserverModule = {
      id: 'analyzer',
      name: "Module d'Analyse Unifié",
      rules: [],
      isEnabled: true,
    };

    // Enregistrement du module
    this.registerModule(analyzerModule);
  }

  public registerModule(module: ObserverModule): void {
    this.modules.set(module.id, module);
    console.log(`📦 Module enregistré: ${module.name}`);
  }

  public getModule(moduleId: string): ObserverModule | undefined {
    return this.modules.get(moduleId);
  }

  public getAllModules(): ObserverModule[] {
    return Array.from(this.modules.values());
  }
}

export const modulesManager = ModulesManager.getInstance();
