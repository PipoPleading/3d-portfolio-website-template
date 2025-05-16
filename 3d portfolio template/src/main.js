import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


renderer.render(scene, camera);
const geometry = new THREE.TorusGeometry(10, 3, 16, 60);
const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const texture = new THREE.TextureLoader().load('background.jpg');
scene.background = texture;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.0025;
  renderer.render(scene, camera);
}

animate();



