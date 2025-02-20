# Configuration de l'Environnement de Développement

## TRÈS IMPORTANT - Configuration Initiale

### 1. Lancement du Développement
Pour démarrer le développement avec la vérification en arrière-plan :
```bash
npm run start --prefix app
```
Cette commande lance simultanément :
- Le serveur de développement Vite (affiché en bleu)
- La vérification du code en temps réel (affichée en jaune)

### 2. Dépendances Essentielles
Installation des dépendances principales dans `package.json` :
```json
{
  "devDependencies": {
    "eslint": "^8.56.0",
    "prettier": "^3.2.5",
    "typescript": "^5.2.2",
    "concurrently": "^8.2.2"
  }
}
```

## IMPORTANT - Configuration ESLint

### 1. Configuration ESLint (`.eslintrc.js`)
```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ]
}
```

### 2. Scripts Disponibles
Dans `package.json` :
```json
{
  "scripts": {
    "start": "concurrently \"npm run dev\" \"npm run lint:watch\" --names \"DEV,LINT\" --prefix-colors \"blue,yellow\"",
    "lint": "eslint \"./src/**/*.{ts,tsx}\"",
    "lint:fix": "eslint \"./src/**/*.{ts,tsx}\" --fix",
    "lint:watch": "chokidar \"./src/**/*.{ts,tsx}\" -c \"eslint {path}\""
  }
}
```

## UTILE - Commandes Individuelles

### Vérification Ponctuelle
- `npm run lint --prefix app` : Vérifie le code
- `npm run lint:fix --prefix app` : Corrige automatiquement les erreurs
- `npm run format --prefix app` : Formate le code avec Prettier

### Développement Séparé
- `npm run dev --prefix app` : Lance uniquement le serveur de développement
- `npm run lint:watch --prefix app` : Lance uniquement la vérification en temps réel

## OPTIONNEL - Personnalisation

### Configuration VSCode
Dans `.vscode/settings.json` :
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### Plugins ESLint Supplémentaires
Plugins optionnels pour des règles supplémentaires :
- eslint-plugin-jsx-a11y : Accessibilité
- eslint-plugin-react-hooks : Règles pour les Hooks React
- eslint-plugin-prettier : Intégration avec Prettier

## ANNEXE - Dépannage

### Problèmes Courants
1. **Erreur de chemin** : Toujours utiliser `--prefix app` depuis la racine
2. **Conflit de versions** : Utiliser `--legacy-peer-deps` si nécessaire
3. **Erreurs TypeScript** : Vérifier la compatibilité des versions

### Maintenance
- Mettre à jour régulièrement les dépendances
- Vérifier les nouvelles règles ESLint disponibles
- Adapter la configuration selon les besoins du projet