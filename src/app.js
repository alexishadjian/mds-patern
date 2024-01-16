const express = require('express');
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect('mongodb://mongo/design-patern');

app.use(express.urlencoded());
app.use(express.json());

const postRoute = require('./routes/postRoute');

app.use('/post', postRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})