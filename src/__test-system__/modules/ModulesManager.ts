import { ObserverModule } from '../core/Observer';
import { ComponentsModule } from './components';
import { StructureModule } from './structure';
import { StylesModule } from './styles';
import { StartupModule } from './demarrage';

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
    // Initialisation des modules principaux
    const startupModule = new StartupModule();
    const componentsModule = new ComponentsModule();
    const structureModule = new StructureModule();
    const stylesModule = new StylesModule();

    // Enregistrement des modules
    this.registerModule(startupModule.getModule());
    this.registerModule(componentsModule.getModule());
    this.registerModule(structureModule.getModule());
    this.registerModule(stylesModule.getModule());
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
