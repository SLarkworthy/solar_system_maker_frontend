const BASE = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {
   
    const welcomeBtn = document.querySelector("#new-ss-btn");
    welcomeBtn.addEventListener("click", () => renderSSForm());

    const form = document.querySelector("#new-solar-system-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const ssName = document.querySelector("#ss-name").value;
        const sunName = document.querySelector("#sun-name").value;
        const sunSpectrum = document.querySelector("#spectrum").value;
        
    })

    
})

function renderSSForm() {
    const welcome = document.querySelector("#welcome");
    welcome.setAttribute("class", "hidden");

    const ssForm = document.querySelector("#ss-form-container");
    ssForm.setAttribute("class", "");
    
    const createBtn = document.querySelector("#create-button");
    createBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const ssName = document.querySelector("#ss-name").value;
        saveSolarSystem(ssName);
    })
}

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
        renderStarForm(solarSystem.data.id);
    })
}

function renderStarForm(solarSystemID) {
    const ssForm = document.querySelector("#ss-form-container");
    ssForm.setAttribute("class", "hidden");

    const sunForm = document.querySelector("#sun-form-container");
    sunForm.setAttribute("class", "");

    const createSunBtn = document.querySelector("#create-sun-button");
    createSunBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const sunName = document.querySelector("#sun-name").value;
        const sunSpectrum = document.querySelector("#spectrum").value;
        console.log(solarSystemID);
    })

}
 


function getSolarSystems() {
    fetch(`${BASE}/solar_systems`)
    .then(response => response.json())
    .then(solarSystems => {
        document.querySelector("main").innerHTML = "";

        solarSystems.data.forEach(solarSystem => {
            let newSolarSystem = new SolarSystem(solarSystem)
            newSolarSystem.renderSolarSystem();
        });
    })
}



