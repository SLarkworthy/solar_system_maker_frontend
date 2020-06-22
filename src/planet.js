class Planet {
    constructor(planet, number) {
        this.number = number; //first, second..etc
        this.id = planet.id;
        this.name = planet.name;
        this.composition = planet.composition;
        this.size = planet.size;
        this.rings = planet.rings;
        this.solar_system_id = planet.solar_system_id
    }

    renderPlanet() {
        const ssDiv = document.querySelector(`[data-id="${this.solar_system_id}"]`);
        const orbitDiv = document.createElement("div");
        const planetDiv = document.createElement("div");
        const ringDiv = document.createElement("div");

        const nameUl = document.querySelector(`[data-id="${this.solar_system_id}"] div.names ul`);
        const li = document.createElement("li");
        li.innerText = this.name;
        li.addEventListener("mouseover", () => {
            planetInfoDiv.classList.remove("hidden");
            orbitDiv.classList.add('selected');
        })
        li.addEventListener("mouseout", () => {
            planetInfoDiv.classList.add("hidden");
            orbitDiv.classList.remove('selected');
        })
        nameUl.appendChild(li);

        const planetInfoDiv = document.createElement("div");
        planetInfoDiv.setAttribute("class", "info hidden");
        planetInfoDiv.innerHTML = 
            `<h3>Planet name: ${this.name}</h3>
            <ul>
                <li>This is the <strong>${this.number}</strong> planet out from the star.</li>
                <li>Composition: ${this.composition}</li>
                <li>Size: ${this.size}</li>
            </ul>`;
    
        orbitDiv.setAttribute("class", `orbit ${this.number}`);
        planetDiv.setAttribute("class", `planet ${this.number} ${this.size} ${this.composition}`);
        ringDiv.setAttribute("class", `planet ${this.number} ${this.size} rings`);

        ssDiv.append(planetInfoDiv, orbitDiv, planetDiv);
        if (this.rings === true) {
            ssDiv.appendChild(ringDiv);
        }
    }
}