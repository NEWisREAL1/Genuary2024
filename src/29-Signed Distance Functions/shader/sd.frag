precision highp float;

uniform vec2 mPos1;
uniform vec2 mPos2;
uniform vec2 mPos3;
uniform vec2 mPos4;
uniform vec2 mPos5;
uniform float fTime;

varying vec2 vTexCoord;

float len(vec2 center, vec2 coord, float r) {
    float d = sqrt( pow(center.x - coord.x, 2.0) + pow(center.y - coord.y, 2.0) ) - r;
    return 0.0488 / abs(sin(fTime + d * 9.0) / 9.0);
}

void main() {
    vec2 uv = vTexCoord * 2.0 - 1.0;

    vec3 col = vec3(2.0, 0.25, 0.2);

    col *= len(mPos1, uv, 0.22);
    col *= len(mPos2, uv, 0.28);
    col *= len(mPos3, uv, 0.22);
    col *= len(mPos4, uv, 0.21);
    col *= len(mPos5, uv, 0.25);

    gl_FragColor = vec4(col, 0.5);
}