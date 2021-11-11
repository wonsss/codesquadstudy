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
