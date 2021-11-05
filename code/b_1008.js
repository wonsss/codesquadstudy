//A/B
//두 정수 A와 B를 입력받은 다음, A/B를 출력하는 프로그램을 작성하시오.
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  //개발로직 작성 구간 시작
  const input = line.split(' ');
  const result = Number(input[0]) / Number(input[1]);
  console.log(result);

  //개발로직 작성 구간 끝
  rl.close();
}).on('close', () => {
  process.exit();
});
