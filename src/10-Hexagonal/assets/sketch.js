let object;
let angle = 0;

function preload() {
    object = loadModel('Truncated_octahedron.stl', true);
}

function setup() {
    createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight), WEBGL);

    //saveGif('octahedron.gif', 300, { units: 'frames' });
}

function draw() {
    background(25);

    rotateX(angle);
    rotateY(angle);
    rotateZ(angle);
    
    noStroke();
    normalMaterial();
    model(object);
    
    angle += TWO_PI/300;
}

function windowResized() {
    resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}