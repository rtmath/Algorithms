// Linear Search
// Set i to 0.
// If Li = T, the search terminates successfully; return i.
// Increase i by 1.
// If i < n, go to step 2. Otherwise, the search terminates unsuccessfully.
// Worst-case performance	O(n)
// Best-case performance	O(1)
// Average performance	O(n)
// Worst-case space complexity	O(1) iterative

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
