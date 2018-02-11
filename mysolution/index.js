// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#state");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set sightingsData to dataSet initially
var sightingsData = dataSet;

// renderTable renders the sightingsData to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < sightingsData.length; i++) {
    // Get get the current sighting object and its fields
    var sighting = sightingsData[i];
    var fields = Object.keys(sighting);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the sighting object, create a new cell at set its inner text to be the current value at the current sighting's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value.trim().toLowerCase();

  // Set sightingsData to an array of all addresses whose "state" matches the filter
  sightingsData = dataSet.filter(function(sighting) {
    var sightingDate = sighting.datetime.toLowerCase();

    // If true, add the sighting to the sightingsData, otherwise don't add it to sightingsData
    return sightingDate === filterDate;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();
