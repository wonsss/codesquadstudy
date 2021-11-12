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

//다른 풀이(재귀함수 사용)
function solution2(n, a = 0, b = 0) {
  if (n <= a / 2) {
    console.log('@', a / 2, b);
    return b;
  } else {
    console.log(a, b);
    return solution2(n, a + 1, (b += n % a ? 0 : a));
  }
  //   return n <= a / 2 ? b : solution2(n, a + 1, (b += n % a ? 0 : a));
}

console.log(solution2(12));
