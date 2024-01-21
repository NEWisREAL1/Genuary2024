import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ----- SETUP ----- //

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    // fov, aspect-ratio, near, far 
    75, 1, 0.1, 1000
);
const cnvSize = Math.min(window.innerWidth, window.innerHeight) * 0.98;
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#cnv') });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( cnvSize, cnvSize );

// ----- DRAWING ----- //

camera.position.set(400, 100, 400);

scene.add(new THREE.AmbientLight(0xffffff));

class Star {
    constructor(x, y, z, r, amp, a = 0, color = 0xffffff) {
        this.x = x;
        this.y1 = y;
        this.y2 = y + 200;
        this.z = z;
        this.r = r;
        this.amp = amp;
        this.a = a;
        this.color = color;

        const geometry = new THREE.SphereGeometry(this.r);
        const material = new THREE.MeshStandardMaterial({ color: this.color });
        const sphere1 = new THREE.Mesh(geometry, material);
        const sphere2 = new THREE.Mesh(geometry, material);
        sphere1.position.setX(this.x);
        sphere1.position.setY(this.y1);
        sphere1.position.setZ(this.z);
        sphere2.position.setX(this.x);
        sphere2.position.setY(this.y2);
        sphere2.position.setZ(this.z);
        scene.add(sphere1, sphere2);
        this.mesh1 = sphere1;
        this.mesh2 = sphere2;
    }

    move() {
        // this.x += Math.random() * 2 - 1;
        // this.y += Math.random() * 2 - 1;
        // this.z += Math.random() * 2 - 1;
        // this.mesh.position.setX(this.x);
        // this.mesh.position.setY(this.y);
        // this.mesh.position.setZ(this.z);

        this.y1 = Math.sin(this.a) * this.amp;
        this.y2 = 200 + Math.sin(this.a + Math.PI) * this.amp;
        this.mesh1.position.setY(this.y1);
        this.mesh2.position.setY(this.y2);
        this.a += Math.PI/120;
    }
}

function map(s, a1, a2, b1, b2) {
    return b1 + ((s - a1) * (b2 - b1)) / (a2 - a1);
}

const colors = [ 0x8058AA, 0xDCB5FF, 0xFFEED9, 0xA5BDFD, 0x8DA6FD ];

let stars = [];
for (let x = -500; x <= 500; x += 10) {
    stars.push([]);
    for (let z = -500; z <= 500; z += 10) {
        let d = Math.sqrt(x * x + z * z);
        let amp = 120 - map(d, 0, Math.SQRT2*250, 0, 100);
        let a  = map(d, 0, Math.SQRT2*250, 0, Math.PI*3);
        let r = Math.random() + 0.5;
        stars[stars.length-1].push( new Star(x, 0, z, r, amp, a, colors[Math.floor(Math.random() * 4)]) );
    }
}

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const grid = new THREE.GridHelper(200, 50);
const controls = new OrbitControls(camera, renderer.domElement);
//scene.add(grid);

function animate() {
    requestAnimationFrame( animate );
    
    for (let rows of stars) {
        for (let star of rows) {
            star.move();
        }
    }
    
    controls.update();
    
    renderer.render(scene, camera);
}
animate();