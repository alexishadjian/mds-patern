const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let convertSchema = new Schema (
    {
        value: {
            type: Number,
            required: true,
        },
        devise: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Convert', convertSchema);