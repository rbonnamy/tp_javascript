// VARIABLES GLOBALES utilisées dans différentes fonctions
let idCreateur = "rbonnamy";
let selection = {};
let utilisateurs = [];
let mode = "";
let baseUrl = `https://digicode.cleverapps.io/utilisateurs/${idCreateur}/`;
let createUrl = "https://digicode.cleverapps.io/utilisateurs/";
let modifUrl = "https://digicode.cleverapps.io/utilisateurs/";
let supprUrl = `https://digicode.cleverapps.io/utilisateurs/${idCreateur}/`;

/* Initialisation des données.
 * Fonction appelée au chargement de la page et après 
 * chaque interaction avec le back (création, modification, suppression)
 */
function initialiserDonnees(){ 
        // Chargement des utilisateurs
        fetch(baseUrl)
        .then(rep=>rep.json())
        .then(
            data=>init(data), // en cas de succès
            error=>{ console.log(error);
                    init([]); // en cas d'erreur, initialisation du tableau HTML avec un tableau vide
                }
        );
}

/* Remplissage du tableau HTML avec le tableau des utilisateurs passé en paramètre.
 * Fonction appelée par initialiserDonnees()
 * @param data tableau des utilisateurs
 */
function init(data){
    utilisateurs = data;

    let tbody = document.querySelector("#body1");

    // On vide le tableau HTML avant de le reconstruire
    tbody.innerHTML="";

    // On boucle sur le tableau d'utilisateurs pour générer une ligne tr par utilisateur
    for (u of utilisateurs){
        let ligne = `
                <tr>
                <td align="center"><i class="fas fa-trash-can text-danger" onclick="supprimerUtilisateur(${u.id})"></i>
                                   <i class="fas fa-pencil-alt text-primary ms-3" onclick="modifierUtilisateur(${u.id})"></i></td>                
                <td>${u.nom}</td>
                <td>${u.prenom}</td>
                <td>${u.dateNaissance}</td>
                <td>${u.lieuNaissance}</td>
                <td>${u.numeroRue}, ${u.libelleRue}, ${u.codePostal} ${u.ville}</td>
                </tr>
            `;
        tbody.insertAdjacentHTML('beforeend', ligne);
    }

    // On complète le tableau HTML avec des lignes vides s'il y a moins de 3 utilisateurs
    for (let i=utilisateurs.length; i<3; i++){
        tbody.insertAdjacentHTML('beforeend', "<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td></tr>");
    }
}

/* Fonction appelée lorsque l'utilisateur clique sur le bouton + Ajouter
 */
function creerUtilisateur(){
    mode = "CREATE";

    let titre = document.querySelector("#titreModale");
    titre.innerHTML = 'Créer utilisateur';

    openModale("modale-creation-modification");
}

/* Fonction appelée lorsque l'utilisateur clique sur l'icone en forme de stylo.
 * @param id identifiant de l'utilisateur à modifier
 */
function modifierUtilisateur(id){
    mode = "MODIF";

    let titre = document.querySelector("#titreModale");
    titre.innerHTML = 'Modifier utilisateur';

    const form = document.forms[0];

    // selection représente ici l'utilisateur correspondant à l'id passé
    // en paramètre
    selection = utilisateurs.find(obj => obj.id === id);
    if (!selection.id) {
        console.log("erreur:", utilisateurs);
        return;
    }

    // Object.entries(selection) permet de générer un tableau contenant des tableaux (clé/valeur)
    // Par exemple l'objet {"id":12, "nom":"Untel"} serait transformer en tableau : [ ["id", 12], ["nom":"Untel"]]
    // On réalise ensuite une bouche
    let keyValues = Object.entries(selection);
    console.log(keyValues);
    for (let i=0; i<keyValues.length; i++){
        const keyValue = keyValues[i]; // On récupère la paire d'index i. Exemple : ["id", 12]
        const key = keyValue[0]; // la clé correspond à l'index 0
        const value = keyValue[1]; // la valeur correspond à l'index 1

        // Recherche du champ du formulaire en fonction de son nom (key)
        const field = form.elements.namedItem(key);

        // Si ce champ existe ou lui change sa valeur
        if (field) {
            field.value = value;
        }
    }

    openModale("modale-creation-modification");
}

/* Fonction appelée lorsque l'utilisateur clique sur le bouton Valider
 * dans la modale de création ou de modification d'un utilisateur
 */
function sauvegarderUtilisateur(){

    // On récupère le formulaire
    let form = document.forms[0];

    // Si le formulaire n'est pas valide on ajoute un style bootstrap was-validated
    // qui fait apparaitre toutes les balises invalid-feedback
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
    }
    else {
       // Création d'un instance de formData qui contient toutes les données du formulaire
       // Pourquoi faire cela ? beaucoup plus simple de récupérer les valeurs associées à chaque champ
        const formData = new FormData(form); 

        // Il faut maintenant créer l'objet littéral qui sera envoyé au serveur
        const formObject = {};
        formObject.id=selection.id || 0;
        formObject.idCreateur=idCreateur;
        formObject.nom=formData.get("nom");
        formObject.prenom=formData.get("prenom");
        formObject.dateNaissance=formData.get("dateNaissance");
        formObject.lieuNaissance=formData.get("lieuNaissance");
        formObject.departementNaissance=formData.get("departementNaissance");
        formObject.numeroRue=formData.get("numeroRue");
        formObject.libelleRue=formData.get("libelleRue");
        formObject.codePostal=formData.get("codePostal");
        formObject.ville=formData.get("ville");

        // Alternative au code ci-dessus : 
        // formData.forEach((value, key) => formObject[key] = value);
        
        let method = "POST";
        let url = createUrl;
        
        if (mode=="MODIF"){
            method = "PUT";
            url = modifUrl+selection.id;
        }

        const options = {
            method: method, 
	        headers: { 'Content-Type': 'application/json'}, 
	        body: JSON.stringify(formObject) 
        };
        fetch(url, options).then(res=>{
            initialiserDonnees();
            closeModale("modale-creation-modification");
        });
    }
}

/* Fonction appelée lorsque l'utilisateur clique sur l'icone en forme de poubelle
 * @param id identifiant de l'utilisateur à supprimer
 */
function supprimerUtilisateur(id){
    selection = utilisateurs.find(obj => obj.id === id);

    let titreSuppression = document.querySelector("#titreSuppression");
    titreSuppression.innerHTML = "Confirmez-vous la suppression de "+selection.prenom+" "+selection.nom;

    openModale("supprimer-utilisateur");
}

/* Fonction appelée lorsque l'utilisateur confirme la suppression dans la modale de suppression.
 */
function validerSupprimerUtilisateur(){
    const options = {
        method: "DELETE", 
        headers: { 'Content-Type': 'application/json'}, 
        body: null
    };
    fetch(supprUrl+selection.id, options).then(res=>{
        initialiserDonnees();
        closeModale("supprimer-utilisateur");
    });
}