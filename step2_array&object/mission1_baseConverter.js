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

//convertBase(n, t, m)
//n: 진법, t: 몇개의 숫자까지 말하는지, m: 게임 참여자 수
const convertBase = (n, t, m) => {
  let result = '';
  for (let i = 0; i < t * m; i++) {
    result += i.toString(n);
  }
  return result.split('');
};

//result: T개의 숫자까지 M명이 진법게임을 한 결과 배열, m: 게임 참여자 수, p: 길동이의 게임 참여 순서(1이면 첫번째)
const findGildong = (result, m, p) => {
  let gildongSaid = {};
  for (const i in result) {
    // console.log((i % n) + 1);
    if ((i % m) + 1 === p) {
      gildongSaid[parseInt(i, 10) + 1] = result[i];
    }
  }
  return gildongSaid;
};

//convertBase(n, t, m)
//n: 진법, t: 몇개의 숫자까지 말하는지, m: 게임 참여자 수
console.log(convertBase(10, 5, 4));

//findGildong(result, m, p)
//result: T개의 숫자까지 M명이 진법게임을 한 결과 배열, m: 게임 참여자 수, p: 길동이의 게임 참여 순서(1이면 첫번째)
console.log(findGildong(convertBase(10, 5, 4), 4, 3));
