//https://www.hackerrank.com/challenges/kangaroo/problem
function kangaroo(x1, v1, x2, v2) {
  if (v1 > v2) {
    let i = 0;
    const n = (x2 - x1) / (v1 - v2);
    while (i <= n) {
      if (x1 + v1 * i === x2 + v2 * i) return 'YES';
      i++;
    }
  }
  return 'NO';
}


function kangaroo(x1, v1, x2, v2) {
  const n = (x2 - x1) / (v1 - v2);

  if (n !== Math.abs(parseInt(n, 10))) {
    return 'NO';
  }
  return 'YES';
}

// console.log(kangaroo(43, 6, 47, 3));
let start = new Date(); // 시작
console.log(kangaroo(43, 2, 70, 2));
let end = new Date(); // 종료

console.log(end - start); // 경과시간(밀리초)
