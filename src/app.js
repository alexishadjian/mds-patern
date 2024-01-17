// app.js

const express = require('express');
const mongoose = require("mongoose");
const XmlToJsonAdapter = require('./xmlToJsonAdapter'); // Importe le module de conversion XML vers JSON
const eventRoute = require('./routes/eventRoute'); // Importe les routes liées aux événements
const app = express(); // Crée une application Express
const port = 3002; // Définit le port sur lequel le serveur écoutera

mongoose.connect('mongodb://127.0.0.1:27017/designpattern'); // Se connecte à la base de données MongoDB

app.use(express.urlencoded({extended: true})); // Middleware pour analyser les données provenant des formulaires HTML
app.use(express.json()); // Middleware pour analyser les données JSON dans les requêtes

// Middleware pour le corps brut (binaire) pour XML
app.use(express.raw({ type: 'application/xml' }));
app.use(express.raw({ type: 'text/xml' }));

app.use('/event', (req, res, next) => {
    const contentType = req.headers['content-type']; // Récupére le type de contenu de la requête

    if (contentType === 'application/xml' || contentType === 'text/xml') {
        const xmlData = req.body.toString(); // Convertit le corps de la requête en chaîne (XML)
        const adapter = new XmlToJsonAdapter(xmlData); // Crée une instance de l'adaptateur XML vers JSON
        adapter.convert()
            .then(jsonData => {
                req.body = jsonData; // Remplace le corps de la requête par le JSON converti
                next(); // Passe au prochain middleware (route '/event')
            })
            .catch(err => {
                console.error('Erreur lors de la conversion XML vers JSON :', err);
                res.status(500).send('Erreur lors de la conversion XML vers JSON'); // Répondre en cas d'erreur
            });
    } else {
        next(); // Si ce n'est pas du XML, passe simplement au prochain middleware
    }
});

app.use('/event', eventRoute); // Utilise les routes liées aux événements sur le chemin '/event'

app.post('/upload', (req, res) => {
    const contentType = req.headers['content-type']; // Récupére le type de contenu de la requête

    if (contentType === 'application/xml' || contentType === 'text/xml') {
        const xmlData = req.body.toString(); // Convertit le corps de la requête en chaîne (XML)
        console.log("Données XML reçues pour la conversion:", xmlData);

        const adapter = new XmlToJsonAdapter(xmlData); // Crée une instance de l'adaptateur XML vers JSON
        adapter.convert()
            .then(jsonData => {
                res.json({ message: 'Données XML converties', data: jsonData }); // Répondre avec le JSON converti
            })
            .catch(err => {
                console.error('Erreur lors de la conversion XML vers JSON :', err);
                res.status(500).send('Erreur lors de la conversion XML vers JSON : ' + err.message); // Répondre en cas d'erreur
            });
    } else if (contentType === 'application/json') {
        console.log("Données JSON reçues:", req.body);

        // Traite les données JSON ici si nécessaire
        res.json({ message: 'Données JSON reçues', data: req.body }); // Répond avec les données JSON
    } else {
        res.status(400).send('Type de contenu non pris en charge'); // Répond si le type de contenu n'est pas pris en charge
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
