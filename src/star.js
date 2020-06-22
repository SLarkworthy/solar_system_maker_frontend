class Star {
    constructor(star) {
        this.id = star.id;
        this.name = star.name;
        this.spectral_type = star.spectral_type;
        this.solar_system_id = star.solar_system_id;
    }

    renderStar() {
        const ssDiv = document.querySelector(`[data-id="${this.solar_system_id}"]`);

        const starDiv = document.createElement("div");
        starDiv.setAttribute("class", `star ${this.spectral_type}`);

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("names");
        const h3 = document.createElement("h3");
        h3.innerText = this.name;
        const ul = document.createElement("ul");
        h3.addEventListener("mouseover", () => {
            infoDiv.classList.remove("hidden");
        })
        h3.addEventListener("mouseout", () => {
            infoDiv.classList.add("hidden");
        })
        nameDiv.append(h3, ul);
    
        const infoDiv = document.createElement("div");
        infoDiv.setAttribute("class", "info hidden");
        infoDiv.innerHTML = 
            `<h3>Star name: ${this.name}</h3>
            <ul>
                <li>Star's spectral type: ${this.spectral_type}</li>
            </ul>`;

        ssDiv.append(infoDiv, nameDiv, starDiv);
    }
}