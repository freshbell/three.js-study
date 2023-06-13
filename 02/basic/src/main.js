// import * as THREE from './three.module.js';
import * as THREE from 'three'

/** canvas 추가 */
// 방법 1 - 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement); 

// 방법 2
/*
    .html에 Canva 태그 추가
        => 이 방법을 추천, 깔끔함
*/
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// scene
const scene = new THREE.Scene();

// Camera
// PerspectiveCamera (눈이 보는 거처럼 원근감), 
// const camera = new THREE.PerspectiveCamera(
//     75,                                                         // field of view
//     window.innerWidth / window.innerHeight,                     // aspect ratio
//     0.1,                                                        // near
//     1000                                                        // far
// )

// OrthographicCamera (디아블로 같은 게임, 거리감 X)
const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight),                      // field of view
    window.innerWidth / window.innerHeight,                         // aspect ratio
    1,                                                              // top
    -1,                                                             // bottom
    0.1,                                                            // near
    1000                                                            // far
)

camera.position.x = 3;
camera.position.y = 2;
camera.position.z = 1; // 단위는 상상
camera.lookAt(0, 0, 0);
camera.zoom = 0.5;
camera.updateProjectionMatrix();

// scene에 camera 추가
scene.add(camera);

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);                // 모양
const material = new THREE.MeshBasicMaterial({                  // 재질
    // color: 0xff0000
    color: 'red'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 그리기
renderer.render(scene, camera);