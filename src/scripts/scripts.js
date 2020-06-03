import "../styles/styles.css";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let scene, camera, renderer, hlight, car, directionalLight, light, light2, light3, light4, controls;
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 800;
    camera.position.y = 200;
    camera.position.z = 800;
    
    hlight = new THREE.AmbientLight();
    scene.add(hlight);
    directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0,1,0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    light = new THREE.PointLight(0xc4c4c4,10);
    light.position.set(0,300,500);
    scene.add(light);

    light2 = new THREE.PointLight(0xc4c4c4,10);
    light2.position.set(500,100,0);
    scene.add(light2);

    light3 = new THREE.PointLight(0xc4c4c4,10);
    light3.position.set(0,100,-500);
    scene.add(light3);

    light4 = new THREE.PointLight(0xc4c4c4,10);
    light4.position.set(-500,300,0);
    scene.add(light4);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    let loader = new GLTFLoader();
    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", renderer);
    loader.load('/model/roadrunner.gltf', (gltf) => {
        car = gltf.scene.children[0];
        car.scale.set(1000,1000,1000);
        scene.add(gltf.scene);
        animate();
    },undefined, err => {
        console.log("err goes here",err);
    });
}
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
init();
