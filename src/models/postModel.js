// models/postModel.js

// Importe le module mongoose pour interagir avec la bndd MongoDB.
const mongoose = require('mongoose');

// Récupére la classe Schema 
const Schema = mongoose.Schema;

// Définit un nouveau schéma pour les 'posts'.
let postSchema = new Schema (
    {
        // Définit un champ 'type' qui est une chaîne de caractères. Ce champ est obligatoire
        type: {
            type: String,
            required: true,
        },
        // Définit un champ 'title' qui est une chaîne de caractères. Ce champ est aussi obligatoire
        title: {
            type: String,
            required: true,
        },
        // Définit un champ 'content' pour le contenu qui est une chaîne de caractères et est aussi obligatoire
        content: {
            type: String,
            required: true
        },
    },
    // Cette option ajoute automatiquement deux champs de date à chaque entréée : 'createdAt' et 'updatedAt'
    { timestamps: true }
);

// Exporte le modèle Post 
module.exports = mongoose.model('Post', postSchema);