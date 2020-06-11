class SolarSystem {
    constructor(solarSystem) {
        this.id = solarSystem.id;
        this.name = solarSystem.attributes.name;
        this.star = solarSystem.attributes.star;
        SolarSystem.all.push(this);
    }

    renderSolarSystem() {
        const main = document.querySelector("main");
        let div = document.createElement("div");
    
        div.setAttribute("class", "ss-container space");
        div.setAttribute("data-id", this.id);
        div.innerHTML = `<h2>${this.name}</h2>
        <h3>${this.star.name}</h3>`
    
        main.appendChild(div);

        let newStar = new Star(this.star)
        newStar.renderStar();
    }
}

SolarSystem.all = [];