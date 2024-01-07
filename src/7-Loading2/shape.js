class Shape {
    constructor(type, x, y, w) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.w = w;
        this.rotateDir = random([-1, 1]);
    }

    draw(a) {
        push();
        this.x += 2;
        if (this.x >= width + sqrt(1/4)*this.w) {
            this.x = -sqrt(1/4)*this.w;
        }
        translate(this.x, this.y + abs(sin(a) * 20));
        rotate(this.rotateDir * 0.5*a);
        noStroke();
        if (this.type == 'CIRCLE') {
            fill('#ff1a75');
            circle(0, 0, this.w);
        }
        else if (this.type == 'RECT') {
            // need rectMode(CENTER)
            fill('#66b3ff');
            rect(0, 0, this.w, this.w);
        }
        else if (this.type == 'TRIANGLE') {
            fill('#00ff99');
            triangle(0, -this.w/2, this.w/2, this.w/2, -this.w/2, this.w/2);
        }
        pop();
    }
}