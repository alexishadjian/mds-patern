const Post = require('./postController');

//Posts d'événements
class EventPost extends Post {

    constructor(title, content, place) {
        super('Event', title, content); //Take parent constructor
        this.place = place;
    }
  
    display() {
        // console.log(`Event Post (${this.place}): ${this.content}`);
    }

}

module.exports = EventPost;