import { Button, Checkbox, Slider, TextBox, Element } from "./pageElements"
import { getData } from './endpoint.js';

const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function getDate(value) {
    return MONTHS[value%MONTHS.length] + " " + String(YEARS[Math.floor(value/MONTHS.length)])
}

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
    bottomDiv.onmouseenter = () => {
        transactionsGrid.canHover = false;
    }
    bottomDiv.onmouseleave = () => {
        transactionsGrid.canHover = true;
    }
    document.body.appendChild(bottomDiv);

    let text1 = new TextBox("from display", "topDiv", "From: NA");
    transactionsGrid.displayFrom = text1;
    let text2 = new TextBox("to display", "topDiv", "To: NA");
    transactionsGrid.displayTo = text2;
    let text3 = new TextBox("amount display", "topDiv", "Amount: NA");
    transactionsGrid.displayAmount = text3;

    let numMonths = Number(YEARS.length) * Number(MONTHS.length) - 1;

    let dateRangeText = new TextBox("date range", "bottomDiv", "");

    let updateButton = new Button("Update", "bottomDiv", () => {
        transactionsGrid.clearData();
        let data = getData(Number(slider1.slider.value), Number(slider2.slider.value));
        transactionsGrid.loadData(data);
        transactionsGrid.setBlocks();
    })

    let sliderDiv = new Element("sliderBar", "bottomDiv");
	
    let slider1 = new Slider("Slider 1", "bottomDiv", 0, numMonths, 1, Number(numMonths) - 5);
    let slider2 = new Slider("Slider 2", "bottomDiv", 0, numMonths, 1, numMonths);
    
    slider1.label.innerHTML = getDate((Number(numMonths) - 5));
    slider2.label.innerHTML = getDate(numMonths);

    slider1.slider.oninput = () => {
        if(slider1.slider.value > Number(slider2.slider.value) - 1) {
            slider2.slider.value = Number(slider1.slider.value) + 1;
        }
        if(slider1.slider.value > numMonths-1) {
            slider1.slider.value = numMonths-1;
        }
        updateBar()
    }

    slider2.slider.oninput = () => {
        if(slider1.slider.value > Number(slider2.slider.value) - 1) {
            slider1.slider.value = Number(slider2.slider.value) - 1;
        }
        if(slider2.slider.value < 1) {
            slider2.slider.value = 1;
        }
        updateBar()
    }

    updateBar()

    function updateBar(){
        slider1.label.innerHTML = getDate(slider1.slider.value);
        slider2.label.innerHTML = getDate(slider2.slider.value);

        let percent1 = (slider1.slider.value / numMonths) * 100;
        let percent2 = (slider2.slider.value / numMonths) * 100;
        
        sliderDiv.div.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;

        dateRangeText.label.innerHTML = getDate(slider1.slider.value) + " - " + getDate(slider2.slider.value)
    }
}