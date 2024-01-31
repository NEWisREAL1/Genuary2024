let mandelbrot;

let centerX, centerY;
let sideLength;
let aspectRatio;
let prevState = 'out';
let state = 'still';
let stopTime = 0;
let animate = false;

function preload() {
    mandelbrot = loadShader('shader/mandelbrot.vert', 'shader/mandelbrot.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    // pixelDensity(1);
    
    // default
    centerX = -0.7;
    centerY = 0.0;
    sideLength = 2.4;
    aspectRatio = width / height;
    
    // for Gif
    centerX = -0.74505177387736300;
    centerY = -0.20839486786860498;

    shader(mandelbrot);

    //saveGif('test.gif', 23);
}

function draw() {
    if (mouseIsPressed) screenDrag();

    mandelbrot.setUniform('minX', centerX - (sideLength/2) * aspectRatio);
    mandelbrot.setUniform('maxX', centerX + (sideLength/2) * aspectRatio);
    mandelbrot.setUniform('minY', centerY - (sideLength/2));
    mandelbrot.setUniform('maxY', centerY + (sideLength/2));
    mandelbrot.setUniform('uTime', millis());
    
    rect(-width/2, -height/2, width, height);

    // for Gif
    if (state == 'still' && millis() - stopTime >= 1000) {
        if (prevState == 'in') {
            state = 'out';
        }
        else if (prevState == 'out') {
            state = 'in';
        }
    }
    else if (state == 'in') {
        sideLength *= 0.98;
        if (sideLength < 0.000003) {
            prevState = 'in';
            state = 'still';
            stopTime = millis();
        }
    }
    else if (state == 'out') {
        sideLength *= 1.02;
        if (sideLength > 2.4) {
            prevState = 'out';
            state = 'still';
            stopTime = millis();
        }
    }
}

function screenDrag() {
    let dx = (pmouseX - mouseX) / width * sideLength * aspectRatio;
    let dy = (pmouseY - mouseY) / height * sideLength;

    centerX += dx;
    centerY += dy;
}

function mouseWheel(event) {
    if (event.delta < 0) {
        // ZOOM IN
        sideLength *= 0.91;
    }
    else {
        // ZOOM OUT
        sideLength *= 1 / 0.91;
    }
}

function keyTyped() {
    if (key === 's') {
        save();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}