/* OX퀴즈 다국어
시간 제한	메모리 제한	제출	정답	맞힌 사람	정답 비율
1 초	128 MB	116070	57823	48527	50.488%
문제
"OOXXOXXOOO"와 같은 OX퀴즈의 결과가 있다. O는 문제를 맞은 것이고, X는 문제를 틀린 것이다. 문제를 맞은 경우 그 문제의 점수는 그 문제까지 연속된 O의 개수가 된다. 예를 들어, 10번 문제의 점수는 3이 된다.

"OOXXOXXOOO"의 점수는 1+2+0+0+1+0+0+1+2+3 = 10점이다.

OX퀴즈의 결과가 주어졌을 때, 점수를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 테스트 케이스의 개수가 주어진다. 각 테스트 케이스는 한 줄로 이루어져 있고, 길이가 0보다 크고 80보다 작은 문자열이 주어진다. 문자열은 O와 X만으로 이루어져 있다.

출력
각 테스트 케이스마다 점수를 출력한다. */

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
const list = [];
rl.on('line', (line) => {
  //rl.close()가 없어서 엔터를 눌러 줄이 바뀌어도 계속 입력된다.
  //로컬에서 강제로 중지하려면 Ctrl+C나 Ctrl+D
  //한 줄에 입력된 값을 한 칸 띄어쓰기 기준으로 배열에 push
  list.push(line.split(''));
}).on('close', () => {
  //코드작성구간시작
  //   console.log(list);

  for (let i = 1; i <= list[0]; i++) {
    // let sum = [];
    let answer = 0;
    let score = 0;
    for (let j in list[i]) {
      let temp = '';
      if (temp === '' && list[i][j] === 'O') {
        temp = 'O';
        score++;
        // prevScore = score;
      } else if (temp === 'O' || list[i][j] === 'O') {
        score++;
        // prevScore = score;
      } else if (temp === 'O' || list[i][j] === 'X') {
        temp = 'X';
        score = 0;
      }
      // sum.push(score);
      answer += score;
    }
    console.log(answer);
  }

  //코드작성구간끝
  process.exit();
});
