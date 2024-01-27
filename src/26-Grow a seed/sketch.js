class Seed {
    constructor(string, root, y, platte) {
        this.string = string;
        this.root = root;
        this.y = y;
        this.vel = 0;
        this.gen = 0;
        this.maxGen = random([4,5]);
        this.history = [this.string];
        this.growth = 1;
        this.state = 'falling';
        this.palette = platte;
        this.palette.push(random(stemColors)); // for stem
        this.palette.push(random(stemColors)); // for leaf
        this.lifetime = random(300, 600) // frames

        this.angle = random(15,30);
        this.len = random(2.75,5.75);
        this.growRate = random(0.1,0.2);
    }
}

let seeds = [];
const angle = 25;
const len = 4;
const growRate = 0.1;
const gravity = 1;

const pallets = [
    ['#FCE7E6', '#F6847A'],
    ['#EA5329', '#FABF4A'],
    ['#FBD1FB', '#6B3395'],
    ['#FBD1FB', '#B4AC36'],
    ['#FABAB5', '#F6C492'],
    ['#F44051', '#F7D43C'],
    ['#99C8FF', '#5F56FA'],
];

const stemColors = ['#C6DD7C', '#A2C794', '#8BA361'];

const rules = {
    'X': [
        { rule: "(F[+X][-X]FX)",  prob: 0.45  },

        { rule: "(F[+X]FX)",      prob: 0.10  },
        { rule: "(F[-X]FX)",      prob: 0.10  },
        { rule: "(F[++X]FX)",     prob: 0.025  },
        { rule: "(F[--X]F)X",     prob: 0.025  },

        { rule: "(F[-FX-L++L]X)", prob: 0.012  },
        { rule: "(F[+FX+L--L]X)", prob: 0.012 },
        { rule: "(F[-FX-A++B]X)", prob: 0.013  },
        { rule: "(F[+FX+A--B]X)", prob: 0.013 },

        { rule: "(F[+++X][-X]FX)", prob: 0.01  },
        { rule: "(F[---X][+X]FX)", prob: 0.01  },

        { rule: "(F[+X][-X]FL)",  prob: 0.15 },
        { rule: "(F[+X][-X]FA)",  prob: 0.07 },
        { rule: "(F[+X][-X]FB)",  prob: 0.07 },
    ],
    'F': [
        { rule: "F(F)" , prob: 0.90 },
        { rule: "F"  ,   prob: 0.08 },
        { rule: "F(FF)", prob: 0.02 },
    ],
    "(": "",
    ")": "",
}

let drawRules;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    background(50);
    strokeWeight(1.5);
    stroke(255);

    drawRules = {
        'F': (t, color, len, angle) => { 
            stroke(color[2]);
            line(0, 0, 0, -len * t); 
            translate(0, -len * t);
        },
        'A': (t, color, len, angle) => {
            noStroke();
            fill(color[0]);
            circle(0, 0, 1.5 * len * t);
        },
        'B': (t, color, len, angle) => {
            noStroke();
            fill(color[1]);
            circle(0, 0, 1.75 * len * t);
        },
        'L': (t, color, len, angle) => {
            noStroke();
            fill(color[3]);
            ellipse(0, 0,  1.25 * len * t, 2.5 * len * t);
        },
        '-': (t, color, len, angle) => { rotate(angle * t); },
        '+': (t, color, len, angle) => { rotate(-angle * t); },
        '[': () => { push(); },
        ']': () => { pop(); }
    }
}

function draw() {
    background(80);

    for (let [i, seed] of seeds.entries()) {
        if (seed.state == 'falling') {
            if (seed.y >= height) {
                seed.state = 'growing';
            }; 
            seed.vel = constrain(seed.vel + gravity, 0, 10);
            seed.y += seed.vel;
            noStroke(); fill('#fdf5ee');
            circle(seed.root, seed.y, 2*len);
        }
        else if (seed.state == 'growing') {
            if (seed.growth < 1) {
                let slowFactor = seed.gen + seed.growth;
                seed.growth += seed.growRate / slowFactor;
            }
            else if (seed.gen <= seed.maxGen) {
                seed.string = nextGen(seed.string);
                if (seed.gen != seed.maxGen) seed.history.push(seed.string);
                seed.gen++;
                seed.growth = 0;
            }
            
            push();
            translate(seed.root, height);
            lerpDraw(seed);
            pop();
            
            seed.lifetime--;
            if (seed.lifetime <= 0) seed.state = 'shrinking';
        }
        else if (seed.state == 'shrinking') {
            if (seed.growth > 0) {
                let slowFactor = seed.gen + seed.growth;
                seed.growth -= seed.growRate / slowFactor;
            }
            else if (seed.gen > 0) {
                seed.string = seed.history.pop();
                seed.gen--;
                seed.growth = 1;
            }
            else if (seed.gen == 0) {
                seeds.splice(i, 1);
            }
        
            push();
            translate(seed.root, height);
            lerpDraw(seed);
            pop();
        }
    }
}

function mouseClicked() {
    seeds.push(new Seed('X', mouseX, mouseY, random(pallets)));
}

function nextGen(string) {
    let nextGen = "";
    for (let i = 0; i < string.length; i++) {
        if (string[i] in rules) {
            if (Array.isArray(rules[string[i]])) {
                nextGen += randomRule(rules[string[i]]);
            }
            else {
                nextGen += rules[string[i]];
            }
        }
        else {
            nextGen += string[i];
        }
    }
    return nextGen;
}

function randomRule(ruleSet) {
    let r = random();
    let t = 0;
    for (let rule of ruleSet) {
        t += rule.prob;
        if (t > r) {
            return rule.rule;
        }
    }
    return "!"; // ERROR!
}

function lerpDraw(seed) {
    seed.growth = constrain(seed.growth, 0, 1);

    let lerp = false;

    for (let i = 0; i < seed.string.length; i++) {

        if (seed.string[i] == '(') lerp = true;
        else if (seed.string[i] == ')') lerp = false;

        if (seed.string[i] in drawRules) {
            if (lerp) drawRules[seed.string[i]](seed.growth, seed.palette, seed.len, seed.angle);
            else drawRules[seed.string[i]](1, seed.palette, seed.len, seed.angle);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}