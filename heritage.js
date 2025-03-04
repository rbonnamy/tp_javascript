class Personne {

    #nom
    #prenom
    #age
    
    // Paramètres du constructeur
    constructor(nvNom, nvPrenom, nvAge){ 
        
        // Propriétés, variables d'instance
        this.#nom = nvNom;
        this.#prenom = nvPrenom;
        this.#age = nvAge;
    }

    dateNaissance(){
        return new Date().getFullYear()-this.#age;
    }
}

class Salarie extends Personne {

    #salaire

    constructor(nvNom, nvPrenom, nvAge, nvSalaire){ 
        super(nvNom, nvPrenom, nvAge); // appel du constructeur situé dans la classe mère

        // Traitement des attributs spécifiques après le super
        this.#salaire = nvSalaire;
    }   
}

let s1 = new Salarie("PO", "Pi", 25, 2500); // Salaire brut débutant
console.log(s1.dateNaissance());