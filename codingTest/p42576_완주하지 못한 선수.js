//해시 이용
function solution(participant, completion) {
  const hash = {};
  participant.forEach((p) => {
    hash[p] = hash[p] || 0;
    hash[p] += 1;
  });

  completion.forEach((p) => {
    hash[p] -= 1;
  });

  for (const key in hash) {
    if (hash[key]) return key;
  }
}

//sort 이용하여 비교한 풀이(문제 조건이 제한적이어서 가능함)
function solution(participant, completion) {
  participant.sort();
  completion.sort();

  for (let i in participant) {
    if (participant[i] !== completion[i]) return participant[i];
  }
}

const participant = ['mislav', 'stanko', 'mislav', 'ana'];
const completion = ['stanko', 'ana', 'mislav'];

console.log(solution(participant, completion));
