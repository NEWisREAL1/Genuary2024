let w = 20;
let gridW, gridH;
let rows, cols;
let zOff = 0;
let yOff = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    gridW = max(width, height);
    gridH = max(width, height);
    cols = 1.75*gridW / w;
    rows = gridH / w;

    //saveGif('genuary2024-6_2.gif', 5);
}

function draw() {
    colorMode(RGB);
    background(0, 71, 100);
    rotateX(PI/2.5);
    translate(-1.75*gridW/2, -gridH/2);

    stroke(0, 0, 255);
    colorMode(HSL);
    //noStroke();
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let n = noise(i*0.05, j*0.05 + yOff, zOff);
            push();

            translate(i*w, j*w);
            fill(map(n, 0, 1, 110, 250), 75, 60);
            box(w, w, floor(map(n, 0, 1, 1, 350)));

            pop();
        }
    }

    zOff += 0.05;
    yOff -= 0.02;
    //noLoop();
}

function mouseClicked() {
    if (w == 30) w = 20;
    else w = 30;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}