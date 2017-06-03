// Bool for user to be able to select whether their csv contains a header or if it is raw data
var header = true;
var file = null;

// var testArray = [9, 1, 5, 17, 10, 2, 3, 4, 8, 10,
//                  9, 1, 5, 17, 10, 2, 3, 4, 8, 10,
//                  9, 1, 5, 17, 10, 2, 3, 4, 8, 10,
//                  9, 1, 5, 17, 10, 2, 3, 4, 8, 10];
// console.log(testArray);
// var t1 = performance.now();
// var newArray = OptimizedBubbleSort.Run(testArray);
// var t2 = performance.now();
// console.log(newArray);
// console.log("Sort took " + (t2 - t1) + " ms");

function loadFile(files) {
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
  file = lines;
	// drawData(lines);
  show(document.getElementById("step2"));
  getColumns();
}

function getColumns() {
  var columnSelect = document.getElementById("columnSelect");
  if (header && file) {
    var headerRow = file[0];
    var rowLength = headerRow.length;
    for (var i = 0; i < rowLength; i++) {
      var option = document.createElement("option");
      var optionText = document.createTextNode(headerRow[i]);
      option.appendChild(optionText);
      columnSelect.append(option);
    }
  }
}

function toggleHeader() {
  header = !header;
}

function show(domElem) {
    domElem.classList.remove("hidden");
}

function hide(domElem) {
    domElem.classList.add("hidden");
}

function drawData(csv) {
  // If User specifies that a header is present, adjust the row offset where the loop starts grabbing data from
  var headerOffset = 0;
  // var csvRowLength = csv[0].length;
  var csvRowLength = 10;
  var $csvRows = document.getElementById("csv-rows");
  var numberOfCsvRows = csv.length;
  if (header) {
    headerOffset = 1;
    var headerRow = csv[0];
    var $csvHeader = document.getElementById("csv-header");
    // Create CSV Headers
    for (var i = 0; i < csvRowLength; i++) {
      var newDiv = document.createElement("div");
      var divContent = document.createTextNode(headerRow[i]);
      newDiv.appendChild(divContent);
      $csvHeader.append(newDiv);
    }
  }

  // Display CSV data
  for (var i = 0 + headerOffset; i < numberOfCsvRows; i++) {
    var currentRow = csv[i];
    for (var j = 0; j < csvRowLength; j++) {
      var newSpan = document.createElement("span");
      var spanContent = document.createTextNode(currentRow[j]);
      newSpan.appendChild(spanContent);
      $csvRows.append(newSpan);
    }
    $csvRows.append(document.createElement("br"));
  }
}
