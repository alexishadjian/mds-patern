const Convert = require('../models/convertModel');


exports.convertDevise = async (req, res) => {

    const newConvert = new Convert(req.body);
    
    try {
        const convert = await newConvert.save();
        res.status(201);
        res.json(convert);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({message: "Server error"})
    }
}