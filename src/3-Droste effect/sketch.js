let loops = [];
let maxNoise = 10;
let zOff = 0;
let reverse = true;

class noiseLoop {
    constructor(_r, fill) {
        this.r = _r;
        this.fill = fill;
    }

    zoom() {
        this.r += 3;
    }

    draw() {
        beginShape();
        fill(this.fill);
        for (let a = 0; a <= 2*PI; a += PI/500) {
            let xOff = map(cos(a), -1, 1, 0, maxNoise);
            let yOff = map(sin(a), -1, 1, 0, maxNoise);
            let r = map(noise(xOff, yOff, zOff), 0, 1, this.r/2, 3*this.r/2);
            let x = r * cos(a) + noise(xOff, yOff) * 10;
            let y = r * sin(a) + noise(xOff, yOff) * 10;
            vertex(x,y);
        }
        endShape(CLOSE);
    }
}

function setup() {
    createCanvas(windowHeight*0.8, windowHeight*0.8);
    let loop = new noiseLoop(1, 0);
    loops.push(loop);

    //saveGif('genuary2024-3', 1200, { units: 'frames', belay: 145});
}

function draw() {
    background(255);
    translate(width/2, height/2);
    
    noStroke();
    for (let [i, loop] of loops.entries()) {
        loop.draw();
        loop.zoom();
        if (loop === loops[loops.length-1] && loop.r >= width/4) {
            if (loop.fill == 0) {
                loops.push(new noiseLoop(1, 255));
            }
            else {
                loops.push(new noiseLoop(1, 0));
            }
        }
        if (loop.r >= width*1.75) {
            loops.splice(i, 1);
            console.log('del');
        }
        //zOff += random(0.001, 0.025);
    }


    // TRY TO DO PERFECT LOOP GIF BUT FAIL!
    // maybe next time XD

    if (zOff >= 15 || zOff <= 0) {
        reverse = !reverse;
        console.log(reverse);
    }

    if (reverse) {
        zOff -= 0.025;
    }
    else {
        zOff += 0.025;
    }
    //maxNoise += random(-0.5,0.5);
    //noLoop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    createCanvas(windowHeight*0.95, windowHeight*0.95);
}