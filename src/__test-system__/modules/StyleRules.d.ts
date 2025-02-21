export interface StyleRule {
  name: string;
  description: string;
  validate: (content: string) => { valid: boolean; issues: string[] };
}

export declare const styleRules: StyleRule[];

export declare function validateStyles(componentDir: string): { valid: boolean; issues: string[] };
