let t = 0;
let functions = [
    (a,t) => {return sin(5*a + 2*t) * 20},
    (a,t) => {return sin(15*a + 2*t * sin(4*a)) * 10},
    (a,t) => {return ( sin(15*a + t) + sin(8*a + 2*t + 3.14) ) * 15},
    (a,t) => {return ( sin(3*a-3*t+5)/3 + sin(5*a+3*t+2)/5 + sin(8*a+3*t+4)/8 + sin(13*a-3*t+3)/8 ) * 20},
    (a,t) => {return ( sin(73*a + 1.21*t + 5.8 + 2 * sin(2.15*a + t + 2.4)) ) * 20},
    (a,t) => {return ( sin(27*a+0.2*t+5.79+2.46*sin(16.9*a-1.83*t+1.42)) + 0.8*sin(3.13*a-1.77*t+4.94+2.21*sin(2.10*a+1.86*t+4.55)) ) * 15},
    (a,t) => {return ( sin(20*a + 2*t + 5)**3 ) * 15},
    (a,t) => {return ( sin(1.2*a - t + 1 + 2*sin(21*a + 1.3*t + 5)**5) ) * 35}
];

let colors;

function setup() {
    let cnvSize = min(windowWidth, windowHeight)*0.98;
    createCanvas(cnvSize, cnvSize);
    noFill();

    colors = [
        color(255, 255, 255),
        color(255, 0, 0),
        color(255, 127, 0),
        color(255, 255, 0),
        color(0, 255, 0),
        color(0, 255, 255),
        color(0, 100, 255),
        color(255, 0, 211)
    ];

    //frameRate(40);
    //saveGif('genuary2024-13-1.gif', 120, { units: 'frames' });
}

function draw() {
    translate(width/2, height/2);
    background(50);
    
    let r = 40;
    stroke(255, 100, 100);
    for (let i = 0; i < functions.length; i++) {
        let ri = r * 1.38*(i+1);
        growing(16, color(255, 255, 255));
        stroke(255, 255, 255, 100);
        strokeWeight(1);
        circle(0, 0, 2*ri);
        
        growing(10*(i+1), colors[i]);
        stroke(colors[i]);
        //stroke(255);
        strokeWeight(3);
        //beginShape(POINTS);
        beginShape();
        for (let a = 0; a < TWO_PI; a += TWO_PI/120) {
            let ra = ri + functions[i](a,t);
            let x = ra * cos(a);
            let y = ra * sin(a);
            curveVertex(x, y);
            //vertex(x, y);
        }
        endShape(CLOSE);
        
        fill(200);
        circle(ri*sin(((-1)**i)*t+i), ri*cos(((-1)**i)*t+i), (i+1)*5);
        circle(ri*sin(((-1)**i)*t+i + PI), ri*cos(((-1)**i)*t+i + PI), (i+1)*5);
        noFill();
    }
    t += TWO_PI/60;
}

function growing(blur, color) {
    drawingContext.shadowBlur = blur;
    drawingContext.shadowColor = color;
}

function windowResized() {
    let cnvSize = min(windowWidth, windowHeight)*0.98;
    resizeCanvas(cnvSize, cnvSize);
}