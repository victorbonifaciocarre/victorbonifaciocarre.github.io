# Améliorations réalisées

1. Optimisation du dévelopmment et de la qualité
   1. Utilisation de Vite pour un build efficace
   2. Dévelopement en Typescript pour garantir un typage fort des données
   3. Mise en place de librairies de tests avec une approche TDD (Vitest, React Testing Library, Cypress pour pouvoir automatiser les tests dans le futur)
   4. Documentation décrivant le besoin auquel répond chaque méthodes et composants
   5. Configuration de linter (ESLint et Oxlint (Beta), solutions optimisée) et de Prettier pour formater en une commande le code et les fichiers tests

2. Design des composants
   1. Mise en place en Atomic Design (atoms, molecules, organisms)
   2. Style pratique et intuitif pour améliorer l'UX et UI
      1. Disposition centrale
      2. Bouton pour échanger les devises sous forme de slider
      3. Notificilation colorée pour le taux de change
         1. Vert: la valeur par défaaut a été mise à jour
         2. Bleu: l'utilisateur a forcé la valeur
         3. Rouge: la variation dépasse 2% entre la valeur forcée et le taux actuel