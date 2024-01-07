class RigidBody {
    constructor(x, y, m, startVel = createVector(0,0), hue = random(0,360)) {
        this.pos = createVector(x,y);
        this.mass = m;
        this.vel = startVel; //startVel has type of p5.Vector;
        this.acc = createVector(0,0);
        this.hue = hue;
    }

    applyForce(force) {
        this.acc.add(force.div(this.mass));
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    } 

    draw() {
        noStroke();
        fill(this.hue, 75, 50);
        circle(this.pos.x, this.pos.y, 10*Math.sqrt(this.mass) + random(-15, 15));
    }
}