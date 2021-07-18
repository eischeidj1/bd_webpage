
// Main Javascript File
function htmlSafe(data) {
    console.log("data: "+data)

    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}
console.log("hello");
function updateTable() {
    // Here's where your code is going to go.
    // Define a URL
    var url = "api/ProductGetServlet";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done
    $.getJSON(url, null, function(json_result) {
            for (let i = 0; i < json_result.length; i++) {
                // Print the first name
                console.log(json_result[i].first);
                $('#datatable tbody').append('<tr><td>'
                    +json_result[i].productId
                    +'</td><td>'
                    +htmlSafe(json_result[i].type)
                    +'</td><td>'
                    +htmlSafe(json_result[i].color)
                    +'</td></td>'
                    +htmlSafe(json_result[i].size)
                    +'</td></td>'
                    +htmlSafe(json_result[i].cost)
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
