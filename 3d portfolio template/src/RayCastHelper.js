import * as THREE from 'three';

export function getFirstObjectWithName(event, window, camera, scene, name){
    
    const raycaster = new THREE.Raycaster();
    const getFirstValue = true;

    const mousePointer = getMouseVector2(event, window);
	const intersections = checkRayIntersections(mousePointer, camera, raycaster, scene, getFirstValue);
	const hitList = getObjectsByName(intersections, name);

    if(typeof hitList[0] !== 'undefined'){
        return hitList[0]
    }

    return null;
}

export function getMouseVector2(event, window){
    let mousePointer = new THREE.Vector2()

    mousePointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	mousePointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    return mousePointer;
}

export function checkRayIntersections(mousePointer, camera, raycaster, scene) {
    raycaster.setFromCamera(mousePointer, camera);

    let intersections = raycaster.intersectObjects(scene.children, true);

    return intersections;
}

export function getObjectsByName(objectList, name){
    const hitObjects = [];
    
    objectList.forEach((object) => {
        const objectName = object.object.name || "Unnamed Object";
        objectName.includes(name) ? hitObjects.push(object.object) : null;
    });

    return hitObjects;
}
