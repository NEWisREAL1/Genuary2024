class Ball {
    constructor(x, y, r, g, col) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.col = col;
        this.velY = 0;
        this.accY = g;
        // this.terminalVel = 100;
        this.history = [];
        this.maxHist = 20;
    }

    fall() {
        this.velY += this.accY;
        // this.velY = constrain(this.velY, -this.terminalVel, this.terminalVel);
        this.y += this.velY;
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxHist) {
            this.history.shift();
        }
    }

    draw() {
        fill(this.col);
        for (let i = 0; i < this.history.length; i++) {
            circle(this.history[i].x, this.history[i].y, (this.r * 2) * (i / this.maxHist));
        }
    }
}

let balls = [];
let ballCount = 10;
let isPlay = false;
let lastHit = 0;

let osc = [], envs = [], FFT;
let scaleArray = [58, 60, 62, 64, 65, 67, 69, 71, 72, 74];
let visualFrac = 5;

function setup() {
    let cvnSize = min(windowWidth, windowHeight) * 0.95;
    createCanvas(cvnSize, cvnSize);
    
    for (let i = 0; i < scaleArray.length; i++) {
        osc[i] = new p5.TriOsc();
        envs[i] = new p5.Envelope();
        envs[i].setADSR(0.001, 0.5, 0.1, 0.5);
        envs[i].setRange(1, 0);

        let x = map(i, -1, scaleArray.length, 0, width);
        let col = lerpColor( color(241, 20, 132), color(45, 250, 200), i/scaleArray.length );
        balls.push( new Ball(x, height/2, width/40, (i + 2) * PI/16 * width * 0.00005, col) );
    }
    FFT = new p5.FFT();

    alert('TAP the screen to start sound.');
    // saveGif('genuary2024-31.gif', 10);
}

function draw() {
    background(50);
    
    let spectrum = FFT.analyze();
    strokeWeight(1);
    noFill();
    for (let j = 0; j < visualFrac; j++) {
        beginShape();
        stroke(lerpColor( color(121, 255, 105), color(255, 88, 123), j/visualFrac ));
        for (let i = 0; i < spectrum.length; i += 16) {
            let a = map(i, 0, spectrum.length, 0, TWO_PI/visualFrac);
            let r = map(spectrum[i], 0, 255, width/25, height/5);
            let x = r * cos(a + (j * TWO_PI/visualFrac)) + width/2;
            let y = r * sin(a + (j * TWO_PI/visualFrac)) + height/4.7;
            vertex(x, y);
        }
        endShape();
    }
    
    strokeWeight(3);
    fill(180);
    noStroke();
    fill(balls[lastHit].col);
    rect(0, height/1.2, width, height - height/1.2);
    circle(width/2, height/4.7, height/26);
    for (let [i, ball] of balls.entries()) {
        ball.fall();
        if (ball.y + ball.r > height/1.2) {
            ball.y = height/1.2 - ball.r;
            ball.velY *= -1;
            lastHit = i;
            playNote(i);
        }
        stroke(ball.col);
        if (i + 1 < scaleArray.length){
            line(ball.x, ball.y, balls[i + 1].x, balls[i + 1].y);
        }
        noStroke();
        ball.draw();
    }
}

function playNote(index) {
    osc[index].start();
    let midiFeq = midiToFreq(scaleArray[index]);
    osc[index].freq(midiFeq);
    envs[index].play(osc[index], 0, 0.1);
}

function windowResized() {
    let cvnSize = min(windowWidth, windowHeight) * 0.95;
    resizeCanvas(cvnSize, cvnSize);
}