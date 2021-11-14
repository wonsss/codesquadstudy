function solution(absolutes, signs) {
  let answer = 0;
  for (const i in absolutes) {
    answer += signs[i] ? absolutes[i] : absolutes[i] * -1;
  }

  return answer;
}

const absolutes = [4, 7, 12];
const signs = [true, false, true];

console.log(solution(absolutes, signs));

//다른풀이
/* function solution(absolutes, signs) {
  return absolutes.reduce((acc, val, i) => acc + val * (signs[i] ? 1 : -1), 0);
}
 */
