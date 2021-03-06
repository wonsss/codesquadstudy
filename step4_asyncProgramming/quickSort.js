function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
}

const data = [50, 100, 38, 48, 58, 29, 38, 49];
console.log(quickSort(data));

function testCase() {
  const data = [50, 100, 38, 48, 58, 29, 38, 49];
  console.log(data);
  console.log(quickSort(data));
}
// testCase();

module.exports = quickSort;
