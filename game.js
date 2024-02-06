import Player from "./player.js";
import Player2 from "./player2.js";

export default class Game {
    constructor(w, h) {
        this.screenWidth = w;
        this.screenHeight = h;

        this.tileWidth = 10;
        this.gridWidth = 100;
        this.gridHeight = 60;
        this.offsetX = 300;
        this.offsetY = 20;
        this.grid = [];
        this.red = 0;
        this.green = 0;
        this.blue = 255;
        this.nextGrid = [];
        for (let i = 0; i < this.gridWidth; i++) {
            this.grid.push([]);
            this.nextGrid.push([]);
            for(let j = 0; j < this.gridHeight; j++) {
                this.grid[i].push(0);
                this.nextGrid[i].push(0);
            }
        }

        this.grid[20][20] = 1;
        this.nextGrid[20][20] = 1;
        console.log(this.grid);

        this.hue = 0;
        this.mDown = false;
        this.mx = 0;
        this.my = 0;
        addEventListener("mousedown", e => { 
            this.mDown = true;
        });
        addEventListener("mouseup", e => { this.mDown = false; });
        addEventListener("mousemove", e => {
            this.mx = e.pageX;
            this.my = e.pageY;
        });

        addEventListener("touchstart", e => {
            this.mDown = true
        });
        addEventListener("touchend", e => {this.mDown = false});
        // addEventListener("touchcancel", e => {this.mDown = false});
        addEventListener("touchmove", e => {
            this.mx = e.touches[0].clientX;
            this.my = e.touches[0].clientY;
            console.log(e);
            console.log(e);
        });


        // for (let col = 0; col < this.gridWidth; col++) {
        //     for (let row = 0; row < this.gridHeight; row++) {
        //         ctx.strokeRect(col * this.tileWidth + 500, row * this.tileWidth + 20, this.tileWidth, this.tileWidth);
        //     }
        // }
    }
    update(w, h) {
        this.screenWidth = w;
        this.screenHeight = h;
        if (this.mDown) {
            
            let mouseCol = Math.floor((this.mx / this.tileWidth)) - Math.floor(this.offsetX / this.tileWidth);
            let mouseRow = Math.floor((this.my / this.tileWidth)) - Math.floor(this.offsetY / this.tileWidth);
            let matrix = 3;
            let extent = Math.floor(matrix / 2);
            for (let i = -extent; i <= extent; i++) {
                for (let j = -extent; j <= extent; j++) {
                    let col = mouseCol + i;
                    let row = mouseRow + j;
                    if (Math.random() < 0.75) {
                        if (col >= 0 && col <= this.gridWidth - 1 && row >= 0 && row <= this.gridHeight - 1) {
                            this.nextGrid[col][row] = this.hue;
                            this.hue += 0.1;
                            if (this.hue >= 360) {
                                this.hue = 0;
                            }
                        }
                    }
                }
            }

        }
    }
    draw(ctx) {
        
        for (let col = 0; col < this.gridWidth; col++) {
            for (let row = 0; row < this.gridHeight; row++) {
                this.grid[col][row] = this.nextGrid[col][row];
                if (this.grid[col][row] == 0) {
                    ctx.strokeStyle = "black";
                    ctx.strokeRect(col * this.tileWidth + this.offsetX, row * this.tileWidth + this.offsetY, this.tileWidth, this.tileWidth);
                }
                if (this.grid[col][row] > 0) {
                    ctx.fillStyle = `hsl(${this.grid[col][row]} 100% 50%)`;
                    
                    ctx.fillRect(col * this.tileWidth + this.offsetX, row * this.tileWidth + this.offsetY, this.tileWidth, this.tileWidth);
                }
                // ctx.strokeRect(col * this.tileWidth + 500, row * this.tileWidth + 20, this.tileWidth, this.tileWidth);
            }
        }

        for (let col = 0; col < this.gridWidth; col++) {
            for (let row = 0; row < this.gridHeight; row++) {
                let state = this.grid[col][row];
                if (state > 0 && row <= this.gridHeight - 2) {
                    if (this.grid[col][row + 1] == 0) {
                        this.nextGrid[col][row] = 0;
                        // equals color
                        this.nextGrid[col][row + 1] = this.grid[col][row];
                    }
                    // FALLING LEFT OR RIGHT
                    if (col > 0 && col < this.gridWidth - 1) {
                    if (this.grid[col][row + 1] > 0 && this.grid[col + 1][row + 1] == 0 && this.grid[col - 1][row+1] == 0){
                       
                        let randDir = Math.round(Math.random());
                        this.nextGrid[col][row] = 0;
                        if (randDir == 0) {
                            // equals color here
                            this.nextGrid[col + 1][row + 1] = this.grid[col][row];
                        } else {
                            // and here
                            this.nextGrid[col - 1][row + 1] = this.grid[col][row];
                        }
                    } else if (this.grid[col][row + 1] > 0 && this.grid[col + 1][row + 1] == 0) {
                        this.nextGrid[col][row] = 0;
                        // equals color
                        this.nextGrid[col + 1][row + 1] = this.grid[col][row];
                    } else if (this.grid[col][row + 1] > 0 && this.grid[col - 1][row + 1] == 0) {
                        this.nextGrid[col][row] = 0;
                        // equals color
                        this.nextGrid[col - 1][row + 1] = this.grid[col][row];
                    }
                }
                }
            }
        }
    }
}