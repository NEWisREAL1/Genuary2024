let r0, t = 0;

function setup() {
    let cnvSize = min(windowWidth, windowHeight)*0.95;
    createCanvas(cnvSize, cnvSize, WEBGL);
    colorMode(HSB, 360, 100, 255, 100);
    strokeWeight(2);
    r0 = width/3.5;
}

function draw() {
    background(0, 0, 50);
    //orbitControl();
    rotate(t*0.5, [1,1,1]);

    for (let theta = 0; theta < PI; theta += TWO_PI/60) {
        let points = [];
        noStroke();
        for (let phi = 0; phi < TWO_PI; phi += TWO_PI/30) {
            if (theta == 0) break;
            let d = dist(r0 * cos(phi) * sin(theta), r0 * sin(phi) * sin(theta), r0 * cos(theta), 0, 0, r0);
            let r = r0 + map(sin(TWO_PI*theta + d + 2*t + sin(2*(phi+2) + 1.5*t)), -1, 1, -50, 50);
            let z = r * cos(theta);
            let x = r * cos(phi) * sin(theta);
            let y = r * sin(phi) * sin(theta);
            push();
            translate(x, y, z);
            rotateZ(theta + t);
            rotateX(phi + t);
            rotateY(phi + t);
            fill(map(theta, 0, PI, 0, 360), 50, 200, 75);
            box(r0/20);
            pop();
            points.push(createVector(x, y, z));
        }
        stroke(map(theta, 0, PI, 0, 360), 50, 255);
        noFill();
        beginShape();
        points.forEach(p => vertex(p.x, p.y, p.z));
        endShape(CLOSE);
    }
    
    t += TWO_PI/300;
}

function windowResized() {
    let cnvSize = min(windowWidth, windowHeight)*0.95;
    resizeCanvas(cnvSize, cnvSize);
}