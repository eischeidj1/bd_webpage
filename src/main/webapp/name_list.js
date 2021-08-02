
// Main Javascript File
function htmlSafe(data) {
    console.log("data: "+data)
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}

function getJSDateFromSQLDate(sqlDate) {
    // Strip non-digits
    let cleaned = sqlDate.replace(/\D/g, '');
    // Match and group
    let match = cleaned.match(/(^\d{4})(\d{2})(\d{2})/);
    // Create a new Date object
    return new Date(match[1], match[2], match[3]);
}

function updateTable() {
    // Here's where your code is going to go.
    // Define a URL
    var url = "api/namelistget";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done
    $.getJSON(url, null, function(json_result) {
        for (let i = 0; i < json_result.length; i++) {
                // Print the first name
            var JavaBirthday = getJSDateFromSQLDate(json_result[i].birthday)
                console.log(json_result[i].first);
                $('#datatable tbody').append('<tr><td>'
                    +json_result[i].id
                    +'</td><td>'
                    +htmlSafe(json_result[i].first)
                    +'</td><td>'
                    +htmlSafe(json_result[i].last)
                    +'</td><td>'
                    +htmlSafe(json_result[i].email)
                    +'</td><td>'
                    +htmlSafe(json_result[i].phone)
                    +'</td><td>'
                    +JavaBirthday.toLocaleDateString()
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
function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");
    $('#first').val("");
    // Show the hidden dialog
    $('#namelistwindow').modal('show');
    $('#first').removeClass("is-invalid");
    $('#first').addClass("is-valid");

    /* etc. */

// This is an INVALID field
    $('#first').removeClass("is-valid");
    $('#first').addClass("is-invalid");
}

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);