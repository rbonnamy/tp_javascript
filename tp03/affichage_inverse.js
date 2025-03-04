/*
Soit le tableau suivant : let array = [1, 15, -3, 0, 8, 7, 4, -2, 28, 7, -1, 17, 2, 3, 0, 14, -4];  
Afficher l’ensemble des éléments du tableau grâce à une boucle  
Afficher l’ensemble des éléments dans l’ordre inverse du tableau  
Créer un tableau arrayCopy, copie du tableau array.
*/
let array = [1, 15, -3, 0, 8, 7, 4, -2, 28, 7, -1, 17, 2, 3, 0, 14, -4];
for (let i=0; i<array.length; i++){
    console.log(array[i], array[array.length-1-i]);
}
let arrayCopy = array.slice();