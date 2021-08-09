
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

    $('#first').val("");
    $('#last').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#birthday').val("");

    // Show the hidden dialog
    $('#namelistwindow').modal('show');

    $('#first').removeClass("is-invalid");
    $('#first').removeClass("is-valid");
    $('#last').removeClass("is-invalid");
    $('#last').removeClass("is-valid");
    $('#email').removeClass("is-invalid");
    $('#email').removeClass("is-valid");
    $('#phone').removeClass("is-invalid");
    $('#phone').removeClass("is-valid");
    $('#birthday').removeClass("is-invalid");
    $('#birthday').removeClass("is-valid");
}
function saveChangesFunction(event) {
    console.log("changes saved");
    // Get the field

    let isValid = true;
    let first = $('#first').val();

    // Create the regular expression
    let reg = /^[A-Za-z]{1,10}$/;
    // Test the regular expression to see if there is a match
    if (reg.test(first)) {
        $('#first').removeClass("is-invalid");
        $('#first').addClass("is-valid");
    } else {
        $('#first').addClass("is-invalid");
        $('#first').removeClass("is-valid");
        isValid = false;
    }
    let last = $('#last').val();
    let regLast =  /^[A-Za-z]{1,10}$/;
    if (regLast.test(last)){
        $('#last').removeClass("is-invalid");
        $('#last').addClass("is-valid");
    } else{
        $('#last').addClass("is-invalid");
        $('#last').removeClass("is-valid");
        isValid= false;
    }
    let email = $('#email').val();
    let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEmail.test(email)){
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    } else{
        $('#email').addClass("is-invalid");
        $('#email').removeClass("is-valid");
        isValid = false;
    }
    let phone = $('#phone').val();
    let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (regPhone.test(phone)){
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");
    } else {
        $('#phone').addClass("is-invalid");
        $('#phone').removeClass("is-valid");
        isValid = false;
    }
    let birthday = $('#birthday').val();
    let regBirthday = /^0[1-9]|1[0-2]\/0[1-9]|1\d|2\d|3[01]\/19|20\d{2}$/;
    if (regBirthday.test(birthday)){
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");
    } else {
        $('#birthday').addClass("is-invalid");
        $('#birthday').removeClass("is-valid");
        isValid = false;
    }
    if (isValid) {
        console.log("Valid form");
        let my_data = {first: first, last: last, email: email, phone: phone, birthday: birthday}
        // Code to submit your form will go here.
        $.ajax({
            type: 'POST',
            url: "/api/namelistgetupdate",
            data: JSON.stringify(my_data),
            success: function(dataFromServer) {
                console.log(dataFromServer);
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });
    }
}
// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);
let saveChanges = $('#saveChanges');
saveChanges.on("click", saveChangesFunction);