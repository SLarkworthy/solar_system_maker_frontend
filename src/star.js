class Star {
    constructor(star) {
        this.id = star.id;
        this.name = star.name;
        this.spectral_type = star.spectral_type;
        this.solar_system_id = star.solar_system_id;
        Star.all.push(this);
    }

    renderStar() {
        const ssDiv = document.querySelector(`[data-id="${this.solar_system_id}"]`);
        const starDiv = document.createElement("div");
    
        starDiv.setAttribute("class", `star ${this.spectral_type}`);
        
        ssDiv.appendChild(starDiv);
    }
}

Star.all = [];