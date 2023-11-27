import * as T from 'three';
import { getColorFromRamp } from './helpers';

const COLORS = [new T.Color(0, 1, 0), new T.Color(0.5, 0.5, 0)];
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

        node1.addTransaction(node2, amount);
        node2.addTransaction(node1, amount);

        let key = [id1, id2].toString();

        if(!this.transactions.get(key)) {
            this.transactions.set(key, [])
        }
        this.transactions.get(key).push(amount);
    }

    getTransactions(id1, id2) {
        let transaction = this.transactions.get([id1, id2].toString());
        if(transaction) {
            return transaction;
        } else {
            return [];
        }
    }

    getTransactionsValue(id1, id2) {
        let transaction = this.transactions.get([id1, id2].toString());
        if(transaction) {
            let sum = 0;
            transaction.forEach((i) => sum += i);
            return sum;
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
                let amount = this.getTransactionsValue(nodeArray[i].id, nodeArray[k].id);
                if(amount > max) {
                    max = amount;
                }
            }
        }

        for(let i = 0; i < nodeArray.length; i++) {
            for(let k = 0; k < nodeArray.length; k++) {
                let transactions = this.getTransactions(nodeArray[i].id, nodeArray[k].id);
                let amount = this.getTransactionsValue(nodeArray[i].id, nodeArray[k].id);
                this.blocks[i][k] = new TransactionBlock(nodeArray[i].id, nodeArray[k].id, transactions, amount, max);
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

    clearData() {
        let nodeArray = Array.from(this.nodes, ([id, node]) => ({id, node}));
        for(let i = 0; i < nodeArray.length; i++) {
            for(let k = 0; k < nodeArray.length; k++) {
                this.scene.remove(this.blocks[i][k].getCube())
            }
        }
        this.blocks = [];
        this.nodes = new Map();
        this.transactions = new Map();
    }
}

export class TransactionBlock {
    constructor(node1, node2, transactions, value, max) {
        this.transactions = transactions;
        this.value = value;
        this.globalMax = max;
        this.node1 = node1;
        this.node2 = node2;
        this.color = getColorFromRamp(COLORS, 0);
        this.hlColor = new T.Color("white");

        let geometry = new T.BoxGeometry(BLOCK_WIDTH, (this.value / this.globalMax) * MAX_HEIGHT + MIN_HEIGHT, BLOCK_WIDTH);
        let material = new T.MeshPhongMaterial({ 
            color: this.color
        });
        this.cube = new T.Mesh(geometry, material);
        this.cube.position.y = (((this.value / this.globalMax) * MAX_HEIGHT + MIN_HEIGHT) / 2)
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

    getTransactions() {
        return this.transactions;
    }

    getTransactionsValue() {
        return this.value;
    }

    getCube() {
        return this.cube;
    }
}

export class Node {
    constructor(id) {
        this.id = id;
        this.transactions = new Map();
    }

    addTransaction(otherNode, amount) {
        if(!this.transactions.get(otherNode.id)) {
            this.transactions.set(otherNode.id, [])
        }
        this.transactions.get(otherNode.id).push(amount);
    }
}