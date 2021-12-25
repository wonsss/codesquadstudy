function solution(num) {
  if (num === 1) return 0;
  let answer = 0;
  function makeCollatz(n) {
    let result;
    if (n % 2 === 0) {
      result = n / 2;
    } else {
      result = n * 3 + 1;
    }
    answer++;
    if (result !== 1) makeCollatz(result);
    if (answer >= 500) {
      return -1;
    }
    return answer;
  }

  return makeCollatz(num);
}

console.log(solution(1));
