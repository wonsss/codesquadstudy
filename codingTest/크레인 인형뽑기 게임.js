function solution(board, moves) {
  const bucket = [];
  moves.forEach((m) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i][m - 1] !== 0) {
        bucket.push(board[i][m - 1]);
        board[i][m - 1] = 0;
        break;
      }
    }
  });
  let count = 0;
  const blowPair = (bucket) => {
    for (let i = 0; i < bucket.length - 1; i++) {
      if (bucket[i] === bucket[i + 1]) {
        count += 2;
        bucket.splice(i, 2);
        blowPair(bucket);
      }
    }
  };
  blowPair(bucket);
  return count;
}

const board = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 3],
  [0, 2, 5, 0, 1],
  [4, 2, 4, 4, 2],
  [3, 5, 1, 3, 1],
];
const moves = [1, 5, 3, 5, 1, 2, 4];

console.log(solution(board, moves));
