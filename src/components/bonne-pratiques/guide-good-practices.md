# Guide des Bonnes Pratiques pour les Composants React

> ⚠️ **ATTENTION : LISEZ D'ABORD LES PRÉ-REQUIS**
>
> Avant toute chose, consultez [`00-pre-requis.md`](./bonnes-pratiques/00-pre-requis.md).
> Ce document contient :
>
> - Les avertissements sur la complexité du projet
> - La configuration de l'environnement de test (Vitest)
> - La liste complète des documents de référence
> - Les règles strictes à suivre

> ⚠️ **RAPPEL : Test-Driven Development (TDD) avec Vitest**
>
> Tout développement DOIT suivre la méthode TDD avec Vitest (PAS Jest) :
>
> 1. ❌ RED - Écrire le test d'abord (et le voir échouer)
> 2. ✅ GREEN - Écrire le minimum de code pour faire passer le test
> 3. 🔄 REFACTOR - Améliorer le code en gardant les tests verts
>
> Cette règle est non négociable et s'applique à TOUTES les modifications de code.

## Workflow de Développement TDD

0. **Fondamentaux** _(OBLIGATOIRE)_

   - [`00-pre-requis.md`](./bonnes-pratiques/00-pre-requis.md) - ⚠️ Configuration et règles
   - [`01-glossaire.md`](./bonnes-pratiques/01-glossaire.md) - Terminologie et concepts

1. **Design System** _(Base du développement)_

   - [`02-variables-centralisees.md`](./bonnes-pratiques/02-variables-centralisees.md) - **OBLIGATOIRE**
   - [`03-systeme-couleurs.md`](./bonnes-pratiques/03-systeme-couleurs.md)
   - [`04-typographie.md`](./bonnes-pratiques/04-typographie.md)

2. **Tests et Structure** _(Une fois le design system défini)_

   - [`05-tests-configuration.md`](./bonnes-pratiques/05-tests-configuration.md) - **OBLIGATOIRE**
   - [`06-structure-fichiers.md`](./bonnes-pratiques/06-structure-fichiers.md)
   - [`07-structure-exports.md`](./bonnes-pratiques/07-structure-exports.md)

3. **Composants** _(Après validation des tests)_
   - [`08-disposition.md`](./bonnes-pratiques/08-disposition.md)
   - [`09-gestion-overlays.md`](./bonnes-pratiques/09-gestion-overlays.md)
   - [`10-images-et-icones.md`](./bonnes-pratiques/10-images-et-icones.md)
   - [`11-grilles-et-calculs.md`](./bonnes-pratiques/11-grilles-et-calculs.md)

## Cycle de Développement

1. **TOUJOURS Commencer par les Fondamentaux**

   - Lire et comprendre les pré-requis
   - Configurer l'environnement de test (Vitest)
   - Consulter le glossaire
   - Établir les variables selon `02-variables-centralisees.md`

2. **Configurer le Design System**

   - Configurer les thèmes selon `03-systeme-couleurs.md`
   - Définir la typographie selon `04-typographie.md`

3. **Mettre en Place les Tests**

   - Configurer Vitest selon `05-tests-configuration.md`
   - Écrire les tests en utilisant les variables définies
   - Vérifier que les tests échouent (RED)

4. **Implémenter et Valider**
   - Créer la structure selon `06-structure-fichiers.md`
   - Écrire le code minimal pour faire passer les tests
   - Appliquer les standards des composants (08 à 11)

## Points de Contrôle Obligatoires

✅ Configuration de Vitest validée
✅ Les pré-requis ont été lus et acceptés
✅ Le glossaire a été consulté et compris
✅ Les variables CSS sont définies et documentées
✅ Les tests sont écrits avec Vitest
✅ Structure de fichiers conforme
✅ Tests verts après chaque modification

Pour commencer, consultez **OBLIGATOIREMENT** dans cet ordre :

1. [`00-pre-requis.md`](./bonnes-pratiques/00-pre-requis.md) - Configuration et règles
2. [`01-glossaire.md`](./bonnes-pratiques/01-glossaire.md) - Concepts
3. [`02-variables-centralisees.md`](./bonnes-pratiques/02-variables-centralisees.md) - Design system
