# 해시맵

## 1. 미션

- [x] 문자열 키와 문자열 값을 저장하는 해시맵 라이브러리를 구현한다.
- [x] 고유한 Hash 함수를 정한다.
  - [x] put(String key, String value) 키-값을 추가한다.
  - [x] remove(String key) 해당 키에 있는 값을 삭제한다.
  - [x] containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
  - [x] get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
  - [x] isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
  - [x] keys() 전체 키 목록을 [String] 배열로 리턴한다.
  - [x] replace(String key, String value) 키-값으로 기존 값을 대체한다.
  - [x] size() 전체 아이템 개수를 리턴한다.
  - [x] clear() 전체 맵을 초기화한다.
- [x] 객체 형태로 만든다.
- 객체는 JavaScript prototype 속성을 활용한다.

## 2. Hash Map

해시 테이블(hash table), 해시 맵(hash map), 해시 표는 컴퓨팅에서 키를 값에 매핑할 수 있는 구조인, 연관 배열 추가에 사용되는 자료 구조이다. 해시 테이블은 해시 함수를 사용하여 색인(index)을 버킷(bucket)이나 슬롯(slot)의 배열로 계산한다.

- 해싱은 데이터를 단시간에 `삽입`하거나 저장된 데이터를 `가져올 때` 주로 사용하는 기법이다. 해싱은 `해시 테이블`이라는 자료구조를 이용한다. 해싱을 이용하면 데이터를 `빠르게 삽입하고, 삭제하고, 가져올 수 있지만`, 최솟값이나 최댓값 찾기 등 `검색 동작은 효율이 떨어진다`. 따라서 검색이 필요한 상황이라면 이진 탐색 트리 같은 자료구조를 사용하는 것이 좋다.

### 2.1 해싱 개요

- 해시 테이블 자료구조는 배열을 이용한다.
  - `key`라 불리는 데이터 요소로 배열에 저장된 데이터 요소를 참조할 수 있다.
- 이론적으로 해시 함수는 각 키를 자체 배열 요소로 저장한다. 하지만 키의 개수에는 제한이 없지만, 자바스크립트의 배열 요소 수는 제한이 있으므로 되도록이면 키가 한 고에 집중되지 않도록 저장하는 것이 좋다.
- 두 키의 해시 결과(해시 함수 수행 결과)가 같은 값일 때, 이를 `충돌(collision)` 이라 한다.
- 해시 함수를 만들기 전에 최종적으로 해시 테이블에 사용할 배열의 크기를 결정해야 한다.
  - 보통 배열의 크기는 `소수`여야 한다.
- 충돌을 처리하는 기법도 배열의 크기에 영향을 미친다.

### 2.2 해시 함수 선택하기

- 키의 데이터형에 따라 해시 함수가 달라진다.
  - [정수] 예를 들어 정수 키라면 배열의 크기로 나눈 나머지를 반환하는 해시 함수를 이용할 수 있다.
    - 하지만 키가 모두 0으로 끝나며 배열의 크기가 10인 상황에서는 이런 간단한 해시 함수도 사용할 수 없다. 앞에서 배열의 크기를 `소수`로 설정하는 이유도 이와 관련이 있다.
    - 키가 임의의 정수라면 해시 함수는 더 정확하게 키를 분산시켜야 한다. 이런 종류의 해싱을 `모듈러(modular) 해싱`이라 한다.
  - [문자열] 많은 애플리케이션에서 문자열을 키로 사용한다. 문자열 키와 관련한 해시 함수는 좀 더 복잡하므로 신중하게 선택해야 한다.
    - 문자열 해싱하는 방법 중 문자의 아스키 값을 더하는 함수가 있다. 최정적으로 합계를 배열의 크기로 나눈 나머지를 해시 값으로 반환한다.

```js
function HashTable() {
  this.table = new Array(137);
  this.simpleHash = simpleHash;
  this.showDistro = showDistro;
  this.put = put;
  //this.get = get;
}

function simpleHash(data) {
  let total = 0;
  for (let i = 0; i < data.length; ++i) {
    total += data.charCodeAt(i);
  }
  console.log('Hash value: ' + data + '->' + total);
  return total % this.table.length;
}

function put(data) {
  let pos = this.simpleHash(data);
  this.table[pos] = data;
}

function showDistro() {
  let n = 0;
  for (let i = 0; i < this.table.length; ++i) {
    if (this.table[i] != undefined) {
      console.log(i + ':' + this.table[i]);
    }
  }
}

let someNames = [
  'Raymond',
  'Clayton',
  'Marco',
  'Poky',
  'Jisoo',
  'Jinnie',
  'Millie',
  'Dotori',
];
let hTable = new HashTable();
for (let i = 0; i < someNames.length; ++i) {
  hTable.put(someNames[i]);
}

hTable.showDistro();
```

```
//output
Hash value: Raymond->730
Hash value: Clayton->730
Hash value: Marco->498
Hash value: Poky->419
Hash value: Jisoo->516
Hash value: Jinnie->605
Hash value: Millie->604
Hash value: Dotori->625
8:Poky
45:Clayton
56:Millie
57:Jinnie
77:Dotori
87:Marco
105:Jisoo
```

- 위 예제에서 해시 테이블에 저장된 값들이 균등하게 분포되지 않았음을 확인할 수 있다.
- 또한, 'Clayton'과 'Raymond'의 해시 값이 같아서 충돌이 일어났음을 확인할 수 있다. 충돌 때문에 'Clayton'만 배열에 저장됐다.

#### 2.2 더 좋은 해시 함수

- 우선 충돌을 피하려면 해시 테이블에서 사용하는 배열의 크기가 `소수`여야 한다.
  - 이는 해시 값을 계산할 때 `모듈로 연산` 을 사용하기 때문이다. 테이블에서 키가 균등하게 분포하도록 만들려면 배열의 크기가 100이상이어야 한다. 100보다 작은 소수를 선택하면 충돌이 더 잦아진다.
- 해시 테이블의 크기를 결정했으면 해싱 충돌을 회피할 수 있는 해시 값 계산 방법을 만들어야 한다. `호너의 메소드` 라는 알고리즘을 이용하여 문자열의 아스키 값을 더하는 기법을 개선할 수 있다.
  - `호너의 메소드` 를 이용하려면 결과에 소수를 곱하는 과정을 추가해야 한다.
    - 37과 같은 소수를 곱하면 충돌을 피할 수 있다.
    - 아래 예제 코드에서 betterHash 함수에 이를 적용하였고, 그 결과값에 충돌 없이 모두 출력됨을 확인할 수 있다.

```js
function HashTable() {
  this.table = new Array(137);
  this.simpleHash = simpleHash;
  this.betterHash = betterHash;
  this.showDistro = showDistro;
  this.put = put;
  //this.get = get;
}

//충돌을 피하지 못한 단순한 해시 함수
function simpleHash(data) {
  let total = 0;
  for (let i = 0; i < data.length; ++i) {
    total += data.charCodeAt(i);
  }
  console.log('Hash value: ' + data + '->' + total);
  return total % this.table.length;
}

//호너의 메소드를 적용하여 개선된 해시 함수
function betterHash(string) {
  const H = 37; //소수
  let total = 0;
  for (let i = 0; i < string.length; ++i) {
    total += H * total + string.charCodeAt(i); //결과에 소수를 곱하는 과정 추가
  }
  console.log('Hash value: ' + string + '->' + total);
  total = total % this.table.length;
  return parseInt(total, 10);
}

function put(data) {
  let pos = this.betterHash(data);
  this.table[pos] = data;
}

function showDistro() {
  let n = 0;
  for (let i = 0; i < this.table.length; ++i) {
    if (this.table[i] != undefined) {
      console.log(i + ':' + this.table[i]);
    }
  }
}

let someNames = [
  'Raymond',
  'Clayton',
  'Marco',
  'Poky',
  'Jisoo',
  'Jinnie',
  'Millie',
  'Dotori',
];
let hTable = new HashTable();
for (let i = 0; i < someNames.length; ++i) {
  hTable.put(someNames[i]);
}

hTable.showDistro();
```

```
//output
Hash value: Raymond->254841041852
Hash value: Clayton->210499205408
Hash value: Marco->166046545
Hash value: Poky->4554231
Hash value: Jisoo->160232013
Hash value: Jinnie->6088540563
Hash value: Millie->6326133435
Hash value: Dotori->5625971393
22:Raymond
58:Clayton
63:Millie
77:Poky
79:Marco
85:Dotori
101:Jisoo
126:Jinnie
```

#### 2.2 정수 키 해싱

- 정수 키 해싱시에도 충돌이 일어나면서 모든 데이터를 저장하는데 실패할 수 있다.
- 배열 크기를 조절해 이 문제가 해결되는지 확인하거나, 아니면 앞서 문자열 키 해싱 시 살펴본 betterHash() 함수를 호출하도록 put() 함수를 고칠 수 있다. 또는 소수의 크기를 높일 수도 있다.

```js
function HashTable() {
  this.table = new Array(137);
  this.simpleHash = simpleHash;
  this.betterHash = betterHash;
  this.showDistro = showDistro;
  this.put = put;
  //this.get = get;
}
// HashTable 가져온다.

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getStuData(arr) {
  for (let i = 0; i < arr.length; ++i) {
    let num = '';
    for (let j = 0; j <= 9; ++j) {
      num += Math.floor(Math.random() * 10);
    }
    num += getRandomInt(50, 100);
    arr[i] = num;
  }
}

const numStudents = 10;
const arrSize = 97;
const idLen = 9;
const students = new Array(numStudents);
getStuData(students);

for (let i = 0; i < students.length; i++) {
  console.log(students[i].substring(0, 8) + ' ' + students[i].substring(9));
}

const 정수테이블 = new HashTable();
for (let i = 0; i < students.length; i++) {
  정수테이블.put(students[i]);
}
정수테이블.showDistro();
```

### 2.2.3 해시 테이블에 데이터를 저장하거나 데이터 가져오기

- put과 get 매서드 변경

```js
function HashTable() {
  this.table = new Array(137);
  this.betterHash = betterHash;
  this.showDistro = showDistro;
  this.put = put;
  this.get = get;
}

//호너의 메소드를 적용하여 개선된 해시 함수
function betterHash(string) {
  const H = 117; //소수
  let total = 0;
  for (let i = 0; i < string.length; ++i) {
    total += H * total + string.charCodeAt(i); //결과에 소수를 곱하는 과정 추가
  }
  console.log('Hash value: ' + string + '->' + total);
  total = total % this.table.length;
  return parseInt(total, 10);
}

// put() 함수는 키를 해시한 다음 해시 함수의 계산 결과로 나온 위치를 이용해 테이블에 데이터를 저장한다.
function put(key, data) {
  this.table[this.betterHash(key)] = data;
}

// get() 함수는 다시 키를 해시해서 데이터가 어느 위치에 저장되어 있는지 계산한 다음, 테이블에서 데이터를 가져와야 한다.
function get(key) {
  return this.table[this.betterHash(key)];
}

function showDistro() {
  let n = 0;
  for (let i = 0; i < this.table.length; ++i) {
    if (this.table[i] != undefined) {
      console.log(i + ':' + this.table[i]);
    }
  }
}

const hTable = new HashTable();
hTable.put('대한민국', '서울');
hTable.put('미국', '워싱턴');
hTable.put('일본', '도쿄');

console.log(hTable.get('미국'));
hTable.showDistro();
```

```
//output
Hash value: 대한민국->76056550277
Hash value: 미국->5722557
Hash value: 일본->6074400
Hash value: 미국->5722557
워싱턴
40:서울
67:워싱턴
94:도쿄
```

## 2.3 충돌처리

- 해시 함수에서 두 개 이상의 값을 계산한 결과가 같을 때 충돌이 일어난다.
- 해시 알고리즘에서 고려해야 할 두 번째 사항은 바로 모든 키가 해시 테이블에 저장될 수 있게 충돌을 처리하는 부분이다. `분리된 체인`, `선형 조사`라는 두 가지 충돌 해결 방법을 확인한다.

### 2.3.1 분리된 체인

- 충돌이 일어났어도 생성된 인덱스에 키를 저장할 수 있어야 하는데 배열의 요소에는 한 개의 데이터밖에 없으므로 사실상 충돌이 일어나면 어떤 것도 저장할 수 없게 된다.
- `분리된 체인 기법`에서는 두 키의 해시 결과가 같을 때 각 키는 두 번째 배열의 서로 다른 장소에 저장된다.
  - 해시된 키를 저장할 배열을 만든 다음 해시 테이블의 각 배열 요소에 빈 배열을 할당하는 방법으로 분리된 체인을 구현할 수 있다. 그러면 `이차원 배열`이 생성된다.

```js
//위 코드에서 수정,추가된 부분
function showDistro() {
  let n = 0;
  for (let i = 0; i < this.table.length; ++i) {
    if (this.table[i][0] != undefined) {
      console.log(i + ':' + this.table[i]);
    }
  }
}

//두 번재 배열(체인)을 만드는 buildChains 함수
hTable.buildChains();
function buildChains() {
  for (let i = 0; i < this.table.length; ++i) {
    this.table[i] = new Array();
  }
}
```

### 2.3.2 선형 조사

- 충돌을 해결하는 또 다른 기법으론 선형 조사 기법이 있다. 이는 `오픈 주소법 해싱(open-addressing hashing)`이라 불리는 일반적인 해싱 기법이다.
  - 오픈 주소법에서는 충돌이 발생하면 해시 테이블의 다음 요소가 비어 있는지 확인한다.
    - 다음 요소가 비어 있으면 비어 있는 요소에 키를 저장한다.
    - 다음 요소가 비어 있지 않으면 비어 있는 해시 테이블 요소가 나올 때까지 탐색을 반복(선형조사)한다.
  - 대부분의 해시 테이블에는 비어 있는 공간이 많이 있으므로 비어 있는 공간을 이용해 키를 저장한다는 것이 선형 조사 기법의 핵심이다.
- 데이터를 저장하는 배열의 크기가 크다면 분리된 체인을 선택해 선형조사를 수행해야 한다.
  - 일반적으로 배열의 크기가 저장할 요소의 절반 이하라면 분리된 체인을 사용한다.
  - 그러나 배열의 크기가 저장할 요소의 두 배까지 될 수 있는 상황이라면 선형 조사를 이용한다.
- 실제 데이터를 반환하는 시스템을 만들려면 값을 저장할 두 번째 배열을 추가하도록 HashTable 클래스를 고쳐야 한다. tables 배열과 values 배열은 서로 나란히 배치되어 있으므로 tables 배열에 키를 저장할 때 values 배열의 해당 위치에는 값을 저장할 수 있다.

```js
//put과 get 변경
class HashTable {
  constructor(settingSize) {
    this.table = new Array(settingSize);
    this.values = [];
  }
}

HashTable.prototype.betterHash = function (string) {
  const H = 117;
  let total = 0;
  for (let i = 0; i < string.length; ++i) {
    total += H * total + string.charCodeAt(i);
  }
  console.log('Hash value: ' + string + '->' + total);
  total = total % this.table.length;
  return parseInt(total, 10);
};

HashTable.prototype.showDistro = function () {
  for (let i = 0; i < this.table.length; ++i) {
    if (this.table[i] != undefined) {
      console.log(i + ':' + this.table[i]);
    }
  }
};

HashTable.prototype.put = function (key, data) {
  let pos = this.betterHash(key);
  if (this.table[pos] == undefined) {
    this.table[pos] = key;
    this.values[pos] = data;
  } else {
    while (this.table[pos] != undefined) {
      pos++;
    }
    this.table[pos] = key;
    this.values[pos] = data;
  }
};

HashTable.prototype.get = function (key) {
  let hash = -1;
  hash = this.betterHash(key);
  if (hash > -1) {
    for (let i = hash; this.table[hash] != undefined; i++) {
      if (this.table[hash] == key) {
        return this.values[hash];
      }
    }
  }
  return undefined;
};

const hTable = new HashTable(2);
hTable.put('대한민국', '서울');
hTable.put('미국', '워싱턴');
hTable.put('일본', '도쿄');
hTable.put('영국', '런던');
hTable.put('중국', '베이징');

console.log(hTable.get('미국'));
hTable.showDistro();

console.log(hTable);
```

## 3. 프로토타입이란?

- 객체지향 프로그래밍 : 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나 여러 개의 독립적 단위, 즉 `객체(object)의 집합`으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.
- 상속과 프로토타입 : 상속은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다. 자바스크립트는 프로토타입을 기반으로 상속을 구현한다.
- 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다. 둘은 언제나 쌍으로 존재한다.

```js
//생성자 함수
function Circle(radius) {
  // 생성자 함수 호출 → this바인딩 : 생성자 함수가 미래에 생성할 인스턴스
  this.radius = radius;
  //Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 공유해서 사용할 수 있도록 프로토타입에 추가
  Circle.prototype.getArea = function () {
    //this.getArea 가 아니라 Circle.prototype.getArea
    return Math.PI * this.radius ** 2;
  };
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

//Circle 생성자 함수가 생성하는 모든 인스터스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); //true
console.log(circle1.getArea()); //3.141592653589793
console.log(circle2.getArea()); //12.566370614359172
```

- 프로퍼티 존재 확인
  - in 연산자 : 객체 내에 특정 프로퍼티가 존재하는지 여부 확인

```js
key in object;
//ES6에서는 Refelect.has 메서드 사용 가능
Reflect.has(object, key);
```

- 프로퍼티 열거
  - for ... in 문

```js
const myAge = { age: 100 };
const person = {
  name: 'Marco',
  address: 'Seoul',
  __proto__: myAge,
};

for (const key in person) {
  // 객체 자신의 프로퍼티인지 확인한다.
  if (!person.hasOwnProperty(key)) continue;
  console.log(key + ': ' + person[key]);
}
//"name: Marco"
//"address: Seoul"
```

- Object.prototype.hasOwnProperty 메서드 : 객체 내에 특정 프로퍼티가 존재하는지 확인할 수 있고, 객체 고유의 프로퍼티 키인 경우에만 true를 반환한다(상속받은 프로토타입의 프로퍼티 키인 경우 false반환).

## 4. this란?

- this 키워드
  - this는 `자신이 속한 객체` 또는 `자신이 생성할 인스턴스`를 가리키는 자기 참조 변수다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 `참조`할 수 있다. this는 자바스크립트 엔진에 의해 암묵적으로 생성되며, `코드 어디서든 호출`할 수 있다.
  - this 바인딩 : 바인딩이란 식별자와 값을 연결하는 과정을 의미한다. this 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다)와 `this가 가리킬 객체`를 바인딩하는 것이다.
  - this가 가리키는 값, 즉 this 바인딩은 `함수 호출 방식`에 의해 `동적`으로 결정된다. this바인딩은 함수 호출 시점에 결정된다.
    - 일반 함수로 호출된 모든 함수(중첩함수, 콜백함수 포함) 내부의 this에는 전역 객체(브라우저:window, node.js:global)가 바인딩된다.
    - 메서드로 호출된 경우에는, this는 메서드를 호출한 객체와 바인딩된다.
    - 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 `메서드의 this 바인딩`과 일치시키기 위한 방법은 다음과 같다.
      - this 바인딩을 임의의 변수 that(또는 self)에 할당하여 넘겨준다
      - bind 메서드 사용
        - bind 메서드는 this로 사용할 객체만 전달한다. 함수를 호출하지는 않으므로 명시적으로 호출해야 한다. bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.

```js
function getThisBinding() {
  return this;
}

const thisArg = { a: 1 };

console.log(getThisBinding.bind(thisArg)); //function () { [native code] }
//함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); //[object Object] { a: 1}
```

```js
const person = {
  name: 'Marco',
  foo(callback) {
    //bind메서드로 callback 함수 내부의 this 바인딩을 전달
    setTimeout(callback.bind(this), 100);
  },
};

person.foo(function () {
  //위에서 bind 메서드를 사용하지 않았다면 일반 함수로 호출된 콜백 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
  console.log(`hi! my name is ${this.name}`);
});
```

- this 바인딩 정리

  - 1. 일반 함수 호출 → this바인딩 : 전역객체
    - arrow function은 아예 this binding을 하지 않고 바로 위 컨텍스트에 있는 this를 그대로 가져다 쓴다.
  - 2. 메서드 호출 → this 바인딩: 메서드를 호출한 객체
  - 3. 생성자 함수 호출 → this바인딩 : 생성자 함수가 미래에 생성할 인스턴스
  - 4. 전역공간에서 this는 전역객체를 가리킨다.
  - 5. callback 호출 -> this 바인딩 : 기본적으로 함수 내부에서와 동일(전역객체 가리킴)하나, 콜백함수를 어떻게 처리하는지에 따라서 this는 달라질 수 있다.

    - 그런 경우에도 bind 등 명령어를 통해 사용자가 this를 제어할 수 있다.
    - apply/call/bind메서드에 의한 간접 호출 → apply/call/bind 메서드에 첫번째 인수로 전달한 객체

    ```js
    //apply, call, bind 개념 정리
    function a(x, y, z) {
      console.log(this, x, y, z);
    }

    const b = {
      isThis: 'thisthis',
    };

    a.call(b, 1, 2, 3);
    // { isThis: 'thisthis' } 1 2 3
    a.apply(b, [1, 2, 3]);
    // { isThis: 'thisthis' } 1 2 3
    const c = a.bind(b, 1, 2, 3);
    c(1, 2, 3);
    // { isThis: 'thisthis' } 1 2 3
    const d = a.bind(b);
    d(1, 2, 3);
    // { isThis: 'thisthis' } 1 2 3
    ```

    ```js
    function getThisBinding() {
      console.log(arguments);
      return this;
    }

    const thisArg = { a: 1 };

    //apply와 call의 첫번째 인수는 this로 연결할 객체이고, 두번째 인수부터는 매개변수로 전달된다.
    //apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다
    console.log('1', getThisBinding.apply(thisArg, [1, 2, 3]));
    //call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다
    console.log('2', getThisBinding.call(thisArg, 1, 2, 3));
    ```
