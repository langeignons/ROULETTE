const API = "https://roulette.angelinhart.workers.dev";


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
            "Content-Type":"application/json"
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