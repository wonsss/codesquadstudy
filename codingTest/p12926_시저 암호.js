function solution(s, n) {
  const arr = s.split("");
  const result = [];
  arr.forEach(word => {
    const std = word.charCodeAt(0);
    if (std >= 65 && std <= 90) {
      if (std + n > 90) {
        result.push(String.fromCharCode(std + n - 26));
      } else {
        result.push(String.fromCharCode(std + n));
      }
    } else if (std >= 97 && std <= 122) {
      if (std + n > 122) {
        result.push(String.fromCharCode(std + n - 26));
      } else {
        result.push(String.fromCharCode(std + n));
      }
    } else if (std === 32) {
      result.push(word);
    }
  });
  return result.join("");
}
const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
console.log(solution(s, 1));

// 다른 풀이
function solution2(s, n) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXY                          ";
  return s
    .split("")
    .map(e => chars[chars.indexOf(e) + n])
    .join("");
}
