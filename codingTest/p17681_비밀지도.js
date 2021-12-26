function solution(n, arr1, arr2) {
  function convertBinary(num) {
    let result = "";
    let n = num;
    while (n > 0) {
      result += n % 2;
      n = Math.floor(n / 2);
    }
    return result.split("").reverse().join("");
  }

  const arr = new Array(n).fill("");
  for (let i = 0; i < n; i++) {
    const binary1 = convertBinary(arr1[i]).padStart(n, 0);
    const binary2 = convertBinary(arr2[i]).padStart(n, 0);
    let line = "";
    for (let j = 0; j < n; j++) {
      if (binary1[j] === "1" || binary2[j] === "1") {
        line += "#";
      } else {
        line += " ";
      }
    }
    arr[i] = line;
  }
  return arr;
}

const n = 5;
const arr1 = [9, 20, 28, 18, 11];
const arr2 = [30, 1, 21, 17, 28];

console.log(solution(n, arr1, arr2));
