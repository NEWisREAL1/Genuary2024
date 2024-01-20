class RectMover {
    constructor(x, y, w, color) {
        this.x = x;
        this.y = y;
        this.vx = random(5,10);
        this.vy = random(5,10);
        this.w = w;
        this.color = color;
        this.path = [];
        this.maxPath = floor(random(50,100));
    }

    move() {
        if (this.x >= 0.975 * width - this.w/2) {
            this.x = 0.975 * width - this.w/2;
            this.vx *= -1;
        }
        else if (this.x <= 0.025 * width + this.w/2) {
            this.x = 0.025 * width + this.w/2;
            this.vx *= -1;    
        }
        if (this.y >= 0.975 * height - this.w/2) {
            this.y = 0.975 * height - this.w/2;
            this.vy *= -1;
        }
        else if (this.y <= 0.025 * height + this.w/2) {
            this.y = 0.025 * height + this.w/2;
            this.vy *= -1;    
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    updatePath() {
        this.path.push({ x: this.x, y: this.y});
        if (this.path.length > this.maxPath) {
            this.path.shift();
        }
    }

    show() {
        for (let p of this.path) {
            stroke(this.color);
            rect(p.x, p.y, this.w);
        }
    }
}

let rectMovers = [];
let colors = ['#f12e31', '#036bc0', '#f0bb00'];

function setup() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    createCanvas(cnvSize, cnvSize);
    rectMode(CENTER);
    strokeWeight(5);
    for (let i = 0; i < 3; i++) {
        rectMovers[i] = new RectMover(random(0.025*width, 0.975*width), random(0.025*height, 0.975*height), width/15, colors[i]);
    }

    //saveGif('genuary2024-18.gif', 10);
}

function draw() {
    background(237, 230, 218);
    
    fill(237, 230, 218);
    for (let mover of rectMovers) {
        mover.move();
        mover.updatePath();
        mover.show();
    }

    noStroke();
    fill(0);
    rect(0, height/2, 0.05 * width, height);
    rect(width, height/2, 0.05 * width, height);
    rect(width/2, 0, width, 0.05 * height);
    rect(width/2, height, width, 0.05 * height);
}

function windowResized() {
    setup();
}