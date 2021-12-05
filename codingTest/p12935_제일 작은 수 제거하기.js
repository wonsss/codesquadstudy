function solution(arr) {
  if (arr.length <= 1) {
    return [-1];
  }
  const minimum = Math.min.apply(null, arr);
  return arr.filter(v => v > minimum);
}

console.log(solution([4, 3, 2, 1]));
