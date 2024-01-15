const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Interface commune pour les devises
class Devise {
  convertir(montant) {
    return montant;
  }
}

// Implémentation concrète pour l'euro (EUR)
class Euro extends Devise {
  convertir(montant) {
    return montant * 0.91; // Taux de change fictif pour l'euro en dollars
  }
}

// Implémentation concrète pour le dollar américain (USD)
class Dollar extends Devise {
  convertir(montant) {
    return montant; // Le dollar reste inchangé
  }
}

// Implémentation concrète pour la livre sterling (GBP)
class LivreSterling extends Devise {
  convertir(montant) {
    return montant * 1.32; // Taux de change fictif pour la livre sterling en dollars
  }
}

// Adaptateur pour le dollar américain (USD)
class AdaptateurDollar extends Devise {
  constructor(dollar) {
    super();
    this.dollar = dollar;
  }

  convertir(montant) {
    return this.dollar.convertir(montant);
  }
}

// Utilisation des différentes devises
const montantEnEuros = 42000;
const euro = new Euro();
console.log(`Montant en euros: ${montantEnEuros} EUR`);

const montantEnDollars = euro.convertir(montantEnEuros);
console.log(`Montant en dollars: ${montantEnDollars} USD`);

const dollar = new Dollar();
const adaptateurDollar = new AdaptateurDollar(dollar);

const montantEnDollarsViaAdaptateur = adaptateurDollar.convertir(montantEnEuros);
console.log(`Montant en dollars via adaptateur: ${montantEnDollarsViaAdaptateur} USD`);

const livreSterling = new LivreSterling();
const montantEnLivresSterling = livreSterling.convertir(montantEnEuros);
console.log(`Montant en livres sterling: ${montantEnLivresSterling} GBP`);
