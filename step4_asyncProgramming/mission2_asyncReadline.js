import ReadLine from 'readline';
import ScoreCalculator from './mission1_NormalDistribution.js';
import quickSort from './quickSort.js';

const rl = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const list = {};
async function processLineByLine() {
  console.log(
    '한 줄 안에 과목명을 처음에 써 주시고, 띄어쓰기를 하며 해당 과목 점수를 입력해주세요. ex) 수학 90 100 60 70'
  );
  for await (const line of rl) {
    const arr = line.split(' ');
    let subject = arr.shift();
    list[subject] = [];
    list[subject] = arr;
    playAgain();
  }
}

function printResult(list) {
  Object.keys(list).forEach((key) => {
    console.log(`@@@@@@@@@@${key} 과목 점수 통계@@@@@@@@@@`);
    let numberList = list[key].map((n) => parseInt(n, 10));
    let calc = new ScoreCalculator(numberList);
    console.log('[과목별 점수 퀵소트 정렬]', quickSort(numberList));
    console.log('[평균]', calc.getMean());
    console.log('[표준편차]', calc.getStandardDeviation());
    console.log(
      '[70점~80점 정규분포 확률]',
      calc.getNormalDistribution(70, 80)
    );
    console.log('-----------------------------------------------------');
  });
}

function playAgain() {
  rl.question(
    '★ 계속 입력하고 싶으시면 "계속"이라고 입력해주시고, 종료하고 싶으시면 "종료"라고 입력해주세요.',
    (input) => {
      if (input === '계속') {
        processLineByLine();
      } else if (input === '종료') {
        console.log(list);
        printResult(list);
        console.log('★  종료되었습니다.');
        rl.close();
      } else {
        console.log('★  종료 또는 계속 중 한 단어를 입력해주세요');
        playAgain();
      }
    }
  );
}

processLineByLine();
