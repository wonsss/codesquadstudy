let list = require('fs').readFileSync('/dev/stdin').toString().split('\n');

let num = Number(list[0]);

for (let i = 1; i <= num; i++) {
  let answer = 0;
  let score = 0;
  for (let j in list[i]) {
    if (list[i][j] === 'O') {
      score++;
    } else {
      score = 0;
    }
    answer += score;
  }
  console.log(answer);
}
