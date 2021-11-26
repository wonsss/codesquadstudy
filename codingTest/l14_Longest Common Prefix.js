const longestCommonPrefix = function (strs) {
  const lengthStrs = strs.map(el => el.length);
  const minLengthStrs = lengthStrs.reduce((prev, cur) =>
    prev > cur ? cur : prev
  );

  const wordDict = {};
  for (let i = 0; i < minLengthStrs; i++) {
    wordDict[i] = [];
  }

  for (let i = 0; i < strs.length; i++) {
    for (let j = 0; j < minLengthStrs; j++) {
      if (strs[i][j]) {
        wordDict[j].push(strs[i][j]);
      }
    }
  }
  // console.log(wordDict);

  let result = '';
  for (const i in wordDict) {
    if (Object.hasOwnProperty.call(wordDict, i)) {
      const sameStr = wordDict[i].reduce((prev, cur) =>
        prev === cur ? cur : false
      );
      if (sameStr === false) {
        return result;
      }
      result += sameStr !== false ? sameStr : '';
    }
  }
  return result;
};

const strs = ['cir', 'car'];

console.log(longestCommonPrefix(strs));
