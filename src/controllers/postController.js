const Post = require('../models/postModel');

// Interface post
class PostController {

    constructor(type, title = '', content = '') {
        this.type = type;
        this.title = title;
        this.content = content;
    }

    createAPost = async (req, res) => {

        const newPost = new Post(req.body);
        
        try {
            const post = await newPost.save();
            res.status(201);
            res.json(post);
        } catch (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Server error"})
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