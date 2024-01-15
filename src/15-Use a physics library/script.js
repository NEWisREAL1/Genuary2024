// aliases
let Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;
// create an engine
let engine = Engine.create();
// create and run a runner
let runner = Runner.create();

let pendulums = [];
let mCon;

class Ball {
    constructor(x, y, r, opt, hue) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hue = hue;
        this.body = Bodies.circle(x, y, r, opt);
        Composite.add(engine.world, this.body);
    }
    show() {
        if (this.hue == -1) fill(0, 100, 0);
        else fill(this.hue, 100, 100);
        let pos = this.body.position;
        circle(pos.x, pos.y, this.r*2);
    }
}

function setup() {
    let cnvSize = min(windowWidth, windowHeight);
    //let cnv = createCanvas(cnvSize, cnvSize);
    let cnv = createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    colorMode(HSB);
    
    let gap = width/17;
    for (let x = 6*gap; x <= 10*gap+0.1; x += gap) {
        pendulums.push([]);
        let opt = {
            isStatic: true,
            restitution: 1,
            frictionStatic: 0,
            frictionAir: 0,
            friction: 0
        }
        pendulums[pendulums.length-1].push(new Ball(x + gap/2, height/7, gap/5, opt, -1));
        opt.isStatic = false;
        if (x == 6*gap) {
            pendulums[pendulums.length-1].push(new Ball(x + gap/2 - 2*height/7, height/7, gap/2, opt, map(x, 6*gap, 10*gap, 0, 270)));
            pendulums[pendulums.length-1].push(new Ball(x + gap/2 - 4*height/7, height/7, gap/2, opt, map(x, 6*gap, 10*gap, 20, 300)));
        }
        else {
            pendulums[pendulums.length-1].push(new Ball(x + gap/2, 3*height/7, gap/2, opt, map(x, 6*gap, 10*gap, 0, 270)));
            pendulums[pendulums.length-1].push(new Ball(x + gap/2, 5*height/7, gap/2, opt, map(x, 6*gap, 10*gap, 20, 300)));
        }
    }

    for (let pendulum of pendulums) {
        for (let i = 0; i < pendulum.length - 1; i++) {
            let A = pendulum[i], B = pendulum[i+1];
            let constraint = Constraint.create({
                bodyA: A.body,
                bodyB: B.body,
                length: dist(A.x, A.y, B.x, B.y),
                angularStiffness: 0.7,
                stiffness: 0.9
            })
            Composite.add(engine.world, constraint);
        }
    }

    let cnvMouse = Mouse.create(cnv.elt);
    cnvMouse.pixelRatio = pixelDensity();
    mCon = MouseConstraint.create(engine, {
        mouse: cnvMouse
    });
    Composite.add(engine.world, mCon);
}

function draw() {
    background(245);
    stroke(0);
    for (let c of engine.world.constraints) {
        if (c.label != 'Mouse Constraint') {
            let A = c.bodyA, B = c.bodyB;
            line(A.position.x, A.position.y, B.position.x, B.position.y);
        }
    }

    noStroke();
    for (let pendulum of pendulums) {
        for (let ball of pendulum) {
            ball.show();
        } 
    }

    Engine.update(engine);
}

function windowResized() {
    let cnvSize = min(windowWidth, windowHeight);
    resizeCanvas(windowWidth, windowHeight);
}