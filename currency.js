const apiKey = "q0PDqEsMCRcs13c7tCwF8KHaOOJSHvKq";
const apiUrl = "https://api.currencybeacon.com/v1/convert";

document.getElementById("convertBtn").addEventListener("click", () => {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    // Construct the API URL with query parameters
    const url = `${apiUrl}?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&api_key=${apiKey}`;

    console.log("Request URL:", url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            console.log("Response:", data);
            if (data.success) {
                // Display the converted amount if the request was successful
                document.getElementById("convertedAmount").textContent = data.result;
            } else {
                throw new Error(data.error || 'Unknown error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Display error message to the user
            document.getElementById("convertedAmount").textContent = "Failed to fetch data. Please try again later.";
        });
});
