// import * as THREE from './three.module.js';
import * as THREE from 'three'

export default function example() {    

    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        // alpha:true,  // scene 투명화
        antialias:true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    // renderer.setClearAlpha(1); // scene 반투명화
    renderer.setClearColor(0x00ff00); // '#00ff00'
    renderer.setClearAlpha(0.5);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue'); // scene에 직접 칠한 경우 renderer 설정을 무시(renderer 위에 존재한다고 생각)

    // Camera
    // PerspectiveCamera (눈이 보는 거처럼 원근감), 
    const camera = new THREE.PerspectiveCamera(
        75,                                                         // field of view
        window.innerWidth / window.innerHeight,                     // aspect ratio
        0.1,                                                        // near
        1000                                                        // far
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

    function setSize() {
        // 카메라
        camera.aspect = window.innerwidth / window.innerHeight;
        // 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함.
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    // 이벤트
    window.addEventListener('resize',setSize);
}