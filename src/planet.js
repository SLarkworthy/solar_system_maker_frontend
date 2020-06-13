class Planet {
    constructor(planet, number) {
        this.number = number; //first, second..etc
        this.id = planet.id;
        this.name = planet.name;
        this.composition = planet.composition;
        this.size = planet.size;
        this.rings = planet.rings;
        this.solar_system_id = planet.solar_system_id
        Planet.all.push(this);
    }

    renderPlanet() {
        const ssDiv = document.querySelector(`[data-id="${this.solar_system_id}"]`);
        const orbitDiv = document.createElement("div");
        const planetDiv = document.createElement("div");
        const ringDiv = document.createElement("div");
    
        orbitDiv.setAttribute("class", `orbit ${this.number}`);
        planetDiv.setAttribute("class", `planet ${this.number} ${this.size} ${this.composition}`);
        ringDiv.setAttribute("class", `planet ${this.number} ${this.size} rings`);

        ssDiv.appendChild(orbitDiv);
        ssDiv.appendChild(planetDiv);
        if (this.rings === true) {
            ssDiv.appendChild(ringDiv);
        }
    }
}

Planet.all = [];