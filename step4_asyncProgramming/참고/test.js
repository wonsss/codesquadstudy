function getStandardization(x) {
  return ((x - 100) / this.getStandardDeviation()).toFixed(2);
}

function getStandardDeviation() {
  return Math.sqrt(
    [100, 100, 100].map((s) => Math.pow(s - 100, 2)).reduce((a, b) => a + b) / 2
  );
}

console.log(getStandardDeviation());
