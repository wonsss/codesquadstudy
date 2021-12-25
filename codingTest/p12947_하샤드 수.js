function solution(x) {
  const sum = String(x)
    .split("")
    .reduce((prev, curr) => Number(prev) + Number(curr));

  return x % sum === 0;
}

console.log(solution(18));
