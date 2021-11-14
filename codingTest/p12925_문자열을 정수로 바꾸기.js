function solution(s) {
  return parseInt(s, 10);
  //아래 방법도 다 동일한 효과
  //   return s / 1;
  //    return +s;
  //    return Number(s);
}

console.log(solution('-1234'));
