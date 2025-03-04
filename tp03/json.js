let objet = { "nom" : "azldkj", "prenom":"zlekfj"};

let texte = '{"nom":"dhjazdj", "prenom":"fzfefez"}';

let objetFromText = JSON.parse(texte);
console.log(objetFromText.nom);
console.log(texte.nom);
let chaineContenantJSON = JSON.stringify(objet);