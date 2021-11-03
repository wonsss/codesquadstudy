//### **1. factorial 함수**
//임의의 숫자(m)를 입력받아 1부터 m까지의 factorial 값을 배열로 담아서 반환하는 함수 만들기.
const calculate = (n) => {
  let result = [];
  for (let i = 1; i <= n; i++) {
    let f = 1;
    for (let j = 1; j <= i; j++) {
      f = f * j;
    }
    result.push(f);
  }
  return result;
};

console.log(calculate(4));
