// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");

var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");

var $searchBtn = document.querySelector("#search");
var $loadMoreBtn = document.querySelector("#next-page");


var startingIndex = 0;
var resultsPerPage = 50;


// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set sightingsData to dataSet initially
var sightingsData = dataSet;

// renderTable renders the sightingsData to the tbody
function renderTable() {
  $tbody.innerHTML = "";

  var endingIndex = startingIndex + resultsPerPage;
  // Get a section of the addressData array to render
  var sightingsSubset = sightingsData.slice(startingIndex, endingIndex);


  for (var i = 0; i < sightingsSubset.length; i++) {
   //console.log(sightingsData.length);
    // Get get the current sighting object and its fields
    var sighting = sightingsSubset[i];
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

  startingIndex = 0;
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();
  
  // Set sightingsData to an array of all addresses whose "date" matches the filter
  sightingsData = dataSet.filter(function(sighting) {
    var sightingDate = sighting.datetime.toLowerCase();
    var sightingCity = sighting.city.toLowerCase();
    var sightingState = sighting.state.toLowerCase();
    var sightingCountry = sighting.country.toLowerCase();
    var sightingShape = sighting.shape.toLowerCase();
    
    // If true, add the sighting to the sightingsData, otherwise don't add it to sightingsData
    var totalResults = (filterDate === "" || sightingDate === filterDate)
        && (filterCity === "" || sightingCity === filterCity)
        && (filterState === "" || sightingState === filterState)
        && (filterCountry === "" || sightingCountry === filterCountry)
        && (filterShape === "" || sightingShape === filterShape);
    return totalResults; 
  // 
});
  renderTable();
}

$loadMoreBtn.addEventListener("click", handleButtonClick);

function handleButtonClick() {
  // Increase startingIndex by resultsPerPage, render the next section of the table
  startingIndex += resultsPerPage;
  renderTable();
  // Check to see if there are any more results to render
  if (startingIndex + resultsPerPage >= sightingsData.length) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All Sightings Loaded";
    $loadMoreBtn.removeEventListener("click", handleButtonClick);
  }
}

// Render the table for the first time on page load
renderTable();
