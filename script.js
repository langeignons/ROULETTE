const API =
"https://roulette.angelinhart.workers.dev";


function getFingerprint(){

    let id = localStorage.getItem("device_id");

    if(!id){
        id = crypto.randomUUID();
        localStorage.setItem("device_id", id);
    }

    return id;

}


function showTicket(message, isWin){

    const wrap = document.getElementById("result-wrap");

    wrap.innerHTML = `
        <div class="ticket ${isWin ? "win" : "lose"}">
            ${message}
        </div>
    `;

}


async function play(){

    const emailInput = document.getElementById("email");
    const email = emailInput.value;

    if(!email){
        alert("Entre ton email");
        return;
    }

    const fingerprint = getFingerprint();

    const playBtn = document.getElementById("playBtn");
    const wheel = document.getElementById("wheel");

    playBtn.disabled = true;
    wheel.classList.add("spinning");

    let data;

    try{

        const response = await fetch(API + "/play", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                fingerprint: fingerprint
            })

        });

        data = await response.json();

    } catch(err){

        wheel.classList.remove("spinning");
        playBtn.disabled = false;
        showTicket("❌ Connexion impossible, réessaie.", false);
        return;

    }

    wheel.classList.remove("spinning");
    playBtn.disabled = false;

    if(!data.success){
        showTicket("❌ " + data.message, false);
        return;
    }

    showTicket("🎉 Tu as gagné : <strong>" + data.prize + "</strong>", true);

}