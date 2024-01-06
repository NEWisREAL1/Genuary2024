let w, h;
let cols, rows;
let zOff = 0.001;
let mode = 0;
let zReverse = false;

let fontBold;
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function showTime() {
    let time = new Date();
    let hour = time.getHours();
    hour = hour % 12 // convert to AM-PM
    if (hour == 0) hour = 12
    let minute = time.getMinutes();

    textFont(fontBold);
    textAlign(CENTER);
    fill(255);
    textSize(250);
    text(`${hour % 12} : ${String("0" + minute).slice(-2)}`, width/2, height/3);

    let day = days[time.getDay()];
    let month = months[time.getMonth()];
    let date = time.getDate();

    textSize(60);
    text(`${day},  ${month} ${date}`, width/2, height/3 + 100);
}

function preload() {
    fontBold = loadFont('assets/BebasNeue-Regular.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    w = width / 75;
    h = height / 50;
    cols = width / w;
    rows = height / h;

    //saveGif('noise_flow.gif', 120, { units: 'frames' });
}

function draw() {
    colorMode(RGB);
    background(25);
    
    colorMode(HSL);
    for (let i = 0; i < cols + 1; i++) {
        for (let j = 0; j < rows + 1; j++) {
            push();

            translate(i*w, j*h);
            
            let n = noise(i*0.05, j*0.05, zOff);
            rotate(map(n, 0, 1, -TWO_PI, TWO_PI));
            stroke(map(n, 0, 1, -100, 460), 50, 50);

            strokeWeight(map(n, 0, 1, 1, 8));
            line(0, 0, w, 0);
            strokeWeight(map(n, 0, 1, 3, 10));
            point(w, 0);

            pop();
        }
    }

    //showTime();
    
    if (zOff >= TWO_PI || zOff <= 0) {
        //zReverse = !zReverse;
    }
    //if (zOff <= 0) alert('LOOP!');
    if (zReverse) zOff -= TWO_PI / (80*PI);
    else zOff += TWO_PI / (80*PI);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}