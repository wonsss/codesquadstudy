//### **1. factorial 함수**
//임의의 숫자(m)를 입력받아 1부터 m까지의 factorial 값을 배열로 담아서 반환하는 함수 만들기.

const makeFactorial = (n) => {
  const result = [];
  let f = 1;
  for (let i = 1; i <= n; i++) {
    f *= i;
    result.push(f);
  }
  return result;
};

console.log(makeFactorial(4));

/////////////////////////////////////
// 재귀를 이용하여 푼 버전
const pushInArray = (m) => {
  const result = [];
  const recurCalculate = (n) => {
    if (n === 1 || n === 0) return 1;
    return n * recurCalculate(n - 1);
  };
  for (let i = 1; i <= m; i++) {
    result.push(recurCalculate(i));
  }
  return result;
};

console.log(pushInArray(4));


  const recurCalculate = (n) => {
    if (n === 1 || n === 0) return 1;
    return n * recurCalculate(n - 1);
  };