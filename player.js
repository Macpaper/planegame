export default class Player {
    constructor(game) {
        this.game = game;
        this.up = false;
        this.down = false;
        this.initInput();
    }
    update() {

    }
    draw(ctx) {

    }
    initInput() {
        document.addEventListener("keydown", e => {
            if (e.key.toLowerCase() == "w") {
                this.up = true;
            }
            if (e.key.toLowerCase() == "s") {
                this.down = true;
            }
        });
        document.addEventListener("keyup", e => {
            if (e.key.toLowerCase() == "w") {
                this.up = false;
            }
            if (e.key.toLowerCase() == "s") {
                this.down = false;
            }
        });
    }
}