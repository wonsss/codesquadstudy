function solution(answers) {
  const student1 = [1, 2, 3, 4, 5];
  const student2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const student3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  const score = { 1: 0, 2: 0, 3: 0 };
  let j;
  for (let i = 0; i < answers.length; i++) {
    j = i % student1.length;
    if (answers[i] === student1[j]) {
      score[1] += 1;
    }
    j = i % student2.length;
    if (answers[i] === student2[j]) {
      score[2] += 1;
    }
    j = i % student3.length;
    if (answers[i] === student3[j]) {
      score[3] += 1;
    }
  }
  const maxScore = Math.max.apply(null, Object.values(score));
  const result = Object.keys(score).filter((key) => score[key] === maxScore);
  const answer = result.map((n) => parseInt(n, 10));

  return answer.sort((a, b) => a - b);
}

// const answers = [1, 2, 3, 4, 5];
// const answers = [1, 3, 2, 4, 2];
// const answers = [1, 3, 3, 4, 5];
const answers = [3, 3, 1, 1, 1, 1, 2, 3, 4, 5];

console.log(solution(answers));
