let grid = [];
let dimension = 128, w;

class Grid {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
    }
}

function posMod(a, b) {
    // return a % b
    return ((a % b) + b) % b;
}

function setup() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    createCanvas(cnvSize, cnvSize);
    // createCanvas(256, 256);

    w = width / dimension;
    for (let i = 0; i < dimension; i++) {
        grid.push([]);
        for (let j = 0; j < dimension; j++) {
            grid[i].push(new Grid(i * w, j * w, 0));
        }
    }

    grid[64][64].value = 10000;
    grid[32][64].value = 10000;
    grid[96][64].value = 10000;
    grid[64][32].value = 10000;
    grid[64][96].value = 10000;
    grid[0][0].value = 10000;
    grid[127][127].value = 10000;
    grid[0][127].value = 10000;
    grid[127][0].value = 10000;

    colorMode(HSB, 360, 100, 100, 100);
    noStroke();
    //frameRate(10);

    // saveGif('genuary2027-23_2.gif', 8);
}

function draw() {
    background(0, 0, 19.5);
    let newGrid = [];
    for (let i = 0; i < dimension; i++) {
        newGrid.push([]);
        for (let j = 0; j < dimension; j++) {
            newGrid[i].push(new Grid(i * w, j * w, 0));
        }
    }

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            if (grid[i][j].value >= 4) {
                newGrid[i][j].value += grid[i][j].value - 3.5;
                newGrid[posMod(i-1, dimension)][j].value += 1;
                newGrid[posMod(i+1, dimension)][j].value += 1;
                newGrid[i][posMod(j-1, dimension)].value += 1;
                newGrid[i][posMod(j+1, dimension)].value += 1;
            }
            else {
                newGrid[i][j].value += grid[i][j].value;
            }
        }
    }

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            grid[i][j].value = newGrid[i][j].value;
        }
    }

    for (let col of grid) {
        for (let cell of col) {
            if (cell.value != 0) {
                fill((cell.value * 30) % 360 + 60, 100, 70);
                rect(cell.x, cell.y, w)
            };
        }
    }
}

function mouseClicked() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        let i = floor(mouseX / w);
        let j = floor(mouseY / w);
        grid[i][j].value = Infinity;
    }
}
function windowResized() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    resizeCanvas(cnvSize, cnvSize);
}