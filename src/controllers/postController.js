const Post = require('../models/postModel');


exports.createAPost = async (req, res) => {

    const newPost = new Post(req.body);
    
    try {
        const convert = await newPost.save();
        res.status(201);
        res.json(convert);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({message: "Server error"})
    }
}