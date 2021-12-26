function solution(dartResult) {
  const regexNum = /\d/g;
  const regexEng = /[A-Z]/g;
  const regexStar = /[\*\#]/g;
  const idxS = dartResult.indexOf("S");
  const idxD = dartResult.indexOf("D");
  const idxT = dartResult.indexOf("T");
  const numS = dartResult.slice(, idxS);
  console.log(idxS, idxD, idxT);
  console.log(numS);
}

const dartResult = "10S2D*3T";
// solution(dartResult);
console.log(solution(dartResult));
