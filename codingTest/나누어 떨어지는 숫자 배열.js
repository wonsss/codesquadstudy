function solution(arr, divisor) {
  const answer = [];
  arr.forEach((element) => {
    if (element % divisor === 0) {
      answer.push(element);
    }
  });
  return answer.length === 0 ? [-1] : answer.sort((a, b) => a - b);
}

console.log(solution([5, 9, 7, 10], 5));
