//아래 코드 및 재귀함수 설명을 도식화한 페이지 링크
//https://www.figma.com/file/UsSobSv9OotTelwbhddmbz/%EC%9E%AC%EA%B7%80%ED%95%A8%EC%88%98%2C-%ED%8C%8C%EC%84%9C?node-id=0%3A1
function parser(data) {
  const parseArray = (data) => {
    const stack = [];
    let tempStack;
    data.forEach((i) => {
      if (typeof i === 'number') {
        tempStack = { type: 'number', value: i, child: [] };
        console.log('@1@', tempStack);
      } else if (Array.isArray(i)) {
        tempStack = { type: 'array', child: parseArray(i) };
        console.log('#2#', tempStack);
      }
      stack.push(tempStack);
      console.log('$3$', stack);
    });
    return stack;
  };
  return {
    type: 'root',
    child: [{ type: 'array', child: parseArray(data) }],
  };
}
const data = [1, 2, [3, 4, [5, [6]]]];
// const data = [1, 2, [3, 4], [5], 6, [7, [8]]];

console.log(JSON.stringify(parser(data), null, 2));
