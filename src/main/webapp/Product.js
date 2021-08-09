
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
                    +'</td><td>'
                    +htmlSafe(json_result[i].size)
                    +'</td><td>'
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
function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#productId').val("");
    $('#type').val("");
    $('#color').val("");
    $('#size').val("");
    $('#cost').val("");


    // Show the hidden dialog
    $('#myModal').modal('show');
    $('#productId').removeClass("is-invalid");
    $('#productId').removeClass("is-valid");
    $('#type').removeClass("is-invalid");
    $('#type').removeClass("is-valid");
    $('#color').removeClass("is-invalid");
    $('#color').removeClass("is-valid");
    $('#size').removeClass("is-invalid");
    $('#size').removeClass("is-valid");
    $('#cost').removeClass("is-invalid");
    $('#cost').removeClass("is-valid");
}

function saveChangesFunction(event) {
    console.log("changes saved");
    // Get the field
    let productId = $('#productId').val();
    let regProduct= /^[0-9]+$/;
    let isValid = true;
    if (regProduct.test(productId)){
        $('#productId').removeClass("is-invalid");
        $('#productId').addClass("is-valid");
    } else {
        $('#productId').addClass("is-invalid");
        $('#productId').removeClass("is-valid");
        isValid = false;
    }
    let type = $('#type').val();

    // Create the regular expression
    let regType = /^[A-Za-z]{1,10}$/;
    // Test the regular expression to see if there is a match
    if (regType.test(type)) {
        $('#type').removeClass("is-invalid");
        $('#type').addClass("is-valid");
    } else {
        $('#type').addClass("is-invalid");
        $('#type').removeClass("is-valid");
        isValid = false;
    }
    let color = $('#color').val();
    let regColor =  /^[A-Za-z]{1,10}$/;
    if (regColor.test(color)){
        $('#color').removeClass("is-invalid");
        $('#color').addClass("is-valid");
    } else{
        $('#color').addClass("is-invalid");
        $('#color').removeClass("is-valid");
        isValid= false;
    }
    let size = $('#size').val();
    let regSize = /^[A-Za-z]{1,10}$/;
    if (regSize.test(size)){
        $('#size').removeClass("is-invalid");
        $('#size').addClass("is-valid");
    } else{
        $('#size').addClass("is-invalid");
        $('#size').removeClass("is-valid");
        isValid = false;
    }
    let cost = $('#cost').val();
    let regCost = /^[0-9]*\.[0-9]{2}$/;
    if (regCost.test(cost)){
        $('#cost').removeClass("is-invalid");
        $('#cost').addClass("is-valid");
    } else{
        $('#cost').addClass("is-invalid");
        $('#cost').removeClass("is-valid");
        isValid = false;
    }
    if (isValid) {
        console.log("Valid form");
        let my_data = {productId: productId, type: type, color: color, size: size, cost: cost}
        // Code to submit your form will go here.
        $.ajax({
            type: 'POST',
            url: "/api/productgetupdate",
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