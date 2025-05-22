# TP MERN - LeBonCoin

Ce projet est une application web fullstack MERN (MongoDB, Express.js, React, Node.js) permettant aux utilisateurs de créer, consulter, modifier et supprimer des petites annonces.

---

## 💡 Fonctionnalités principales

* Authentification utilisateur (inscription / connexion) avec JWT et bcrypt
* CRUD sur les annonces
* Catégories d'annonces
* Filtrage par catégorie
* Détails d’une annonce (page dédiée)
* Interface simple en React
* Navbar personnalisée avec affichage conditionnel (utilisateur connecté)

---

## 🚄 Stack technique

### Frontend

* React
* React Router
* Axios
* jwt-decode (pour afficher le prénom / nom dans la navbar)

### Backend

* Express.js
* MongoDB avec Mongoose
* JWT
* Bcrypt
* Middleware d'authentification personnalisé

---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/<ton_user>/tp-mernlbccloe.git
cd tp-mernlbccloe
```

### 2. Lancer le backend

```bash
cd app
npm install
cp .env.example .env # ou créer un fichier .env avec JWT_SECRET
npm start
```

### 3. Lancer le frontend

```bash
cd ../front
npm install
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000) et l'API sur [http://localhost:8080](http://localhost:8080)

---

## 🎓 Fonctionnement

### Authentification

* Lors de la connexion, un token JWT est stocké dans le `localStorage`.
* Ce token est envoyé dans les headers pour les actions protégées.

### Annonces

* L'auteur d'une annonce est automatiquement ajouté via `req.user` extrait du token JWT.
* L'utilisateur peut supprimer ou modifier **toute** annonce (pas de restriction par auteur).

---

## 📙 Routes principales

### Backend (Express)

```
POST    /users/register      -> inscription
POST    /users/login         -> connexion

GET     /annonces/getAllAnnonces     -> toutes les annonces
POST    /annonces/create             -> créer une annonce
DELETE  /annonces/delete/:id         -> supprimer une annonce
PUT     /annonces/update/:id         -> modifier une annonce
GET     /annonces/:id                -> détails d’une annonce
```

---

## 📄 .gitignore

Les dossiers `node_modules` du back et du front sont exclus. 

---

Projet réalisé par Cloé PETETIN 
