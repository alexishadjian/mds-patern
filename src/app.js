const express = require('express');
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect('mongodb://mongo/design-patern');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const eventRoute = require('./routes/eventRoute');

app.use('/event', eventRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})


  
// // Exemple d'utilisation de la factory
// const postFactory = new PostFactory();

// const eventPost = postFactory.createPost('Event', 'Event title', 'Event content', '2024-01-20');
// eventPost.display(); // Output: Event Post (2024-01-20): Event content

// const newsPost = postFactory.createPost('News', 'News title', 'News content', 'wikipedia');
// newsPost.display(); // Output: News Post - Breaking News: News content