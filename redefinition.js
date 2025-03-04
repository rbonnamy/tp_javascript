class Vehicule {
    seDeplacer(){
        console.log("Je me déplace");
    }
}

class Voiture extends Vehicule {
    seDeplacer(){
        super.seDeplacer(); // appel de la méthode de la classe mère
        console.log("Je me déplace en roulant");
    }
}

class CompteBancaire {

    static taux = 0.05;
    #solde;

    constructor(solde){
        this.#solde = solde;
    }

    // Une méthode static n'a pas accès aux attributs d'instance (les attributs qui commencent par #)
    // Si une méthode n'accède pas aux attributs d'instance de la classe, elle peut être static
    static calculer(a, b){
        return CompteBancaire.taux*2.0;
    }
}


// Appel static
console.log(CompteBancaire.calculer(10,15));