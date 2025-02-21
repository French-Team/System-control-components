# Liste des Correctifs à Apporter

## Problèmes de Structure CSS

1. **Centralisation des Variables**

   - Les variables CSS doivent être définies uniquement dans le fichier thème
   - Impact : Duplication de `:root` dans plusieurs fichiers
   - Solution : Déplacer toutes les variables dans `LayoutBlocks_theme.css`
   - Fichiers concernés :
     - `LayoutBlocks_theme.css`
     - `LayoutBlocks.styles.css`

2. **Séparation des Responsabilités**
   - Le fichier thème doit contenir :
     - Toutes les variables globales
     - Les calculs de dimensions
     - Les calculs de typographie
     - Les thèmes (light/dark)
   - Le fichier styles ne doit contenir que :
     - Les styles des composants
     - Les media queries
     - Les classes utilitaires

## Problèmes de Typographie

1. **Utilisation des Balises HTML**

   - Ne pas utiliser les balises HTML standards pour la typographie (h1, h2, etc.)
   - Impact : Styles par défaut non désirés et difficiles à surcharger
   - Solution : Utiliser des balises neutres (span, div) avec des classes dédiées
   - Exemple : Remplacer `<h1>` par `<span className="header-title">`

2. **Calculs de Taille de Police**
   - Les calculs de taille doivent être centralisés dans le thème
   - Impact : Incohérence dans les tailles de texte
   - Solution : Utiliser des variables calculées dans le thème
   - Exemple : `--text-scale: calc(100% * (var(--header-block-width) / 100vw))`

## Problèmes d'Accessibilité

1. **Rôles ARIA Redondants**

   - Les éléments `<section>` ont un rôle "region" explicite alors qu'il est implicite
   - Impact : Bruit inutile pour les lecteurs d'écran
   - Solution : Supprimer les rôles redondants

2. **Double Rôle Main**
   - Le conteneur principal et l'élément `<main>` ont tous les deux `role="main"`
   - Impact : Conflit d'accessibilité
   - Solution : Garder un seul rôle main

## Problèmes de Nommage

1. **Convention de Nommage des Classes**

   - Les classes doivent suivre une convention cohérente
   - Impact : Difficulté de maintenance
   - Solution : Adopter une convention BEM ou similaire
   - Exemple : `.header-block__title` au lieu de `.header-title`

2. **Incohérence des data-testid**
   - Les data-testid doivent suivre une convention établie
   - Impact : Tests instables
   - Solution : Standardiser les data-testid

## Problèmes de Responsive Design

1. **Media Queries**

   - Les media queries modifient les variables dans `:root`
   - Impact : Variables redéfinies à plusieurs endroits
   - Solution : Centraliser les modifications de variables dans le thème

2. **Adaptation du Texte**
   - Le texte doit s'adapter intelligemment à son conteneur
   - Impact : Texte tronqué ou mal dimensionné
   - Solution :
     - Utiliser des calculs relatifs
     - Éviter les tailles fixes
     - Permettre le retour à la ligne naturel

## Problèmes de Documentation

1. **Documentation des Variables**

   - Les variables du thème doivent être documentées
   - Impact : Difficulté de maintenance
   - Solution : Ajouter des commentaires explicatifs pour chaque groupe de variables

2. **Guide d'Utilisation**
   - Pas de documentation sur l'utilisation du composant
   - Impact : Difficulté pour les autres développeurs
   - Solution : Créer un README.md avec des exemples d'utilisation

## Problèmes de Structure

1. **Mauvaise Organisation des Variables de Thème**

   - Les variables de thème sont directement dans `LayoutBlocks.styles.css` au lieu d'être dans un fichier dédié `LayoutBlocks_theme.css`
   - Impact : Non-respect des bonnes pratiques de séparation des responsabilités
   - Solution : Déplacer toutes les variables de thème dans `LayoutBlocks_theme.css`
   - Fichiers concernés :
     - `LayoutBlocks.styles.css` (variables de thème à extraire)
     - `LayoutBlocks_theme.css` (à remplir avec les variables)

2. **Fichier de Thème Vide**
   - Le fichier `LayoutBlocks_theme.css` existe mais est vide
   - Impact : Structure correcte mais contenu manquant
   - Solution : Déplacer les variables de thème depuis `LayoutBlocks.styles.css`
   - Fichiers concernés : `LayoutBlocks_theme.css`

## Problèmes de Style

1. **Import CSS Redondant**
   - Le thème est importé deux fois (dans le fichier principal et via @import)
   - Impact : Potentiels conflits de style
   - Fichiers concernés : `LayoutBlocks.styles.css`

## Problèmes de Props

1. **Gestion du Thème**
   - Le thème est géré en interne alors qu'il devrait être contrôlé par le parent
   - Impact : Moins de contrôle sur l'état du thème depuis l'extérieur
   - Fichiers concernés : `LayoutBlocks.tsx`

## Problèmes de Tests

1. **Tests à Mettre à Jour**
   - Les tests doivent être mis à jour pour refléter les nouveaux data-testid
   - Impact : Tests potentiellement instables
   - Fichiers concernés : `LayoutBlocks.test.tsx`

## Problèmes de Typographie Responsive

1. **Texte Tronqué dans les Header Blocks**
   - Le texte est coupé avec des "..." au lieu de s'adapter intelligemment
   - Impact : Perte d'information et mauvaise expérience utilisateur
   - Problèmes spécifiques :
     - Utilisation de `white-space: nowrap` qui force le texte sur une ligne
     - `text-overflow: ellipsis` qui tronque brutalement
     - Manque d'adaptation progressive du texte selon l'espace disponible
   - Solution proposée :
     - Utiliser `display: -webkit-box` avec `-webkit-line-clamp`
     - Adapter la taille du texte avec `clamp()` selon la largeur du conteneur
     - Permettre le retour à la ligne intelligent avec `word-break: break-word`
   - Fichiers concernés :
     - `LayoutBlocks.styles.css` (section `.header-block h1`)
     - Impact sur les media queries existantes
