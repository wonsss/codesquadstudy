/* 문제
첫째 줄에는 별 1개, 둘째 줄에는 별 2개, N번째 줄에는 별 N개를 찍는 문제

입력
첫째 줄에 N(1 ≤ N ≤ 100)이 주어진다.

출력
첫째 줄부터 N번째 줄까지 차례대로 별을 출력한다. */

//A+B
//두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (n) => {
  //개발로직 작성 구간 시작

  for (let i = 1; i <= n; i++) {
    console.log('*'.repeat(i));
  }

  //개발로직 작성 구간 끝
  rl.close();
}).on('close', () => {
  process.exit();
});
