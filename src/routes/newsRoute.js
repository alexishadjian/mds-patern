const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');


router
    .route('/')
        // .post(postController.createPost)
        // .get(event.listAllEvents)

// router
//     .route('/:id_event')
//         .put(event.updateEvent)
//         .get(event.getEvent)
//         .delete(event.deleteEvent);


module.exports = router;