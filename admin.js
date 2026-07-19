const API = "https://roulette.angelinhart.workers.dev";

let token = localStorage.getItem("token");


async function login(){


const res = await fetch(API+"/login", {

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

username:
document.getElementById("username").value,

password:
document.getElementById("password").value

})

});


const data = await res.json();



if(data.success){


localStorage.setItem(
"token",
data.token
);



document.getElementById("login").style.display="none";


document.getElementById("adminPanel").style.display="block";


token = data.token;


loadPrizes();


alert("Connexion réussie");


}

else{

alert("Mauvais identifiants");

}


}



async function loadParticipants(){


const res = await fetch(API+"/participants",{


headers:{
"Authorization":
"Bearer "+token
}


});


const data = await res.json();



const table =
document.getElementById("participants");



table.innerHTML="";



data.forEach(p=>{


table.innerHTML += `

<tr>

<td>${p.email}</td>

<td>${p.fingerprint}</td>

<td>🎁 ${p.prize}</td>

<td>${new Date(p.created_at).toLocaleString()}</td>

</tr>

`;


});


}


async function loadPrizes(){

    const res = await fetch(API + "/prizes");

    const prizes = await res.json();


    const container = document.getElementById("prizes");

    container.innerHTML = "";


    prizes.forEach(p => {


        container.innerHTML += `

        <div class="card">

        <b>${p.name}</b>

        <br>

        Chance :
        ${p.probability * 100} %

        <br>

        Stock :
        ${p.stock}

        <br>

        <button onclick="deletePrize(${p.id})">
        🗑 Supprimer
        </button>


        </div>

        `;


    });


}



async function addPrize(){


    const data = {

        name:
        document.getElementById("name").value,


        probability:
        Number(
        document.getElementById("probability").value
        ),


        stock:
        Number(
        document.getElementById("stock").value
        )

    };



await fetch(API + "/add", {

    method:"POST",

    headers:{
        "Content-Type":"application/json",

        "Authorization":
        "Bearer " + token
    },


    body:
    JSON.stringify(data)

});


    alert("Loot ajouté");


    loadPrizes();

}




async function deletePrize(id){


    await fetch(
        API + "/delete?id=" + id,
        {
            method:"DELETE"
        }
    );


    loadPrizes();

}




async function play(){


    const res = await fetch(
        API + "/play"
    );


    const gain = await res.json();


    document.getElementById("result")
    .innerHTML =
    "🎉 Gain : " + gain.name;


}




loadPrizes();