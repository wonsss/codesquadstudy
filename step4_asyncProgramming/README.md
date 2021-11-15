# Step4 학습정리

## 비동기 입력

```js
import ReadLine from 'readline';
const rl = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const list = {};
async function processLineByLine() {
  console.log(
    '입력해주세요'
  );
  for await (const line of rl) {
    //한 줄씩 계속 입력을 받는다.
  }
  //async await로 인해 위 반복 루프가 종료되어야, 아래 코드가 실행된다.
  
  console.log(list);
  printResult(list);
}
```

## import 모듈

## Quick Sort
