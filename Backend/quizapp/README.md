# QuizApp - Projet de Sélection Stage Essitech 2026

Application Full-Stack complète permettant de répondre à un quiz technique.

##  Fonctionnalités
- Page d'accueil avec bouton de démarrage.
- Chargement dynamique des questions depuis le Backend.
- Navigation entre les questions (Suivant / Précédent).
- Calcul du score final sécurisé côté serveur.

##  Stack Technique
- **Backend** : Java 17, Spring Boot 3, Spring Data JPA.
- **Frontend** : ReactJS (Vite), Hooks (useState, useEffect).
- **Base de données** : PostgreSQL (Script fourni) / H2 (pour le test immédiat).

##  Contenu du dépôt
- `/backend` : Code source Spring Boot.
- `/frontend` : Code source React.
- `database.sql` : Script de création des tables et insertion des données pour PostgreSQL.
- `README.md` : Instructions d'installation.

## ⚙ Installation et Lancement

1. **Backend** :
    - Ouvrir le dossier `backend` dans IntelliJ.
    - Lancer l'application via `QuizappApplication.java`.
    - *Note : Une base de données H2 est configurée par défaut pour faciliter le test immédiat.*

2. **Frontend** :
    - Entrer dans le dossier `frontend` : `cd frontend`.
    - Installer les dépendances : `npm install`.
    - Lancer le projet : `npm run dev`.

3. **Utilisation** :
    - Ouvrir [http://localhost:5173](http://localhost:5173) dans le navigateur.

---
**Développé par Keren Ouedraogo**