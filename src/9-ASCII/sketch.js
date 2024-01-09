const charSet = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft";
let cam;
let downScl = 16;
let w, h;
let offSet = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    cam = createCapture(VIDEO);
    //cam = createVideo('goldfish.mp4');
    cam.size(width/downScl, height/downScl);
    cam.hide();

    w = width / cam.width; 
    h = height / cam.height; 

    pixelDensity(1);
    noStroke();
    textSize(1.25*w);
}

function draw() {
    background(25);
    cam.loadPixels();
    for (let y = 0; y < cam.height; y++) {
        for (let x = 0; x < cam.width; x++) {
            let i = (x + y * cam.width) * 4;
            let brightness = (cam.pixels[i] + cam.pixels[i+1] + cam.pixels[i+2]) / 3;
            let bChar = charSet[(round(map(brightness, 0, 255, 0, charSet.length - 1)))];
            fill(cam.pixels[i], cam.pixels[i+1], cam.pixels[i+2]);
            text(bChar, width - x * w, y * h + h);
        }
    }
}

function mouseClicked() {
    //cam.play();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}