const BASE = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {
    getSolarSystems()
})

function getSolarSystems() {
    fetch(`${BASE}/solar_systems`)
    .then(response => response.json())
    .then(solarSystems => {
        console.log(solarSystems);
    })
}

