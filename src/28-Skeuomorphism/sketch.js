let font;

function preload() {
    font = loadFont('GideonRoman-Regular.ttf');
}


function setup() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    createCanvas(cnvSize, cnvSize, WEBGL);
    
    noStroke();
    textFont(font);
    textSize(12);
    textAlign(CENTER, CENTER);
}
  
let angle = 0;
let minute = 0;
let D = new Date();
const romanNum = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

function draw() {
    background(50);
    orbitControl();
    D = new Date();

    fill(250);
    circle(0, 0, 200);

    fill("#D2AC47");
    torus(105, 20, 10);

    fill(0);
    push();
    translate(0, 0, 5);
    for (let a = 0, i = 0; a < TWO_PI; a += TWO_PI / 12, i++) {
        let x = 57.5 * cos(a - TWO_PI/6);
        let y = 57.5 * sin(a - TWO_PI/6);
        circle(x, y, 6);
        x = 70 * cos(a - TWO_PI/6);
        y = 70 * sin(a - TWO_PI/6);
        push();
        translate(x, y, 0);
        rotate(a + TWO_PI/12);
        text(romanNum[i], 0, 0);
        pop();
    }
    
    stroke(0);
    for (let a = 0; a < TWO_PI; a += TWO_PI / 60) {
        push();
        rotateZ(a);
        line(0, 60, 0, 55);
        pop();
    }
    noStroke();
    
    translate(0, 0, -4);
    fill(0, 0, 0);
    drawNeedle(toAngle(D.getMilliseconds(), 1000), 50, true);
    
    translate(0, 0, 1);
    fill(0, 0, 200);
    drawNeedle(toAngle(D.getSeconds(), 60), 50);
    
    translate(0, 0, 1);
    fill(0, 200, 0);
    drawNeedle(toAngle(D.getMinutes() + D.getSeconds() / 60, 60), 40);
    
    translate(0, 0, 1);
    fill(200, 0, 0);
    drawNeedle(toAngle(D.getHours() + D.getMinutes() / 60, 12), 30);

    translate(0, 0, 1);
    fill(0);
    circle(0, 0, 7);
    pop();

    angle += 0.1;
    minute += 1;
    minute %= 60;
}

function drawNeedle(angle, len, small = false) {
    push();
    translate(0, 0, 0);
    rotateZ(angle);
    if (small) {
        triangle(1, 0, -1, 0, 0, len);
        circle(0, len / 1.5, 3);
        translate(0, 0, 1);
        fill(255);
        circle(0, len / 1.5, 1.75);
    } else {
        triangle(2.5, 0, -2.5, 0, 0, len);
        circle(0, len / 1.5, 6);
        translate(0, 0, 1);
        fill(255);
        circle(0, len / 1.5, 3.25);
    }
    pop();
}

function toAngle(val, maxVal) {
    return map(val, 0, maxVal, -PI, PI);
}

function windowResized() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    resizeCanvas(cnvSize, cnvSize);
}