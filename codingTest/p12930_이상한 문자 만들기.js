function solution(s) {
  function makeWeird(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      if (i % 2 === 0) {
        result += str[i].toUpperCase();
      } else {
        result += str[i].toLowerCase();
      }
    }
    return result;
  }
  const splitted = s.split(" ");
  return splitted.map(str => makeWeird(str)).join(" ");
}

console.log(solution("try hello world"));
