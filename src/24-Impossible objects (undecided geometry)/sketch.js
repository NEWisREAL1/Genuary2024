const magicAngle = Math.atan(Math.sqrt(1/2));
let W = 40;
let col = 7;
let a = 0;

function setup() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    createCanvas(cnvSize, cnvSize, WEBGL);

    ortho(-width/2, width/2, height/2, -height/2, 0.01, 5000);
    stroke('#371E30');

    frameRate(10);
    //saveGif('genuary2024-24.gif', 3 * col - 3, { units: 'frames' });
}

function drawRect(x, y, z, w, connect = false) {
    fill('#DF57BC');
    push();
    translate(x, y, z);
    // lower side
    translate(0, w/2, 0);
    if (!connect) {
    box(w,0,w);  
    }
    // upper side
    translate(0, -w, 0);
    box(w,0,w);

    fill('#A03E99');
    // left side
    translate(-w/2, w/2, 0);
    box(0,w,w);
    // right side
    translate(w, 0, 0);
    if (!connect) {
    box(0,w,w);    
    }
    // back side
    translate(-w/2, 0, -w/2);
    if (!connect) {
    box(w,w,0);    
    }
    // front side
    translate(0, 0, w);
    box(w,w,0);
    pop();
}

function draw() {
    background(50);
    translate(-(col/3)*W, 0, 0);
    rotateX(magicAngle);
    rotateY(PI/4);
    //rotateY(TWO_PI * frameCount / 180);

    if (a == 0) {
        drawRect(0, 0, 0, W);
    }
    else {
        drawRect(0, 0, 0, W * 0.85);
    }
    for (let i = 1; i < col; i++) {
        let w;
        if (i == a) w = W;
        else w = 0.85 * W;
        push();
        drawRect(i * W, 0, 0, w);
        pop();

        if (3 * col - i - 3 == a) w = W;
        else w = 0.85 * W;
        push();
        drawRect(0, 0, i * W, w);
        pop();
    }

    for (let i = 1; i < col - 2; i++) {
        let w;
        if (i + col - 1 == a) w = W;
        else w = 0.85 * W;
        drawRect((col - 1) * W, -i * W, 0, w);
    }

    if (a == 2 * col - 3) {
        drawRect(0, W, (col - 1) * W, W);    
    }
    else {
        drawRect(0, W, (col - 1) * W, W * 0.85);    
    }
    if (a == 2 * col - 4) {
        drawRect(0, 2 * W, (col - 1) * W, W, true);
    }
    else {
        drawRect(0, 2 * W, (col - 1) * W, W * 0.85, true);
    }

    a = (a + 1) % (3*col - 3);
}

function windowResized() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    resizeCanvas(cnvSize, cnvSize);
}