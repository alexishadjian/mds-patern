const express = require('express');
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect('mongodb://mongo/design-patern');

app.use(express.urlencoded());
app.use(express.json());

const convertRoute = require('./routes/convertRoute');

app.use('/convert', convertRoute);
// app.use('/result', voteRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})