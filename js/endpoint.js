

/*  given start and end time, aquire all nodes and transactions 
    that occurred within time frame */

// export function getData(startTime, endTime) {
//     let nodes = []
//     let transactions = [];

//     let data = fetchDataAndProcess();
//     console.log(data)
//     console.log(data.Nodes)
//     console.log(data.Transactions)

//     nodes = Array.from(data.Nodes);

//     return {
//         nodes: nodes,
//         transactions: transactions
//     }

//     // TODO: replace dummy data with new data
//     const NUM_DUMMY_NODES = 30;
//     const NUM_DUMMY_TRANSACTIONS = 2000;

//     // get nodes
//     for(let i = 0; i < NUM_DUMMY_NODES; i++) {
// 		nodes.push(i);
// 	}

//     // get transactions
//     for(let i = 0; i < NUM_DUMMY_TRANSACTIONS; i++) {

//         let from = Math.floor(Math.random() * NUM_DUMMY_NODES);
//         let to = Math.floor(Math.random() * NUM_DUMMY_NODES);
//         let amount = from != to ? Math.random() * 5 + 1 : 0

//         transactions.push(
//             {
//                 from: from,
//                 to: to,
//                 amount: amount
//             });
//     }

//     return {
//         nodes: nodes,
//         transactions: transactions
//     }
// }

async function fetchDataFromAPI() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/gjnguyen18/utxo-lenses/setup-plus-testData/testData.json');
        return response.data; // Assuming the API response is in the expected format
    } catch (error) {
        console.error('Axios error:', error);
        throw error; // Re-throw the error for the calling code to handle if needed
    }
}

export async function getData(afterFunction = (data) => { }) {
    try {
        const apiData = await fetchDataFromAPI();

        // Process the API data as needed
        const nodes = apiData.data.users;
        const transactions = apiData.data.transactions;

        // Display or use the processed data

        let nodes1 = Array.from(nodes);
        let transactions1 = Array.from(transactions);

        console.log('Nodes:', nodes1);
        console.log('Transactions:', transactions1);

        let data = {
            nodes: Array.from(nodes),
            transactions: Array.from(transactions)
        }

        afterFunction(data);

    } catch (error) {
        // Handle errors if needed
        console.error('Error:', error);
    }
}