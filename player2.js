export default class Player2 {
    constructor(game) {
        this.game = game;
        this.initInput();
    }
    update() {

    }
    draw(ctx) {

    }
    initInput() {
        document.addEventListener("keydown", e => {
            console.log(e.key.toLowerCase());
            if (e.key.toLowerCase() == "arrowup") {
                this.up = true;
            }
            if (e.key.toLowerCase() == "arrowdown") {
                this.down = true;
            }
        });
        document.addEventListener("keyup", e => {
            if (e.key.toLowerCase() == "arrowup") {
                this.up = false;
            }
            if (e.key.toLowerCase() == "arrowdown") {
                this.down = false;
            }
        });
    }
}