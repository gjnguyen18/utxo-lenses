import * as T from 'three';

export function sceneInit() {

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

    return {
        scene: scene,
        camera: camera,
        renderer: renderer
    };
}