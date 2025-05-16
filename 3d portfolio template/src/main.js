import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const listener = new THREE.AudioListener();
camera.add(listener);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


renderer.render(scene, camera);
const geometry = new THREE.TorusGeometry(10, 3, 16, 60);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff)
//pointLight.position.set(5,5,5)
pointLight.intensity = 15

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper, lightHelper)

const sound = new THREE.Audio( listener);

const audioLoader = new THREE.AudioLoader();

function playAwesome(){
  audioLoader.load( 'awesome.mp3', function(
  buffer) {
    sound.setBuffer(buffer);
    sound.setVolume(0.5);
    sound.play();
  });
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 87){ //w key
    //play sound lol??
    playAwesome();
  }
}

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.35)
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100) );
  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const testTexture = new THREE.TextureLoader().load('clione.gif');

const clione = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: testTexture })
)

clione.position.set(15,0,0)

scene.add(clione)

const texture = new THREE.TextureLoader().load('background.jpg');
scene.background = texture;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.0025;

  controls.update();

  renderer.render(scene, camera);
}

animate();



