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

	let spacing = 0.3;

	let dummyData = []
	let cubes = []

	for(let i = 0; i < 5; i++) {
		dummyData.push([])
		for(let k = 0; k < 5; k++) {
			dummyData[i].push(Math.random() * 0.5 + 1)
		}
	}

	console.log(dummyData[0][0])

	const scene = new T.Scene();
	const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	const renderer = new T.WebGLRenderer();

	camera.position.set(5,3,4);

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	for(let i = 0; i < 5; i++) {
		cubes.push([]);
		for(let k = 0; k < 5; k++) {
			let geometry = new T.BoxGeometry(1, dummyData[i][k], 1);
			// this was "MeshBasicMaterial"
			let material = new T.MeshPhongMaterial({ color: 0x00ff00 });
			let cube = new T.Mesh(geometry, material);
			cube.position.x = (i-2) * (1 + spacing);
			cube.position.z = (k-2) * (1 + spacing);
			scene.add(cube);
			cubes.push(cube);
		}
	}

	camera.lookAt(0, 0, 0);

	let ambientLight = new T.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	let pointLight = new T.PointLight(0xffffff, 20);
	pointLight.position.set(5, 8, -5);
	scene.add(pointLight);

	let turnCube = () => {
		// cube.rotation.x += 0.01;
		// cube.rotation.y += 0.01;
	}

	function animate() {
		requestAnimationFrame(animate);

		turnCube();
		renderer.render(scene, camera);
	}

	animate();
}

onWindowOnload(startScene());