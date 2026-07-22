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
    const wheelImg = wheel.querySelector("img");
    const SPIN_DURATION = 2400; // doit correspondre à la durée dans style.css

    playBtn.disabled = true;

    // relance l'animation depuis le début (utile si l'utilisateur rejoue)
    wheel.classList.remove("spinning");
    void wheel.offsetWidth; // force le navigateur à "oublier" l'ancienne animation
    wheel.classList.add("spinning");

    const spinDone = new Promise(resolve => {
        setTimeout(resolve, SPIN_DURATION);
    });

    let data;
    let networkError = false;

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

        networkError = true;

    }

    // attend que la roue ait fini de ralentir, même si le serveur a déjà répondu
    await spinDone;

    wheel.classList.remove("spinning");
    playBtn.disabled = false;

    if(networkError){
        showTicket("❌ Connexion impossible, réessaie.", false);
        return;
    }

    if(!data.success){
        showTicket("❌ " + data.message, false);
        return;
    }

    showTicket("🎉 Tu as gagné : <strong>" + data.prize + "</strong>", true);

}