let cnvSize, range;
const pallettes = [
    ['#054569', '#5591a9', '#9ccddc', '#ced7e0'],
    ['#051427', '#530f1e', '#a44322', '#f8bc04'],
    ['#76101e', '#133769', '#c9374c', '#c2dde4'],
    ['#430d4b', '#7b337d', '#c874b2', '#f5d5e0'],
    ['#001736', '#00481a', '#155e89', '#9aeadd'],
    ['#014760', '#107e57', '#a1ce3f', '#cbe58e'],
    ['#282157', '#1a2c80', '#4a478a', '#da8a8b'],
    ['#101b39', '#333136', '#6f6d72', '#b4b1b8', '#e9e8ee'],
];
let colors, colIndex = 0;
let endX = 1, endY = 1;
let startX = 0.5, startY = 0;
let period = 120;

class Star {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = random(1, 1.5);
        this.zSpeed = random(5,20);
        this.color = random(colors);
        this.path = [];
        this.prevPath = [];
        this.maxLength = random(10,18);
    }

    update() {
        this.z -= this.zSpeed;
        if (this.z <= 0) {
            this.prevPath = [...this.path];
            this.path = [];
            this.x = random(-range, range);
            this.y = random(-range, range);
            this.z = cnvSize;
            this.r = random(1, 1.5);
        };

        let sx = map(this.x / this.z, startX, endX, 0, width);
        let sy = map(this.y / this.z, startY, endY, 0, height);


        this.path.push( { x: sx, y: sy, z: this.z } );
        if (this.path.length > this.maxLength) this.path.shift();
        if (this.prevPath.length >= 0) this.prevPath.shift();
    }

    draw() {
        stroke(this.color);
        beginShape();
        for (let p of this.path) {
            strokeWeight(map(p.z, 0, cnvSize, this.r, 0));
            vertex(p.x, p.y);
        }
        endShape();

        beginShape();
        for (let p of this.prevPath) {
            strokeWeight(map(p.z, 0, cnvSize, this.r, 0));
            vertex(p.x, p.y);
        }
        endShape();
    }
}

let stars = [];

function setup() {
    cnvSize = min(windowWidth, windowHeight) * 0.95;
    createCanvas(cnvSize, cnvSize);
    range = cnvSize / 2;
    // colors = random(pallettes);
    colors = pallettes[colIndex];

    for (let i = 0; i < 500; i++) {
        let x = random(-range, range);
        let y = random(-range, range);
        let z = random(cnvSize);
        stars.push(new Star(x, y, z));
    }

    noFill();
    stroke(255);

    // saveGif('genuary2024-25.gif', period * pallettes.length, { units: 'frames' });
}

function draw() {
    background(0);
    translate(width/2, height/2);

    endX = map(cos((TWO_PI/period) * frameCount), -1, 1, 1, 2);
    endY = map(sin((TWO_PI/period) * frameCount), -1, 1, 1, 3);
    // startX = map(cos(frameCount * 0.05), -1, 1, 0, 0.5);
    // startY = map(sin(frameCount * 0.05), -1, 1, 0, 0.5);
    
    for (let star of stars) {
        star.update();
        star.draw();
    }

    if (frameCount % period == 0) mouseClicked();;
}

function mouseClicked() {
    // let newColors;
    // do {
    //     newColors = random(pallettes);
    // } while(newColors == colors);
    // colors = newColors;
    
    colIndex = (colIndex + 1) % pallettes.length;
    colors = pallettes[colIndex];

    for (let star of stars) {
        star.color = random(colors);
    }
}

function windowResized() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    resizeCanvas(cnvSize, cnvSize);
}