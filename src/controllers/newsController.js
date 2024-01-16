const Post = require('./postController');

//Posts d'actualités
class NewsPost extends Post {
    
    constructor(title, content, source) {
        super('News', title, content); //Take parent constructor
        this.source = source;
    }
  
    display() {
        console.log(`News Post - ${this.title}: ${this.content}`);
    }
    
}

module.exports = NewsPost;