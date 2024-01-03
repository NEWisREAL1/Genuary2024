let fireworks = [];
let popSound;

alert('Press or click the screen once if the sound effect doesn\'t load. 👌🏻');

function newFirework(width, height) {
    let firework = new Firework(random(width/10, 9*width/10), random(5*height/10, 2*height/10), random(1,5));
    firework.addParticles();
    return firework;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    popSound = loadSound('assets/pop.mp3');
    
    for (let i = 0; i < 10; i++) {
        fireworks[i] = newFirework(width, height);
    }
    
    let bigBang = new Firework(width/2, height/2, 20, 501);
    bigBang.addParticles();
    fireworks.unshift(bigBang);
    
    //frameRate(30);
}

let isBigBang = true;

function draw() {
    colorMode(RGB);
    background(25, 25, 50, 100);
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(Math.min(width/10, 75));
    text('HAPPY NEW YEAR\n2024', width/2, height/2);

    // update particles
    let gravity = createVector(0, 0.1);
    for (let i = 0; i < fireworks.length; i++) {
        // shooting up phase
        if (fireworks[i].prePos.y > fireworks[i].pos.y) { 
            colorMode(HSL);
            stroke(fireworks[i].hue, 50, 80);
            strokeWeight(8);
            if (fireworks[i].num > 500) {
                fireworks[i].prePos.y -= 2;
            }
            fireworks[i].prePos.y -= 8;
            point(fireworks[i].prePos.x, fireworks[i].prePos.y);
        }
        // bursting phase
        else {
            // new firework if lifetime reach
            if (fireworks[i].particles.length == 0) {
                if (random(1) < 0.25) {
                    fireworks[i] = newFirework(width, height);
                }
            }
            else {
                // remove particle that exceeded its lifetime
                fireworks[i].particleDel();

                if (!fireworks[i].bursted) {
                    popSound.setVolume(fireworks[i].num/100);
                    if (popSound.isLoaded()) {popSound.play();}
                    fireworks[i].bursted = true;
                }
                for (let particle of fireworks[i].particles) {
                    particle.applyForce(gravity);
                    particle.draw();
                }
            }


        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}