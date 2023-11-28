

/*  given start and end time, aquire all nodes and transactions 
    that occurred within time frame */

export function getData(startTime, endTime) {
    let nodes = []
    let transactions = [];

    // TODO: replace dummy data with new data
    const NUM_DUMMY_NODES = 30;
    const NUM_DUMMY_TRANSACTIONS = 2000;

    // get nodes
    for(let i = 0; i < NUM_DUMMY_NODES; i++) {
		nodes.push(i);
	}

    // get transactions
    for(let i = 0; i < NUM_DUMMY_TRANSACTIONS; i++) {

        let from = Math.floor(Math.random() * NUM_DUMMY_NODES);
        let to = Math.floor(Math.random() * NUM_DUMMY_NODES);
        let amount = from != to ? Math.random() * 5 + 1 : 0

        transactions.push(
            {
                from: from,
                to: to,
                amount: amount
            });
    }

    return {
        nodes: nodes,
        transactions: transactions
    }
}