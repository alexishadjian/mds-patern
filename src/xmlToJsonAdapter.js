// XmlToJsonAdapter.js

// Importe le module 'xml2js', qui est une bibliothèque permettant de convertir des données XML en JSON.
const xml2js = require('xml2js');

// Définit une classe 'XmlToJsonAdapter'. 
class XmlToJsonAdapter {
  // Le constructeur prend un argument 'xmlData', qui est une chaîne de caractères contenant des données XML.
  constructor(xmlData) {
    // Stocke les données XML dans une propriété de l'instance de classe pour une utilisation ultérieure.
    this.xmlData = xmlData;
  }

  // Méthode 'convert' pour convertir le XML en JSON.
  convert() {
    return new Promise((resolve, reject) => {
      // Crée une instance du parseur XML de 'xml2js' avec l'option 'explicitArray: false'.
      const parser = new xml2js.Parser({ explicitArray: false });

      // Utilise le parseur pour convertir la chaîne XML (this.xmlData) en objet JSON.
      parser.parseString(this.xmlData, (err, result) => {
        // Si une erreur survient lors de la conversion, la promesse est rejetée avec cette erreur.
        if (err) {
          reject(err);
        } else {
          // Si la conversion réussit, formate le résultat pour extraire les informations souhaitées.
          const formattedResult = result.post ? { title: result.post.title, content: result.post.content, type: result.post.type } : {};
          resolve(formattedResult);
        }
      });
    });
  }
}

// Exporte la classe 'XmlToJsonAdapter'
module.exports = XmlToJsonAdapter;

