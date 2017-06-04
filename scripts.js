var header = true;
var file = null;
var csvArray = [];
var sortedArray = [];
var selectedColumn = null;
var selectedColumnDataType = null;
var selectedAlgo = null;
var currentStep = 1;

// var testArray = [9, 1, 5, 17, 10, 2, 3, 4, 8, 10,
//                  9, 1, 5, 17, 10, 2, 3, 4, 8, 10,
//                  9, 1, 5, 17, 10, 2, 3, 4, 8, 10,
//                  9, 1, 5, 17, 10, 2, 3, 4, 8, 10];
// console.log(testArray);
// var t1 = performance.now();
// var newArray = TopDownMergeSort.Run(testArray);
// var t2 = performance.now();
// console.log(newArray);
// console.log("Sort took " + (t2 - t1) + " ms");

function loadFile(files) {
  // Check for FileReader browser support
  if (window.FileReader) {
    csvArray.length = 0;
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
  currentStep = 2;
  drawColumnOptions();
}

function pushIntoArrayFromCSV() {
  csvArray.length = 0;
  var selectedCol = parseInt(selectedColumn);
  var headerOffset = (header) ? 1 : 0;
  var fileLength = file.length;
  if (selectedColumnDataType === "number") {
    for (var i = 0 + headerOffset; i < fileLength; i++) {
      value = file[i][selectedCol] || 0;
      csvArray.push(parseFloat(value));
    }
  } else if (selectedColumnDataType === "string") {
    for (var i = 0 + headerOffset; i < fileLength; i++) {
      csvArray.push(file[i][selectedCol]);
    }
  }
}

//----- DOM Manipulation -----

function drawColumnOptions() {
  var columnSelect = document.getElementById("columnSelect");
  if (header && file) {
    var headerRow = file[0];
    var rowLength = headerRow.length;
    for (var i = 0; i < rowLength; i++) {
      var option = document.createElement("option");
      option.value = i;
      var optionText = document.createTextNode(headerRow[i]);
      option.appendChild(optionText);
      columnSelect.append(option);
    }
  } else if (!header && file) {
    var rowLength = file[0].length;
    for (var i = 0; i < rowLength; i++) {
      var option = document.createElement("option");
      option.value = i;
      var optionText = document.createTextNode(i);
      option.appendChild(optionText);
      columnSelect.append(option);
    }
  }
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

function drawDataFromSortedArray() {
  var array = sortedArray;
  var aLength = array.length;

  if (header) {
    var $csvHeader = document.getElementById("csv-header");
    clearDomNode($csvHeader);
    var newDiv = document.createElement("div");
    var divContent = document.createTextNode(file[0][selectedColumn]);
    newDiv.appendChild(divContent);
    $csvHeader.append(newDiv);
  }

  var $csvRows = document.getElementById("csv-rows");
  clearDomNode($csvRows);
  for (var i = 0; i < aLength; i++) {
    var newSpan = document.createElement("span");
    var spanContent = document.createTextNode(array[i]);
    newSpan.appendChild(spanContent);
    $csvRows.append(newSpan);
    $csvRows.append(document.createElement("br"));
  }
}

function drawAlgoData(algObj) {
  var $worstCase = document.getElementById("worst-case");
  var $bestCase = document.getElementById("best-case");
  var $averagePerf = document.getElementById("average-perf");
  var $spaceComp = document.getElementById("space-comp");
  $worstCase.innerHTML = "Worst case: " + algObj.worstCase;
  $bestCase.innerHTML = "Best case: " + algObj.bestCase;
  $averagePerf.innerHTML = "Average performance: " + algObj.averagePerf;
  $spaceComp.innerHTML = "Worst case space complexity: " + algObj.spaceComp;
}

//----- Helper Functions -----

function toggleHeader() {
  header = !header;
}

function show(domElem) {
    domElem.classList.remove("hidden");
}

function hide(domElem) {
    domElem.classList.add("hidden");
}

function updateSelectedColumn(event) {
  selectedColumn = parseInt(event.target.value);
  if (currentStep === 2) {
    checkStep3Progression();
  }
}

function updateSelectedColumnDataType(event) {
  selectedColumnDataType = event.target.value;
  if (currentStep === 2) {
    checkStep3Progression();
  }
}

function updateSelectedAlgo(event) {
  selectedAlgo = event.target.value;
  populateAlgoData(selectedAlgo);
  if (currentStep === 3) {
    show(document.getElementById("step4"));
    currentStep = 4;
  }
}

function populateAlgoData(algoName) {
  switch(algoName) {
    case "bubble":
      drawAlgoData(BubbleSort);
      return;
    case "optbubble":
      drawAlgoData(OptimizedBubbleSort);
      return;
    case "tdmerge":
      drawAlgoData(TopDownMergeSort);
      return;
  }
}

function runAlgo() {
  var time, t0, t1;
  sortedArray.length = 0;
  switch(selectedAlgo) {
    case "bubble":
      t0 = performance.now();
      sortedArray = BubbleSort.Run(csvArray);
      t1 = performance.now();
      time = t1 - t0;
      break;
    case "optbubble":
      t0 = performance.now();
      sortedArray = OptimizedBubbleSort.Run(csvArray);
      t1 = performance.now();
      time = t1 - t0;
      break;
    case "tdmerge":
      t0 = performance.now();
      sortedArray = TopDownMergeSort.Run(csvArray);
      t1 = performance.now();
      time = t1 - t0;
      break;
  }
  var container = document.getElementById("performance-container");
  container.innerHTML = "Time to apply algorithm to column: " + time + " milliseconds";
}

function checkStep3Progression() {
  if (selectedColumn && selectedColumnDataType) {
    show(document.getElementById("step3"));
    currentStep = 3;
    pushIntoArrayFromCSV();
  }
}

function clearDomNode(domElem) {
  while (domElem.firstChild) {
    domElem.removeChild(domElem.firstChild);
  }
}

function clearDisplayedData() {
  clearDomNode(document.getElementById("csv-header"));
  clearDomNode(document.getElementById("csv-rows"));
}
