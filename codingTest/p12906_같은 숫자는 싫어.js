function solution(arr) {
  let temp = arr[0];
  const answer = [];
  for (let i = 0; i < arr.length; i++) {
    temp = arr[i];
    if (temp !== arr[i + 1]) {
      answer.push(arr[i]);
    }
  }
  return answer;
}

console.log(solution([1, 1, 3, 3, 0, 1, 1]));

// 다른 풀이

function solution2(arr) {
  return arr.filter((val, index) => val !== arr[index + 1]);
}

console.log(solution2([1, 1, 3, 3, 0, 1, 1]));
