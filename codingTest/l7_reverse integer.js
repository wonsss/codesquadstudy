const reverse = function (x) {
  const strX = String(Math.abs(x));
  const result = parseFloat(strX.split('').reverse().join(''), 10);
  if (result <= -(2 ** 31) || result >= 2 ** 31 - 1) {
    return 0;
  }
  return x > 0 ? result : x < 0 ? -result : x === 0 ? 0 : false;
};

const x = 1534236469;
console.log(reverse(x));
