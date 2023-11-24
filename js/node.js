
export class Node {
    constructor(id) {
        this.id = id;
        this.transactions = new Map();
    }

    setTransaction(otherNode, amount) {
        this.transactions.set(otherNode.id, amount);
    }
}