// Dans XmlToJsonAdapter.js
const xml2js = require('xml2js');


class XmlToJsonAdapter {
  constructor(xmlData) {
    this.xmlData = xmlData;
  }

  convert() {
    return new Promise((resolve, reject) => {
      const parser = new xml2js.Parser({ explicitArray: false });
      parser.parseString(this.xmlData, (err, result) => {
        if (err) {
          reject(err);
        } else {
          // Ajuster la structure ici si nécessaire
          const formattedResult = result.post ? { title: result.post.title, content: result.post.content } : {};
          resolve(formattedResult);
        }
      });
    });
  }
}
module.exports = XmlToJsonAdapter;

