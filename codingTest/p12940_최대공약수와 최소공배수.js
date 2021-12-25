function solution(n, m) {
  let 최대공약수 = 1;
  for (let i = 2; i <= Math.min(n, m); i++) {
    if (n % i === 0 && m % i === 0) {
      최대공약수 = i;
    }
  }
  const 최소공배수 = (n * m) / 최대공약수;
  return [최대공약수, 최소공배수];
}

console.log(solution(2, 5));
