// Bool for user to be able to select whether their csv contains a header or if it is raw data
var header = true;

function handleFiles(files) {
  // Check for FileReader browser support
  if (window.FileReader) {
    getAsText(files[0]);
  } else {
    alert("FileReader is not supported in this browser");
  }
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	reader.onload = loadHandler;
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }
	drawData(lines);
}

function drawData(csv) {
  // If User specifies that a header is present, adjust the row offset where the loop starts grabbing data from
  var headerOffset = 0;
  var csvRowLength = csv[0].length;
  var $csvRows = $("#csv-rows");
  var numberOfCsvRows = csv.length;
  if (header) {
    headerOffset = 1;
    var headerRow = csv[0];
    // Create CSV Headers
    for (var i = 0; i < csvRowLength; i++) {
      $("#csv-header").append("<div>" + headerRow[i] + "</div>");
    }
  }

  // Display CSV data
  for (var i = 0 + headerOffset; i < numberOfCsvRows; i++) {
    var currentRow = csv[i];
    for (var j = 0; j < csvRowLength; j++) {
      $csvRows.append("<span>" + currentRow[j] + "</span>");
    }
    $csvRows.append("<br>");
  }
}
