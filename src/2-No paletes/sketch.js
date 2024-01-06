let img, imgCanvas;
let vec;

function preload() {
    img = loadImage('./assets/starry_night.jpg');
}

function setup() {
    let ratio = img.width / img.height;
    if (windowHeight < windowWidth) {
        createCanvas(ratio*windowHeight/1.2, windowHeight/1.2);
        let imgCanvas = createGraphics(ratio*windowHeight/1.2, windowHeight/1.2);
    }
    else {
        createCanvas(ratio*windowWidth/1.2, windowWidth/1.2);
        imgCanvas = createGraphics(ratio*windowWidth/1.2, windowWidth/1.2);
    }
    vec = createVector(1,1);
    vec.setHeading(0);
    background(50);
    //translate(width/2, height/2);
    //image(img, -width/2, -height/2, width, height);
    //saveGif('cover2', 15);
}

function draw() {
    translate(width/2, height/2);
    //rotate(PI);
    
    img.loadPixels();
    let i = ((img.width/2 + floor(vec.x)) + (img.height/2 + floor(vec.y)) * img.width) * 4;
    let R = img.pixels[i];
    let G = img.pixels[i+1];
    let B = img.pixels[i+2];
    stroke(R,G,B);
    strokeWeight(5);
    beginShape();
    vertex(vec.x, vec.y);
    vec.setHeading(vec.heading() + 0.1);
    vec.setMag(vec.mag() + 0.2);
    vertex(vec.x, vec.y);
    endShape();
}

function windowResized() {
    let ratio = img.width / img.height;
    if (windowHeight < windowWidth) {
        resizeCanvas(ratio*windowHeight/1.2, windowHeight/1.2);
    }
    else {
        resizeCanvas(ratio*windowWidth/1.2, windowWidth/1.2);
    }
}