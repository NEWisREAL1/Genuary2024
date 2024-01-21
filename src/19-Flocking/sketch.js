let boids = [];

function setup() {
    let gap = min(windowWidth, windowHeight) * 0.05;
    createCanvas(windowWidth - gap, windowHeight - gap);
    
    let cols = [color(0,0,0), color(190,30,45), color(255,222,23), color(33,64,154)];
    let n, perceptionRadius;
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        n = 50;
        perceptionRadius = width/8;
    }
    else {
        n = 90;
        perceptionRadius = width/18;
    }
    for (let i = 0; i < n; i++) {
        boids.push(new Boid(random(width), random(height), 4, 0.15, width/8, random(cols), random(30,80)));
    }

    //saveGif('genuary2024-19.gif', 10);
}

function draw() {
    background(255, 244, 228);
    
    for (let boid of boids) {
        let flockingForce = boid.flocking(boids);
        boid.applyForce(flockingForce);
    }
    
    boids.forEach(boid => {
        boid.update();
        boid.edgeWarp(true);

        boid.addPath(boid.pos.x, boid.pos.y);
        boid.showPath();
    });
    boids.forEach(boid => {
        strokeWeight(2);
        boid.show();
    });
}

function windowResized() {
    let gap = min(windowWidth, windowHeight) * 0.05;
    resizeCanvas(windowWidth - gap, windowHeight - gap);
}