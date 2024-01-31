precision highp float;

uniform float minX;
uniform float maxX;
uniform float minY;
uniform float maxY;
uniform float uTime;

varying vec2 vTexCoord;

const float MAX_ITERATION = 105.0;
const float THRESHOLD = 4.0;

float iterate(vec2 coord) {
    float x = 0.0;
    float y = 0.0;
    for (float i = 0.0; i < MAX_ITERATION; i++) {
        if ( (x * x) + (y * y) > THRESHOLD) {
            return i; // percentage of how many iteration done
        }
        float newX = ( x * x ) - ( y * y ) + coord.x; // real part
        float newY = 2.0 * x * y + coord.y; // imaginary part
        x = newX;
        y = newY;
    }
    return MAX_ITERATION;
}

vec3 pallete( float t ) {
    vec3 a = vec3( 0.500, 0.500, 0.500 );
    vec3 b = vec3( 0.500, 0.500, 0.500 );
    vec3 c = vec3( 0.100, 0.100, 0.100 );
    vec3 d = vec3( 0.000, 0.333, 0.667 );
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {

    // lerp between max and min
    float x = ((maxX - minX) * vTexCoord.x) + minX; 
    float y = ((maxY - minY) * vTexCoord.y) + minY; 

    vec3 col = vec3(0.0);
    float a = iterate(vec2(x, y));

    if (a == MAX_ITERATION) {
        col *= 0.0;
    }
    else {
        col += pallete(a / 2.0);
    }

    gl_FragColor = vec4(col, 1.0);
    // gl_FragColor = vec4(vTexCoord, 0.0, 1.0);
}