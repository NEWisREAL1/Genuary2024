const blobs = [];

function setup() {
    let cnv;
    if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        cnv = createCanvas(windowWidth, windowHeight);
    }
    else {
        cnv = createCanvas(min(windowWidth, windowHeight)*0.75, min(windowWidth, windowHeight));
    }
    cnv.class('canvas')

    for (let i = 0; i < 6; i++) {
        blobs.push(new Blob(random(width), random(height), random(30,60), map(i, 0, 6, 0, 360)));
    }

    ellipseMode(CENTER);
    noStroke();
    colorMode(HSL, 360, 100, 100, 100);

    frameRate(60);
    //saveGif('genuary2024-12.gif', 20);
}

function draw() {
    background(0, 0, 20);

    blobs.forEach(blob => {
        blob.particles.forEach(p => {
            p.update();
            p.draw();
        });        
    });
}

function windowResized() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        cnv = resizeCanvas(windowWidth, windowHeight);
    }
    else {
        cnv = resizeCanvas(min(windowWidth, windowHeight)*0.75, min(windowWidth, windowHeight));
    }
}