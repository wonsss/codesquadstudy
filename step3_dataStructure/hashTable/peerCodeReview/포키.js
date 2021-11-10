// Hash Table 이란?
// 검색하고자 하는 key 값을 입력받아 Hash 함수를 돌려 반환 받은
// Hash 코드를 배열의 index 로 환산해서 데이터에 접근하는 방식의 자료구조이다.

// 1. 빈 배열 객체 만들기

function hashMap(size) {
  // 특정 사이즈의 빈 key와 value Array를 만든다.
  this.size = size;
  this.keys = this.initArray(size);
  this.values = this.initArray(size);
  this.limit = 0;
}

// inintArray 메서드 : size를 인수로 받아 해당 size의 빈 배열을 만든다.
hashMap.prototype.initArray = function (size) {
  const arr = [];

  for (let i = 0; i < size; i++) {
    arr.push(null);
  }
  return arr;
};

// 2. hash 함수 만들기
// 해시 테이블은 처음부터 고정적인 공간을 할당하고 , 값을 계속 우겨넣는 방식이다.
// 때문에 해시 충돌이 일어나는 것인데 , 그래서 해시 테이블을 운용할 때 가장 중요한 것은 해시함수가 얼마나 균일하게 값을 퍼트리냐 이다.
hashMap.prototype.hash = function (key) {
  const intKey = Number(key); // key 값이 들어오면 Number를 통해 Int형으로 바꿔준다.

  if (isNaN(intKey)) {
    // 바꿔준 값이 숫자(int형)가 아닐 경우
    let sumAsciiNum = 0;

    for (let i = 0; i < key.length; i++) {
      sumAsciiNum += key.charCodeAt(i); // charCodeAt 를 통하여 아스키값으로 바꾸어 주고 더해준다.
    }
    return sumAsciiNum % this.size;
  }
  return intKey % this.size; // 바꿔준 값이 숫자(int형)일 경우의 return 값
};

// 해시 충돌이 일어나는 이유 : 해시 테이블의 대표적인 단점으로 , 서로 다른 Key를 넣었지만 동일한 해시값이 나오는 것을 말한다.
// 해결방법에는 여러가지가 있지만 여기서는 개방주소법의 선형탐사법을 사용할 것이다.
// 설명 URL => https://velog.io/@yunsungyang-omc/JS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%ED%95%B4%EC%8B%9C%ED%85%8C%EC%9D%B4%EB%B8%94-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0
// 선형탐사법이란? 말 그대로 선형으로 순차적으로 탐사하는 방법이다. 충돌이 났을때 정해진 n칸만큼의 옆 방을 홀드해서 데이터를 저장하는 방법이다.

// 3. put 메서드 만들기 & 충돌을 방지 하기 위하여 선형탐사를 사용

hashMap.prototype.put = function (key, value) {
  // put 함수 구현
  if (this.limit >= this.size) throw 'hash table is full';

  let index = this.hash(key);

  // 선형 탐사 -> 선형 탐사를 하는 이유 : 충돌(중복)을 막기 위한 방법
  while (this.keys[index] !== null) {
    // 넣고자 하는 index에 이미 값이 있다면
    if (index === this.size - 1) {
      // 근데 그 index가 마지막 인덱스라면! 다음 인덱스가 없어 보내지 못하기 때문에
      index = 0; // 제일 처음 index로 보내준다.
    } else {
      index++; // 다음 인덱스로
    }
  }
  this.keys[index] = key;
  this.values[index] = value;
  this.limit++;
};

hashMap.prototype.remove = function (key) {
  // remove 함수 구현
  let index = this.hash(key);

  // while 문을 통하여 배열을 순회하여 key 값이 일치하지 않을 경우 while문 안을 반복한다.
  while (this.keys[index] !== key) {
    // keys[index]에 들어있는 key 값과 key가 일치하지 않는다면
    if (index === this.size - 1) {
      // index가 마지막 index라면 index에 0을 넣어 준다.
      index = 0;
    } else {
      index++;
    }
  }
  this.keys[index] = null; // null 값을 넣어주어 초기화
  this.values[index] = null;
};

hashMap.prototype.containsKey = function (key) {
  return this.keys.includes(key); // key 배열에 입력한 key가 존재하는지
};

hashMap.prototype.getAllKeys = function () {
  return this.keys;
};

hashMap.prototype.getAllValues = function () {
  return this.values;
};
hashMap.prototype.get = function (key) {
  // 해당 키와 매치는 되는값을 찾아서 리턴하는 역할.
  let index = this.hash(key);

  // while 문을 통하여 배열을 순회하여 key 값이 일치하지 않을 경우 while문 안을 반복한다.
  while (this.keys[index] !== key) {
    // keys[index]에 들어있는 key 값과 key가 일치하지 않는다면
    if (index === this.size - 1) {
      // index가 마지막 index라면 index에 0을 넣어 준다.
      index = 0;
    } else {
      index++;
    }
  }
  return this.values[index];
};

hashMap.prototype.isEmpty = function () {
  for (let i = 0; i < this.size; i++) {
    if (this.keys[i] !== null) {
      // for문을 돌때 keys 배열에 null값이 아닌값이 있다면
      return false; // false 를 return 해 준다.
    }
  }
  return true;
};

hashMap.prototype.returnKeys = function () {
  // 전체 키 목록을 [String] 배열로 리턴한다.
  return this.keys;
};

hashMap.prototype.replace = function (key, value) {
  // 키-값 으로 기존 값을 대체한다.
  let index = this.hash(key);

  while (this.keys[index] !== key) {
    // keys[index]에 들어있는 key 값과 key가 일치하지 않는다면
    if (index === this.size - 1) {
      // index가 마지막 index라면 index에 0을 넣어 준다.
      index = 0;
    } else {
      index++;
    }
  }
  this.keys[index] = key;
  this.values[index] = value;
};

hashMap.prototype.sizeOf = function () {
  return this.size;
};

hashMap.prototype.clear = function () {
  for (let i = 0; i < this.size; i++) {
    this.keys[i] = null;
    this.values[i] = null;
  }
};

// test

const newhashMap = new hashMap(52); // 인스턴스 생성

newhashMap.put('피자', 20000);
newhashMap.put('치킨', 18000);
newhashMap.put('스테이크', 50000);
console.log(newhashMap.getAllKeys());
console.log(newhashMap.getAllValues());
console.log(newhashMap.get('치킨'));
