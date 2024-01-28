const lineDist = 55;
const mouseDist = 100;
const attractDist = 60;
const repelDist = 30;
let starCount = 160;

class Star {
    constructor(x, y, r, hue) {
        this.pos = createVector(x, y);
        this.r = r;
        this.vel = p5.Vector.random2D().mult(random(1, 2));
        this.originVel = this.vel.mag();
        this.acc = createVector(0, 0);
        this.hue = hue;
    }

    move() {
        this.bounce();

        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.acc.set(0, 0);
        this.vel.setMag(this.originVel);
    }

    bounce() {
        if (this.pos.x < this.r) {
            this.pos.x = this.r;
            this.vel.x *= -1;
        }
        else if (this.pos.x > width - this.r) {
            this.pos.x = width - this.r;
            this.vel.x *= -1;
        }
        
        if (this.pos.y < this.r) {
            this.pos.y = this.r;
            this.vel.y *= -1;
        }
        else if (this.pos.y > height - this.r) {
            this.pos.y = height - this.r;
            this.vel.y *= -1;
        }
    }

    repel(dir, maxDist) {
        let force = dir.copy();
        force.setMag(maxDist / dir.mag());
        this.acc.add(force);
    }

    draw(t) {
        fill(this.hue, 80, 100);
        circle(this.pos.x, this.pos.y, this.r * 2 * t);
    }
}

let stars = [];

function setup() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    createCanvas(cnvSize, cnvSize);

    let r;
    if(/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        r = random(2, 4);
        starCount = 80;
    }
    else {
        r = random(3, 10);
        starCount = 160;
    }

    for (let i = 0; i < starCount; i++) {
        stars.push(new Star(random(width), random(height), r, random(0,360)));
    }

    colorMode(HSB, 360, 100, 100, 100);
    // saveGif('genuary2024-27.gif', 10);
}

function draw() {
    background(0, 0, 19.5);

    if (mouseIsPressed) {
        fill('#FF2455');
        circle(mouseX, mouseY, 15);
    }
    else {
        fill('#FFFFFF');
        circle(mouseX, mouseY, 10);    
    }

    for (let star of stars) {
        let md = dist(star.pos.x, star.pos.y, mouseX, mouseY);
        if (md <= mouseDist) {
            let mousePos = createVector(mouseX, mouseY);
            if (mouseIsPressed && md >= attractDist) {
                star.repel(p5.Vector.sub(mousePos, star.pos), 1.5 * mouseDist);
            }
            star.repel(p5.Vector.sub(star.pos, mousePos), mouseDist);
        }

        let adj = 0;
        for (let star2 of stars) {
            if (star2 !== star) {
                let d = dist(star.pos.x, star.pos.y, star2.pos.x, star2.pos.y);
                
                if (d <= repelDist) {
                    star.repel(p5.Vector.sub(star.pos, star2.pos), repelDist);
                }

                if (d <= lineDist) {
                    adj++;
                    stroke(star.hue, 80, 75, map(d, 0, lineDist, 255, 0));
                    strokeWeight(map(d, 0, lineDist, 1.5, 0));
                    line(star.pos.x, star.pos.y, star2.pos.x, star2.pos.y);
                }
            }
        }

        noStroke();
        star.move();
        star.draw(map(adj / starCount, 0, 1, 0.25, 5));
    }
}

function windowResized() {
    let cnvSize = min(windowWidth, windowHeight) * 0.95;
    resizeCanvas(cnvSize, cnvSize);
}