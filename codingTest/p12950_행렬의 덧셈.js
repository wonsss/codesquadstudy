function solution(arr1, arr2) {
  const answer = [];
  for (let i = 0; i < arr1.length; i++) {
    answer[i] = [];
    for (let j = 0; j < arr2.length; j++) {
      answer[i].push(parseInt(arr1[i][j], 10) + parseInt(arr2[i][j], 10));
    }
  }
  return answer;
}

const arr1 = [
  [1, 2],
  [2, 3],
];
const arr2 = [
  [3, 4],
  [5, 6],
];

console.log(solution(arr1, arr2));
