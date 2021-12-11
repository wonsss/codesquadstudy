function solution(n) {
  let triple = '';
  while (n > 0) {
    triple += n % 3;
    n = parseInt(n / 3, 10);
  }
  let result = 0;
  for (let i = 0; i < triple.length; i++) {
    result += parseInt(triple[i], 10) * 3 ** (triple.length - i - 1);
  }
  return result;
}

console.log(solution(45));

// const solution = n => parseInt([...n.toString(3)].reverse().join(''), 3);

// Number.toString(n) 은 n진법으로 변환 가능하다.
// parseInt(string, n) 은 string을 n진법에서 10진법으로 표현해준다.
