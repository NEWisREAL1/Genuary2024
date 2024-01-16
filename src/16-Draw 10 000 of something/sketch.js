function circleVertices(r, n) {
    let vertices = [];
    for (let a = 0; a < TWO_PI; a += TWO_PI/n) {
      let x = r * cos(a);
      let y = r * sin(a);
      vertices.push({ x:x, y:y });
    }
    return vertices;
}

function calcArea(vertices) {
    let area = 0;
    for (let i = 0; i < vertices.length; i++) {
        let j = (i + 1) % vertices.length;
        area += vertices[i].x * vertices[j].y;
        area -= vertices[i].y * vertices[j].x;
    }
    return 0.5 * area;
}

let w, r, rSq;

function setup() {
    let cnvSize = min(windowWidth, windowHeight)*0.95;
    createCanvas(cnvSize, cnvSize);
    strokeWeight(1);

    w = width/10;
    r = width/4;
    rSq = r**2;
    textFont('Courier New', w);
    textAlign(CENTER, CENTER);

    //saveGif('genuary2024-16.gif', 25);
}

let n = 1;
function draw() {
    background(50);

    if (n <= 60) frameRate(n);

    let vertices = circleVertices(r, n);

    fill(50, 255, 0, 120);
    noStroke();
    let digits = (calcArea(vertices)/rSq).toFixed(100).toString();
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
        text(digits[x + y * 10], x * w, y * w, w, w);
        }
    }
    fill(200);
    text(n, width/2, height/2);

    noFill();
    stroke(255);
    push();
    translate(width/2, height/2);
    beginShape();
    vertices.forEach(v => {
        vertex(v.x, v.y)
    });
    endShape(CLOSE);
    pop();

    //if (n >= 10000) {
    //  console.log(frameCount);
    //}
    if (n < 120) n++;
    else n += 10; 
    //noLoop();
}

function windowResized() {
    let cnvSize = min(windowWidth, windowHeight)*0.95;
    resizeCanvas(cnvSize, cnvSize);
}