const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);