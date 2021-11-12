function solution(n) {
  let answer = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      answer += i;
    }
  }
  return n === 0 ? 0 : answer;
}

console.log(solution(12));
