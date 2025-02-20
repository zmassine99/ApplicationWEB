// Chargement des variables d'environnement depuis un fichier .env que vous devez créer dans le dossier de votre projet et y placer le lien (appelé MONGO_URI ici) vers votre base de donnée
require('dotenv').config();

// Importation des modules nécessaires
const express = require('express');       // Framework pour créer le serveur
const mongoose = require('mongoose');    // Librairie pour interagir avec la base de donnée MongoDB
const path = require('path');            // Module pour manipuler les chemins des fichiers

// Création de l'application Express
const app = express();

// Middleware pour analyser les données des requêtes POST
app.use(express.urlencoded({ extended: true })); // Analyse les données des formulaires
app.use(express.json()); // Analyse les données JSON

// Middleware pour servir des fichiers statiques (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Configuration du moteur de rendu pour générer des pages HTML dynamiques
app.set('view engine', 'ejs'); // Utilisation de EJS comme moteur de rendu

// Connexion à la base de données MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Atlas connecté')) // Succès de la connexion
    .catch(err => console.log('Erreur de connexion MongoDB:', err)); // Gestion des erreurs

// Définition des routes
// Les routes liées aux tâches sont définies dans le fichier ./routes/taches
app.use('/taches', require('./routes/taches'));

// Définition de la route de la page d'accueil
app.get('/', (req, res) => {
    res.render('index'); // Rendu de la vue 'index.ejs'
});

// Démarrage du serveur sur un port spécifique
const PORT = process.env.PORT || 3000; // Le port est défini dans le fichier .env ou par défaut à 3000
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:\${PORT}`));