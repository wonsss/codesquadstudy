function solution(strings, n) {
  return strings.sort((a, b) => a.charCodeAt(n) - b.charCodeAt(n));
}

const strings = ["abce", "abcd", "cdx"];
console.log(solution(strings, 2));
