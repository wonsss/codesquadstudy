function solution(s) {
  const str = s.toLowerCase();
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "p") num++;
    if (str[i] === "y") num--;
  }
  return !num;
}

console.log(solution("pPoooyY"));
