let n = 100, d = 31;
let a = 0;

function setup() {
    let gap = min(windowWidth, windowHeight) * 0.95; 
    createCanvas(gap, gap);
    angleMode(DEGREES);
    colorMode(HSL, 360, 100, 100, 100);
    stroke(0, 0, 100);
    strokeWeight(0.5);
}

function draw() {
    background(0, 0, 20);
    noFill();
    for (let cy = 0; cy < height + width/5; cy += width/5) {
        for (let cx = 0; cx < width + width/5; cx += width/5) {
            let D = dist(cx, cy, width/2, height/2);
            let hue = map(D, 0, width, 0, 360);
            n = map(D, 0, width, 100, 180);
            push();
            translate(cx, cy);
            stroke(hue, 88, 66, 55);
            beginShape();
            for (let k = 0; k <= 360 * d; k += 2*d) {
                let r = width/10 * sin(n * k);
                let theta = k;
                let x = r * cos(theta);
                let y = r * sin(theta);
                vertex(x, y);
            }
            endShape();
            pop();
        }
    }

    for (let cy = height/10; cy < height; cy += width/5) {
        for (let cx = width/10; cx < width; cx += width/5) {
            let D = dist(cx, cy, width/2, height/2);
            let hue = map(D, 0, width, 0, 360);
            n = map(D, 0, width, 100, 200);
            push();
            translate(cx, cy);
            stroke(hue, 88, 66, 55);
            beginShape();
            for (let k = 0; k <= 360 * d; k += 2*d) {
                let r = width/25 * sin(n * k);
                let theta = k;
                let x = r * cos(theta);
                let y = r * sin(theta);
                vertex(x, y);
            }
            endShape();
            pop();
        }
    }

    d = map(sin(frameCount * 0.0001), -1, 1, 31, 50);
}

function windowResized() {
    let gap = min(windowWidth, windowHeight) * 0.95; 
    resizeCanvas(gap, gap);
}