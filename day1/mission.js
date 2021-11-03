//각 도형의 결과값을 저장하는 배열 선언
let sequenceArr = [];

//shape 매개변수에 따라 스프레드연산자 매개변수들을 달리 활용하여 각 도형의 넓이 계산하도록 함수 호출
const getArea = (shape, ...sizes) => {
  switch (shape) {
    case '원':
      return getCircleArea(...sizes);
    case '사각형':
      return getRectangleArea(...sizes);
    case '사다리꼴':
      return getTrapezoidArea(...sizes);
    default:
      break;
  }
};

//도형들의 각각의 넓이를 구하는 함수를 별도로 만든다
const getCircleArea = (...sizes) => {
  if (sizes[0] === 1) {
    if (sizes[1] === undefined) {
      sizes[1] = 1;
    }
    let sum = 0;
    for (let i = 1; i <= sizes[1]; i++) {
      sum += Math.pow(i, 2) * Math.PI;
    }
    sequenceArr.push(`반지름 1부터 ${sizes[1]}까지 원들의 넓이의 합: ${sum}`);
    return;
  }
  sequenceArr.push(
    `반지름 ${sizes[0]}인 원의 넓이: ${Math.pow(sizes[0], 2) * Math.PI}`
  );
  return;
};

const getRectangleArea = (...sizes) => {
  sequenceArr.push(
    `변의 길이가 ${sizes[0]}, ${sizes[1]}인 사각형의 넓이: ${
      sizes[0] * sizes[1]
    }`
  );
  return;
};

const getTrapezoidArea = (...sizes) => {
  sequenceArr.push(
    `윗변과 아랫변의 길이가 ${sizes[0]}, ${sizes[1]}이고 높이는 ${
      sizes[2]
    }인 사다리꼴의 넓이: ${((sizes[0] + sizes[1]) * sizes[2]) / 2}`
  );
  return;
};

//함수 수행 순서 및 결과값 출력
const printExecutionSequence = () => {
  sequenceArr.forEach((areaResult) => {
    console.log(areaResult);
  });
};

//테스트
function test() {
  getArea('원', 10);
  getArea('사각형', 10, 15);
  getArea('사다리꼴', 10, 15, 12);
  getArea('원', 1, 3);
  getArea('원', 1);
  printExecutionSequence();
}

// test();

function executeFunctionByReadingInput(shape, ...sizes) {
  getArea(shape, ...sizes);
  printExecutionSequence();
  playAgain();
}

const consoleReader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readConsole() {
  consoleReader.question(
    '★  어떤 도형의 넓이를 구하고 싶으세요? 원, 사다리꼴, 사각형 중에서 한글로 답변해주세요.',
    (shape) => {
      if (shape === '원') {
        consoleReader.question(
          '★  반지름의 길이를 입력해주세요. 만약 반지름 1부터 n까지 원들의 넓이 합을 구하고 싶으시면 1과 n을 띄어쓰기 하여 입력해주세요.\n',
          (sizes) => {
            const sizeParams = sizes
              .trim()
              .split(' ')
              .map((size) => parseInt(size, 10));
            executeFunctionByReadingInput(shape, sizeParams[0], sizeParams[1]);
          }
        );
      } else if (shape === '사다리꼴') {
        consoleReader.question(
          '★  사다리꼴 변들의 길이를 윗변, 아랫변, 높이를 순서대로 띄어쓰기하여 한줄로 입력해주세요.\n',
          (sizes) => {
            const sizeParams = sizes
              .trim()
              .split(' ')
              .map((size) => parseInt(size, 10));
            executeFunctionByReadingInput(
              shape,
              sizeParams[0],
              sizeParams[1],
              sizeParams[2]
            );
          }
        );
      } else if (shape === '사각형') {
        consoleReader.question(
          '★  사각형의 가로변과 세로변의 길이를 순서대로 띄어쓰기하여 한줄로 입력해주세요.\n',
          (sizes) => {
            const sizeParams = sizes
              .trim()
              .split(' ')
              .map((size) => parseInt(size, 10));
            executeFunctionByReadingInput(shape, sizeParams[0], sizeParams[1]);
          }
        );
      } else {
        console.log('★  도형(원, 사다리꼴, 사각형)을 잘못 입력하셨습니다.');
        playAgain();
      }
    }
  );
}

const playAgain = () => {
  consoleReader.question(
    '★  다시 하고 싶으시면 "다시"이라고 입력해주시고, 종료하고 싶으시면 "종료"라고 입력해주세요.',
    (input) => {
      if (input === '다시') {
        readConsole();
      } else if (input === '종료') {
        console.log('★  종료되었습니다.');
        consoleReader.close();
      } else {
        console.log('★  종료 또는 다시 중 한 단어를 입력해주세요');
        playAgain();
      }
    }
  );
};

readConsole();
