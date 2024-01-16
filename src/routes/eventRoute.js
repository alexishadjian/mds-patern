const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

router
    .route('/')
        .post(eventController.createAPost)
        .get(eventController.listAllPosts)
        // .get(event.listAllEvents)
    

router
    .route('/:id_post')
    .put(eventController.updateAPost)
    .get(eventController.getAPost)
    .delete(eventController.deleteAPost);




module.exports = router;