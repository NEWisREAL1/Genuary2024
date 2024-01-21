class Emitter {
    constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.color = col;
        this.particles = [];
    }

    update() {
        for (let [i, p] of this.particles.entries()) {
            if (p.lifetime <= 0) this.particles.splice(i, 1);
            else {
                p.move();
                p.show();
                p.lifetime--;
            };
        }        
    }

    addParticle() {
        this.particles.push(new Particle(this.x, this.y, random(2,5), this.color));
    }
}

class Particle {
    constructor(x, y, r, col) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().setMag(random(0.1, 0.5));
        this.r = r;
        this.color = col;
        this.lifetime = random(25,50);
        this.maxLifetime = this.lifetime
    }

    move() {
        this.pos.add(this.vel);
    }

    show() {
        this.color.setAlpha(map(this.lifetime, 0, this.maxLifetime, 0, 255));
        fill(this.color);
        circle(this.pos.x, this.pos.y, this.r);
    }
}