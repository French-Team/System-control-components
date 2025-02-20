import { ReactElement } from 'react';

// Types de base
export interface ObservationResult {
  passed: boolean;
  messages: string[];
  severity: 'error' | 'warning' | 'info';
  location?: { file: string; line: number };
}

export interface ObservationRule {
  id: string;
  name: string;
  description: string;
  check: (element: ReactElement) => ObservationResult;
}

export interface ObserverModule {
  id: string;
  name: string;
  rules: ObservationRule[];
  isEnabled: boolean;
}

interface ComponentFile {
  content: string;
  name: string;
  path: string;
}

interface ReferenceComponent {
  files: ComponentFile[];
  name: string;
  path: string;
}

// Interface principale du CORE
export class Observer {
  private static instance: Observer;
  private modules: Map<string, ObserverModule> = new Map();
  private referenceComponents: {
    stable?: ReferenceComponent;
    unstable?: ReferenceComponent;
  } = {};

  private constructor() {}

  public static getInstance(): Observer {
    if (!Observer.instance) {
      Observer.instance = new Observer();
    }
    return Observer.instance;
  }

  public registerModule(module: ObserverModule): void {
    this.modules.set(module.id, module);
    console.log(`📦 Module enregistré: ${module.name}`);
  }

  public setReferenceComponents(references: {
    stable: ReferenceComponent;
    unstable: ReferenceComponent;
  }): void {
    this.referenceComponents = references;
    console.log('🎯 Références des composants mises à jour');
  }

  public observe(element: ReactElement): {
    errors: ObservationResult[];
    warnings: ObservationResult[];
    info: ObservationResult[];
  } {
    const results = {
      errors: [] as ObservationResult[],
      warnings: [] as ObservationResult[],
      info: [] as ObservationResult[],
    };

    this.modules.forEach((module) => {
      if (module.isEnabled) {
        module.rules.forEach((rule) => {
          const result = rule.check(element);
          switch (result.severity) {
            case 'error':
              results.errors.push(result);
              break;
            case 'warning':
              results.warnings.push(result);
              break;
            case 'info':
              results.info.push(result);
              break;
          }
        });
      }
    });

    return results;
  }

  public getReferenceComponents(): {
    stable?: ReferenceComponent;
    unstable?: ReferenceComponent;
  } {
    return this.referenceComponents;
  }
}

export const observer = Observer.getInstance();
