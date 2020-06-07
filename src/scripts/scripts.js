import "../styles/styles.css";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
console.log(45*(Math.PI/180))
let scene, 
    camera, 
    renderer, 
    hlight, 
    car, 
    directionalLight, 
    light, 
    light2, 
    light3, 
    light4, 
    controls;
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x3C4144);
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    
    camera.position.set(0,-300,100)
    camera.rotation.set(45*(Math.PI/180),45*(Math.PI/180),45*(Math.PI/180))

    hlight = new THREE.AmbientLight();
    scene.add(hlight);
    directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0,1,0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    light = new THREE.PointLight(0xc4c4c4,1);
    light.position.set(500,-300,100);
    scene.add(light);

    /**
     * light2 = new THREE.PointLight(0xc4c4c4,10);
    light2.position.set(500,100,0);
    scene.add(light2);

    light3 = new THREE.PointLight(0xc4c4c4,10);
    light3.position.set(0,100,-500);
    scene.add(light3);

    light4 = new THREE.PointLight(0xc4c4c4,10);
    light4.position.set(-500,300,0);
    scene.add(light4);
     */

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    let loader = new GLTFLoader();
    controls = new OrbitControls(camera, renderer.domElement);
    loader.load('./model/racecadii.gltf', (gltf) => {
        car = gltf.scene.children[0];
        car.scale.set(1000,1000,1000);
        scene.add(gltf.scene);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
        },
    undefined, 
    err => {
        console.log("err goes here",err);
    });
}
function render(time) {
    time *= 0.001;  // convert time to seconds
   
    car.rotation.z = time;
    //car.rotation.y = time;
   
    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
  }
  
init();

