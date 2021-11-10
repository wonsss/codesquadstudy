const data1 = '[1, 2, [3, 4, [5, 6, [7, [8]]]]]'; //정상
const data2 = '[1, 2, [3, 4, [5, 6, [7, [8]]]]'; //대괄호 쌍 맞지 않음
const data3 = '][[1, 2, [3, 4, [5, 6, [7, [8]]]]]'; // 대괄호 쌍은 맞으나 닫는 괄호가 여는 괄호보다 앞에 나옴

let count = 0;
let depth = 1;

//[v] 1. 요구사항 : 객체 분석 정보를 출력
function getDepth(data) {
  data.forEach((array) => {
    if (typeof array !== 'object') {
      count++;
    } else {
      depth++;
      getDepth(array);
    }
  });

  return [depth, count];
}

//[v] 2. 요구사항 : 괄호가 매칭에 문제가 있는 경우 오류내용을 출력한다.
function checkBrackets(data) {
  //'['과 ']'의 개수의 쌍 체크
  let bracketNumber = 0;
  for (const i of data) {
    if (i === '[') {
      bracketNumber++;
    }
    if (i === ']') {
      bracketNumber--;
    }
  }
  if (bracketNumber !== 0) {
    return 'case1';
  }
  //'['과 ']'의 개수의 쌍은 맞아도, '['보다 ']'이 먼저 나오는 잘못된 경우 체크
  let bracketArray = [];
  for (const i of data) {
    if (i === '[') {
      bracketArray.push('[');
    }
    if (i === ']') {
      if (bracketArray.length === 0) {
        return 'case2';
      }
      bracketArray.pop();
    }
  }

  return true;
}

//run함수 : 위 함수들을 모아서 실행해주는 함수
function run(data) {
  console.log('★TEST CASE : ', data);
  try {
    const nestedData = JSON.parse(data);
    const result1 = getDepth(nestedData);
    console.log(
      `배열의 중첩된 깊이 수준은 ${result1[0]}이며, 총 ${result1[1]}개의 원소가 포함되어 있습니다.`
    );
  } catch {
    if (checkBrackets(data) === 'case1') {
      console.log('괄호의 개수가 일치하지 않습니다.');
    } else if (checkBrackets(data) === 'case2') {
      console.log('괄호 개폐 전에 여는 괄호보다 닫는 괄호가 앞에 왔습니다.');
    }
  } finally {
  }
}

run(data1);
run(data2);
run(data3);
