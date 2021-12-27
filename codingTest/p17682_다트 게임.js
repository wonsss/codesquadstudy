function solution(dartResult) {
  const result = new Array(3);
  let index = -1;
  for (let i = 0; i < dartResult.length; i++) {
    switch (true) {
      case /[\d]/.test(+dartResult[i]):
        index++;
        if (+dartResult[i] === 1 && +dartResult[i + 1] === 0) {
          result[index] = 10;
          i++;
        } else {
          result[index] = +dartResult[i];
        }
        break;
      case dartResult[i] === "S":
        result[index] **= 1;
        break;
      case dartResult[i] === "D":
        result[index] **= 2;
        break;
      case dartResult[i] === "T":
        result[index] **= 3;
        break;
      case dartResult[i] === "*":
        result[index] *= 2;
        result[index - 1] *= 2;
        break;
      case dartResult[i] === "#":
        result[index] *= -1;
        break;
      default:
        break;
    }
  }
  return result.reduce((a, b) => a + b);
}

const dartResult = "10S#2D*3T";
console.log(solution(dartResult));
