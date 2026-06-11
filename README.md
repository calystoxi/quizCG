# Quiz de culture générale

Auteur : Antoine Aubry

## 1. Description du projet

Une application web de quiz de culture générale développée avec React. L'utilisateur choisit une catégorie et un niveau de difficulté, puis répond à 10 questions à choix multiple générées via l'API [Open Trivia DB](https://opentdb.com/), avec un temps limité par question. À la fin, un score et un récapitulatif détaillé des réponses sont affichés. Le but est de proposer une expérience de quiz simple, rejouable et personnalisable (thème, langue, manette).

## 2. Démarrage rapide

### Prérequis

- Node.js et npm doivent être installés sur votre machine

### Installation

1. Cloner le projet :

   ```bash
   https://github.com/calystoxi/quizCG
   ```

2. Installer les dépendances :

   ```bash
   npm install
   ```

3. Lancer l'application :

   ```bash
   npm start
   ```

   L'application sera accessible à l'adresse : [http://localhost:3000](http://localhost:3000)

## 3. Objectifs

- Permettre à un·e utilisateur·rice de configurer son quiz (catégorie et difficulté) avant de commencer.
- Permettre à un·e utilisateur·rice de répondre à une série de questions à choix multiple dans un temps limité.
- Permettre à un·e utilisateur·rice de consulter son score et un récapitulatif détaillé de ses réponses en fin de partie.
- Permettre à un·e utilisateur·rice de rejouer rapidement, avec les mêmes paramètres ou en changeant de thème/difficulté.
- Permettre à un·e utilisateur·rice de personnaliser l'affichage (mode sombre/clair) et la langue de l'interface (FR/EN).
- Permettre à un·e utilisateur·rice de naviguer dans le quiz à l'aide d'une manette.

## 4. Fonctionnalités

### 4.1 Principales

- Page d'accueil présentant l'application et permettant de lancer le quiz.
- Page de configuration permettant de choisir la catégorie et la difficulté des questions (via l'API Open Trivia DB).
- Quiz de 10 questions à choix multiple avec mélange aléatoire des réponses.
- Timer par question (20 secondes), avec gestion du cas "temps écoulé".
- Barre de progression indiquant l'avancement dans le quiz.
- Calcul et affichage du score final avec message personnalisé selon le résultat.
- Récapitulatif détaillé en fin de quiz : pour chaque question, réponse donnée, bonne réponse et indication correcte/incorrecte.
- Boutons de fin de partie pour rejouer ou changer de thème/difficulté.
- Mode sombre / clair, basculable et persisté entre les sessions.
- Sélection de la langue de l'interface (français/anglais), persistée entre les sessions.
- Navigation dans le quiz à la manette (sélection des réponses, validation, passage à la question suivante).

### 4.2 Optionnelles

- Authentification et profils utilisateurs (Firebase Auth).
- Classement (leaderboard) des meilleurs scores via Firestore.
- Mode multijoueur (local ou en ligne).
- Ajout de sons et d'animations pour enrichir l'expérience.

## 5. Technologies

- **Frontend** : React 19 avec React Router DOM pour la navigation entre les pages (accueil, configuration, quiz).
- **Requêtes HTTP** : Axios pour interroger l'API Open Trivia DB (questions et catégories).
- **Source de données** : [Open Trivia DB](https://opentdb.com/) pour les questions, réponses, catégories et niveaux de difficulté.
- **Base de données / Authentification** *(envisagé)* : Firebase (Firestore + Auth) pour la sauvegarde des scores et la gestion des comptes utilisateurs.
- **Style** : CSS avec variables CSS pour la gestion des thèmes (clair/sombre).
- **Internationalisation** : dictionnaire de traductions maison (FR/EN) via un contexte React.

## 6. Architecture

L'application est une SPA (Single Page Application) React entièrement côté client :

- **App.js** : définit les routes (`/`, `/setup`, `/quiz`) et englobe l'application dans les contextes globaux (thème, langue).
- **pages/Home** : page d'accueil avec présentation et lien vers la configuration.
- **pages/Setup** : page de configuration permettant de choisir catégorie et difficulté, transmises au quiz via les paramètres d'URL.
- **components/quiz** : composant principal du quiz — récupération des questions via Axios, gestion du score, du timer, de l'historique des réponses et de l'affichage des résultats.
- **components/QuestionCard** : affichage d'une question et de ses réponses.
- **components/useGamepad** : hook personnalisé pour la navigation à la manette.
- **context/ThemeContext** et **context/LanguageContext** : gestion globale du thème et de la langue, persistés dans le `localStorage`.
- **API externe** : Open Trivia DB (`opentdb.com`) fournit les questions, réponses et catégories.

```
Utilisateur ⇄ React (SPA) ⇄ Open Trivia DB (API REST)
                  │
                  └── localStorage (thème, langue)
```
