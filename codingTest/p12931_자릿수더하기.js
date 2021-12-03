function solution(n) {
  let answer = 0;
  const array = String(n).split('');
  array.forEach(i => {
    answer += parseInt(i, 10);
  });

  return answer;
}

console.log(solution(123));
