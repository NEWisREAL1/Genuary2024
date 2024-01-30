let sd_shader;

class Mover {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(random(1,2));
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.vel.mult(0.3);
        }
    }

    move() {
        if (this.pos.x >= width - 20 || this.pos.x <= 20) {
            this.vel.x *= -1;
        }

        if (this.pos.y >= height - 20 || this.pos.y <= 20) {
            this.vel.y *= -1;
        }

        this.pos.add(this.vel);
    }
}

function preload() {
    sd_shader = loadShader('shader/sd.vert', 'shader/sd.frag');
}

let movers = [];

function setup() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    createCanvas(cnvSize, cnvSize, WEBGL);
    background(50);

    for (let i = 0; i < 5; i++) {
        movers.push(new Mover(random(width), random(height)));
    }

    shader(sd_shader);
}

function draw() {
    sd_shader.setUniform('fTime', millis()/1000);
    
    for (let i = 0; i < 5; i++) {
        movers[i].move();
        let x = map(movers[i].pos.x, 0, width, -1, 1);
        let y = map(movers[i].pos.y, 0, height, -1, 1);
        sd_shader.setUniform(`mPos${i + 1}`, [x, y]); // pixel size along x and y
    }

    rect(-width/2, -height/2, width, height);
}

function keyTyped() {
    if (key === 's') {
        //saveGif('genuary2024-29.gif', 10);
    }
}

function windowResized() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    resizeCanvas(cnvSize, cnvSize);
}