// import ReadLine from 'readline';
const Readline = require('readline');
// import ScoreCalculator from './mission1_NormalDistribution.js';
const ScoreCalculator = require('./mission1_NormalDistribution.js');
// import quickSort from './quickSort.js';
const quickSort = require('./quickSort.js');
// import fs from 'fs';
const fs = require('fs');

const rl = Readline.createInterface({
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

const overWrite = (data) => {
  const listCopy = JSON.stringify(data, null, 2);
  fs.writeFileSync('step4_asyncProgramming/input.txt', listCopy);
  console.log(listCopy);
  return listCopy;
};

const askPlayAgain = () => {
  rl.question(
    '[Bot]: 계속 프로그램을 실행하려면 "계속"을 입력해주시고, 종료하시면 "종료"라고 입력해주세요.\n',
    (input) => {
      if (input === '계속') {
        main();
      } else if (input === '종료') {
        process.exit(0);
      } else {
        console.log('[Bot]: 잘못 입력하셨습니다.');
        askPlayAgain();
      }
    }
  );
};

const createData = async (list = {}) => {
  let subjects = String(await getLine()).split(' ');
  for (const subject of subjects) {
    console.log(
      `[Bot]: ${subject} 과목의 점수들을 한 줄에 띄어쓰기하여 입력해주세요.(ex, 86 65 76 58)`
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
  overWrite(list);
  askPlayAgain();
};

const deleteData = (prevData, subject) => {
  delete prevData[subject];
  overWrite(prevData);
  console.log(`[Bot]: ${subject} 과목 삭제가 완료되었습니다.`);
  askPlayAgain();
  return;
};

const resetData = () => {
  overWrite({});
  console.log('[Bot]: 초기화가 완료되었습니다.');
  askPlayAgain();
};

const notifyExistingDataAndQuestion = (prevData) => {
  rl.question(
    '[Bot]: 기존 데이터가 있습니다. 과목에 대한 "추가","삭제","초기화" 중에서 원하는 동작을 입력해주세요.\n',
    (input) => {
      chooseNext(input, prevData);
    }
  );
};

const chooseNext = (input, prevData) => {
  switch (input) {
    case '추가':
      console.log(`
[Bot]: 추가로 점수를 입력할 과목명들을 한 줄에 띄어쓰기하여 입력해주세요.
       기존에 존재하는 과목명에 선택하실 경우, 새 점수가 기존 점수를 덮어쓰게 됩니다.(ex, 영어 수학 과학)`);
      return createData(prevData);
    case '삭제':
      rl.question(
        '[Bot]: 삭제를 원하는 과목명을 입력해주세요.\n',
        (subject) => {
          deleteData(prevData, subject);
        }
      );
      return;
    case '초기화':
      return resetData();
    default:
      console.log('[Bot]: 잘못 입력하셨습니다.');
      notifyExistingDataAndQuestion(prevData);
      break;
  }
};

const main = () => {
  const fsReader = fs
    .readFileSync('step4_asyncProgramming/input.txt')
    .toString();
  const prevData = JSON.parse(fsReader);
  if (Object.keys(prevData).length >= 1) {
    console.log(prevData);
    notifyExistingDataAndQuestion(prevData);
  } else {
    console.log(`
[Bot]: 기존에 입력된 데이터는 없습니다.
       점수를 입력할 과목명들을 한 줄에 띄어쓰기하여 입력해주세요.(ex, 수학 영어 과학)`);
    createData();
  }
};
main();
