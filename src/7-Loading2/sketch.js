let shapes = [];
let loadText = 'loading';
let w, h;
let size;
let a = 0;
let progress = 0;

function setup() {
    createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

    w = width/2;
    h = height /2;
    size = 55;
    let count = floor(width/(2*size));
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(20);

    let y = 0.9*height/2, x;
    for (let i = -count-1; i < count+1; i++) {
        x = width/2 - (i * size) - size/2 ;
        if (i % 3 == 0) shapes.push(new Shape('CIRCLE', x, y, size*0.7));
        if (i % 3 == 1 || i % 3 == -1) shapes.push(new Shape('RECT', x, y, size*0.7));
        if (i % 3 == 2 || i % 3 == -2) shapes.push(new Shape('TRIANGLE', x, y, size*0.7));
    }

    //saveGif('genuary2024-7_2.gif', 200, { units: 'frames' });
}

function draw() {
    colorMode(RGB);
    background(255);
    if (frameCount % 60 == 0) {
        if (loadText.length == 10) loadText = loadText.slice(0, -3);
        else loadText = loadText.concat('.');
    }
    noStroke();
    text(loadText, w, 1.4*h);

    stroke(100);
    strokeWeight(1);
    let wOff = min(0.9*width/2, map(progress, 0, 100, 0, 0.9*width/2));
    line(w - wOff, 1.25*h, w + wOff, 1.25*h);

    for (let [i, shape] of shapes.entries()) {
        shape.draw(a + i*10);
    }

    a += 0.1;
    progress += 0.5;
    //noLoop();
}

function windowResized() {
    resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}