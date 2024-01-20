class Boid {
    constructor(x, y, maxSpeed = 5, maxForce = 0.65, perceptionRadius = 80, c = null, maxPath = 100) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().setMag(random(-2,2));
        this.acc = createVector(0, 0);
        this.maxSpeed = maxSpeed;
        this.maxForce = maxForce;
        this.perceptionRadius = perceptionRadius;
        this.r = random(5,20);
        this.wanderAngle = 0;
        this.color;
        this.maxPath = maxPath;
        this.path = [];
        this.warpPath = [];
        if (c == null) this.color = color(255,255,255);
        else this.color = c;
    }

    seek(boidPos, arriveBehavior = false, arriveRadius = 0) {
        let desired = p5.Vector.sub(boidPos, this.pos)
        if (arriveBehavior) {
            let d = desired.mag();
            if (d < arriveRadius) {
                desired.setMag(map(d, 0, arriveRadius, 0, this.maxSpeed));
            }
            else desired.setMag(this.maxSpeed);
        }
        let steer = p5.Vector.sub(desired, this.vel);
        return steer.limit(this.maxForce);
    }

    flee(boidPos) {
        return this.seek(boidPos).mult(-1);
    }

    pursue(boid, arriveBehavior = false, arriveRadius = 0) {
        let target = boid.pos.copy();
        target.add(p5.Vector.mult(boid.vel, 10));
        return this.seek(target, arriveBehavior, arriveRadius);
    }

    evade(boid) {
        let pursuit = this.pursue(boid);
        return pursuit.mult(-1);
    }

    wander() {
        let wanderDirPoint = this.vel.copy().setMag(100).add(this.pos);
        let wanderRadius = 50;
        //circle(wanderDirPoint.x, wanderDirPoint.y, wanderRadius * 2);
        
        let theta = this.wanderAngle + this.vel.heading();
        let x = wanderRadius * cos(theta);
        let y = wanderRadius * sin(theta);
        wanderDirPoint.add(x, y);
        //circle(wanderDirPoint.x, wanderDirPoint.y, 10);

        let steer = p5.Vector.sub(wanderDirPoint, this.pos);
        return steer.limit(this.maxForce);
    }
    
    isLocalBoid(boid, perceptionRadius) {
        return boid != this && dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y) <= perceptionRadius; 
    }
    
    separation(boids, perceptionRadius) {
        let localBoid = boids.filter((boid) => this.isLocalBoid(boid, perceptionRadius));
        let desired = createVector(0, 0);
        if (localBoid.length > 0) {
            for (let boid of localBoid) {
                let distVec = p5.Vector.sub(this.pos, boid.pos);
                let d = distVec.mag();
                desired.add(distVec.normalize().div(d));
            }
            desired.div(localBoid.length).setMag(this.maxSpeed);
        }
        else {
            return desired; // return 0 force
        }
        let steer = p5.Vector.sub(desired, this.vel);
        return steer.setMag(this.maxForce);
    }

    alignment(boids, perceptionRadius) {
        let localBoid = boids.filter((boid) => this.isLocalBoid(boid, perceptionRadius));
        let desired = createVector(0, 0); // desired velocity = max speed in avg velocity direction
        if (localBoid.length > 0) {
            for (let boid of localBoid) {
                desired.add(boid.vel);
            }
            desired.div(localBoid.length).setMag(this.maxSpeed);
        } 
        else {
            return desired; // return 0 force
        }
        let steer = p5.Vector.sub(desired, this.vel);
        return steer.limit(this.maxForce);
    }

    cohesion(boids, perceptionRadius) {
        let localBoid = boids.filter((boid) => this.isLocalBoid(boid, perceptionRadius));
        let avgPos = createVector(0, 0);
        if (localBoid.length > 0) {
            for (let boid of localBoid) {
                avgPos.add(boid.pos);
            }
            avgPos.div(localBoid.length);
        } 
        else {
            return avgPos; // return 0 force
        }
        return this.seek(avgPos);
    }


    flocking(boids) {
        let flockingForce = createVector(0, 0);
        flockingForce.add(this.alignment(boids, this.perceptionRadius));
        flockingForce.add(this.cohesion(boids, this.perceptionRadius));
        flockingForce.add(this.separation(boids, 0.7 * this.perceptionRadius));

        return flockingForce.limit(this.maxForce);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    edgeWarp(rand = false) {
        if (this.pos.x > width + this.r) {
            this.pos.x = 0;
            if (rand) this.pos.y = random(height);
            this.warpPath = [...this.path]; this.path = [];
        }
        else if (this.pos.x < -this.r) {
            this.pos.x = width;
            if (rand) this.pos.y = random(height);
            this.warpPath = [...this.path]; this.path = [];
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = 0;
            if (rand) this.pos.x = random(width);
            this.warpPath = [...this.path]; this.path = [];
        }
        else if (this.pos.y < -this.r) {
            this.pos.y = height;
            if (rand) this.pos.x = random(width);
            this.warpPath = [...this.path]; this.path = [];
        }
    }

    addPath(x, y) {
        this.path.push({ x: x, y: y, r: floor(random(2, 0.8 * this.r)) });
        if (this.path.length > this.maxPath) {
            this.path.shift();
        }
    }

    showPath() {
        this.color.setAlpha(100);
        noStroke();
        fill(this.color);

        beginShape();
        for (let p of this.warpPath) {
            //vertex(p.x, p.y);
            circle(p.x, p.y, p.r);
        }
        endShape();
        
        if (this.warpPath.length > 0) {
            this.warpPath.shift();
        }
        
        beginShape();
        for (let p of this.path) {
            //vertex(p.x, p.y);
            circle(p.x, p.y, p.r);
        }
        endShape();
    }
    
    show() {
        this.color.setAlpha(255);
        stroke(this.color);
        fill(this.color);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
        pop();
    }
}

class Leader extends Boid {
    constructor(x, y, maxSpeed = 5, maxForce = 0.65, perceptionRadius = 80, c = null) {
        super(x, y, maxSpeed, maxForce, perceptionRadius, c);
        this.vel = createVector(5, 0);
        this.r = 20;
    }
}