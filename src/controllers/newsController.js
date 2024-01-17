// controllers/newsController.js

// Importe la classe ou le module 'Post' depuis 'postController'.
const Post = require('./postController');

// Définit une nouvelle classe 'NewsPost' qui hérite de 'Post'.
    // 
// 'NewsPost' est une calsse enfant de 'Post' pour des posts de type actualités.
class NewsPost extends Post {
    
    // Constructeur pour créer une nouvelle instance de 'NewsPost'.Il prend trois paramètres : 'title', 'content', et 'source'
    constructor(title, content, source) {
        // Appelle le constructeur de la classe parente ('Post') avec des paramètres spécifiques.
        // Ici, le type est toujours défini comme 'News', suivi du titre et du contenu.
        super('News', title, content); // Utilise le constructeur du parent.

        this.source = source;
    }
    
}

// Exporte une nouvelle instance de 'NewsPost'.
module.exports = new NewsPost();