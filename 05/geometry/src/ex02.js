import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: Geometry 기본

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.z = 20;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	// Mesh
	const geometry = new THREE.SphereGeometry(5, 60);
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen',
		side:THREE.DoubleSide,
		// wireframe:true,
		flatShading:true
	});

	const group1 = new THREE.Group();
	const group2 = new THREE.Group();
	const group3 = new THREE.Group();

	const sphere1 = new THREE.Mesh(geometry, material);
	const sphere2 = sphere1.clone();
	const sphere3 = sphere2.clone();

	sphere2.scale.set(0.3, 0.3, 0.3);
	sphere3.scale.set(0.1, 0.1, 0.1);

	group3.position.x = 3.5
	group2.position.x = 15;

	group3.add(sphere3);
	group2.add(sphere2, group3);
	group1.add(sphere1, group2);

	scene.add(group1);

	const positionArray = geometry.attributes.position.array;
	const randomArray = [];

	for (let i = 0; i < positionArray.length; i+= 3) {
		// 정점(vertex) 한 개의 x, y, z 좌표를 랜덤으로 조정
		// xyzxyzxyz....xyz

		positionArray[i] = positionArray[i] + (Math.random() - 0.5) * 0.2
		positionArray[i+1] = positionArray[i+1] + (Math.random() - 0.5) * 0.2
		positionArray[i+2] = positionArray[i+2] + (Math.random() - 0.5) * 0.2

		randomArray[i] = (Math.random() - 0.5) * 0.2;
		randomArray[i+1] = (Math.random() - 0.5) * 0.2;
		randomArray[i+2] = (Math.random() - 0.5) * 0.2;
	}

	// 그리기
	const clock = new THREE.Clock();
	let preTime = clock.getElapsedTime();

	function draw() {
		// const delta = clock.getDelta();
		const time = clock.getElapsedTime();
		const delta = (time - preTime) * 0.001;
		preTime = time;
		for (let i = 0; i < positionArray.length; i+= 3) {
			// 정점(vertex) 한 개의 x, y, z 좌표를 랜덤으로 조정
			// xyzxyzxyz....xyz
			group1.rotation.y += delta;
			group2.rotation.y += delta;
			group3.rotation.y += delta;

			positionArray[i] += Math.sin(time + randomArray[i] * 100) * 0.001;
			positionArray[i+1] += Math.sin(time + randomArray[i] * 100) * 0.001;
			positionArray[i+2] += Math.sin(time + randomArray[i] * 100) * 0.001;

			// positionArray[i+1] = positionArray[i+1] + (Math.random() * 5 - 2.5)
			// positionArray[i+2] = positionArray[i+2] + (Math.random() * 5 - 2.5)
		}

		geometry.attributes.position.needsUpdate = true;
		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
