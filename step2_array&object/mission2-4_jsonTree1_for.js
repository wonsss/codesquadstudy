// ### **4. 배열 만들기**
// 아래 데이터를 확인한다.[https://gist.github.com/crongro/ade2c3f74417fc202c8097214c965f27](https://www.notion.so/ade2c3f74417fc202c8097214c965f27)
// 숫자타입으로만 구성된 요소를 뽑아 배열만들기

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
  },
};

const getOnlyNumberValue = (data) => {
  const result = [];
  for (i in data) {
    for (j in data[i]) {
      if (typeof data[i][j] === 'number') {
        // console.log(data[i][j]);
        result.push(j);
      }
    }
  }
  return result;
};

console.log(getOnlyNumberValue(data1));
