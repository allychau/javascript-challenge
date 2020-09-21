// from data.js
var tableData = data;

// Initial UFO Dataset
//console.log(tableData);
// Build the table when the page loads
displayTable(tableData);

var form  = d3.select("form");
var button = d3.select("#filter-btn");

// Create event handlers
button.on("click",handleClick);
form.on("submit",handleClick);

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

function handleClick() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Clear the table for filtered table
    deleteTbody();
    // Select the input element and get the raw HTML node, then the value property of the iput element
    var inputValue = d3.select("#datetime").property("value");
    //Check if a date was entered.  If empty, display the original data table as the filtered data
    if (inputValue.trim() === "") {
        filteredData = tableData;
    }
    else {
        // Apply filter to the data table.  Keep only the rows where the 'datetime' value matches
        // the filter value.
        var filteredData = tableData.filter(sightingDate => sightingDate.datetime === inputValue.trim());
    }
    //Check if the given ufo sighting date exist
    if (filteredData.length == 0) {
        d3.select("tbody").append("tr").append("td").attr("colspan", 7)
        .text("No Records Found");
    }
    //Rebuild table using the filtered data
    displayTable(filteredData);  

}

// Clear the table for new filtered data
function deleteTbody() {
    d3.select("tbody").selectAll("tr").remove().selectAll("td").remove();
}
