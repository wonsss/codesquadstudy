function solution(numbers) {
  const answer = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      //   if (!answer.includes(numbers[i] + numbers[j])) {
      //     answer.push(numbers[i] + numbers[j]);
      //     }
      answer.push(numbers[i] + numbers[j]);
    }
  }
  answer.sort((a, b) => a - b);
  const setAnswer = new Set(answer);
  return Array.from(setAnswer);
}

const numbers = [2, 1, 3, 4, 1];

console.log(solution(numbers));
