const LinearSearch = {
  worstCase: "O(n)",
  bestCase: "O(1)",
  averagePerf: "O(n)",
  spaceComp: "O(1) iterative",
  pseudoCode: "",

  Run(array, searchTerm) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === searchTerm) {
        return searchTerm + " found at position " + i;
      }
    }
    return searchTerm + " not found";
  }
}

const BubbleSort = {
  worstCase: "O(n^2)",
  bestCase: "O(n)",
  averagePerf: "O(n^2)",
  spaceComp: "O(1) auxiliary",
  pseudoCode: "",
  // The largest element in the set at array[0] can move to array[n-1] in a single pass,
  // but the smallest element at [n-1] takes n-1 passes of the algorithm to move to array[0]

  Run(array) {
    var aLength = array.length;
    var swapped = true;
    while (swapped) {
      swapped = false;
      for (var i = 1; i <= aLength - 1; i++) {
        if (array[i-1] > array[i]) {
          var temp = array[i-1];
          array[i-1] = array[i];
          array[i] = temp;
          swapped = true;
        }
      }
    }
    return array;
  }
}

const OptimizedBubbleSort = {
  worstCase: "O(n^2)",
  bestCase: "O(n)",
  averagePerf: "O(n^2)",
  spaceComp: "O(1) auxiliary",
  pseudoCode: "",

  Run(array) {
    var aLength = array.length;
    while (aLength > 0) {
      var lastSwapPosition = 0;
      for (var i = 0; i <= aLength; i++) {
        if (array[i-1] > array[i]) {
          var temp = array[i-1];
          array[i-1] = array[i];
          array[i] = temp;
          lastSwapPosition = i;
        }
      }
      aLength = lastSwapPosition;
    }
    return array;
  }
}

const TopDownMergeSort = {
  worstCase: "O(n log n)",
  bestCase: "O(n log n)",
  averagePerf: "O(n log n)",
  spaceComp: "O(n) auxiliary",
  pseudocode: "",

  Run(array) {
    var aLength = array.length;
    var copiedArray = [];
    for (var i = 0; i < aLength; i++) {
      copiedArray.push(array[i]);
    }
    this.SplitArray(copiedArray, array, 0, aLength);
    return array;
  },

  SplitArray(array, copiedArray, start, end) {
    if (end - start < 2) {
      return;
    }
    var middle = Math.floor((end + start) / 2);
    this.SplitArray(copiedArray, array, start, middle);
    this.SplitArray(copiedArray, array, middle, end);
    this.MergeArrays(array, copiedArray, start, middle, end);
  },

  MergeArrays(array, copiedArray, start, middle, end) {
    var i = start, j = middle;
    for (var k = start; k < end; k++) {
      if (i < middle && (j >= end || array[i] <= array[j])) {
        copiedArray[k] = array[i];
        i = i + 1;
      } else {
        copiedArray[k] = array[j];
        j = j + 1;
      }
    }
  }
}
