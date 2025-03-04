/*EXERCICE FONCTIONCONSTANTE

Ecrivez une fonction qui ne prend pas de paramètre et retourne le nombre 33.
Appelez cette méthode et affichez son résultat d’appel*/

function constante(){
    return 33;
}
console.log(constante());

/*EXERCICE BONJOURUNTEL
Ecrivez une fonction qui prend en paramètre une variable de type chaine de caractères et affiche « Bonjour » suivi de la variable.
Exemple : si le paramètre vaut "Marcel" alors la fonction affiche Bonjour Marcel
Appelez cette méthode et affichez son résultat d’appel*/

function bonjourUntel(nom){
    console.log(`Bonjour ${nom}`);
}
bonjourUntel("à toi");

/*EXERCICE FONCTIONCALCUL
Ecrivez une fonction qui prend 2 nombres a et b en paramètres et retourne le résultat suivant : a * b + a + b
Appelez cette méthode avec 2 nombres quelconques et affichez le résultat d’appel
Que se passe t’il si vous appelez cette fonction non pas avec des nombres mais avec des chaines de caractères ? Faites le test.*/

function calcul(a, b){
    return a*b + a + b;
}
console.log(calcul(2, 5));
console.log(calcul(-1, 3));
console.log(calcul(null, 3));

/*EXERCICE FONCTION CONTROLETABLEAU
Créer une fonction qui vérifie le contenu d’un tableau 
Si le tableau ne contient que des nombres alors la fonction retourne true
Sinon la fonction retourne false	*/

function controleTableau(tab){
    if (!tab || tab.length==0){
        return false;
    }
    for (let i=0; i<tab.length; i++){
        if (typeof tab[i] !== 'number'){
            return false;
        }
    }
    return true;
}
console.log(controleTableau(null));
console.log(controleTableau([]));
console.log(controleTableau([1, -5, 0.25]));
console.log(controleTableau([-12.6, 'a', 28]));

 
/*EXERCICE FONCTIONMOYENNE
Créer une fonction qui calcule et retourne la moyenne d’un tableau passé en paramètre.
Cette fonction doit retourner un message d’erreur dans le cas où un élément du tableau n’est pas un nombre
Réalisez 3 appels à cette fonction avec :
Un tableau contenant des éléments
Un tableau vide. Que se passe-t-il dans ce second cas ? Faites-en sorte que votre fonction retourne 0 dans le cas où le tableau est vide.
Une chaine de caractères. Que se passe-t-il dans ce troisième cas ?*/

function moyenne(tab){
    if (!tab || tab.length==0){
        return 0;
    }
    let somme = 0;
    for (let i=0; i<tab.length; i++){
        if (typeof tab[i] != 'number'){
            return "Le tableau contient un élément qui n'est pas un nombre";
        }
        somme+=tab[i];
    }
    return somme/tab.length;
}
console.log("------")
console.log(moyenne(null));
console.log(moyenne([]));
console.log(moyenne([1, 14, 2]));
console.log(moyenne([-12.6, 'a', 28]));
console.log("------")

/*EXERCICE FONCTION MAJ

Créer une fonction qui prend en paramètre une chaine de caractères.
Cette fonction retourne la chaine de caractères passée en paramètre avec la première lettre en majuscule.*/
function premiereLettreMaj(chaine){
    if (!chaine || typeof chaine !== 'string'){
        return "";
    }
    return chaine.charAt(0).toUpperCase()+chaine.substring(1);
}
console.log(premiereLettreMaj("coucou"));

/*EXERCICE FONCTIONPHRASEMAJ

Créer une fonction qui prend en paramètre une chaine de caractères.
Cette fonction retourne cette chaine de caractères dans laquelle chaque mot a sa première lettre mis en majuscule
Exemple :
Si je passe à cette fonction la chaine de caractères "Bonjour tout le monde"
La fonction retourne alors "Bonjour Tout Le Monde"
Astuce : Cette fonction utilisera la fonction précédente pour la mise en majuscule de la première lettre de chaque mot.*/
function phraseMaj(chaine){
    if (!chaine || typeof chaine !== 'string'){
        return "";
    }
    let tabMots = chaine.split(" ");
    let resultat = "";
    for (let i=0; i<tabMots.length; i++){
        resultat+=premiereLettreMaj(tabMots[i])+" ";
    }
    return resultat;
}
console.log(phraseMaj("Bonjour tout le monde"));

/*EXERCICE FONCTION QUI RETOURNE UNE FONCTION

Créer une fonction qui prend en paramètre un entier n et retourne une fonction qui elle-même :
Prend en paramètre un nombre nb
Retourne ce nombre multiplié par n
Invoquez cette fonction avec 2 valeurs de n différentes et stockez le résultat dans 2 variables différentes.
Les variables ainsi retournées sont également des fonctions
Invoquez ces fonctions avec un nombre nb et affichez le résultat*/

function createFunction(n) {

    let nvFunction = function(nb) {
        return n*nb;
    }
    return nvFunction;
}
let double = createFunction(2); // double contient une fonction
let triple = createFunction(3); // triple contient une fonction
console.log(double(10));
console.log(triple(10));
console.log(createFunction(5)(18));

/*EXERCICE : GESTIONNAIRE DE TACHES

Dans cet exercice nous allons créer un objet littéral permettant de gérer des tâches et qui doit permettre :
1.	D'ajouter des tâches avec une description.
2.	De marquer une tâche comme terminée.
3.	D'afficher toutes les tâches, en précisant lesquelles sont terminées ou non.
Instructions :
Créez une fonction creerGestionnaire() qui retourne un objet littéral contenant :
Une propriété tableau de taches 
les méthodes suivantes :
ajouterTache(description) : ajoute une nouvelle tâche.
terminerTache(index) : marque une tâche comme terminée, en fonction de son index.
afficherTaches() : affiche toutes les tâches avec leur état (terminée ou non).
Une tâche est représentée par un objet avec deux propriétés :
description : la description de la tâche.
terminee : un booléen indiquant si elle est terminée.
Testez le gestionnaire en ajoutant, terminant et affichant des tâches.*/
console.log("-----GESTIONNAIRE------");
function creerGestionnaire(){
    let gestionnaire = {
        taches : [],
        ajouterTache : function(desc) {
            let tache = {description : desc, terminee: false}
            this.taches.push(tache);
        },
        terminerTache : function(index) {
            this.taches[index].terminee = true;
        },
        afficherTaches : function(){
            for (let i=0; i<this.taches.length; i++){
                console.log(this.taches[i].description+" "+(this.taches[i].terminee?"Oui":"Non"));
            }
        }
    }; 
    return gestionnaire;
}

let ges1 = creerGestionnaire();
let ges2 = creerGestionnaire();

ges1.afficherTaches();
ges1.ajouterTache("Faire les courses");
ges1.ajouterTache("Faire le ménage");
ges1.ajouterTache("Appeler untel");
ges1.afficherTaches();
ges1.terminerTache(0);
ges1.afficherTaches();