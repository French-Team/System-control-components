# Guide des Bonnes Pratiques React - Glossaire

Ce dossier contient toutes les sections détaillées de nos bonnes pratiques React. Les fichiers sont numérotés pour définir un ordre logique de lecture et d'apprentissage.

## Structure du Dossier

```
bonnes-pratiques/
├── 00-pre-requis.md              # Configuration et règles de base
├── 01-glossaire.md               # Ce fichier - Terminologie et concepts
├── 02-variables-centralisees.md  # Gestion des variables CSS
├── 03-systeme-couleurs.md        # Système de couleurs et thèmes
├── 04-typographie.md             # Système typographique
├── 05-tests-configuration.md     # Configuration des tests
├── 06-structure-fichiers.md      # Organisation des fichiers
├── 07-structure-exports.md       # Gestion des exports
├── 08-disposition.md             # Mise en page
├── 09-gestion-overlays.md        # Gestion des overlays
├── 10-images-et-icones.md        # Gestion des médias
└── 11-grilles-et-calculs.md      # Système de grille
```

## Ordre de Lecture Recommandé

1. **Fondamentaux** (00-01)

   - `00-pre-requis.md` - Configuration initiale
   - `01-glossaire.md` - Concepts de base

2. **Design System** (02-04)

   - `02-variables-centralisees.md` - Variables CSS
   - `03-systeme-couleurs.md` - Thèmes et couleurs
   - `04-typographie.md` - Système typographique

3. **Tests et Structure** (05-07)

   - `05-tests-configuration.md` - Configuration Vitest
   - `06-structure-fichiers.md` - Organisation du code
   - `07-structure-exports.md` - Gestion des exports

4. **Composants** (08-11)
   - `08-disposition.md` - Layout de base
   - `09-gestion-overlays.md` - Overlays et modales
   - `10-images-et-icones.md` - Gestion des médias
   - `11-grilles-et-calculs.md` - Système de grille

## Utilisation du Guide

1. **Pour les Nouveaux Développeurs**

   - Commencez par les fondamentaux (00-01)
   - Suivez l'ordre numérique pour une progression logique

2. **Pour les Développeurs Expérimentés**

   - Utilisez la numérotation comme référence
   - Accédez directement aux sections pertinentes

3. **Pour la Maintenance**
   - Chaque fichier est autonome mais fait référence aux concepts des sections précédentes
   - Les exemples de code respectent toutes les conventions établies

## Maintenance

Ce guide est maintenu comme référence des bonnes pratiques. Chaque fichier contient des exemples concrets et testés qui respectent toutes nos conventions. La numérotation aide à maintenir la cohérence des références entre les sections.

# Glossaire des Termes Techniques

## A

### Accessibilité (a11y)

Pratiques garantissant que les applications sont utilisables par tous, y compris les personnes en situation de handicap.

### ARIA (Accessible Rich Internet Applications)

Ensemble d'attributs HTML qui définissent des moyens de rendre le contenu web plus accessible.

## B

### BEM (Block Element Modifier)

Méthodologie de nommage CSS qui structure les classes en blocs, éléments et modificateurs.

### Breakpoint

Point de rupture dans le design responsive où la mise en page change pour s'adapter à la taille de l'écran.

## C

### CSS-in-JS

Approche où les styles CSS sont écrits directement en JavaScript, permettant une meilleure encapsulation.

### CSS Modules

Technique de modularisation CSS qui garantit la portée locale des styles.

## D

### data-testid

Attribut HTML utilisé pour identifier les éléments dans les tests automatisés.

### DRY (Don't Repeat Yourself)

Principe de développement visant à éviter la duplication de code.

## E

### ESLint

Outil d'analyse statique qui identifie et corrige les problèmes dans le code JavaScript/TypeScript.

### Export Nommé

Méthode d'export en JavaScript qui permet d'exporter plusieurs valeurs nommées d'un module.

## F

### Focus Management

Gestion de la navigation au clavier et de l'élément actuellement focusé dans l'interface.

### Flexbox

Module CSS de mise en page permettant de distribuer l'espace entre les éléments d'une interface.

## G

### Grid

Système de mise en page CSS en deux dimensions pour créer des grilles complexes.

### Git

Système de contrôle de version pour le suivi des modifications du code source.

## H

### Hook

Fonction spéciale React qui permet d'utiliser l'état et d'autres fonctionnalités React dans les composants fonctionnels.

### HTML Sémantique

Utilisation des éléments HTML selon leur signification plutôt que leur apparence.

## I

### Interface

En TypeScript, définition d'un contrat pour la structure d'un objet.

### Isolation

Principe de séparation des responsabilités et d'encapsulation du code.

## J

### JSX

Extension de syntaxe JavaScript qui permet d'écrire du HTML dans du JavaScript.

### Jest

Framework de test JavaScript largement utilisé avec React.

## L

### Lazy Loading

Technique de chargement différé des ressources pour améliorer les performances.

### Linter

Outil qui analyse le code source pour signaler les erreurs de programmation et de style.

## M

### Media Query

Règle CSS permettant d'appliquer des styles en fonction des caractéristiques de l'appareil.

### Mixin

Groupe de définitions CSS réutilisables.

## O

### Overlay

Élément UI qui se superpose au contenu principal, comme une modale ou un menu.

### Optimisation

Processus d'amélioration des performances et de l'efficacité du code.

## P

### Props

Propriétés passées aux composants React pour configurer leur comportement.

### Portal

Fonctionnalité React permettant de rendre des éléments en dehors de leur conteneur parent.

## R

### React

Bibliothèque JavaScript pour construire des interfaces utilisateur.

### Responsive Design

Approche de conception qui rend les sites web adaptables à différentes tailles d'écran.

## S

### State Management

Gestion de l'état de l'application et des données.

### Styled Components

Bibliothèque CSS-in-JS populaire pour React.

## T

### TDD (Test-Driven Development)

Méthode de développement où les tests sont écrits avant le code.

### TypeScript

Sur-ensemble typé de JavaScript qui compile vers JavaScript pur.

## U

### UI (User Interface)

Interface utilisateur, partie visible de l'application.

### UX (User Experience)

Expérience utilisateur, façon dont les utilisateurs interagissent avec l'application.

## V

### Variable CSS

Variable définissable en CSS pour stocker des valeurs réutilisables.

### Virtual DOM

Représentation en mémoire du DOM utilisée par React pour optimiser les mises à jour.

## W

### WCAG

Web Content Accessibility Guidelines, directives pour rendre le contenu web accessible.

### Webpack

Bundler de modules JavaScript largement utilisé.

## Z

### z-index

Propriété CSS qui contrôle l'ordre d'empilement des éléments.
