
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
function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#paymentId').val("");
    $('#customerId').val("");
    $('#amount').val("");
    $('#date').val("");


    // Show the hidden dialog
    $('#myModal').modal('show');
    $('#paymentId').removeClass("is-invalid");
    $('#paymentId').removeClass("is-valid");
    $('#customerId').removeClass("is-invalid");
    $('#customerId').removeClass("is-valid");
    $('#amount').removeClass("is-invalid");
    $('#amount').removeClass("is-valid");
    $('#date').removeClass("is-invalid");
    $('#date').removeClass("is-valid");
  }

function saveChangesFunction(event) {
    console.log("changes saved");
    // Get the field
    let paymentId = $('#paymentId').val();
    let regPayment= /^[0-9]+$/;
    let isValid = true;
    if (regPayment.test(paymentId)){
        $('#paymentId').removeClass("is-invalid");
        $('#paymentId').addClass("is-valid");
    } else {
        $('#paymentId').addClass("is-invalid");
        $('#paymentId').removeClass("is-valid");
        isValid = false;
    }
    let customerId = $('#customerId').val();

    // Create the regular expression
    let regCustID = /^[0-9]+$/;
    // Test the regular expression to see if there is a match
    if (regCustID.test(customerId)) {
        $('#customerId').removeClass("is-invalid");
        $('#customerId').addClass("is-valid");
    } else {
        $('#customerId').addClass("is-invalid");
        $('#customerId').removeClass("is-valid");
        isValid = false;
    }
    let amount = $('#amount').val();
    let regAmount =  /^[0-9]*\.[0-9]{2}$/;
    if (regAmount.test(amount)){
        $('#amount').removeClass("is-invalid");
        $('#amount').addClass("is-valid");
    } else{
        $('#amount').addClass("is-invalid");
        $('#amount').removeClass("is-valid");
        isValid= false;
    }
    let date = $('#date').val();
    let regDate = /(0[1-9]|1[012])[- /.] (0[1-9]|[12][0-9]|3[01])[- /.] (19|20)\d\d$/;
    if (regDate.test(date)){
        $('#date').removeClass("is-invalid");
        $('#date').addClass("is-valid");
    } else{
        $('#date').addClass("is-invalid");
        $('#date').removeClass("is-valid");
        isValid = false;
    }

    if (isValid) {
        console.log("Valid form");
        let my_data = {paymentId: paymentId, customerId: customerId, amount: amount, date: date}
        // Code to submit your form will go here.
        $.ajax({
            type: 'POST',
            url: "/api/paymentgetupdate",
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