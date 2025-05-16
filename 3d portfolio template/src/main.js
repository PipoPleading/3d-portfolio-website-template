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



const testTexture = new THREE.TextureLoader().load('clione.gif');

const clione = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshStandardMaterial( {map: testTexture })
)


// scene.add(clione)

const texture = new THREE.TextureLoader().load('background.jpg');
scene.background = texture;

// Resize handler
function onWindowResize() {
  // need to adjust to stay centered, and maintain ideal ratio of 16:9
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  rednerersetSize(window.innerWidth, window.innerHeight);
}

const targetPlaneSize = {width: 15, height: 15}
const targetPlanePosition = {x: -15, y: 7.5, z: -15}
// target for projection of other game lol
const renderTarget = new THREE.WebGLRenderTarget(
  targetPlaneSize.width * 512,
  targetPlaneSize.height * 512);

// same as main cam
const secondaryCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// need to angle it appropriately for the plane, matching consts would be smart
secondaryCamera.position.set(
  targetPlanePosition.x,
  targetPlanePosition.y + 4,
  targetPlanePosition.z)
// secondaryCamera.rotation.y = 45
secondaryCamera.lookAt(new THREE.Vector3(0, 5, -10));

const secondaryScene = new THREE.Scene();
secondaryScene.background = new THREE.Color(0xD61C4E);
const secondaryDirectionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
secondaryScene.add(secondaryCamera, secondaryDirectionalLight)

// torus.position.set(targetPlanePosition)

// secondaryScene.add(torus);
const cube = new THREE.Mesh(new THREE.BoxGeometry(15,15,15), new THREE.MeshStandardMaterial)
cube.castShadow = true
clione.castShadow = true

cube.position.set(-50, 0,-50)
clione.position.set(-25,3,-25)

secondaryScene.add(cube, clione)


const targetMat = new THREE.MeshPhongMaterial({
  map: renderTarget.texture
  // working, pog
});
const targetPlane = new THREE.Mesh(new THREE.PlaneGeometry(
  targetPlaneSize.width,
  targetPlaneSize.height, 32), targetMat);
targetPlane.rotation.y = 45
targetPlane.position.set(-15, 7.5, -12)

scene.add(targetPlane);

function cameraProject(){
  secondaryCamera.rotation.x = camera.rotation.x
  secondaryCamera.rotation.y = camera.rotation.y
  secondaryCamera.rotation.z = camera.rotation.z
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.35)
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100) );
  star.position.set(x,y,z)
  scene.add(star)
  secondaryScene.add(star)
}

Array(200).fill().forEach(addStar)

function rotations(){
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.0025;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}


window.addEventListener('resize', onWindowResize);

function animate() {
  requestAnimationFrame(animate);

  rotations()

  const time = new Date().getTime()
  secondaryDirectionalLight.position.x = Math.cos(time * 0.002) * 10;
  secondaryDirectionalLight.position.z = Math.sin(time * 0.002) * 10;

  cameraProject();

  controls.update();

  renderer.setRenderTarget(renderTarget);
  renderer.render(secondaryScene, secondaryCamera);
  renderer.setRenderTarget(null);

  renderer.render(scene, camera);
}

animate();



