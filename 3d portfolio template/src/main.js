import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import getLayer from "./getLayer.js"
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { PI } from 'three/tsl';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(16711845, 0, 1000)

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

const pointLight = new THREE.PointLight(11494500)
pointLight.intensity = 15

const ambientLight = new THREE.AmbientLight(11494500)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper)
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
controls.enablePan = false;

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
secondaryCamera.lookAt(new THREE.Vector3(0, 5, -10));

const secondaryScene = new THREE.Scene();
secondaryScene.background = new THREE.Color(0xD61C4E);
const secondaryDirectionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
secondaryScene.add(secondaryCamera, secondaryDirectionalLight)

const cube = new THREE.Mesh(new THREE.BoxGeometry(15,15,15), new THREE.MeshStandardMaterial)
cube.castShadow = true

cube.position.set(-50, 0,-50)
secondaryScene.add(cube)

let video = document.getElementById("pichu");
let videoTexture = new THREE.VideoTexture(video);

// filtering to reduce noise
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

//making an actual texture of the given video
var movieMaterial = new THREE.MeshBasicMaterial({
  map: videoTexture,
  side: THREE.FrontSide,
  toneMapped:false
})

// test object to show movie material
let movieGeometry = new THREE.PlaneGeometry(25, 25, 25, 25);
let movieCubeScreen = new THREE.Mesh(movieGeometry, movieMaterial);

movieCubeScreen.position.set(-50, 0, -50);
scene.add(movieCubeScreen);

const targetMat = new THREE.MeshPhongMaterial({
  map: renderTarget.texture
});
const targetPlane = new THREE.Mesh(new THREE.PlaneGeometry(
  targetPlaneSize.width,
  targetPlaneSize.height, 32), targetMat);
targetPlane.rotation.y = 45
targetPlane.position.set(-15, 7.5, -12)

scene.add(targetPlane);
//tvs
const gltfLoader = new GLTFLoader();
const tv1_rotation = Math.PI; // rotations are in fucking radians broooooooooooo aaaaaaaaaaaaaaaaaaaaaaaaaaaa

gltfLoader.load("crt_hollow.glb", (gltfScene) => {

  gltfScene.scene.rotation.set(0, tv1_rotation  , 0);
  scene.add(gltfScene.scene);
})
const loader = new OBJLoader();
loader.load("crt_shell.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial;
  });
  object.rotation.set(0, tv1_rotation, 0);
  scene.add(object);
});

function cameraProject(){
  secondaryCamera.rotation.x = camera.rotation.x
  secondaryCamera.rotation.y = camera.rotation.y
  secondaryCamera.rotation.z = camera.rotation.z
}

function addStar() {
  const map = new THREE.TextureLoader().load('circle.png');
  const material = new THREE.SpriteMaterial( {map:map, color: 16711709});
  const star = new THREE.Sprite(material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000) );
  star.position.set(x,y,z)
  scene.add(star)
}

Array(250).fill().forEach(addStar)

// window.addEventListener('resize', onWindowResize);

function animate() {
  requestAnimationFrame(animate);

  cameraProject();

  controls.update();

  videoTexture.needsUpdate = true;

  renderer.setRenderTarget(renderTarget);
  renderer.render(secondaryScene, secondaryCamera);
  renderer.setRenderTarget(null);

  renderer.render(scene, camera);

}

animate();


