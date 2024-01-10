const charSet = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft ";
let vid, lowVid, fullVid;
let w;
alert('TAP or CLICK the screen to play.👍🏻');

function preload() {
}

function setup() {
    createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
    fullVid = createVideo('assets/octahedron.mp4');
    vid = createVideo('assets/octahedron.mp4');
    lowVid = createVideo('assets/octahedron_dark.mp4');
    pixelDensity(1);
    vid.size(width/12, height/12);
    lowVid.size(width/20, height/20);
    w = (width/2) / vid.width;
    lw = (width/2) / lowVid.width;

    vid.hide(); lowVid.hide(); fullVid.hide();
}

function draw() {
    background(50);

    vid.loadPixels();
    lowVid.loadPixels();
    rectMode(CORNER);
    noStroke();
    textSize(lw);
    for (let y = 0; y < lowVid.height; y++) {
        for (let x = 0; x < lowVid.width; x++) {
            let i = (x + y * lowVid.width) * 4;
            let R = lowVid.pixels[i];
            let G = lowVid.pixels[i+1];
            let B = lowVid.pixels[i+2];
            let bChar = charSet[floor(map((R+B+G)/3, 255, 0, 0, charSet.length))];
            fill(R+50,G+50,B+50);
            if (typeof(bChar) != 'string') {
                bChar = 'j';
            }
            text(bChar, x*lw + lw + width/2, lw + y*lw);
            circle(x*lw + lw + random(-1, 1), y*lw + lw + height/2 + random(-1, 1), 0.6*lw + random(-1, 1));
        }
    }
    for (let y = 0; y < vid.height; y++) {
        for (let x = 0; x < vid.width; x++) {
            let i = (x + y * vid.width) * 4;
            let R = vid.pixels[i];
            let G = vid.pixels[i+1];
            let B = vid.pixels[i+2];
            fill(R,G,B);
            rect(x*w + height/2, y*w + width/2, 0.9*w, 0.9*w);
        }
    }

    image(fullVid, 0, 0, width/2, height/2);
}

function mouseClicked() {
    vid.play();
    lowVid.play();
    fullVid.play();
    vid.loop();
    lowVid.loop();
    fullVid.loop();

    //saveGif('genuary2024-10.gif', vid.duration());
}

function windowResized() {
    resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}