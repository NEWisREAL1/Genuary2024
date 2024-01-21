let inputForm;
let font;
let emitters = [];
let prevText;
let cols;

function preload() {
    font = loadFont('RussoOne-Regular.ttf');
}

function updateText() {
    emitters = [];
    let size;
    if(/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        size = min(windowWidth, windowHeight) * 0.1;
    }
    else {
        size = min(windowWidth, windowHeight) * 0.2;
    }
    
    let bound = font.textBounds(inputForm.value(), width/2, height/2, size);
    //rect(bound.x, bound.y, bound.w, bound.h);

    let points = font.textToPoints(inputForm.value(), 0, 0, size, { sampleFactor:  0.25 });
    for (let p of points) {
        emitters.push(new Emitter(p.x + bound.x, p.y + bound.y + bound.h, random(cols)));
    }
}

function setup() {
    let gap = min(windowWidth, windowHeight) * 0.1;
    let cnv = createCanvas(windowWidth - gap, windowHeight - gap);
    inputForm = createInput('T Y P O', 'text');
    cnv.parent('warper');
    inputForm.parent('warper');
    inputForm.class('inputText');
    inputForm.position(gap * 0.6, gap * 0.6);
    
    textAlign(CENTER, CENTER);
    //rectMode(CENTER);
    //textSize(min(windowWidth, windowHeight) * 0.2);
    //textFont(font);
    noStroke();

    cols = [color(255,255,255), color(200,50,65), color(255,222,23), color(133,164,254)];

    prevText = inputForm.value();
    updateText();
}

function draw() {
    background(50);

    if (prevText != inputForm.value()) {
        prevText = inputForm.value();
        updateText();
    }

    for (let e of emitters) {
        e.update();
        let m = floor(random(11, 17));
        if (frameCount % m == 0) {
            e.addParticle();
        }
    }
}

function windowResized() {
    let gap = min(windowWidth, windowHeight) * 0.1;
    resizeCanvas(windowWidth - gap, windowHeight - gap);
    inputForm.position(gap * 0.6, gap * 0.6);
    textSize(min(windowWidth, windowHeight) * 0.2);
}