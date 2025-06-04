import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { TTFLoader } from 'three/examples/jsm/Addons.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';
// import { TextGeometry } from 'three/examples/jsm/Addons.js';
// import { getFirstObjectWithName } from './RayCastHelper.js'	
// import {  getFirstCameraInScene, updateCameraAspect  } from './CameraHelper.js'	
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(1443592, 0, 2500) //16711845

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const listener = new THREE.AudioListener();
camera.add(listener);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, 30);

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(11494500)
pointLight.intensity = 15
pointLight.position.set(-3,3,-3)

const ambientLight = new THREE.AmbientLight(11494500)
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper)
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

// const targetPlaneSize = {width: 15, height: 15}
// const targetPlanePosition = {x: -15, y: 7.5, z: -15}
// mission critical???
  // const renderTarget = new THREE.WebGLRenderTarget(
  //   targetPlaneSize.width * 512,
  //   targetPlaneSize.height * 512);

// same as main cam
// const secondaryCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// need to angle it appropriately for the plane, matching consts would be smart
// secondaryCamera.position.set(
//   targetPlanePosition.x,
//   targetPlanePosition.y + 4,
//   targetPlanePosition.z)
// secondaryCamera.rotation.y = 45
// secondaryCamera.lookAt(new THREE.Vector3(0, 5, -10));

// const secondaryScene = new THREE.Scene();
// secondaryScene.background = new THREE.Color(0xD61C4E);
// const secondaryDirectionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
// secondaryScene.add(secondaryCamera, secondaryDirectionalLight)

// const cube = new THREE.Mesh(new THREE.BoxGeometry(15,15,15), new THREE.MeshStandardMaterial)
// cube.castShadow = true

// cube.position.set(-50, 0,-50)
// secondaryScene.add(cube)

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
// let movieGeometry = new THREE.PlaneGeometry(25, 25, 25, 25);
// let movieCubeScreen = new THREE.Mesh(movieGeometry, movieMaterial);

// movieCubeScreen.position.set(-50, 0, -50);
// scene.add(movieCubeScreen);

// const targetMat = new THREE.MeshPhongMaterial({
//   map: renderTarget.texture
// });
// const targetPlane = new THREE.Mesh(new THREE.PlaneGeometry(
//   targetPlaneSize.width,
//   targetPlaneSize.height, 32), targetMat);
// targetPlane.rotation.y = 45
// targetPlane.position.set(-15, 7.5, -12)

// scene.add(targetPlane);

// const ftloader = new FontLoader();

// loader.load( 'assets/fonts/earthbound.ttf', function ( font ) {
// 	const geometry = new TextGeometry( 'Hello three.js!', {
// 		font: font,
// 		size: 80,
// 		depth: 5,
// 		curveSegments: 12,
// 		bevelEnabled: true,
// 		bevelThickness: 10,
// 		bevelSize: 8,
// 		bevelOffset: 0,
// 		bevelSegments: 5
// 	} );
// } );

//tvs
const gltfLoader = new GLTFLoader();
const tv1_rotation = Math.PI; // rotations are in fucking radians broooooooooooo aaaaaaaaaaaaaaaaaaaaaaaaaaaa

gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv1_rotation  , 0);
  gltfScene.scene.position.set(0, 0, 0);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv1_rotation  , 0);
  gltfScene.scene.position.set(5, 0, 0);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv1_rotation  , 0);
  gltfScene.scene.position.set(-5, 0, 0);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv1_rotation  , 0);
  gltfScene.scene.position.set(0, 5, 0);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv1_rotation  , 0);
  gltfScene.scene.position.set(5, 5, 0);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv1_rotation  , 0);
  gltfScene.scene.position.set(-5, 5, 0);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv1_rotation  , 0);
  gltfScene.scene.position.set(0, -5, 0);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv1_rotation  , 0);
  gltfScene.scene.position.set(5, -5, 0);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv1_rotation  , 0);
  gltfScene.scene.position.set(-5, -5, 0);
  scene.add(gltfScene.scene);
})


const objLoader = new OBJLoader();

objLoader.load("crt_shell1.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial;
  });
  object.rotation.set(0, tv1_rotation, 0);  
  object.position.set(-5, 5, 0);
  scene.add(object);
});

objLoader.load("crt_shell2.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(0, 5, 0);
  scene.add(object);
});

objLoader.load("crt_shell3.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(5, 5, 0);
  scene.add(object);
});

objLoader.load("crt_shell4.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(-5, 0, 0);
  scene.add(object);
});

objLoader.load("crt_shell5.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(0, 0, 0);
  scene.add(object);
});

objLoader.load("crt_shell6.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(5, 0, 0);
  scene.add(object);
});

objLoader.load("crt_shell7.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(-5, -5, 0);
  scene.add(object);
});

objLoader.load("crt_shell8.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(0, -5, 0);
  scene.add(object);
});

objLoader.load("crt_shell9.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(5, -5, 0);
  scene.add(object);
});

function addStar() {
  const map = new THREE.TextureLoader().load('star.png');
  const material = new THREE.SpriteMaterial( {map:map, color: 16711709});
  const star = new THREE.Sprite(material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(250) );
  star.position.set(x,y,z)
  scene.add(star)
}

const fontLoader = new FontLoader();
fontLoader.load(
  'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
  (droidFont) => {
    let text = new TextGeometry('hello world', {
      height: 2,
      size: 1,
      depth: 0.01,
      font: droidFont,
    });
    const textMaterial = new THREE.MeshBasicMaterial();
    const textMesh = new THREE.Mesh(text, textMaterial);
    textMesh.position.set(0,0,-10)
    scene.add(textMesh)
  }
)


Array(250).fill().forEach(addStar)

// function onClick(event) {
// 	wheel = getFirstObjectWithName(event, window, camera, scene, "Wheel");

// 	(wheel != null) ? (shouldSpin = !shouldSpin) : null;
// }

window.addEventListener('resize', onWindowResize);

function animate() {
  requestAnimationFrame(animate);

  // const time = new Date().getTime()
  // secondaryDirectionalLight.position.x = Math.cos(time * 0.002) * 10;
  // secondaryDirectionalLight.position.z = Math.sin(time * 0.002) * 10;

  // cameraProject();

  controls.update();

  videoTexture.needsUpdate = true;

  // renderer.setRenderTarget(renderTarget);
  // renderer.setRenderTarget(null);

  renderer.render(scene, camera);

}

animate();


