const getGCD = (a, b) => {
  for (let i = Math.min(a, b); i >= 2; i--) {
    if (a % i === 0 && b % i === 0) {
      return i;
    }
  }
  return 1;
};

function solution(w, h) {
  let broken = 0;
  if (getGCD(w, h) === 1) {
    broken = w + h - 1;
  } else {
    broken = w + h - getGCD(w, h);
  }
  return w * h - broken;
}

console.log(solution(8, 12));
