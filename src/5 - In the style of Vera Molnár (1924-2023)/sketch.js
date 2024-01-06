let w, wOff = 0.85;
let maxDist;
let loopFrames = 120, angle = 0;
let zOff = 0;
let hueOff = 0;

function setup() {
    createCanvas(min(windowWidth, windowHeight)*0.95, min(windowWidth, windowHeight)*0.95);

    w = (wOff * width) / 11;
    maxDist = dist(-w/2, -w/2, width/2, height/2);

    //saveGif('genuary2024-5.gif', loopFrames, { units: 'frames' });
}

function draw() {
    colorMode(RGB);
    background(255);
    stroke(0);
    strokeWeight(3);
    
    colorMode(HSL);
    noFill();
    strokeWeight(1);
    translate(width/2 + (w*wOff/2), height/2  + (w*wOff/2));
    for (let i = -(wOff * width)/(2*w); i < (wOff * width)/(2*w); i++) {
        for (let j = -(wOff * height)/(2*w); j < (wOff * height)/(2*w); j++) {
            push();

            let centerDist = dist(-w/2, -w/2, i*w, j*w);
            stroke((map(centerDist, 0, maxDist, 0, 360) + hueOff) % 360, 50, 50, 100);
            translate(i * w, j * w);
            noFill();
            for (let k = 0; k <= 0.4*sqrt(centerDist); k++) {
                push();
                rotate(angle + i*j*QUARTER_PI);
                beginShape();
                vertex(-w/2 + map(noise(zOff), 0, 1, -abs(i*j), abs(i*j))*1.25,  w/2 + map(noise(zOff), 0, 1, -abs(i*j), abs(i*j))*1.25);
                zOff += TWO_PI/(0.025*loopFrames);
                vertex( w/2 + map(noise(zOff), 0, 1, -abs(i*j), abs(i*j))*1.25,  w/2 + map(noise(zOff), 0, 1, -abs(i*j), abs(i*j))*1.25);
                zOff += TWO_PI/(0.025*loopFrames);
                vertex( w/2 + map(noise(zOff), 0, 1, -abs(i*j), abs(i*j))*1.25, -w/2 + map(noise(zOff), 0, 1, -abs(i*j), abs(i*j))*1.25);
                zOff += TWO_PI/(0.025*loopFrames);
                vertex(-w/2 + map(noise(zOff), 0, 1, -abs(i*j), abs(i*j))*1.25, -w/2 + map(noise(zOff), 0, 1, -abs(i*j), abs(i*j))*1.25);
                zOff += TWO_PI/(0.025*loopFrames);
                endShape(CLOSE);
                pop();
            }
        
            pop();

            push();

            let inverseDist = maxDist - dist(-w/2, -w/2, i*w, j*w);
            stroke((map(inverseDist, 0, maxDist, 0, 360) + hueOff) % 360, 50, 50, 100);
            translate(i * w, j * w);
            noFill();
            for (let k = 0; k <= 0.4*sqrt(inverseDist); k++) {
                push();
                rotate(angle + i*j*QUARTER_PI);
                beginShape();
                vertex(-w/2 * 0.3 + map(noise(zOff), 0, 1, 1/-(abs(i*j)+1), 1/(abs(i*j)+1))*20,  w/2 * 0.3 + map(noise(zOff), 0, 1, 1/-(abs(i*j)+1), 1/(abs(i*j)+1))*20);
                zOff += TWO_PI/(0.025*loopFrames);
                vertex( w/2 * 0.3 + map(noise(zOff), 0, 1, 1/-(abs(i*j)+1), 1/(abs(i*j)+1))*20,  w/2 * 0.3 + map(noise(zOff), 0, 1, 1/-(abs(i*j)+1), 1/(abs(i*j)+1))*20);
                zOff += TWO_PI/(0.025*loopFrames);
                vertex( w/2 * 0.3 + map(noise(zOff), 0, 1, 1/-(abs(i*j)+1), 1/(abs(i*j)+1))*20, -w/2 * 0.3 + map(noise(zOff), 0, 1, 1/-(abs(i*j)+1), 1/(abs(i*j)+1))*20);
                zOff += TWO_PI/(0.025*loopFrames);
                vertex(-w/2 * 0.3 + map(noise(zOff), 0, 1, 1/-(abs(i*j)+1), 1/(abs(i*j)+1))*20, -w/2 * 0.3 + map(noise(zOff), 0, 1, 1/-(abs(i*j)+1), 1/(abs(i*j)+1))*20);
                zOff += TWO_PI/(0.025*loopFrames);
                endShape(CLOSE);
                pop();
            }
        
            pop();
        }
    }
    
    angle += TWO_PI/loopFrames;
    hueOff += 360/loopFrames;
    if (frameCount === loopFrames) {
        console.log('loop!');
    }
    //noLoop();
}

function windowResized() {
    resizeCanvas(min(windowWidth, windowHeight)*0.95, min(windowWidth, windowHeight)*0.95);
}