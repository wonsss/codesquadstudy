function solution(n) {
  return String(n)
    .split('')
    .reverse()
    .map(v => parseInt(v, 10));
}

console.log(solution(2324832));
