import * as T from 'three';

const CAMERA_SPEED = 10;

const CAMERA_DECEL_SPEED = 0.99;

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
                "Amount: " + this.highlightedBlock.getTransactionsValue();
        }

        if(this.isMouseHold && this.transactionsGrid.canDrag) {
            let deltaX = this.mouse.x - this.lastMouse.x;
            let deltaY = this.mouse.y - this.lastMouse.y;

            this.camera.position.x += -deltaX * CAMERA_SPEED;
            this.camera.position.z += deltaY * CAMERA_SPEED * (window.innerHeight / window.innerWidth);

            this.cameraAccel.x = deltaX;
            this.cameraAccel.y = deltaY;
        } 
    }

    onMouseDown(event) {
        this.mouseUpdate()
        this.isMouseHold = true;
        if(this.highlightedBlock) {
            this.clickedBlock = this.highlightedBlock;
        }
    }

    onMouseUp(event) {
        this.isMouseHold = false;
        this.transactionsGrid.canDrag = true;
        if(this.clickedBlock && this.transactionsGrid.canHover) {
            if(this.lastMouse.x == this.mouse.x && this.lastMouse.y == this.mouse.y) {
                console.log("Transaction:", this.clickedBlock.node1, this.clickedBlock.node2, "Amount:", this.clickedBlock.transactions)
            }
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
        }
    }
}