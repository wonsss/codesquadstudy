const romanToInt = function (s) {
  const romanDict = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  const sArr = s.split('');
  let result = 0;
  const indexArr = [];


  sArr.forEach(i => {
    indexArr.push(Object.keys(romanDict).indexOf(i));
  });

  const originalIndexArrStr = indexArr.join(''); 
  const sortedIndexArrStr = indexArr.sort((a, b) => b - a).join('');

  if (originalIndexArrStr === sortedIndexArrStr) {
    sArr.forEach(value => {
      result += romanDict[value];
    });
  } else {
    sArr.forEach((value, index) => {
      if (index < sArr.length - 1) {
        if (romanDict[value] >= romanDict[sArr[index + 1]]) {
          result += romanDict[value];
        } else {
          result -= romanDict[value];
        }
      } else {
        result += romanDict[value];
      }
    });
  }
  return result;
};

const s = 'MCMXCIV';

console.log(romanToInt(s));
