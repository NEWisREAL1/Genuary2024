let img;
let magicAngle = Math.atan(Math.SQRT1_2);
let w = 4;

function preload() {
    img = loadImage('./assets/small_mona_lisa.jpg');
}

function setup() {
    createCanvas(min(windowWidth, windowHeight)*0.95, min(windowWidth, windowHeight)*0.95, WEBGL);
    ortho(-img.height*2.5, img.height*2.5, img.height*2.5, -img.height*2.5, 0.1, 1000);
}

let ac = 0, ai = 0;
let maxPhase = Math.PI * 2;
function draw() {
    background(50);
    rotateZ(PI);
    rotateY(-QUARTER_PI + ac);
    directionalLight(255,255,255,0,0,-1);
    directionalLight(255,255,255,0,0,1);

    img.loadPixels();
    for (let x = -img.width/(2); x < img.width/(2); x++) {
        for (let y = -img.height/(2); y < img.height/(2); y++) {
            let i = ((x + img.width/(2)) + (y + img.height/(2)) * img.width) * 4;
            let colors = [img.pixels[i], img.pixels[i+1], img.pixels[i+2]];
            let avg = (colors[0] + colors[1] + colors[2]) / 3;
            let phase = map(dist(0, 0, x * w, y * w), 0, dist(0,0,img.width/2,img.height/2), 0, maxPhase);

            push();
            fill(colors[0], colors[1], colors[2]);
            translate(x * w, y * w, 0);
            box(w - 1, w - 1, floor(map(sin(ai + phase), -1, 1, 1, 100)));
            pop();
        }
    }
    img.updatePixels();
    
    ai += PI/30;
    ac += PI/60;
    //maxPhase += PI/30;
}

function windowResized() {
    resizeCanvas(min(windowWidth, windowHeight)*0.95, min(windowWidth, windowHeight)*0.95);
}