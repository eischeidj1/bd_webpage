function updateTable() {
    // Here's where your code is going to go.
    function my_callback(json_result) {
        console.log("Done");
    }

// Define a URL
    var url = "api/name_list_get";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done
    $.getJSON(url, null, my_callback);

// Any code after this runs IMMEDIATELY and we
// do not wait for the JSON call to complete!
}

let url = "api/name_list_get";

$.getJSON(url, null, function(json_result) {
        // json_result is an object. You can set a breakpoint, or print
        // it to see the fields. Specifically, it is an array of objects.
        // Here we loop the array and print the first name.
        for (let i = 0; i < json_result.length; i++) {
            // Print the first name
            console.log(json_result[i].first);
        }
        console.log("Done");
    }
);