function solution(N, stages) {
  const failureRecorder = {};
  for (let i = 1; i <= N; i++) {
    const PlayerWhoReached = stages.filter((s) => s >= i);
    const PlayerWhoCouldNotClear = stages.filter((s) => s === i);
    const failure =
      PlayerWhoReached.length === 0
        ? 0
        : PlayerWhoCouldNotClear.length / PlayerWhoReached.length;
    failureRecorder[i] = failure;
  }
  const answer = Object.keys(failureRecorder).sort(
    (a, b) => failureRecorder[b] - failureRecorder[a]
  );
  return answer.map((n) => parseInt(n, 10));
}

const N = 5;
const stages = [2, 1, 2, 6, 2, 4, 3, 3];

console.log(solution(N, stages));
