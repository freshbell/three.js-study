// import * as THREE from './three.module.js';
import * as THREE from 'three'
import gsap from 'gsap'

// ------- 주제 : 라이브러리를 이용한 애니메이션
// GreenSock

export default function example() {    

    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        // alpha:true,  // scene 투명화
        antialias:true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('black', 3, 7);
    // scene.background = new THREE.Color('blue'); // scene에 직접 칠한 경우 renderer 설정을 무시(renderer 위에 존재한다고 생각)

    // Camera
    // PerspectiveCamera (눈이 보는 거처럼 원근감), 
    const camera = new THREE.PerspectiveCamera(
        75,                                                         // field of view
        window.innerWidth / window.innerHeight,                     // aspect ratio
        0.1,                                                        // near
        1000                                                        // far
    )

    camera.position.y = 1;
    camera.position.z = 5; // 단위는 상상
    camera.lookAt(0, 0, 0);
    camera.zoom = 0.5;
    camera.updateProjectionMatrix();

    // scene에 camera 추가
    scene.add(camera);

    const light = new THREE.DirectionalLight(0xffffff, 1); // (색, 빛의 강도)
    light.position.x = 1;
    light.position.y = 3;
    light.position.z = 5;
    scene.add(light);

    // Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);                // 모양
    const material = new THREE.MeshStandardMaterial({                  // 재질
        // color: 0xff0000
        color: 'red'
    });

    const meshes = [];
    let mesh;
    for (let i = 0 ; i < 10 ; i ++) {
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 5 - 2.5;
        mesh.position.z = Math.random() * 5 - 2.5;
        scene.add(mesh);
        meshes.push(mesh);
    }

    // scene.add(mesh);

    console.log(Date.now());
    let preTime = Date.now();

    function draw() {
        const newTime = Date.now();
        const deltaTime = newTime - preTime;
        preTime = newTime;

        renderer.render(scene, camera);

        // three.js를 이용해서 ar이나 vr같은 파일을 만들 떄 사용
        renderer.setAnimationLoop(draw);
    }

    meshes.forEach(item => {
        gsap.to(
            item.position,
            {
                duration:1,
                y:2, 
                z:3
            }
        );
    })

    function setSize() {
        // 카메라
        camera.aspect = window.innerwidth / window.innerHeight;
        // 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함.
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        draw();
    }

    // 이벤트
    window.addEventListener('resize',setSize);

    draw();
}