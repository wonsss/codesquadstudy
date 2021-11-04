/*
몇 명의 사람들이 모여서 2진수를 한 글자씩 끊어서 말하는 게임을 진행중이다.2진수의 경우 이렇게 말하게 된다.
0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, …
문제1) T개의 숫자까지 M명이 말한다고 할때 이를 모두 출력하는 프로그램을 만든다.
solution(2,4,2) //2진수, 4개의 숫자까지, 2명이 말할때
> ["0", "1", "1", "0", "1", "1", "1", "0", "0", "1", "0", "1", "1", "1", "0", "1", "1", "1"]
### **문제2) 길동이 차례 숫자 맞추기**
홍길동의 차례에 어떤 숫자를 말해야 하는지를 알 수 있는 프로그램을 만든다.
### **문제3) n진수까지 되는 프로그램**
2진수 뿐 아니라 16진수까지 동작하는 프로그램을 만든다.
파라미터로 진법 n, 미리 구할 숫자의 갯수 t, 게임에 참가하는 인원 m, 길동이의 순서 p 가 주어진다.
*/

//convertBase(base, timesRule, totalNumberOfplayers)
//base: 진법, timesRule: 몇개의 숫자까지 말하는지, totalNumberOfplayers: 게임 참여자 수
const convertBase = (base, timesRule, totalNumberOfplayers) => {
  let result = '';
  for (let i = 0; i < timesRule * totalNumberOfplayers; i++) {
    result += i.toString(base);
  }
  return result.split('');
};

const findGildong = (base, timesRule, totalNumberOfplayers, order) => {
  let gildongSaid = {};
  const result = convertBase(base, timesRule, totalNumberOfplayers);
  for (const i in result) {
    if ((i % totalNumberOfplayers) + 1 === order) {
      gildongSaid[parseInt(i, 10) + 1] = result[i];
    }
  }
  console.log(result);
  console.log(gildongSaid);
};

//findGildong(base, timesRule, totalNumberOfplayers, order)
//base: 진법, timesRule: 몇개의숫자까지 말하는지, totalNumberOfplayers: 게임 참여자 수, order: 길동이의 게임 참여 순서(1이면 첫번째)

//16진법으로 각각 총 5개의 숫자까지 4명의 게임 참여자가 말하는 경우(길동이의 순서는 세 번째)
findGildong(16, 5, 4, 3);
/*
콘솔 결과
 [
  '0', '1', '2', '3', '4',
  '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd', 'e',
  'f', '1', '0', '1', '1',
  '1', '2', '1', '3'
] 
*/

/*콘솔 결과 - 객체이다. key는 길동이가 답해야 할 순서이고 value는 길동이가 그 순서에 말해야 할 숫자이다.
{ '3': '2', '7': '6', '11': 'a', '15': 'e', '19': '1', '23': '1' }
*/
//순수함수, 같은 값 같은 결론이 나도록..!!
