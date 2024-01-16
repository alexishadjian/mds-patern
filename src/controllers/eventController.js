const Post = require('./postController');

//Posts d'événements
class EventPost extends Post {

    constructor(title, content, place) {
        super('Event', title, content); //Take parent constructor
        this.place = place;
    }
}

module.exports = new EventPost();