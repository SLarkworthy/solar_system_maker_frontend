const BASE = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {

    const welcomeBtn = document.querySelector("#new-ss-btn");
    welcomeBtn.addEventListener("click", () => renderSSForm());
    
    const indexBtn = document.querySelector("#ss-index");
    indexBtn.addEventListener("click", () => getSolarSystems());

    const resouceBtn = document.querySelector("#resources");
    resouceBtn.addEventListener("click", () => getResourcePage())
})

function renderSSForm() {
    const welcome = document.querySelector("#welcome");
    welcome.setAttribute("class", "hidden");

    const ssFormContainer = document.querySelector("#ss-form-container");
    ssFormContainer.setAttribute("class", "");
    
    const ssForm = document.querySelector("#new-solar-system-form");
    ssForm.addEventListener("submit", (e) => {
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
        if (solarSystem.data) {
            renderStarForm(solarSystem.data.id);
        } else {
            for (error of solarSystem.errors) {
                console.log(error);
            }
        }
    })
    .catch(error => console.log(error))
}

function renderStarForm(solarSystemID) {
    const ssForm = document.querySelector("#ss-form-container");
    ssForm.setAttribute("class", "hidden");

    const sunForm = document.querySelector("#sun-form-container");
    sunForm.setAttribute("class", "");

    const createSunForm = document.querySelector("#new-sun-form");
    createSunForm.addEventListener("submit", (e) => {
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
        if (star.data) {
            const ssID = star.data.attributes.solar_system_id;
            renderPlanetNumberForm(ssID);
        } else {
            for (error of star.errors) {
            console.log(error);
        }
        }
    })
    .catch(error => console.log(error))
}

function renderPlanetNumberForm(ssID) {
    const sunForm = document.querySelector("#sun-form-container");
    sunForm.setAttribute("class", "hidden");

    const planetNumberContainer = document.querySelector("#planet-number-container");
    planetNumberContainer.setAttribute("class", "");

    const planetNumberForm = document.querySelector("#planet-number-form");
    planetNumberForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const planetNumberString = (function() {
            const radioNumbers = document.getElementsByName('number');
            for (let i=0; i < radioNumbers.length; i++){
                if (radioNumbers[i].checked) {
                    return radioNumbers[i].value;
                }
            }
        })();

        const planetNumber = parseInt(planetNumberString);
        renderPlanetForm(ssID, planetNumber);
    })
}


function renderPlanetForm(ssID, planetNumber, count=0) {
    
    const planetNumberContainer = document.querySelector("#planet-number-container");
    planetNumberContainer.setAttribute("class", "hidden");

    const planetFormCon = document.querySelector("#planet-form-container");
    planetFormCon.setAttribute("class", "");

    const num = document.querySelector("span#p-number");
    num.innerText = (count + 1);

    const planetForm = document.querySelector("#new-planet-form");
    planetForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const num = document.querySelector("span#p-number");
        const planetName = document.querySelector("#planet-name").value;
        const composition = document.querySelector("#composition").value;
        const size = document.querySelector("#size").value;
        const rings = document.querySelector("#rings").checked;
        count = parseInt(num.innerText) - 1;
        if (planetName !== "") {
            savePlanet(planetName, composition, size, rings, ssID, planetNumber, count);
        }
    })
}

function resetForm(count) {
    const planetForm = document.querySelector("#new-planet-form");
    planetForm.reset();

    const num = document.querySelector("span#p-number");
    num.innerText = (count + 1);
}

function savePlanet(planetName, composition, size, rings, ssID, planetNumber, count) {
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
       count++
       if (count === planetNumber) {
            getSolarSystem(planet.solar_system_id);
       } else {
           resetForm(count);
       }
    })
    .catch(error => console.log(error))
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

function getResourcePage() {
    document.querySelector("main").innerHTML = `<div class="ss-container og"><div id="resource-links">
        <a href="https://starparty.com/topics/astronomy/stars/the-morgan-keenan-system/" target="_blank">The Morgan-Keenan System</a>
        <a href="https://astrobackyard.com/types-of-stars/" target="_blank">The Morgan-Keenan System with visual diagram</a>
        <a href="https://nineplanets.org/kids/planets/" target="_blank">Simple planet composition</a>
    </div></div>`
}



