let SD;

function preload() {
    SD = loadShader('shader/shader.vert', 'shader/shader.frag');
}

function setup() {
    createCanvas(min(windowWidth, windowHeight)*0.95, min(windowWidth, windowHeight)*0.95, WEBGL);
    noStroke();
}

function draw() {
    SD.setUniform('pDensity', pixelDensity());
    SD.setUniform('uResolution', [width, height]);
    SD.setUniform('uTime', millis() / 1000);
    shader(SD);
    
    rect(0, 0, width, height);
}

function windowResized() {
    resizeCanvas(min(windowWidth, windowHeight)*0.95, min(windowWidth, windowHeight)*0.95);
}