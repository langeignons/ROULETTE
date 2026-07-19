const API =
"https://roulette.angelinhart.workers.dev";



function getFingerprint(){

    let id = localStorage.getItem("device_id");


    if(!id){

        id = crypto.randomUUID();

        localStorage.setItem(
            "device_id",
            id
        );

    }


    return id;

}


async function play(){


const email =
document.getElementById("email").value;


if(!email){

alert("Entre ton email");

return;

}


const fingerprint =
getFingerprint();



const response =
await fetch(API+"/play",{

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

email:email,

fingerprint:fingerprint

})


});



const data =
await response.json();



if(!data.success){

document.getElementById("result")
.innerHTML =
"❌ " + data.message;

return;

}



document.getElementById("result")
.innerHTML =
"🎉 Tu as gagné : "
+
data.prize;



}