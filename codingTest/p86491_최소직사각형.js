function solution(sizes) {
  const width = [];
  const height = [];
  for (const size of sizes) {
    if (size[0] < size[1]) {
      const temp = size[0];
      size[0] = size[1];
      size[1] = temp;
    }
  }
  for (const size of sizes) {
    width.push(size[0]);
    height.push(size[1]);
  }
  return Math.max.apply(null, width) * Math.max.apply(null, height);
}

const sizes = [
  [60, 50],
  [30, 70],
  [60, 30],
  [80, 40],
];

console.log(solution(sizes));
