import { createTestButtons } from './testButtons.js';
import { Button, Checkbox, Slider, TextBox } from "./pageElements"

export function initUI(transactionsGrid) {
    /* UI */
    // let leftDiv = document.createElement('div');
    // leftDiv.id = "leftDiv";
    // document.body.appendChild(leftDiv);

    // let rightDiv = document.createElement('div');
    // rightDiv.id = "rightDiv";
    // document.body.appendChild(rightDiv);

    let topDiv = document.createElement('div');
    topDiv.id = "topDiv";
    topDiv.onmousedown = () => {
        transactionsGrid.canDrag = false;
    }
    document.body.appendChild(topDiv);

    let bottomDiv = document.createElement('div');
    bottomDiv.id = "bottomDiv";
    bottomDiv.onmousedown = () => {
        transactionsGrid.canDrag = false;
    }
    document.body.appendChild(bottomDiv);

    let text1 = new TextBox("from display", "topDiv", "From: NA");
    transactionsGrid.displayFrom = text1;
    let text2 = new TextBox("to display", "topDiv", "To: NA");
    transactionsGrid.displayTo = text2;
    let text3 = new TextBox("amount display", "topDiv", "Amount: NA");
    transactionsGrid.displayAmount = text3;
	
    let testSlider = new Slider("Test Slider", "bottomDiv", 0.5, 5, 0.5, 2.5);
    testSlider.label.innerHTML = "Test Slider: 2.5";
    testSlider.slider.oninput = () => {
        testSlider.label.innerHTML = "Test Slider: " + String(testSlider.slider.value);
        //
    }

    let testSlider2 = new Slider("Test Slider2", "bottomDiv", 0.5, 5, 0.5, 2.5);
    testSlider2.label.innerHTML = "Test Slider2: 2.5";
    testSlider2.slider.oninput = () => {
        testSlider2.label.innerHTML = "Test Slider2: " + String(testSlider2.slider.value);
        //
    }
}