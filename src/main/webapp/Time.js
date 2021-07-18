
// Main Javascript File
function htmlSafe(data) {
    console.log("data: "+data)

    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}
console.log("hello");
function updateTable() {
    // Here's where your code is going to go.
    // Define a URL
    var url = "api/TimeGetServlet";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done
    $.getJSON(url, null, function(json_result) {
            for (let i = 0; i < json_result.length; i++) {
                // Print the first name
                console.log(json_result[i].first);
                $('#datatable tbody').append('<tr><td>'
                    +json_result[i].timeId
                    +'</td><td>'
                    +htmlSafe(json_result[i].date)
                    +'</td><td>'
                    +htmlSafe(json_result[i].month)
                    +'</td></td>'
                    +htmlSafe(json_result[i].day)
                    +'</td><td>'
                    +json_result[i].year
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
