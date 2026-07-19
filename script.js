const API =
"https://roulette.angelinhart.workers.dev";



async function play(){


const email =
document.getElementById("email").value;


if(!email){

alert("Entre ton email");

return;

}



const result =
document.getElementById("result");


result.innerHTML =
"🎰 Tirage en cours...";



try {


const response =
await fetch(API + "/play");



const gain =
await response.json();



result.innerHTML =
"🎉 Tu as gagné : "
+
gain.name;



}

catch(error){

console.log(error);

result.innerHTML =
"Erreur serveur";

}


}