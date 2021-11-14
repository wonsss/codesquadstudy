function solution(n, lost, reserve) {
  const reserve2 = reserve.filter((r) => !lost.includes(r));
  const lost2 = lost.filter((l) => !reserve.includes(l));
  lost2.sort((a, b) => a - b); //테케 몇 개 틀리다가 이렇게 sort 넣어주니 풀림
  reserve2.sort((a, b) => a - b);
  let answer = n - lost2.length;

  for (let i = 0; i < reserve2.length; i++) {
    for (let j = 0; j < lost2.length; j++) {
      if (reserve2[i] + 1 === lost2[j] || reserve2[i] - 1 === lost2[j]) {
        answer += 1;
        lost2.splice(j, 1);
      }
    }
  }
  return answer;
}

// const n = 5;
// const lost = [1, 2, 3];
// const reserve = [2, 3, 4];

const n = 5;
const lost = [2, 4];
const reserve = [1, 3, 5];

console.log(solution(5, lost, reserve));
