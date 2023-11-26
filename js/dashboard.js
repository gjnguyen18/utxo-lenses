import * as T from 'three';
import { getColorFromRamp } from './helpers.js';
import { sceneInit } from './sceneInit.js';
import { TransactionsGrid } from './transactionBlock.js';
import { SceneControl } from './control.js';
import { initUI } from './UIInit.js';

const NUM_DUMMY_NODES = 30;

export function startScene() {

	// scene init
	let sceneData = sceneInit();
	const scene = sceneData.scene;
	const camera = sceneData.camera;
	const renderer = sceneData.renderer;
	const lights = sceneData.lights;

	// transaction data init
	const transactionsGrid = new TransactionsGrid(scene);
	const control = new SceneControl(scene, camera, transactionsGrid);

	// UI init
	initUI(transactionsGrid);

	// random dummy data
	for(let i = 0; i < NUM_DUMMY_NODES; i++) {
		transactionsGrid.addNode(i);
	}

	for(let i = 0; i < NUM_DUMMY_NODES; i++) {
		for(let k = 0; k < NUM_DUMMY_NODES; k++) {
			transactionsGrid.addTransaction(i, k, Math.random());
		}
	}

	// display grid
	transactionsGrid.setBlocks();

	function onMouseMove(event) {
		control.onMouseMove(event);
	}
	function onMouseDown(event) {
		control.onMouseDown(event);
	}
	function onMouseUp(event) {
		control.onMouseUp(event);
	}

	window.addEventListener('mousemove', onMouseMove, false);
	document.body.addEventListener('mousedown', onMouseDown, true);
	document.body.addEventListener('mouseup', onMouseUp, true);

	function animate() {
		requestAnimationFrame(animate);
		control.update();
		lights.position.x = camera.position.x;
		lights.position.z = camera.position.z;
		renderer.render(scene, camera);
	}

	animate();
}