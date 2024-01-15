const express = require('express');
const router = express.Router();

const convertController = require('../controllers/convertController');


router
    .route('/')
        .post(convertController.convertDevise)


module.exports = router;