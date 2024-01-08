const dt = 1/100;
let x = 1; y = 0; z = 0;
let dx, dy, dz;
let rho = 1; 
let sigma = 10;
let beta = 8/3;

let points = [];
let angle = 0;
let scl = 1.05;

function setup() {
    createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight), WEBGL);
    colorMode(HSL);
}

function draw() {
    background(0, 0, 19.6);
    rotateX(-QUARTER_PI/4);
    rotate(angle, [0,1,0])
    //orbitControl();
    strokeWeight(1);
    scale(scl);

    // noFill();
    // stroke(0, 100, 100);
    // box(width, height, width);

    // noStroke();
    // fill(0, 100, 100);
    // let a = sqrt(beta*(rho-1));
    // let b = rho-1;
    // push();
    // translate(a, a, b);
    // sphere(0.5);
    // pop();
    
    // push();
    // translate(-a, -a, b);
    // sphere(0.5);
    // pop();

    noFill();
    
    // stroke(0, 100, 100, 10);
    // line(-width/2, 0, 0, width/2, 0, 0);
    // line(0, -height/2, 0, 0, height/2, 0);
    // line(0, 0, -width/2, 0, 0, width/2);

    dx = (sigma * (y - x)) * dt;
    dy = (x * (rho - z) - y) * dt;
    dz = (x*y - beta*z) * dt;

    x += dx;
    y += dy;
    z += dz;
    
    points.push(createVector(x, y, z));
    
    let hue = 0;
    beginShape();
    for (let p of points) {
        stroke(hue, 75, 50);
        vertex(p.x, p.y, p.z);
        hue = (hue + 0.1) % 360;
    }
    endShape();
    rotateY(HALF_PI);
    beginShape();
    for (let p of points) {
        stroke(hue, 75, 50);
        vertex(p.x, p.y, p.z);
        hue = (hue + 0.1) % 360;
    }
    endShape();
    rotateY(HALF_PI);
    beginShape();
    for (let p of points) {
        stroke(hue, 75, 50);
        vertex(p.x, p.y, p.z);
        hue = (hue + 0.1) % 360;
    }
    endShape();
    rotateY(HALF_PI);
    beginShape();
    for (let p of points) {
        stroke(hue, 75, 50);
        vertex(p.x, p.y, p.z);
        hue = (hue + 0.1) % 360;
    }
    endShape();

    if (rho <= 100) {
        rho += 1
    }
    angle += TWO_PI/1200;
}

function windowResized() {
    resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}

window.addEventListener('wheel', (e) => {
    if (e.deltaY < 0) scl += 0.5;
    else scl -= 0.5;

    if (scl <= 0.5) scl = 0.5;

    console.log(scl);
});