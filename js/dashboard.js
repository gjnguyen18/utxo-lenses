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


async function fetchDataFromAPI() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/gjnguyen18/utxo-lenses/setup-plus-testData/testData.json');
        return response.data; // Assuming the API response is in the expected format
    } catch (error) {
        console.error('Axios error:', error);
        throw error; // Re-throw the error for the calling code to handle if needed
    }
}

async function fetchDataAndProcess() {
    try {
        const apiData = await fetchDataFromAPI();

        // Process the API data as needed
        const nodes = apiData.data.users;
        const transactions = apiData.data.transactions;

        // Display or use the processed data
        console.log('Nodes:', nodes);
        console.log('Transactions:', transactions);
    } catch (error) {
        // Handle errors if needed
        console.error('Error:', error);
    }
}

// Call the function when needed
fetchDataAndProcess();




	// random dummy data
	for(let i = 0; i < NUM_DUMMY_NODES; i++) {
		transactionsGrid.addNode(i);
	}

	for(let i = 0; i < NUM_DUMMY_NODES; i++) {
		for(let k = 0; k < NUM_DUMMY_NODES; k++) {
			transactionsGrid.addTransaction(i, k, Math.random());
		}
	}

	// Nodes are users and addtransactions in the format of from, to and amount 
	// Mark line over blocks

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