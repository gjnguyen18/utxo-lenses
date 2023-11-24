import * as T from 'three';
import { getColorFromRamp } from './helpers.js';
import { sceneInit } from './sceneInit.js';
import { TransactionsGrid } from './transactionBlock.js';

export function startScene() {

	// scene setup
	let sceneData = sceneInit();
	const scene = sceneData.scene;
	const camera = sceneData.camera;
	const renderer = sceneData.renderer;

	// transaction data init
	const transactionsGrid = new TransactionsGrid(scene);

	// random dummy data
	for(let i = 0; i < 10; i++) {
		transactionsGrid.addNode(i);
	}

	for(let i = 0; i < 10; i++) {
		for(let k = 0; k < 10; k++) {
			transactionsGrid.addTransaction(i, k, Math.random());
		}
	}

	// display grid
	transactionsGrid.setBlocks();

	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}

	animate();
}