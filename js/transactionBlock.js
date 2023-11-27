import * as T from 'three';
import { Node } from './node';
import { getColorFromRamp } from './helpers';

const COLORS = [new T.Color(0, 1, 0), new T.Color(0.5, 0.5, 0)];
const HEIGHT_SCALE = 1.0;
const BLOCK_WIDTH = 1.0;
const SPACING = 0.3;
const MIN_HEIGHT = 0.5;
const MAX_HEIGHT = 2;

export class TransactionsGrid {
    constructor(scene) {
        this.nodes = new Map();
        this.transactions = new Map();
        this.scene = scene;
        this.blocks = [];
        this.canDrag = true;
        this.canHover = true;
        this.displayFrom;
        this.displayTo;
        this.displayAmount;
    }

    addNode(id) {
        this.nodes.set(id, new Node(id));
    }

    addTransaction(id1, id2, amount) {

        let node1 = this.nodes.get(id1);
        let node2 = this.nodes.get(id2);

        node1.setTransaction(node2, amount);
        node2.setTransaction(node1, amount);

        this.transactions.set([id1, id2].toString(), amount);
    }

    getTransaction(id1, id2) {
        let transaction = this.transactions.get([id1, id2].toString());
        if(transaction) {
            return transaction;
        } else {
            return 0;
        }
    }

    loadData(data) {
        data.nodes.forEach((i) => this.addNode(i));
        data.transactions.forEach((t) => {
            this.addTransaction(
                t.from, 
                t.to, 
                t.amount);
        })
    }

    setBlocks() {
        this.blocks = [];
        let nodeArray = Array.from(this.nodes, ([id, node]) => ({id, node}));
        let max = 0;

        for(let i = 0; i < nodeArray.length; i++) {
            this.blocks.push([]);
            for(let k = 0; k < nodeArray.length; k++) {
                let amount = this.getTransaction(nodeArray[i].id, nodeArray[k].id);
                if(amount > max) {
                    max = amount;
                }
            }
        }

        for(let i = 0; i < nodeArray.length; i++) {
            for(let k = 0; k < nodeArray.length; k++) {
                let amount = this.getTransaction(nodeArray[i].id, nodeArray[k].id);
                this.blocks[i][k] = new TransactionBlock(nodeArray[i].id, nodeArray[k].id, amount, max);
                this.blocks[i][k].setPosition(
                    (i - (nodeArray.length / 2)) * (BLOCK_WIDTH + SPACING), 
                    (k - (nodeArray.length / 2)) * (BLOCK_WIDTH + SPACING));
                this.blocks[i][k].recolor(amount / max);
                this.scene.add(this.blocks[i][k].getCube());
            }
        }
    }

    getBlocks() {
        return this.blocks;
    }

    clearBlocks() {
        let nodeArray = Array.from(this.nodes, ([id, node]) => ({id, node}));
        for(let i = 0; i < nodeArray.length; i++) {
            for(let k = 0; k < nodeArray.length; k++) {
                this.scene.remove(this.blocks[i][k].getCube())
            }
        }
        this.blocks = [];
    }
}

export class TransactionBlock {
    constructor(node1, node2, transactions, max) {
        this.transactions = transactions;
        this.globalMax = max;
        this.node1 = node1;
        this.node2 = node2;
        this.color = getColorFromRamp(COLORS, 0);
        this.hlColor = new T.Color("white");

        let geometry = new T.BoxGeometry(BLOCK_WIDTH, (this.transactions / this.globalMax) * MAX_HEIGHT + MIN_HEIGHT, BLOCK_WIDTH);
        let material = new T.MeshPhongMaterial({ 
            color: this.color
        });
        this.cube = new T.Mesh(geometry, material);
        this.cube.position.y = (((this.transactions / this.globalMax) * MAX_HEIGHT + MIN_HEIGHT) / 2)
    }

    recolor(scale) {
        this.color = getColorFromRamp(COLORS, scale);
        this.cube.material.color = this.color;

        this.hlColor = getColorFromRamp([this.color, new T.Color("white")], 0.5);
    }
    
    setPosition(x, z) {
        this.cube.position.x = x;
        this.cube.position.z = z;
    }

    toggleHighlight(highlight) {
        if(highlight) {
            this.cube.material.color = this.hlColor;
        } else {
            this.cube.material.color = this.color;
        }
    }   

    getCube() {
        return this.cube;
    }
}