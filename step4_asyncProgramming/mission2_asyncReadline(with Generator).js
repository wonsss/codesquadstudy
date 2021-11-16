import ReadLine from 'readline';
import ScoreCalculator from './mission1_NormalDistribution.js';
import quickSort from './quickSort.js';
import fs from 'fs';

const fsReader = fs.readFileSync('step4_asyncProgramming/input.txt').toString();

const rl = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//이것은 퓨어 자바스크립트에서 거의 언제나 사용하는, IIFE(Immediately-invoked function expression: 즉시 작동하는 함수식)라는 구문입니다. "이 안에 들어있는 코드를 바로 실행해라" 라는 표현으로 이해하시면 되겠습니다. 별도의 호출문 없이도 바로 실행된다. 여기서는 "즉시 함수를 실행해"하여, 리턴값을 변수에 할당하는 경우다.
const getLine = (function () {
  const getLineGen = (async function* processLineByLine() {
    for await (const line of rl) {
      yield line;
    }
  })();
  return async () => (await getLineGen.next()).value;
})();

const main = async (list = {}) => {
  let subjects = String(await getLine()).split(' ');
  for (const subject of subjects) {
    console.log(
      `${subject} 과목의 점수들을 한 줄에 띄어쓰기하여 입력해주세요.`
    );
    const arr = String(await getLine()).split(' ');
    let numberList = arr.map((n) => parseInt(n, 10));
    list[subject] = {};
    list[subject]['점수'] = quickSort(numberList);
    let calc = new ScoreCalculator(numberList);
    list[subject]['평균'] = calc.getMean();
    list[subject]['표준편차'] = calc.getStandardDeviation();
    list[subject]['70점~80점 정규분포 확률'] = calc.getNormalDistribution(
      70,
      80
    );
  }
  const listCopy = JSON.stringify(list, null, 2);
  fs.writeFileSync('step4_asyncProgramming/input.txt', listCopy);

  console.log(listCopy);
  process.exit(0);
};
//실행
if (fsReader.includes('{')) {
  const prevData = JSON.parse(fsReader);
  console.log(prevData);
  console.log(`
  기존에 입력되어 있는 데이터는 위와 같습니다.
  추가로 점수를 입력할 과목명들을 한 줄에 띄어쓰기하여 입력해주세요.
  기존에 존재하는 과목명에 선택하실 경우, 새 점수가 기존 점수를 덮어쓰게 됩니다`);
  main(prevData);
} else {
  console.log(`
  기존에 입력된 데이터는 없습니다.
  점수를 입력할 과목명들을 한 줄에 띄어쓰기하여 입력해주세요.`);
  main();
}
