precision highp float;

uniform vec2 uResolution;
uniform float pDensity;
uniform float uTime;

vec3 neonPallete( float t ) {
    vec3 a = vec3( 0.747, 0.272, 0.443);
    vec3 b = vec3( 0.557, 0.774, 0.911);
    vec3 c = vec3( 0.511, 0.713, 0.948);
    vec3 d = vec3( 2.584, 0.395, 0.449);
    return a + b * cos(6.28318 * (c * t + d));
}

float sdHexagon( in vec2 p, in float r )
{
    const vec3 k = vec3(-0.866025404,0.5,0.577350269);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
    return length(p)*sign(p.y);
}

void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord / (uResolution * pDensity) * 2. - 1.;
    uv.x *= uResolution.x / uResolution.y;

    vec2 uv0 = uv;

    vec3 color = vec3(0.0);
    for (float i = 0.0; i < 3.0; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float d = sdHexagon(uv, 0.75);
        d = sin(5.0*d - uTime*0.7)/5.0;
        d = abs(d);
        d = pow(0.01 / d, 1.2);
 
        color += neonPallete(length(uv0) + i*0.7) * d;
    }

    gl_FragColor = vec4(color, 1.0);
}

