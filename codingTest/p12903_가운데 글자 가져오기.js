function solution(s) {
  if (s.length % 2 === 1) {
    return s[(s.length - 1) / 2];
  }
  return s.slice(s.length / 2 - 1, s.length / 2 + 1);
}

console.log(solution("abcd"));
