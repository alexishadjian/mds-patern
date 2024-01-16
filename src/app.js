const express = require('express');
const mongoose = require("mongoose");
const XmlToJsonAdapter = require('./xmlToJsonAdapter');
const eventRoute = require('./routes/eventRoute');
const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/design-patern');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Middleware pour le corps brut (binaire) pour XML
app.use(express.raw({ type: 'application/xml' }));
app.use(express.raw({ type: 'text/xml' }));

app.use('/event', (req, res, next) => {
    const contentType = req.headers['content-type']; // Définir contentType

    if (contentType === 'application/xml' || contentType === 'text/xml') {
        const xmlData = req.body.toString();
        const adapter = new XmlToJsonAdapter(xmlData);
        adapter.convert()
            .then(jsonData => {
                req.body = jsonData; // Remplacez le corps de la requête par le JSON converti
                next(); // Passez au prochain middleware (qui est votre route '/event')
            })
            .catch(err => {
                console.error('Erreur lors de la conversion XML vers JSON :', err);
                res.status(500).send('Erreur lors de la conversion XML vers JSON');
            });
    } else {
        next(); // Si ce n'est pas du XML, passez simplement au prochain middleware
    }
});


app.use('/event', eventRoute); 

app.post('/upload', (req, res) => {
    const contentType = req.headers['content-type'];

    if (contentType === 'application/xml' || contentType === 'text/xml') {
      const xmlData = req.body.toString(); // Convertir le buffer en chaîne
      console.log("Données XML reçues pour la conversion:", xmlData);
  
    // Ici, xmlData doit être une chaîne XML brute
    console.log("Données XML reçues pour la conversion:", xmlData);
  
    const adapter = new XmlToJsonAdapter(xmlData);
    adapter.convert()
      .then(jsonData => {
        res.json({ message: 'Données XML converties', data: jsonData });
      })
      .catch(err => {
        console.error('Erreur lors de la conversion XML vers JSON :', err);
        res.status(500).send('Erreur lors de la conversion XML vers JSON : ' + err.message);
      });
          // ...
      } else if (contentType === 'application/json') {
          console.log("Données JSON reçues:", req.body);
      
          // Vous pouvez traiter les données JSON ici si nécessaire
          res.json({ message: 'Données JSON reçues', data: req.body });
        } else {
          res.status(400).send('Type de contenu non pris en charge');
        }});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
