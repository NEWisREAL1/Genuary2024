let bg;
let w, h;
let rows = 30, cols = 10;
let grid;
let types = ['horiLine', 'vertLine', '3horiLine', '3vertLine', 
            'blank', 'blank', 'blank', 'blank'];
let colorPalettes = [
    [{R:232, G:74 , B:37 },
     {R:222, G:194, B:64 },
     {R:150, G:143, B:157},
     {R:8  , G:11 , B:24 }],
    
    [{R:212, G:179, B:6  },
     {R:155, G:139, B:123},
     {R:57 , G:74 , B:76 },
     {R:131, G:157, B:129}],

    [{R:173, G:148, B:168},
     {R:144, G:131, B:112},
     {R:110, G:106, B:105},
     {R:48 , G:46 , B:48 }],
     
    [{R:217, G:82 , B:40 },
     {R:255, G:250, B:232},
     {R:31 , G:93 , B:146},
     {R:8  , G:44 , B:64 }],
]
let colors;

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = random(types);
        this.color = random(colors);
    }
}

function preload() {
    bg = loadImage('assets/smooth-fabric.jpg');
}

function setup() {
    createCanvas(windowHeight * 0.95 * 1333/2000, windowHeight * 0.95);
    
    w = width / cols;
    h = height / rows;
    
    rectMode(CENTER);
    noStroke();
    frameRate(1);
    //saveGif('genuary2024-11.gif', 30, { units: 'frames' });
}

function draw() {
    image(bg, 0, 0, width, height);

    colors = random(colorPalettes);
    let bgFil = random(colors);
    fill(bgFil.R, bgFil.G, bgFil.B, 30);
    rect(width/2, height/2, width, height);

    grid = [];
    for (let y = 0; y < rows; y++) {
        grid.push([]);
        for (let x = 0; x < cols; x++) {
            grid[y].push(new Cell(x, y));
        }
    }
    
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x].type != 'blank') {
                let g = grid[y][x];
                let scl = floor(random(1, 6));
                fill(g.color.R, g.color.G, g.color.B, 180);
                if (g.type == 'horiLine') {
                    rect(x*w + w/2, y*h + h/2, w*scl, h*0.75);
                }
                else if (g.type == 'vertLine') {
                    rect(x*w + w/2, y*h + h/2, w*0.75, h*scl);
                }
                else if (g.type == '3horiLine') {
                    rect(x*w + w/2, y*h + h/6,   w*scl, h/6);
                    rect(x*w + w/2, y*h + h/2,   w*scl, h/6);
                    rect(x*w + w/2, y*h + 5*h/6, w*scl, h/6);
                }
                else if (g.type == '3vertLine') {
                    rect(x*w + w/6,   y*h + h/2, w/6, h*scl);
                    rect(x*w + w/2,   y*h + h/2, w/6, h*scl);
                    rect(x*w + 5*w/6, y*h + h/2, w/6, h*scl);
                }
            }
        }
    }

    for (let y = 0; y < rows; y++) {
        let chance = random(0,1);
        if (chance < 0.1) {
            let lineCol = random(colors);
            fill(lineCol.R, lineCol.G, lineCol.B, 250);
            rect(width/2, y*h + h/2, width, h*random(0.5,1));
        }
    }
    
    for (let x = 0; x < cols; x++) {
        let chance = random(0,1);
        if (chance < 0.08) {
            let lineCol = random(colors);
            fill(lineCol.R, lineCol.G, lineCol.B, 250);
            rect(x*w + w/2, height/2, w*random(0.5,1), height);
            if (chance < 0.04) {
                fill(lineCol.R-random(45,90), lineCol.G-random(45,90), lineCol.B-random(45,90), 100);
                rect(x*w+w/2, random(0, height), w*random(0.5,1), random(h, 5*h));
            }
        }
    }

    noLoop();
}

function mouseClicked() {
    redraw();
}

function windowResized() {
    resizeCanvas(windowHeight * 0.95 * 1333/2000, windowHeight * 0.95);
}