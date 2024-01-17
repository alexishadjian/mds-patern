// routes/eventRoute.js

// Importe le module express pour créer un routeur
const express = require('express');
const router = express.Router();

// Importe le contrôleur des événements
const eventController = require('../controllers/eventController');

// Définit les routes pour les opérations CRUD sur les événements


router
    .route('/')
        .post(eventController.createAPost)    
        .get(eventController.listAllPosts);    

router
    .route('/:id_post')
        .put(eventController.updateAPost)    
        .get(eventController.getAPost)       
        .delete(eventController.deleteAPost); 

// Exporte le routeur pour pouvoir l'utiliser dans d'autres fichiers
module.exports = router;
