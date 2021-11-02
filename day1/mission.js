//각 도형의 결과값을 저장하는 배열 선언
let sequenceArr = [];

//shape 매개변수에 따라 스프레드연산자 매개변수들을 달리 활용하여 각 도형의 넓이 계산하도록 함수 호출
const getArea = (shape, ...sizes) => {
  switch (shape) {
    case 'circle':
      return getCircleArea(...sizes);
      break;
    case 'rect':
      return getRectangleArea(...sizes);
      break;
    case 'trapezoid':
      return getTrapezoidArea(...sizes);
      break;
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
  getArea('circle', 10);
  getArea('rect', 10, 15);
  getArea('trapezoid', 10, 15, 12);
  getArea('circle', 1, 3);
  getArea('circle', 1);
  printExecutionSequence();
}

test();
