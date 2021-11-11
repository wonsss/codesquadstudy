const data = '[1, 2, [3, 4, [5, 6, [7, [8]]]]]';

let count = 0;
let depth = 1;

function getDepth(data) {
  data.forEach((array) => {
    if (typeof array !== 'object') {
      count++;
    } else {

      getDepth(array);
    }
  });

  return [depth, count];
}

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
    return false;
  }
  //'['과 ']'의 개수의 쌍은 맞아도, '['보다 ']'이 먼저 나오는 잘못된 경우 체크
  let bracketArray = [];
  for (const i of data) {
    if (i === '[') {
      bracketArray.push('[');
    }
    if (i === ']') {
      if (bracketArray.length === 0) {
        return false;
      }
      bracketArray.pop();
    }
  }

  return true;
}

const setValueToField = (fields, value) => {
  const reducer = (acc, item, index, arr) => ({
    [item]: index + 1 < arr.length ? acc : value,
  });
  return fields.reduceRight(reducer, {});
};

function run(data) {
  try {
    const nestedData = JSON.parse(data);
    const result1 = getDepth(nestedData);
    console.log(
      `배열의 중첩된 깊이 수준은 ${result1[0]}이며, 총 ${result1[1]}개의 원소가 포함되어 있습니다.`
    );
  } catch {
    if (!checkBrackets(data)) {
      console.log('닫는 괄호가 일치하지 않습니다');
    }
  } finally {
  }
}

run(data);

/* 문제3번 ...진행중
const nestedData = JSON.parse(data);
function analyzeArray(data) {
  data.forEach((i) => {
    if (Array.isArray(i)) {
      console.log('array', i);
      analyzeArray(i);
    } else if (typeof i === 'number') {
      console.log('number', i);
    }
  });
  return;
}
analyzeArray(nestedData); */
