class Particle {
    constructor(x, y, r, vx, vy, time, hue) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = vx;
        this.vy = vy;
        this.hue = hue;
        this.time0 = time;
        this.timer = time;
    }

    update() {
        if (this.x < this.r) {
            this.x = this.r;
            this.vx *= -1;
        }
        else if (this.x + this.r > width) {
            this.x = width - this.r;
            this.vx *= -1;
        }
        if (this.y < this.r - 20) {
            this.y = this.r - 20;
            //this.vy *= -1;
        }
        else if (this.y + this.r > height + 20) {
            this.y = height - this.r + 20;
            //this.vy *= -1;
        }

        if (this.timer <= 0) {
            this.vy *= -1;
            this.timer = this.time0 + random(-5,5);
            if (random() < 0.05) {
                this.time0 += random(-50,50);
            }
        }
        if (this.y >= height - 100 || this.y <= 100) {
            this.timer--;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        fill(this.hue, 20, 60, 30);
        circle(this.x, this.y, 2*this.r);
    }
}

class Blob {
    constructor(x, y, num, hue) {
        this.x = x;
        this.y = y;
        this.n = num;
        this.hue = hue;
        this.time0 = random(250,500);
        this.particles = [];
        let vx = random(-0.2,0.2), vy = random(1,2) * random([-1,1]);
        for (let i = 0; i < this.n; i++) {
            this.particles.push(new Particle(
                this.x + random(-this.n*1.5, this.n*1.5),
                this.y + random(-this.n ,this.n),
                random(15,75), vx, vy, this.time0, this.hue
            ));
        }
    }
}