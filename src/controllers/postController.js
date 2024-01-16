// Interface post
class Post {

    constructor(type, title = '', content = '') {
        this.type = type;
        this.title = title;
        this.content = content;
    }

    createPost(type, title, content, additionalInfo) {

        if (type === 'Event') {
            return new EventPost(title, content, additionalInfo);
        } else if (type === 'News') {
            return new NewsPost(title, content, additionalInfo);
        } else {
            throw new Error('Invalid post type');
        }

    }

}

module.exports = Post;









// const Post = require('../models/postModel');

// exports.listAllPosts = async (req, res) => {

//     try {
//         const posts = await Post.find({});
//         res.status(200);
//         res.json(posts);
//     } catch (error) {
//         res.status(500);
//         console.log(error);
//         res.json({message: 'Erreur serveur'})
//     }

// }

// exports.createAPost = async (req, res) => {

//     const newPost = new Post(req.body);
    
//     try {
//         const convert = await newPost.save();
//         res.status(201);
//         res.json(convert);
//     } catch (error) {
//         res.status(500);
//         console.log(error);
//         res.json({message: "Server error"})
//     }

// }

// exports.updateAPost = async (req, res) => {

//     try {
//         const post = await Post.findByIdAndUpdate(req.params.id_post, req.body, {new: true});
//         res.status(200);
//         res.json(post);
//     } catch (error) {
//         res.status(500);
//         console.log(error);
//         res.json({message: 'erreur serveur'});
//     }

// }

// exports.deleteAPost = async (req, res) => {
    
//     try {
//         await Post.findByIdAndDelete(req.params.id_post);
//         res.status(200);
//         res.json({message: 'Article supprimé'});

//     } catch {
//         res.status(500);
//         console.log(error);
//         res.json({message: 'erreur serveur'});
//     }

// }

// exports.getAPost = async (req, res) => {
    
//     try {
//         const post = await Post.findById(req.params.id_post);
//         res.status(200);
//         res.json(post);

//     } catch {
//         res.status(500);
//         console.log(error);
//         res.json({message: 'erreur serveur'});
//     }

// }