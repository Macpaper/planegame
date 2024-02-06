import Game from "./game.js";

const canv = document.querySelector("canvas")
const ctx = canv.getContext("2d")

let game = new Game(canv.width, canv.height);

function animate() {
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    ctx.fillStyle = "rgb(50, 50, 50)";
    ctx.fillRect(0, 0, canv.width, canv.height);

    game.update(canv.width, canv.height);
    game.draw(ctx);
}

setInterval(animate, 25);