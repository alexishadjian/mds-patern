// utils/articleController.js
class ArticleBlog {
    constructor() {
      this.observateurs = [];
    }
  
    mettreAJourContenu(titre, contenu, type) {
      console.log(`Contenu de l'article mis à jour - Titre: ${titre}, Contenu: ${contenu}, Type: ${type}`);
      this.notifierObservateurs(titre, contenu, type);
    }
  
    ajouterObservateur(observateur) {
      this.observateurs.push(observateur);
      console.log('Observateur ajouté.');
    }
  
    notifierObservateurs(titre, contenu) {
      console.log('Notifying Observateurs...');
      this.observateurs.forEach((observateur) => {
        observateur.miseAJour(titre, contenu);
      });
    }
  }
  
  module.exports = ArticleBlog;
  