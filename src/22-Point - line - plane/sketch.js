const grid = [];
let w;
let cam;

let gridNumber;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    gridNumber = 35;
}
else {
    gridNumber = 60;
}

class Grid {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.d = dist(x, y, width, height);
    }
    
    update() {
        this.z -= (1000 / this.d);
    }

}

function setup() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    createCanvas(cnvSize, cnvSize, WEBGL);
    
    rectMode(CENTER);
    stroke(255, 100);
    noFill();

    w = width*2 / gridNumber;
    for (let y = 0; y < gridNumber; y++) {
        grid.push([]);
        for (let x = 0; x < gridNumber; x++) {
            grid[y].push(new Grid(x*w + w/2, y*w + w/2, 200));
        }
    }

    perspective(PI/3, width/ height, 0.1, 1000000);
    camera(1500, 1500, 1000);
}

function draw() {
    background(50);
    orbitControl();
    //rotateZ(frameCount*0.005);
    //rotateY(-frameCount*0.002);
    //rotateX(-frameCount*0.005);
    //rotateX(PI/8);

    push();
    translate(-width, -height);

    for (let y = 0; y < gridNumber; y++) {
        beginShape();
        for (let x = 0; x < gridNumber; x++) {
            let p = grid[y][x];
            vertex(p.x, p.y, p.z);
        }
        endShape();
    }
    for (let x = 0; x < gridNumber; x++) {
        beginShape();
        for (let y = 0; y < gridNumber; y++) {
            let p = grid[y][x];
            vertex(p.x, p.y, p.z);
        }
        endShape();
    }

    beginShape(POINTS);
    for (let y = 0; y < gridNumber; y++) {
        for (let x = 0; x < gridNumber; x++) {
            let p = grid[y][x];
            vertex(p.x, p.y, p.z);
            p.update();
        }
    }
    endShape();

    pop();
}

function windowResized() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    resizeCanvas(cnvSize, cnvSize);
}