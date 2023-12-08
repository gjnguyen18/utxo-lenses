import * as T from 'three';
import { getColorFromRamp } from './helpers.js';
import { sceneInit } from './sceneInit.js';
import { TransactionsGrid } from './transactionBlock.js';
import { SceneControl } from './control.js';
import { initUI } from './UIInit.js';
import { getData } from './endpoint.js';
import { Button } from './pageElements.js';

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

	// default file
	let file = "https://raw.githubusercontent.com/gjnguyen18/utxo-lenses/master/transformed_data2.json"

	console.log(encodeURIComponent("http://127.0.0.1:5501/api/v1/?startTime=2022-11-01T00:00:00Z&endTime=2023-11-30T23:59:59Z"))

	// if query contains link, use that instead
	let urlSearchParams = new URLSearchParams(window.location.search);
	let params = Object.fromEntries(urlSearchParams.entries());
	let link = params.link;
	if (link) {
		file = link;
	} 
	getData(file, (data) => {
		// load data
		transactionsGrid.loadData(data);
		// display grid
		transactionsGrid.setBlocks();
		// UI init
		initUI(transactionsGrid, data);
	})

	// mouse events
	function onMouseMove(event) {
		control.onMouseMove(event);
	}
	function onMouseDown(event) {
		control.onMouseDown(event);
	}
	function onMouseUp(event) {
		control.onMouseUp(event);
	}
	function onWheelEvent(event) {
		control.onWheelEvent(event);
	}
	function onMouseDblClick(event) {
		control.onMouseDblClick(event);
	}
	function onMouseClick(event) {
		control.onMouseClick(event);
	}

	window.addEventListener('mousemove', onMouseMove, false);
	document.body.addEventListener('mousedown', onMouseDown, true);
	document.body.addEventListener('mouseup', onMouseUp, true);
	document.body.addEventListener('wheel', onWheelEvent, true);
	document.body.addEventListener('dblclick', onMouseDblClick, true);
	document.body.addEventListener('click', onMouseClick, true);

	function animate() {
		requestAnimationFrame(animate);
		control.update();
		lights.position.x = camera.position.x;
		lights.position.z = camera.position.z;
		renderer.render(scene, camera);
	}

	animate();
}