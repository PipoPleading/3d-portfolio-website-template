import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
// import { TTFLoader } from 'three/examples/jsm/Addons.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import { PI } from 'three/tsl';
// import { TextGeometry } from 'three/examples/jsm/Addons.js';
// import { getFirstObjectWithName } from './RayCastHelper.js'	
// import {  getFirstCameraInScene, updateCameraAspect  } from './CameraHelper.js'	
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(1443592, 0, 2500) //16711845

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.lookAt(new THREE.Vector3(0, 0, 300));
const listener = new THREE.AudioListener();
camera.add(listener);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, 30);

renderer.render(scene, camera);

// const pointLight = new THREE.PointLight(11494500)
// pointLight.intensity = 15
// pointLight.position.set(-3,3,-3)

const ambientLight = new THREE.AmbientLight(11494500)
scene.add(ambientLight)

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
// controls.enablePan = false;

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

// const secondaryScene = new THREE.Scene();
// secondaryScene.background = new THREE.Color(0xD61C4E);
// const secondaryDirectionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
// secondaryScene.add(secondaryCamera, secondaryDirectionalLight)

// const cube = new THREE.Mesh(new THREE.BoxGeometry(15,15,15), new THREE.MeshStandardMaterial)
// cube.castShadow = true

// cube.position.set(-50, 0,-50)
// secondaryScene.add(cube)

let video1 = document.getElementById("lnc");
let videoTexture1 = new THREE.VideoTexture(video1);

videoTexture1.minFilter = THREE.LinearFilter;
videoTexture1.magFilter = THREE.LinearFilter;

//making an actual texture of the given video
var movieMaterial1 = new THREE.MeshBasicMaterial({
  map: videoTexture1,
  side: THREE.FrontSide,
  toneMapped:false
})

// let video2 = document.getElementById("18st");
// let videoTexture2 = new THREE.VideoTexture(video2);

// videoTexture2.minFilter = THREE.LinearFilter;
// videoTexture2.magFilter = THREE.LinearFilter;

// //making an actual texture of the given video
// var movieMaterial2 = new THREE.MeshBasicMaterial({
//   map: videoTexture2,
//   side: THREE.FrontSide,
//   toneMapped:false
// })

// let video3 = document.getElementById("lnc");
// let videoTexture3 = new THREE.VideoTexture(video3);

// videoTexture3.minFilter = THREE.LinearFilter;
// videoTexture3.magFilter = THREE.LinearFilter;

// //making an actual texture of the given video
// var movieMaterial3 = new THREE.MeshBasicMaterial({
//   map: videoTexture3,
//   side: THREE.FrontSide,
//   toneMapped:false
// })


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
const tv1_rotation = Math.PI; 
const tv2_rotation = Math.PI * 0.33333; 
const tv3_rotation = Math.PI * 1.666666; 

const tv2_offsetx = -9
const tv2_offsetz = -9
const tv3_offsetx = -9
const tv3_offsetz = -9

//#region front

const objLoader = new OBJLoader();

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
//#endregion
//#region side L

gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv2_rotation  , 0);
  gltfScene.scene.position.set(-8.7522, 0, -5.7237);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv2_rotation  , 0);
  gltfScene.scene.position.set(-6.2522, 0, -10.0538);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv2_rotation  , 0);
  gltfScene.scene.position.set(-3.7522, 0, -14.384);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv2_rotation  , 0);
  gltfScene.scene.position.set(-8.7522, 5, -5.7237);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv2_rotation  , 0);
  gltfScene.scene.position.set(-6.2522, 5, -10.0538);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv2_rotation  , 0);
  gltfScene.scene.position.set(-3.7522, 5, -14.384);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv2_rotation  , 0);
  gltfScene.scene.position.set(-8.7522, -5, -5.7237);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv2_rotation  , 0);
  gltfScene.scene.position.set(-6.2522, -5, -10.0538);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv2_rotation  , 0);
  gltfScene.scene.position.set(-3.7522, -5, -14.384);
  scene.add(gltfScene.scene);
})
//#endregion
//#region side R

gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv3_rotation  , 0);
  gltfScene.scene.position.set(8.7522, 0, -5.7237);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv3_rotation  , 0);
  gltfScene.scene.position.set(6.2522, 0, -10.0538);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv3_rotation  , 0);
  gltfScene.scene.position.set(3.7522, 0, -14.384);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv3_rotation  , 0);
  gltfScene.scene.position.set(8.7522, 5, -5.7237);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv3_rotation  , 0);
  gltfScene.scene.position.set(6.2522, 5, -10.0538);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv3_rotation  , 0);
  gltfScene.scene.position.set(3.7522, 5, -14.384);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv3_rotation  , 0);
  gltfScene.scene.position.set(8.7522, -5, -5.7237);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv3_rotation  , 0);
  gltfScene.scene.position.set(6.2522, -5, -10.0538);
  scene.add(gltfScene.scene);
})
gltfLoader.load("crt_hollow.glb", (gltfScene) => {
  gltfScene.scene.rotation.set(0, tv3_rotation  , 0);
  gltfScene.scene.position.set(3.7522, -5, -14.384);
  scene.add(gltfScene.scene);
})
// #endregion
// #region screens
objLoader.load("crt_shell1.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv1_rotation, 0);  
  object.position.set(-5, 5, 0);
  scene.add(object);
});

objLoader.load("crt_shell2.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(0, 5, 0);
  scene.add(object);
});

objLoader.load("crt_shell3.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(5, 5, 0);
  scene.add(object);
});

objLoader.load("crt_shell4.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(-5, 0, 0);
  scene.add(object);
});

objLoader.load("crt_shell5.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(0, 0, 0);
  scene.add(object);
});

objLoader.load("crt_shell6.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(5, 0, 0);
  scene.add(object);
});

objLoader.load("crt_shell7.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(-5, -5, 0);
  scene.add(object);
});

objLoader.load("crt_shell8.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(0, -5, 0);
  scene.add(object);
});

objLoader.load("crt_shell9.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv1_rotation, 0);
  object.position.set(5, -5, 0);
  scene.add(object);
});

//#endregion
//#region L screens
objLoader.load("crt_shell1.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv2_rotation, 0);  
  object.position.set(-3.7522, 5, -14.384);
  scene.add(object);
});

objLoader.load("crt_shell2.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv2_rotation, 0);
  object.position.set(-6.2522, 5, -10.0538);
  scene.add(object);
});

objLoader.load("crt_shell3.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv2_rotation, 0);
  object.position.set(-8.7522, 5, -5.7237);
  scene.add(object);
});

objLoader.load("crt_shell4.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv2_rotation, 0);
  object.position.set(-3.7522, 0, -14.384);
  scene.add(object);
});

objLoader.load("crt_shell5.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv2_rotation, 0);
  object.position.set(-6.2522, 0, -10.0538);
  scene.add(object);
});

objLoader.load("crt_shell6.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv2_rotation, 0);
  object.position.set(-8.7522, 0, -5.7237);
  scene.add(object);
});

objLoader.load("crt_shell7.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv2_rotation, 0);
  object.position.set(-3.7522, -5, -14.384);
  scene.add(object);
});

objLoader.load("crt_shell8.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv2_rotation, 0);
  object.position.set(-6.2522, -5, -10.0538);
  scene.add(object);
});

objLoader.load("crt_shell9.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv2_rotation, 0);
  object.position.set(-8.7522, -5, -5.7237);
  scene.add(object);
});
//#endregion
//#region R screens
objLoader.load("crt_shell1.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv3_rotation, 0);  
  object.position.set(8.7522, 5, -5.7237);
  scene.add(object);
});

objLoader.load("crt_shell2.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv3_rotation, 0);
  object.position.set(6.2522, 5, -10.0538);
  scene.add(object);
});

objLoader.load("crt_shell3.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv3_rotation, 0);
  object.position.set(3.7522, 5, -14.384);
  scene.add(object);
});

objLoader.load("crt_shell4.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv3_rotation, 0);
  object.position.set(8.7522, 0, -5.7237);
  scene.add(object);
});

objLoader.load("crt_shell5.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv3_rotation, 0);
  object.position.set(6.2522, 0, -10.0538);
  scene.add(object);
});

objLoader.load("crt_shell6.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv3_rotation, 0);
  object.position.set(3.7522, 0, -14.384);
  scene.add(object);
});

objLoader.load("crt_shell7.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv3_rotation, 0);
  object.position.set(8.7522, -5, -5.7237);
  scene.add(object);
});

objLoader.load("crt_shell8.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv3_rotation, 0);
  object.position.set(6.2522, -5, -10.0538);
  scene.add(object);
});

objLoader.load("crt_shell9.obj", function (object) {
  object.traverse((mesh) => {
    mesh.material = movieMaterial1;
  });
  object.rotation.set(0, tv3_rotation, 0);
  object.position.set(3.7522, -5, -14.384);
  scene.add(object);
});
//#endregion

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
    textMesh.position.set(22,10,15)
    textMesh.rotation.set(0, tv3_rotation+Math.PI, 0)
    scene.add(textMesh)

    let text2 = new TextGeometry('Late Night Confessional \n\nA game I’ve been working on since October 2024 at Pincushion Heart, \nwith our current goal to get the first act of the game out as a demo \nin the coming months. \n\nLikely the most technical thing I’ve worked on up to this point.\nEvery component has been made with the Godot Engine and Gdscript \nas well as its shader language built on GLSL. \n\nCoding things from state machines, to save systems, to file management \nand manipulation all for this game has been an overall great learning \nand creative experience. \n\nCan’t thank the team enough for everything they do.', {
      height: 2,
      size: 0.5,
      depth: 0.01,
      font: droidFont,
    });
    const textMesh2 = new THREE.Mesh(text2, textMaterial);
    textMesh2.position.set(-32,10,2)
    scene.add(textMesh2)

    let text3 = new TextGeometry('hello world', {
      height: 2,
      size: 1,
      depth: 0.01,
      font: droidFont,
    });
    const textMesh3 = new THREE.Mesh(text3, textMaterial);
    textMesh3.position.set(2.75,10,-35)
    textMesh3.rotation.set(0,tv2_rotation+Math.PI,0)
    scene.add(textMesh3)
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

  videoTexture1.needsUpdate = true;

  // renderer.setRenderTarget(renderTarget);
  // renderer.setRenderTarget(null);

  renderer.render(scene, camera);

}

animate();


