import * as T from 'three';

function onWindowOnload(newFunction) {
	let oldFunction = window.onload;
	window.onload = function (ev) {
		if (oldFunction)
			oldFunction.apply(window, ev);
		newFunction();
	};
}

function startScene() {
	const scene = new T.Scene();
	const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	const renderer = new T.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	let geometry = new T.BoxGeometry(1, 1, 1);
	// this was "MeshBasicMaterial"
	let material = new T.MeshPhongMaterial({ color: 0x00ff00 });
	let cube = new T.Mesh(geometry, material);
	scene.add(cube);

	let ambientLight = new T.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	let pointLight = new T.PointLight(0xffffff, 1);
	pointLight.position.set(1, 1, 1);
	scene.add(pointLight);

	camera.position.z = 5;

	let turnCube = () => {
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
	}

	function animate() {
		requestAnimationFrame(animate);

		turnCube();
		renderer.render(scene, camera);
	}

	animate();
}

startScene()