function sum() {
  realArray = Array.from(arguments);
  return realArray.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2)); //3
console.log(sum(1, 2, 3)); //6
