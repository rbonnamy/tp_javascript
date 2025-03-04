/*
Déclarer une variable contenant une valeur numérique entière  
• Utiliser une boucle pour calculer la somme de tous les nombres de 1 à cette valeur 
• Exemple de résultat à obtenir si la variable vaut 10 : 55 
*/
let target = 10;
let somme = 0;
for (let i=0; i<=target; i++){
    somme+=i;
}
console.log(somme);