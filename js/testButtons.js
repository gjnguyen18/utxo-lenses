import { Button, Checkbox, Slider } from "./pageElements"

export function createTestButtons(transactionsGid) {
    // let viewFromPointCheck = new Checkbox("View From Point", "bottomLeftDiv", false)
    // viewFromPointCheck.checkbox.onchange = () => {
    //     //
    // }

    let focusDistanceSlider = new Slider("Focus Dist", "bottomLeftDiv", 0.5, 5, 0.01, 2.5);
    focusDistanceSlider.label.innerHTML = "Focus Dist: 2.5";
    focusDistanceSlider.slider.oninput = () => {
        focusDistanceSlider.label.innerHTML = "Focus Dist: " + String(focusDistanceSlider.slider.value);
        //
    }

    // let numCutsSlider = new Slider("Number of Cuts", "bottomLeftDiv", 0, 10, 1, 3);
    // numCutsSlider.label.innerHTML = "Number of Cuts: 3";
    // numCutsSlider.slider.oninput = () => {
    //     numCutsSlider.label.innerHTML = "Number of Cuts: " + String(numCutsSlider.slider.value);
    //     //
    // }

    // let weightNames = [
    //     "Motion F",
    //     "Poses F",
    //     "Forward F",
    //     "Motion V",
    //     "Poses V",
    //     "Forward V",
    // ]
    // for(let i = 0; i < 6; i++) {
    //     let weightSlider = new Slider("w" + String(i), "bottomRightDiv", 0, 1, 0.01, 1);
    //     weightSlider.label.innerHTML = weightNames[i] + ": 1";
    //     weightSlider.slider.oninput = () => {
    //         weightSlider.label.innerHTML = weightNames[i] + ": " + String(weightSlider.slider.value);
    //         //
    //     }
    // }
}