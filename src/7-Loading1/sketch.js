const G = 10;
let objects = [];
let centerObject;
let mode = 0;

function modeSetup() {
    objects = [];

    if (mode == 0) {
        centerObject = new RigidBody(width/2, height/2, 250);

        let a = 0;
        let r = width / 4;
        for (let i = 0; i < 8; i++) {
            let m = 1;
            let x = r * cos(a) + width/2;
            let y = r * sin(a) + height/2;
            let vel = createVector(1,0);
            let hue = map(a, 0, TWO_PI, 0, 360);
            objects.push(new RigidBody(x, y, m, vel.setHeading(a + HALF_PI).mult((-1)**i), hue));
            a += TWO_PI/8;
        }
        background(0);
    }
    else if (mode == 1) {
        centerObject = new RigidBody(width/2, height/2, 250);

        let a = 0;
        let r = width / 4;
        for (let i = 0; i < 4; i++) {
            let m = 1;
            let x = r * cos(a) + width/2;
            let y = r * sin(a) + height/2;
            let vel = createVector(1,0);
            let hue = map(a, 0, TWO_PI, 0, 360);
            objects.push(new RigidBody(x, y, m, vel.setHeading(a + HALF_PI).mult(-1), hue));
            a += TWO_PI/4;
        }
        background(0);
    }
}

function setup() {
    createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

    modeSetup();
    //frameRate(1);
}

function draw() {
    colorMode(RGB);
    background(0, 20);

    let pairCheck = [];
    for (let i = 0; i < objects.length; i++) {
        pairCheck.push([]);
        let L = pairCheck.length;
        for (let j = 0; j < objects.length; j++) {
            if (i == j) {
                pairCheck[L - 1].push(true);
            }
            else {
                pairCheck[L - 1].push(false);
            }
        }
    }

    colorMode(HSL);
    let d, forceMag;
    for (let [i, obj1] of objects.entries()) {
        d = dist(centerObject.pos.x, centerObject.pos.y, obj1.pos.x, obj1.pos.y);
        d = constrain(d, 100, 500);
        forceMag = (G * obj1.mass * centerObject.mass) / (d * d);
        obj1.applyForce(p5.Vector.sub(centerObject.pos, obj1.pos).setMag(forceMag));

        for (let [j, obj2] of objects.entries()) {
            if (!pairCheck[i][j]) {
                d = dist(obj1.pos.x, obj1.pos.y, obj2.pos.x, obj2.pos.y);
                d = constrain(d, 100, max(width, height)/2);
                forceMag = (G * obj1.mass * obj2.mass) / (d * d);
                obj1.applyForce(p5.Vector.sub(obj2.pos, obj1.pos).setMag(forceMag));
                obj2.applyForce(p5.Vector.sub(obj1.pos, obj2.pos).setMag(forceMag));
                pairCheck[i][j] = true;
                pairCheck[j][i] = true;
            }
            obj1.draw();
        }
    }
}

function mouseClicked() {
    mode = (mode + 1) % 2;
    setup();
}

function windowResized() {
    resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}