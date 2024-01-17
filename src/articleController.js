// articleController.js

// Définit une classe ArticleBlog pour gérer la mise à jour du contenu de l'article et les observateurs
class ArticleBlog {
    constructor() {
      this.observateurs = []; // Initialiser un tableau pour stocker les observateurs
    }
  
    // Méthode pour mettre à jour le contenu de l'article et notifier les observateurs
    mettreAJourContenu(titre, contenu, type) {
      console.log(`Contenu de l'article mis à jour - Titre: ${titre}, Contenu: ${contenu}, Type: ${type}`);
      this.notifierObservateurs(titre, contenu, type); // Appeler la méthode pour notifier les observateurs
    }
  
    // Méthode pour ajouter un nouvel observateur
    ajouterObservateur(observateur) {
      this.observateurs.push(observateur); // Ajouter l'observateur au tableau
      console.log('Observateur ajouté.');
    }
  
    // Méthode pour notifier tous les observateurs avec le titre et le contenu mis à jour
    notifierObservateurs(titre, contenu) {
      console.log('Notifying Observateurs...');
      this.observateurs.forEach((observateur) => {
        observateur.miseAJour(titre, contenu); // Appeler la méthode de mise à jour de chaque observateur
      });
    }
}

// Exporte la classe ArticleBlog pour pouvoir l'utiliser dans d'autres fichiers
module.exports = ArticleBlog;

  