let grid = [];
let dimension = 128, w;
let pause = false;
window.addEventListener('keydown', e => {
    if (e.key == 'p') {
        pause = !pause;
        //saveGif('genuary2024-23_1.gif', 60);
    }
});

class Grid {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
    }
}

function setup() {
    alert('try TAP or DRAG the screen!!!');
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    createCanvas(cnvSize, cnvSize);

    w = width / dimension;
    for (let i = 0; i < dimension; i++) {
        grid.push([]);
        for (let j = 0; j < dimension; j++) {
            grid[i].push(new Grid(i * w, j * w, 0));
        }
    }

    strokeWeight(0.1);
    frameRate(10);

    // show the first gen
    background(50);
    for (let col of grid) {
        for (let cell of col) {
            if (cell.value) rect(cell.x, cell.y, w);
        }
    }
}

function life() {
    let newGrid = [];
    for (let i = 0; i < dimension; i++) {
        newGrid.push([]);
        for (let j = 0; j < dimension; j++) {
            newGrid[i].push(new Grid(i * w, j * w, -1));
        }
    }

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            let lifeCount = 0;
            for (let row = -1; row <= 1; row++) {
                for (let col = -1; col <= 1; col++) {
                    let m = (((i + col) % dimension) + dimension) % dimension;
                    let n = (((j + row) % dimension) + dimension) % dimension;
                    if ((col != 0 || row != 0) && grid[m][n].value == 1) {
                        lifeCount++;
                    }
                }
            }
            if (grid[i][j].value == 1) {
                if (lifeCount == 2 || lifeCount == 3) {
                    newGrid[i][j].value = 1;
                }
                else {
                    newGrid[i][j].value = 0;
                }
            }
            else {
                if (lifeCount == 3) {
                    newGrid[i][j].value = 1;
                }
            }
        }
    }

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            grid[i][j].value = newGrid[i][j].value;
            if (grid[i][j].value == 1) rect(grid[i][j].x, grid[i][j].y, w);
        }
    }
}

function draw() {
    if (!pause) {
        background(50);
        fill(255);
        noStroke();
        life();
    }
    else {
        background(50);
        stroke(255, 100);
        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                if (grid[i][j].value == 1) {
                    fill(255);   
                }
                else {
                    noFill();
                }
                rect(grid[i][j].x, grid[i][j].y, w);
            }
        }
    }
}

function mouseClicked() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        let i = floor(mouseX / w);
        let j = floor(mouseY / w);
        grid[i][j].value = 1;
        fill(255);
        noStroke();
        rect(grid[i][j].x, grid[i][j].y, w);
    }
}

function mouseDragged() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        let i = floor(mouseX / w);
        let j = floor(mouseY / w);
        grid[i][j].value = 1;
        fill(255);
        noStroke();
        rect(grid[i][j].x, grid[i][j].y, w);
    }
}

function doubleClicked() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        let i = floor(mouseX / w);
        let j = floor(mouseY / w);
        grid[i][j].value = 0;
        fill(255,0,0);
        noStroke();
        rect(grid[i][j].x, grid[i][j].y, w);
    }
}

function windowResized() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    resizeCanvas(cnvSize, cnvSize);
}