import ReadLine from 'readline';
import ScoreCalculator from './mission1_NormalDistribution.js';
import quickSort from './quickSort.js';

const rl = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const getLine = (function () {
  const getLineGen = (async function* processLineByLine() {
    for await (const line of rl) {
      yield line;
    }
  })();
  return async () => (await getLineGen.next()).value;
})();

const main = async () => {
  const list = {};
  console.log('점수를 입력할 과목명들을 한 줄에 띄어쓰기하여 입력해주세요.');
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
  console.log(list);
  process.exit(0);
};

main();
