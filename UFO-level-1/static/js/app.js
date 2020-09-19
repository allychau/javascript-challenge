// from data.js
var tableData = data;

// Initial UFO Dataset
console.log(tableData);
displayTable(tableData);

var form  = d3.select("form");
var button = d3.select("#filter-btn");

// Create event handlers
button.on("click",runEnter);
form.on("submit",runEnter);

function displayTable(tableData) {
    // Get a reference to the table body
    var tbody = d3.select("tbody");

    tableData.forEach((ufoReport) => {
        // Append one table row 'tr' for each ufo report object
        var row = tbody.append("tr");
        Object.entries(ufoReport).forEach(function([key,value]) {
            //console.log(key,value);
            var cell = row.append("td");
            //update cell's text with ufo report values
            cell.text(value);
        });

    });  
}

function runEnter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node, then the value property of the iput element
    var inputValue = d3.select("#datetime").property("value");
    console.log("inputValue: " + inputValue);
    //console.log(tableData);

    if (inputValue.trim() === "") {
        filteredData = tableData;
    }
    else {
        var filteredData = tableData.filter(sightingDate => sightingDate.datetime === inputValue.trim());
    }
    //Check if the given ufo sighting date exist
    if (filteredData.length == 0) {
        console.log("I am here");
        d3.select("tbody").append("tr").append("td").text("No Date Found");
    }
    // Clear the table for filtered table
    deleteTbody();
    displayTable(filteredData);  

}

// Clear the table for new filtered data
function deleteTbody() {
    d3.select("tbody").selectAll("tr").remove().selectAll("td").remove();
    //console.log("hello");
}
