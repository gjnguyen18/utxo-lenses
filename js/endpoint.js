

/*  
    given start and end time, aquire all nodes and transactions 
    that occurred within time frame 
    
    TODO: 
    add query to page load to add link to data
    change colors
    add timestamps
*/

async function fetchDataFromAPI() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/boluwarinayinmode/Utxo-JS/main/database/transformed_data2.json?token=GHSAT0AAAAAACIJJFQPRDVNV3JX7BLQ5NCSZLRJIXA');
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