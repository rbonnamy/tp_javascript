class Personne {
    
    // Paramètres du constructeur
    constructor(nvNom, nvPrenom, nvAge=0){ 
        
        // Propriétés, variables d'instance
        this.nom = nvNom;
        this.prenom = nvPrenom;
        this.age = nvAge;
    }

    dateNaissance(){
        return new Date().getFullYear()-this.age;
    }
}

let p1 = new Personne("PLOP", "Aze", 41);
let p2 = new Personne("KIOM", "dsasd", 28);
let p3 = new Personne("KOKO", "dlknjd");

// Accède directement aux variables d'instance => pas bonne pratique !!
p1.nom = "PLOPE";
p1.age = 42;
console.log(p1.nom, p1.age);

// RAISON 1 : moins de contrôle - accès en lecture, en écriture
// RAISON 2 : variables liées

class Facture {

    constructor(consommation){
        this.montant = consommation * 0.15;
        this.consommation = consommation;
    }
}

let f = new Facture(100);
console.log(f.consommation, f.montant);

f.montant = 20; // je ne dois pas autoriser à modifier montant car montant dépend uniquement de consommation

// RAISON 3 : il faut toujours masquer l'organisation d'une classe => en cas de modification de la structure
// d'une classe, les coûts de dev peuvent être énormes si tous les attributs sont restés en public.

class GestionnaireTaches {

    #nom;
    #taches;

    constructor(nom){
        this.#nom = nom;
        this.#taches = []; // Comment je change mon tableau en autre chose sans impacter toute l'application ???
    }

    ajouter(tache){
        this.#taches.push(tache); // Si je change le tableau de taches par autre chose, seule la méthode ajouter est impactée
    }

    afficher(){
        console.log(this.#nom+":");
        this.#taches.forEach(t=>console.log("-"+t.libelle));
    }

    // Getter : récupérer que le nom
    get nom(){
        return this.#nom;
    }

    // Setter : modifier le nom
    set nom(nvNom){
        this.#nom = nvNom;
    }
}

let g1 = new GestionnaireTaches("Mois de mars");
g1.ajouter({id:1, libelle:"Pensez à aller à Rennes pour bla bla"});
g1.ajouter({id:2, libelle:"Pensez à faire un truc"});
console.log(g1.nom);     // Utilise le getter get nom()
g1.nom = "Mois d'avril"; // Utilise le setter set nom(nvNom)
g1.afficher();

