let list = require('fs').readFileSync('/dev/stdin').toString().split('\n');

let num = Number(list[0]);

for (let i = 1; i <= num; i++) {
  let answer = 0;
  let score = 0;
  for (let j in list[i]) {
    let temp = '';
    if (temp === '' && list[i][j] === 'O') {
      temp = 'O';
      score++;
    } else if (temp === 'O' || list[i][j] === 'O') {
      score++;
    } else if (temp === 'O' || list[i][j] === 'X') {
      temp = 'X';
      score = 0;
    }
    answer += score;
  }
  console.log(answer);
}
