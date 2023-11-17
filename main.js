import * as T from 'three';
import { getColorFromRamp } from './helpers.js';

function onWindowOnload(newFunction) {
	let oldFunction = window.onload;
	window.onload = function (ev) {
		if (oldFunction)
			oldFunction.apply(window, ev);
		newFunction();
	};
}

function startScene() {

	// scene setup
	const scene = new T.Scene();
	const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	const renderer = new T.WebGLRenderer();

	camera.position.set(4,7,3);

	camera.lookAt(0, 0, 0);

	let ambientLight = new T.AmbientLight(0xffffff, 0.3);
	scene.add(ambientLight);

	let pointLight = new T.PointLight(0xffffff, 40);
	pointLight.position.set(5, 8, -5);
	scene.add(pointLight);

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// cubes
	let spacing = 0.3;
	let maxVal = 0;

	let dummyData = []
	let cubes = []

	let colors = [new T.Color(0, 1, 0), new T.Color(0.5, 0.5, 0)];

	for(let i = 0; i < 5; i++) {
		dummyData.push([])
		for(let k = 0; k < 5; k++) {
			dummyData[i].push(Math.random() * 2 + 1)
			if(dummyData[i][k] > maxVal) {
				maxVal = dummyData[i][k];
			}
		}
	}

	for(let i = 0; i < 5; i++) {
		cubes.push([]);
		for(let k = 0; k < 5; k++) {
			let geometry = new T.BoxGeometry(1, dummyData[i][k], 1);
			let color1 = getColorFromRamp(colors,  (dummyData[i][k] / maxVal))
			let material = new T.MeshPhongMaterial({ color: color1 });
			let cube = new T.Mesh(geometry, material);
			cube.position.x = (i-2) * (1 + spacing);
			cube.position.z = (k-2) * (1 + spacing);
			cube.position.y = (dummyData[i][k]) / 2 - 1
			scene.add(cube);
			cubes.push(cube);
		}
	}


	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}

	animate();
}

onWindowOnload(startScene());