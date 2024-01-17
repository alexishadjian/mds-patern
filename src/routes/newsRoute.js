// routes/newsRoute.js

// Importe le module express pour créer un routeur
const express = require('express');
const router = express.Router();

// Importe le contrôleur des posts
const postController = require('../controllers/postController');

// Définit les routes pour les opérations CRUD sur les posts


router
    .route('/')
        // .post(postController.createPost)  
        // .get(event.listAllEvents)        

// /news/:id_event
// router
//     .route('/:id_event')
//         .put(event.updateEvent)       
//         .get(event.getEvent)          
//         .delete(event.deleteEvent);   

// Exporte le routeur pour pouvoir l'utiliser dans d'autres fichiers
module.exports = router;
