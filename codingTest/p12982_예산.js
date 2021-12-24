function solution(d, budget) {
  let answer = 0;

  d.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < d.length; i++) {
    sum += d[i];
    if (sum > budget) {
      break;
    }
    answer++;
  }
  return answer;
}

const d = [1, 3, 2, 5, 4];
const budget = 9;

console.log(solution(d, budget));
