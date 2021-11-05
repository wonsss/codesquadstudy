/* 문제
알파벳 소문자, 대문자, 숫자 0-9중 하나가 주어졌을 때, 주어진 글자의 아스키 코드값을 출력하는 프로그램을 작성하시오.

입력
알파벳 소문자, 대문자, 숫자 0-9 중 하나가 첫째 줄에 주어진다.

출력
입력으로 주어진 글자의 아스키 코드 값을 출력한다. */

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  //개발로직 작성 구간 시작
  // const ascii = line.charCodeAt(0);
  console.log(line.charCodeAt(0));
  //개발로직 작성 구간 끝
  rl.close();
}).on('close', () => {
  process.exit();
});
