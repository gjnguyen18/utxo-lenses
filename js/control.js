import * as T from 'three';
import { Container, TextBox } from './pageElements';

const CAMERA_SPEED = 10;
const CAMERA_DECEL_SPEED = 0.99;

const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export class SceneControl {
    constructor(scene, camera, transactionsGrid) {
        this.scene = scene;
        this.camera = camera;
        this.transactionsGrid = transactionsGrid;
        this.mouse = new T.Vector2();
        this.lastMouse = new T.Vector2();
        this.raycaster = new T.Raycaster();
        this.isMouseHold = false;
        this.cameraAccel = new T.Vector2();
        this.highlightedBlock = null;
        this.clickedBlock = null;
        this.selectedBlock = null;
        this.selectedDiv;
    }

    mouseUpdate() {
        // mouse update
        this.lastMouse.x = this.mouse.x;
        this.lastMouse.y = this.mouse.y;

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    onMouseMove(event) {
        // mouse update
        this.mouseUpdate()

        // object highlight
        let blocks = this.transactionsGrid.getBlocks();
        let cubeMeshes = blocks.flat().map((block) => block.getCube());
        this.raycaster.setFromCamera(this.mouse, this.camera);

        let intersect = this.raycaster.intersectObjects(cubeMeshes, false);
        if(intersect.length > 0 && this.transactionsGrid.canHover) {
            let intersectObj = intersect[0].object;
            blocks.flat().forEach(block => {
                if(intersectObj == block.getCube()) {
                    block.toggleHighlight(true);
                    this.highlightedBlock = block;
                } 
                else {
                    block.toggleHighlight(false);
                }
            })
        } 
        else {
            if(this.highlightedBlock) {
                this.highlightedBlock.toggleHighlight(false);
            }
            this.highlightedBlock = null;
        }
        if(this.highlightedBlock && this.transactionsGrid.displayFrom) {
            this.transactionsGrid.displayFrom.label.innerHTML = 
                "From: " + this.highlightedBlock.node1
            this.transactionsGrid.displayTo.label.innerHTML = 
                "To: " + this.highlightedBlock.node2 
            this.transactionsGrid.displayAmount.label.innerHTML = 
                "Transactions Sum: " + this.highlightedBlock.getTransactionsValue();
        }

        if(this.isMouseHold && this.transactionsGrid.canDrag) {
            let deltaX = this.mouse.x - this.lastMouse.x;
            let deltaY = this.mouse.y - this.lastMouse.y;

            this.camera.position.x += -deltaX * CAMERA_SPEED;
            this.camera.position.z += deltaY * CAMERA_SPEED * (window.innerHeight / window.innerWidth);

            this.cameraAccel.x = deltaX;
            this.cameraAccel.y = deltaY;

            this.bindCamera();
        } 
    }

    onMouseDown(event) {
        this.mouseUpdate()
        this.isMouseHold = true;
        if(this.highlightedBlock) {
            this.clickedBlock = this.highlightedBlock;
        }
    }

    onMouseDblClick(event) {
        
    }

    onMouseUp(event) {
        this.isMouseHold = false;
        this.transactionsGrid.canDrag = true;
        if(this.clickedBlock && this.transactionsGrid.canHover && 
            this.lastMouse.x == this.mouse.x && this.lastMouse.y == this.mouse.y && this.highlightedBlock) {

            console.log("Transaction:", this.clickedBlock.node1, this.clickedBlock.node2, "Amount:", this.clickedBlock.transactions)

            if(this.selectedBlock) {
                this.selectedBlock.toggleSelect(false);
            }

            this.selectedBlock = this.clickedBlock;

            if(this.selectedDiv) {
                this.selectedDiv.removeDiv();
            }

            // add to side bar
            this.selectedDiv = new Container("transaction select", "sideDiv", true);
            let displayFrom = new TextBox("transaction from", "sideDiv", "From: " + String(this.clickedBlock.node1));
            let displayTo = new TextBox("transaction to", "sideDiv", "To: " + String(this.clickedBlock.node2));
            this.selectedDiv.addBlock(displayFrom, displayTo)
            let count = 0;
            this.clickedBlock.transactions.sort(function(a, b) {
                return new Date(b.time) - new Date(a.time);
            });
            this.clickedBlock.transactions.forEach(t => {
                if(t.amount > 0) {
                    let transactionContainer = new Container("tCont", "sideDiv", true);
                    let text = new TextBox("transaction amount", "sideDiv", "Amount: " + String(t.amount));
                    let date = new Date(t.time);
                    let text2 = new TextBox("transaction time", "sideDiv", "Time: " + 
                        String(date.getMonth()) + "-" + String(date.getDay()) + "-" + String(date.getFullYear()));
                    transactionContainer.addBlock(text,text2);
                    this.selectedDiv.addBlock(transactionContainer)
                    count += 1;
                }
            })
            if(count == 0) {
                let transactionContainer = new Container("tCont", "sideDiv", true);
                let text = new TextBox("transaction", "sideDiv", "Amount: NA");
                transactionContainer.addBlock(text);
                this.selectedDiv.addBlock(transactionContainer)
            }

            this.selectedBlock.toggleSelect(true);
        }
    }

    update() {
        // camera movement
        if(!this.isMouseHold)  {
            this.cameraAccel.x *= CAMERA_DECEL_SPEED;
            this.cameraAccel.y *= CAMERA_DECEL_SPEED;

            if(Math.abs(this.cameraAccel.x) < 0.005) {
                this.cameraAccel.x = 0;
            }
            if(Math.abs(this.cameraAccel.y) < 0.005) {
                this.cameraAccel.y = 0;
            }

            this.camera.position.x += -this.cameraAccel.x;
            this.camera.position.z += this.cameraAccel.y;

            this.bindCamera();
        }
    }

    bindCamera() {
        if(this.camera.position.x > this.transactionsGrid.maxRange) {
            this.camera.position.x = this.transactionsGrid.maxRange
        }
        if(this.camera.position.x < -this.transactionsGrid.maxRange) {
            this.camera.position.x = -this.transactionsGrid.maxRange
        }
        if(this.camera.position.z > this.transactionsGrid.maxRange) {
            this.camera.position.z = this.transactionsGrid.maxRange
        }
        if(this.camera.position.z < -this.transactionsGrid.maxRange) {
            this.camera.position.z = -this.transactionsGrid.maxRange
        }
    }
}