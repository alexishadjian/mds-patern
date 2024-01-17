// // controllers/postController.js

// Importe le modèle de Post depuis le fichier postModel
const Post = require('../models/postModel');
// Importe l'adaptateur XmlToJson depuis le fichier xmlToJsonAdapter
const XmlToJsonAdapter = require('../xmlToJsonAdapter');
// Importe la fonction sendEmail depuis le fichier sendEmails
const sendEmail = require('../sendEmails');
// Importe la classe ArticleBlog depuis le fichier articleController
const ArticleBlog = require('../articleController');
// Importe la fonction sendEmail depuis le fichier sendEmails (redondant, vérifier l'utilité)
const ModuleEnvoiEmail = require('../sendEmails');
// Définit une classe PostController qui gère les opérations sur les posts
class PostController {
    
    // Méthode pour créer un nouveau post
    createAPost = async (req, res) => {
        let data = req.body;

        // Vérifie si la requête est au format XML
        if (req.is('xml')) {
            try {
                const xmlData = req.body.toString(); // Convertit le buffer en chaîne
                const adapter = new XmlToJsonAdapter(xmlData);
                data = await adapter.convert(); // Convertit XML en JSON

                // Vérifie que les données converties contiennent les champs requis
                if (!data.title || !data.content) {
                    return res.status(400).send('Les champs title et content sont requis.');
                }
            } catch (err) {
                return res.status(500).send('Erreur lors de la conversion XML vers JSON : ' + err.message);
            }
        }
    
        try {
            // Crée un nouveau post avec les données fournies
            const newPost = new Post(data);
            const post = await newPost.save();
      
            // Met à jour le contenu d'ArticleBlog avec le nouveau post
            const articleBlog = new ArticleBlog();
            articleBlog.mettreAJourContenu(data.title, data.content);
      
            // Ajoute l'observateur (ModuleEnvoiEmail) à l'ArticleBlog
            const moduleEnvoiEmail = ModuleEnvoiEmail; // Utilisez simplement la fonction sans new
            articleBlog.ajouterObservateur(moduleEnvoiEmail);
      
            // Envoye un e-mail avec les détails du nouveau post
            const destinataire = 'destinataire@example.com';
            const sujetEmail = `Nouvel article ajouté : ${data.title}`;
            const contenuEmail = `Contenu : ${data.content}`;
            await sendEmail(destinataire, sujetEmail, contenuEmail);
      
            // Répond avec le post créé
            res.status(201).json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Méthode pour récupérer tous les posts
    listAllPosts = async (req, res) => {
        try {
            // Récupére tous les posts depuis la base de données
            const posts = await Post.find({});
            res.status(200);
            res.json(posts);
        } catch (error) {
            res.status(500);
            console.log(error);
            res.json({message: 'Erreur serveur'})
        }
    }

    // Méthode pour mettre à jour un post existant
    updateAPost = async (req, res) => {
        try {
            // Met à jour le post avec les nouvelles données
            const post = await Post.findByIdAndUpdate(req.params.id_post, req.body, {new: true});
            res.status(200);
            res.json(post);
        } catch (error) {
            res.status(500);
            console.log(error);
            res.json({message: 'erreur serveur'});
        }
    }

    // Méthode pour supprimer un post
    deleteAPost = async (req, res) => {
        try {
            // Supprime le post avec l'ID fourni
            await Post.findByIdAndDelete(req.params.id_post);
            res.status(200);
            res.json({message: 'Article supprimé'});
        } catch {
            res.status(500);
            console.log(error);
            res.json({message: 'erreur serveur'});
        }
    }

    // Méthode pour récupérer un post spécifique par son ID
    getAPost = async (req, res) => {
        try {
            // Récupére le post avec l'ID fourni
            const post = await Post.findById(req.params.id_post);
            res.status(200);
            res.json(post);
        } catch {
            res.status(500);
            console.log(error);
            res.json({message: 'erreur serveur'});
        }
    }
}

// Exporte la classe PostController pour pouvoir l'utiliser dans d'autres fichiers
module.exports = PostController;
