const Post = require('../models/postModel');
const XmlToJsonAdapter = require('../xmlToJsonAdapter');
const sendEmail = require('../sendEmails');
const ArticleBlog = require('../articleController');
const ModuleEnvoiEmail = require('../sendEmails');

class PostController {

    createAPost = async (req, res) => {
        let data = req.body;
        if (req.is('xml')) {
            try {
                const xmlData = req.body.toString(); // Convertir le buffer en chaîne
                const adapter = new XmlToJsonAdapter(xmlData);
                data = await adapter.convert(); // Convertir XML en JSON

                // Vérifier que les données converties contiennent les champs requis
                if (!data.title || !data.content) {
                    return res.status(400).send('Les champs title et content sont requis.');
                }
            } catch (err) {
                return res.status(500).send('Erreur lors de la conversion XML vers JSON : ' + err.message);
            }
        }
    
        try {
            const newPost = new Post(data);
            const post = await newPost.save();
      
            const articleBlog = new ArticleBlog();
            articleBlog.mettreAJourContenu(data.title, data.content);
      
            const moduleEnvoiEmail = ModuleEnvoiEmail; // Utilisez simplement la fonction sans new
            articleBlog.ajouterObservateur(moduleEnvoiEmail);
      
            const destinataire = 'destinataire@example.com';
            const sujetEmail = `Nouvel article ajouté : ${data.title}`;
            const contenuEmail = `Contenu : ${data.content}`;
            await sendEmail(destinataire, sujetEmail, contenuEmail);
      
            res.status(201).json(post);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
          }
    }


    listAllPosts = async (req, res) => {

        try {
            const posts = await Post.find({});
            res.status(200);
            res.json(posts);
        } catch (error) {
            res.status(500);
            console.log(error);
            res.json({message: 'Erreur serveur'})
        }
    
    }

    updateAPost = async (req, res) => {

        try {
            const post = await Post.findByIdAndUpdate(req.params.id_post, req.body, {new: true});
            res.status(200);
            res.json(post);
        } catch (error) {
            res.status(500);
            console.log(error);
            res.json({message: 'erreur serveur'});
        }

    }

    deleteAPost = async (req, res) => {
    
        try {
            await Post.findByIdAndDelete(req.params.id_post);
            res.status(200);
            res.json({message: 'Article supprimé'});

        } catch {
            res.status(500);
            console.log(error);
            res.json({message: 'erreur serveur'});
        }

    }

    getAPost = async (req, res) => {
        
        try {
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

module.exports = PostController;