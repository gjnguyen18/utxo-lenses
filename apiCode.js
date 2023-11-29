// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Your HTML Page</title>
// </head>
// <body>
//     <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
//     <script type="module" src="./end.js"></script>
// </body>
// </html>



// <!DOCTYPE html>
// <html lang="en">
//     <head>
//         <meta charset="utf-8">
//         <title>UTXO Lenses</title>
//         <link rel="stylesheet" href="./css/index.css">
//         <style>
//             body { margin: 0; }
//         </style>
//     </head>
//     <body>
//         <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
//         <script type="module" src="./main.js"></script>
//     </body>
// </html>


// // async function fetchDataFromAPI() {
//     try {
//         const response = await axios.get('http://localhost:5501/api/firstRoute/');
//         return response.data; // Assuming the API response is in the expected format
//     } catch (error) {
//         console.error('Axios error:', error);
//         throw error; // Re-throw the error for the calling code to handle if needed
//     }
// }

// async function fetchDataAndProcess() {
//     try {
//         const apiData = await fetchDataFromAPI();

//         // Process the API data as needed
//         const nodes = apiData.data.users;
//         const transactions = apiData.data.transactions;

//         // Display or use the processed data
//         console.log('Nodes:', nodes);
//         console.log('Transactions:', transactions);
//     } catch (error) {
//         // Handle errors if needed
//         console.error('Error:', error);
//     }
// }

// // Call the function when needed
// fetchDataAndProcess();






















// //Fetch Data From API
// async function fetchDataFromAPI() {
//     try {
//         const response = await axios.get('http://localhost:5501/api/firstRoute/');
//         return response.data; // Assuming the API response is in the expected format
//     } catch (error) {
//         console.error('Axios error:', error);
//         throw error; // Re-throw the error for the calling code to handle if needed
//     }
// }



/*  given start and end time, aquire all nodes and transactions 
    that occurred within time frame */

// export async function getData(startTime, endTime) {

//     const nodes = [];
//     const transactions = [];
//     const count = 0;

//     try {
//         const apiData = await fetchDataFromAPI();

//         // Fill up the nodes array
//         for (const user of Object.values(apiData.data.users)) {
//             count++
//             nodes.push(count);
//             console.log(count)
//         }

//         // Fill up the transactions array
//         for (const transactionData of Object.values(apiData.data.transactions)) {
//             const { timestamp, ...transactionWithoutTimestamp } = transactionData;
//             transactions.push(transactionWithoutTimestamp);
//         }

//         // Display or use the processed data
//         // console.log('Nodes:', nodes);
//         // console.log('Transactions:', transactions);

//         // console.log({nodes: nodes,
//         //     transactions: transactions})


//     } catch (error) {

//         // Handle errors if needed

//         console.error('Error:', error);
//     }


//     return {
//         nodes: nodes,
//         transactions: transactions
//     }

// }

