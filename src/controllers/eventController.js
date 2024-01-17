// controllers/eventController.js

// Importe le module ou la classe 'Post' depuis postController'
const Post = require('./postController');

// Définit une nouvelle classe 'EventPost' qui hérite la classe 'Post'.
// 'EventPost' est une classe enfant de 'Post' pour des posts type événements.
class EventPost extends Post {

    // Constructeur pour créer une nouvelle instance de 'EventPost'. Il prend trois paramètres : 'title', 'content', et 'place'
    constructor(title, content, place) {
        // Appelle le constructeur de la classe parente ('Post') avec des paramètres spécifiques.
        // Ici, le type est toujours défini comme 'Event', suivi du titre et du contenu.
        super('Event', title, content); // Prend le constructeur du parent.

        this.place = place;
    }
}

// Exporte une nouvelle instance de 'EventPost'.
module.exports = new EventPost();