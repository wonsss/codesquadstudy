/* eslint-disable */
class BracketExpert {
  constructor() {}
  //run함수 : 위 함수들을 모아서 실행해주는 함수
  run(data) {
    console.log('★TEST CASE : ', data);
    try {
      //문자열을 JSON으로 파싱
      const nestedData = JSON.parse(data);
      //[1] 객체분석정보 반환 메서드 실행 및 출력
      const count = this.countElement(nestedData);
      const depth = this.getDepth(data);
      console.log(
        `배열의 중첩된 깊이 수준은 ${depth}이며, 총 ${count}개의 원소가 포함되어 있습니다.`
      );
      //[3] 자료구조 반환 메서드 실행 및 출력
      const parsedData = this.parser(nestedData);
      console.log(JSON.stringify(parsedData, null, 2));
    } catch {
      //[2] 괄호매칭오류 반환 메서드 실행 및 출력
      if (this.checkBrackets(data) === 'case1') {
        console.log('괄호의 개수가 일치하지 않습니다.');
      } else if (this.checkBrackets(data) === 'case2') {
        console.log('괄호 개폐 전에 여는 괄호보다 닫는 괄호가 앞에 왔습니다.');
      }
    }
  }
  //[1-1] 요소 개수 세기 메서드
  countElement(data) {
    let count = 0;
    const recur = data => {
      data.forEach(array => {
        if (typeof array !== 'object') {
          count++;
        } else {
          recur(array);
        }
      });
      return count;
    };
    return recur(data);
  }
  //[1-2] 깊이 재기 메서드
  getDepth(data) {
    let depth = 0;
    let dataArray = data.split('');
    while (dataArray.pop() === ']') {
      depth++;
    }
    return depth;
  }
  //[2] 괄호매칭오류 반환 메서드
  checkBrackets(data) {
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
  //[3] 자료구조 반환 메서드
  //아래 코드 및 재귀함수 설명을 도식화한 페이지 링크
  //https://www.figma.com/file/UsSobSv9OotTelwbhddmbz/%EC%9E%AC%EA%B7%80%ED%95%A8%EC%88%98%2C-%ED%8C%8C%EC%84%9C?node-id=0%3A1
  parser(data) {
    const parseArray = data => {
      const stack = [];
      let tempStack;
      data.forEach(i => {
        if (typeof i === 'number') {
          tempStack = { type: 'number', value: i, child: [] };
        } else if (Array.isArray(i)) {
          tempStack = { type: 'array', child: parseArray(i) };
        }
        stack.push(tempStack);
      });
      return stack;
    };
    return {
      type: 'root',
      child: [{ type: 'array', child: parseArray(data) }],
    };
  }
}

const data1 = '[1, 2, [3, 4], [5], 6, [7, [8]]]'; //정상
const data2 = '[1, 2, [3, 4, [5, 6, [7, [8]]]]'; //대괄호 쌍 맞지 않음
const data3 = '][[1, 2, [3, 4, [5, 6, [7, [8]]]]]'; // 대괄호 쌍은 맞으나 닫는 괄호가 여는 괄호보다 앞에 나옴
const data4 = '[1, 2]'; //정상
const tester = new BracketExpert();
tester.run(data1);
tester.run(data2);
tester.run(data3);
tester.run(data4);
