let w;
let funcs = [
    (r) => {stroke(random(['#dd4132', '#034f83'])); strokeWeight(w/2);
            if (r > 0.5) line(0, 0, w, w); 
            else line(w, 0, 0, w);
        },
    (r) => {noStroke();
            if (r > 0.75) {fill('#dd4132'); triangle(w, 0, 0, 0, w, w);} 
            else if (r > 0.5) {fill('#034f83'); triangle(0, 0, 0, w, w, w);}
            else if (r > 0.25) {fill('#00997b'); triangle(0, 0, 0, w, w, 0);}
            else {fill('#f5c84b'); triangle(w, w, w, 0, 0, w);}
        },
    (r) => {noStroke(); fill(random(['#dd4132', '#034f83', '#00997b']));
            if (r > 0.5) circle(w/2, w/2, w);
            else circle(w/2, w/2, w/1.5);
        },
    (r) => {noStroke(); fill(random(['#dd4132', '#034f83', '#00997b']));
            if (r > 0.5) rect(w/2, w/2, w, 0.5*w);
            else rect(w/2, w/2, 0.5*w, w);
        }
];

function setup() {
    let cnvSize = min(windowWidth, windowHeight)*0.95;
    createCanvas(cnvSize, cnvSize);
    rectMode(CENTER);
    w = width/100; 
    frameRate(1);
    alert('TAP or CLICK to change style.✏️');
    //saveGif('genuary2024-16_2.gif', 20);
}

let t = 0;
function draw() {
    background(255);
    for(let y = 0; y < 100; y++) {
        for (let x = 0; x < 100; x++) {
            let r = random(0,1);
            push();
            translate(x * w, y * w);
            funcs[t](r);
            pop();
        }
    }
}

function mouseClicked() {
    t = (t + 1) % funcs.length;
    //saveCanvas();
}

function windowResized() {
    let cnvSize = min(windowWidth, windowHeight)*0.95;
    resizeCanvas(cnvSize, cnvSize);
}