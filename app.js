// Toujours charger les vars d'environnement en premier
require('dotenv').config();
const express = require('express');
const router = require('./app/router');
const cors = require('cors');

// Création de notre application express
const app = express();

// Nos middlewares
app.use(express.json());

// J'autorise n'importe quel site à se connecter à mon API
// ce n'est pas safe ! Ce sera à changer dès que ma partie front sera en ligne
app.use(cors('*'));

// ROUTER
app.use(router);

// Lancement de l'appli et port d'écoute
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});