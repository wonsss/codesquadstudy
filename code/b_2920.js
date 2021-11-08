/* 음계 다국어
시간 제한	메모리 제한	제출	정답	맞힌 사람	정답 비율
1 초	128 MB	58636	31088	26783	54.423%
문제
다장조는 c d e f g a b C, 총 8개 음으로 이루어져있다. 이 문제에서 8개 음은 다음과 같이 숫자로 바꾸어 표현한다. c는 1로, d는 2로, ..., C를 8로 바꾼다.

1부터 8까지 차례대로 연주한다면 ascending, 8부터 1까지 차례대로 연주한다면 descending, 둘 다 아니라면 mixed 이다.

연주한 순서가 주어졌을 때, 이것이 ascending인지, descending인지, 아니면 mixed인지 판별하는 프로그램을 작성하시오.

입력
첫째 줄에 8개 숫자가 주어진다. 이 숫자는 문제 설명에서 설명한 음이며, 1부터 8까지 숫자가 한 번씩 등장한다.

출력
첫째 줄에 ascending, descending, mixed 중 하나를 출력한다. */

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  //개발로직 작성 구간 시작
  const ascendedInput = input
    .split(' ')
    .sort((a, b) => a - b)
    .join(' ');
  const descendedInput = input.split(' ').sort().reverse().join(' ');
  if (input === ascendedInput) {
    console.log('ascending');
  } else if (input === descendedInput) {
    console.log('descending');
  } else {
    console.log('mixed');
  }
  //개발로직 작성 구간 끝
  rl.close();
}).on('close', () => {
  process.exit();
});
