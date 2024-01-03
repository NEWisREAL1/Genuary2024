class Particle {
    constructor(x, y, v, hue, lifetimeSpeed) {
        this.pos = createVector(x, y);
        this.vel = v;
        this.acc = createVector(0, 0);
        this.lifetime = 255;
        this.lifetimeMult = lifetimeSpeed;
        this.hue = hue;
    }

    applyForce(force) {
        // `force` param is a vector
        this.acc.add(force);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0); // reset acc
        this.lifetime *= this.lifetimeMult;
    }

    draw() {
        colorMode(HSL);
        stroke(this.hue, 50, random(25,75), this.lifetime * 0.5);
        strokeWeight(5);
        point(this.pos.x, this.pos.y);
    }
}

class Firework {
    constructor(x, y, size, num = random(20,100)) {
        this.pos = { x: x, y: y};
        this.prePos = { x: x, y: window.innerHeight };
        this.size = size
        this.particles = [];
        this.num = num;
        if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)) {
            if (this.num > 500) {
                this.num = 200;
            }
            else {
                this.num = random(20,50);
            }
        }
        this.hue = random(360);
        this.lifetimeSpeed = random(0.7,0.98);
        this.bursted = false;
        if (this.num > 500) { // for BigBANG!
            this.lifetimeSpeed = 0.98;
        }
    }

    addParticles() {
        for (let i = 0; i < this.num ; i++) {
            let vel = p5.Vector.random2D().mult(this.size);
            vel.add(p5.Vector.random2D().mult(0.5));
            let particle = new Particle(this.pos.x, this.pos.y, vel, this.hue, this.lifetimeSpeed);
            this.particles.push(particle);
        }
        for (let i = 0; i < this.num; i++) {
            let vel = p5.Vector.random2D().mult(this.size/2);
            vel.add(p5.Vector.random2D().mult(0.5));
            let particle = new Particle(this.pos.x, this.pos.y, vel, this.hue, this.lifetimeSpeed);
            this.particles.push(particle);
        }
    }

    particleDel() {
        for (let [index, particle] of this.particles.entries()) {
            if (particle.lifetime <= 1) {
                this.particles.splice(index, 1);
            }
        }
    }
}