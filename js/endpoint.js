

/*  given start and end time, aquire all nodes and transactions 
    that occurred within time frame */

export function getData(startTime, endTime) {
    let nodes = []
    let transactions = [];

    // TODO: replace dummy data with new data
    
    const NUM_DUMMY_NODES = 30;

    for(let i = 0; i < NUM_DUMMY_NODES; i++) {
		nodes.push(i);
	}
	for(let i = 0; i < NUM_DUMMY_NODES; i++) {
		for(let k = 0; k < NUM_DUMMY_NODES; k++) {
			transactions.push(
                {
                    from: i,
                    to: k,
                    amount: Math.random() * 5
                });
		}
	}
    return {
        nodes: nodes,
        transactions: transactions
    }
}