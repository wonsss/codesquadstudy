const data1 = {
  debug: 'on',
  window: {
    title: 'Sample Konfabulator Widget',
    name: 'main_window',
    width: 500,
    height: 500,
  },
  image: {
    src: 'Images/Sun.png',
    name: 'sun1',
    hOffset: 250,
    vOffset: 250,
    alignment: 'center',
  },
  text: {
    data: 'Click Here',
    size: 36,
    style: 'bold',
    name: 'text1',
    hOffset: 250,
    vOffset: 100,
    alignment: 'center',
    onMouseUp: 'sun1.opacity = (sun1.opacity / 100) * 90;',
    triple: [
      {
        src: 'Images/Sun.png',
        name: 'sun1',
        kkkhOffset: 250,
        kkkvOffset: 250,
        alignment: 'center',
        soManyDepth: [
          {
            alignment: 'center',
            isThisEnd: 9999,
          },
        ],
      },
    ],
  },
};

// JSON.stringify와 parse 이용하여 구현
const getOnlyNumberByJSON = (data) => {
  const answer = [];
  const obj = JSON.stringify(data);
  JSON.parse(obj, (key, value) => {
    if (typeof value === 'number') answer.push(key);
  });
  return answer;
};

console.log(getOnlyNumberByJSON(data1));
