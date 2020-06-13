const BASE = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {
   
    const welcomeBtn = document.querySelector("#new-ss-btn");
    welcomeBtn.addEventListener("click", () => renderSSForm());
    
    const indexBtn = document.querySelector("#ss-index");
    indexBtn.addEventListener("click", () => getSolarSystems());
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
        saveSun(sunName, sunSpectrum, solarSystemID);
    })
}
 
function saveSun(sunName, sunSpectrum, solarSystemID) {
    fetch(`${BASE}/stars`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: sunName,
            spectral_type: sunSpectrum,
            solar_system_id: solarSystemID
        })
    })
    .then(response => response.json())
    .then(star => {
        const ssID = star.data.attributes.solar_system_id;
        
        renderPlanetNumberForm(ssID);
    })
}

function renderPlanetNumberForm(ssID) {
    const sunForm = document.querySelector("#sun-form-container");
    sunForm.setAttribute("class", "hidden");

    const planetNumerContainer = document.querySelector("#planet-number-container");
    planetNumerContainer.setAttribute("class", "");

    const planetNumberBtn = document.querySelector("#p-number-button");
    planetNumberBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        const planetNumberString = (function() {
            const radioNumbers = document.getElementsByName('number');
            for (let i=0; i < radioNumbers.length; i++){
                if (radioNumbers[i].checked) {
                    return radioNumbers[i].value;
                }
            }
        })()

        const planetNumber = parseInt(planetNumberString);
        renderPlanetForm(ssID, planetNumber);
    })
}


function renderPlanetForm(ssID, planetNumber, count=0) {
    
    const planetNumerContainer = document.querySelector("#planet-number-container");
    planetNumerContainer.setAttribute("class", "hidden");

    const planetFormCon = document.querySelector("#planet-form-container");
    planetFormCon.setAttribute("class", "");

    const planetForm = document.querySelector("#new-planet-form");
    planetForm.reset();
    document.querySelector('#create-planet-button').removeAttribute("disabled");

    const num = document.querySelector("span#p-number");
    num.innerText = (count + 1);

        planetForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const planetName = document.querySelector("#planet-name").value;
            const composition = document.querySelector("#composition").value;
            const size = document.querySelector("#size").value;
            const rings = document.querySelector("#rings").checked;

            if (planetName !== "") {
                document.querySelector('#create-planet-button').setAttribute('disabled', 'disabled');
                if (planetNumber === 1) {
                    savePlanet(planetName, composition, size, rings, ssID);
                    
                    setTimeout(function(){ getSolarSystem(ssID) }, 1000);
                } else if (count === (planetNumber - 1)) {
                    
                    setTimeout(function(){ getSolarSystem(ssID) }, 1000);
                } else {
                    savePlanet(planetName, composition, size, rings, ssID);
                    count++;
                    renderPlanetForm(ssID, planetNumber, count);
                }
                }
        })
}

    

function savePlanet(planetName, composition, size, rings, ssID) {
    fetch(`${BASE}/planets`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: planetName,
            composition: composition,
            size: size,
            rings: rings,
            solar_system_id: ssID
        })
    })
    .then(response => response.json())
    .then(planet => {
       
    });
}

function getSolarSystem(solarSystemID) {
    fetch(`${BASE}/solar_systems/${solarSystemID}`)
    .then(response => response.json())
    .then(solarSystem => {
        document.querySelector("main").innerHTML = "";

        let newSolarSystem = new SolarSystem(solarSystem.data)
        newSolarSystem.renderSolarSystem();
        
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



