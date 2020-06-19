class SolarSystem {
    constructor(solarSystem) {
        this.id = solarSystem.id;
        this.name = solarSystem.attributes.name;
        this.star = solarSystem.attributes.star;
        this.planets = solarSystem.attributes.planets;
        SolarSystem.all.push(this);
    }

    renderSolarSystem() {
        const main = document.querySelector("main");
        let div = document.createElement("div");
    
        div.setAttribute("class", "ss-container space");
        div.dataset.id = this.id;
        div.innerHTML = `<h2>${this.name}</h2>`
    
        if (this.star !== null && this.planets.length !== 0) {
            main.appendChild(div);
            let newStar = new Star(this.star)
            newStar.renderStar();
        }

        for (let i=0; i < this.planets.length; i++) {
            const NUMS = ["first", "second", "third", "fourth", "fifth"];
            let newPlanet = new Planet(this.planets[i], NUMS[i]);
            newPlanet.renderPlanet();
        }
    }
}

SolarSystem.all = [];