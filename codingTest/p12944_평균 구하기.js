function solution(arr) {
  return arr.reduce((prev, curr) => prev + curr) / arr.length;
}

console.log(solution([1, 2, 3, 4]));
