function solution(a, b) {
  if (a === b) return a;
  let sum = 0;
  if (a < b) {
    for (let i = a; i <= b; i++) {
      sum += i;
    }
  } else if (a > b) {
    for (let i = b; i <= a; i++) {
      sum += i;
    }
  }
  return sum;
}

console.log(solution(5, 3));

// 가우스 이용 풀이

function solution2(a, b) {
  return ((a + b) * (Math.abs(a - b) + 1)) / 2;
}
console.log(solution2(5, 3));
