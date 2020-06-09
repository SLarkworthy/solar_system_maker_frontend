const BASE = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {
   

    const form = document.querySelector("#new-solar-system-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const ssName = document.querySelector("#ss-name").value;
        const sunName = document.querySelector("#sun-name").value;
        const sunSpectrum = document.querySelector("#spectrum").value;
        saveSolarSystem(ssName);
    })
})

function saveSolarSystem(ssName) {
    fetch(`${BASE}/solar_systems`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: ssName
        })
    })
    .then(response => response.json())
    .then(solarSystem => {
        console.log(solarSystem.id) //get ss id
        //then fetch a single solar system
        //then send that to render
    })
}
 


function getSolarSystems() {
    fetch(`${BASE}/solar_systems`)
    .then(response => response.json())
    .then(solarSystems => {
        document.querySelector("main").innerHTML = "";
        solarSystems.data.forEach(solarSystem => renderSolarSystem(solarSystem));
    })
}

function renderSolarSystem(solarSystem) {
    const main = document.querySelector("main");
    let div = document.createElement("div");

    div.setAttribute("class", "ss-container");
    div.innerHTML = `<h2>${solarSystem.attributes.name}</h2>
    <h3>${solarSystem.attributes.star.name}</h3>`

    main.appendChild(div);
}

