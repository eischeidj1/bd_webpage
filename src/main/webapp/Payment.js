
// Main Javascript File
function htmlSafe(data) {
    console.log("data: "+data)

    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}
console.log("hello");
function getJSDateFromSQLDate(sqlDate) {
    // Strip non-digits
    let cleaned = sqlDate.replace(/\D/g, '');
    // Match and group
    let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})/);
    // Create a new Date object
    let resultDate = new Date(match[1], match[2]-1, match[3]);
    return resultDate;
}
function updateTable() {
    // Here's where your code is going to go.
    // Define a URL
    var url = "api/PaymentGetServlet";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done
    $.getJSON(url, null, function(json_result) {
        for (let i = 0; i < json_result.length; i++) {
                // Print the first name
                var javaDate = getJSDateFromSQLDate(json_result[i].date)
                console.log(json_result[i].first);
                $('#datatable tbody').append('<tr><td>'
                    +json_result[i].customerId
                    +'</td><td>'
                    +json_result[i].paymentId
                    +'</td><td>'
                    +htmlSafe(json_result[i].amount)
                    +'</td><td>'
                    +javaDate.toLocaleDateString()
                    +'</td><tr>');
            }
            console.log("Done");
        }

    );
// Any code after this runs IMMEDIATELY and we
// do not wait for the JSON call to complete!



    console.log("updateTable called");
}

// Call your code.
updateTable();
