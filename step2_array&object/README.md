# STEP2 - 배열과 객체

## 1. 유사배열객체를 배열로 변경하기

- 함수의 arguments 프로퍼티
  - arguments객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.
  - arguments객체는 유사 배열 객체다.
- 유사 배열 객체(Array-like Objects)는 배열이 아니므로 배열 메서드를 사용하면 에러가 발생한다.
- 유사배열객체를 배열로 바꾸려면 다음 3가지 방법 중 하나를 활용할 수 있다.

### 1-1. 간접호출 활용

- 따라서 배열 메서드를 사용하려면 `간접 호출`을 활용할 수 있다.

  ```js
  function sum() {
    //arguments 객체를 배열로 변환(간접호출)
    const array = Array.prototype.slice.call(arguments);
    return array.reduce(function (pre, cur) {
      return pre + cur;
    }, 0);
  }
  console.log(sum(1, 2)); //3
  console.log(sum(1, 2, 3)); //6
  ```

### 1-2. Rest파라미터 활용

- 이러한 번거로움을 해결하기 위해 ES6에서는 Rest 파라미터(함수 매개변수 안에 들어있는'...인자')를 도입했다.

  ```js
  function sum(...args) {
    return args.reduce((pre, cur) => pre + cur, 0);
  }

  console.log(sum(1, 2)); //3
  console.log(sum(1, 2, 3)); //6
  ```

### 1-3. Array.from 메서드 활용

- 또는 `Array.from(유사배열객체)` 메서드를 사용하여 유사배열객체를 객체로 바꿀 수 있다.

  - Array.from : 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환한다.(ES6에서 도입)

  ```js
  function sum() {
    realArray = Array.from(arguments);
    return realArray.reduce((pre, cur) => pre + cur, 0);
  }
  console.log(sum(1, 2)); //3
  console.log(sum(1, 2, 3)); //6
  ```

## 2. 객체 생성 시 key값을 동적으로 할당하는 방법

객체는 key와 value의 쌍으로 이루어져 있다.

```js
let myKey = 'keykey';
let myValue = 'valuevalue';
let myObject = {
  myKey: myValue,
};
console.log(myObject);
```

위 코드의 콘솔 결과는 { myKey: 'valuevalue' }이다.
myKey에 할당된 'keykey'가 위 객체의 key값으로 들어가길 기대했는데, 그냥 myKey 자체가 string으로 받아들여졌다.
value는 동적으로 할당이 되나, key 부분에는 위와 같은 방법으로는 동적으로 값이 적용되지 않는다.
해결하기 위해서는 다음과 같이 해야 한다.

### key 값은 대괄호로 묶어서 설정하면 동적으로 적용된다.

```js
let myKey = 'keykey';
let myValue = 'valuevalue';

//객체 생성과 동시에 동적인 key 값 설정
let myObject = {
  [myKey]: myValue,
};

let newKey = 'new Key is good';
// 객체 생성 후 동적인 key 값 설정
myObject[newKey] = 'this is value';

console.log(myObject);
//{ keykey: 'valuevalue', 'new Key is good': 'this is value' }
```

## 3. 진법 바꾸기

### 3-1. Number 객체의 toString() 메서드 사용

`numObj.toString([radix])`
toString() 메서드는 특정한 Number 객체를 나타내는 문자열을 반환한다.
옵션인 `radix`는 수의 값을 나타내기 위해 사용되기 위한 기준을 정하는 2와 36사이의 정수(진수를 나타내는 기수의 값)이다.
만약에 radix값 이 지정되지 않으면, 임의로 10진수로 가정하게 된다.

### 3-2. 메서드 사용하지 않고 반복문과 %,/ 연산자 사용

십진법 숫자를 이진법으로 변환하기

```js
let decimalNumber = '10';
let binaryArr = [];

while (decimalNumber) {
  binaryArr.push(decimalNumber % 2);
  decimalNumber = Math.floor(decimalNumber / 2);
}

console.log(binaryArr.reverse().join(''));
//1010
```

## 4. for 루프 형제(for of, for in)

### 4-1. for of 루프

for of는 배열의 원소 목록을(`값`) 반환한다.

- 배열에 대한 반복

  ```jsx
  const fruits = ['a', 'b', 'c'];
  for (const fruit of fruits) {
    console.log(fruit);
  }
  // a, b, c
  ```

- 객체에 대한 반복

  - 객체는 이터러블이 아니다. 그러면 객체의 키/값 쌍에 대한 반복은 어떻게 구현할 수 있을까?

    - 먼저 Object.keys()를 사용하여 객체의 모든 키를 가져온 후, 키에 대한 반복을 수행하면서 값에 접근하는 것이 가능하다.
    - 또는 Object.entries()를 사용하여 객체의 모든 키/값 쌍을 가져온 후, 각 키/값 쌍에 대한 반복을 수행하는 방법도 있다.

    ```jsx
    const car = {
      maker: 'Bmw',
      color: 'red',
      year: '2010',
    };

    for (const key of Object.keys(car)) {
      const value = car[key];
      console.log(key, value);
    }
    /* maker Bmw
    color red
    year 2010 */
    ```

### 4-2. for in 루프

for in은 배열의 속성(`키`)의 목록을 반환한다.
for in 루프는 순서 없이 객체의 모든 열거 가능한 속성을 반복한다.

```jsx
const car = {
  maker: 'Bmw',
  color: 'red',
  year: '2010',
};

for (const key in car) {
  console.log(key, car[key]);
}
/* maker Bmw
color red
year 2010 */
```

## 5. Array 메서드 4남매(forEach, map, filter, reduce)

### 5-1. forEach

- Array.prototype.`forEach` : for 문을 대체할 수 있는 고차 함수이다. 반복문을 추상화한 고차 함수로서 내부에서 반복문을 통해 자신을 호출한 배열을 순회하면서 수행해야 할 처리를 콜백 함수로 전달받아 반복 호출한다. undefined를 반환한다.

  - 매개변수 3개(요소값, 인덱스, this)

    ```jsx
    const numbers = [1, 2, 3];
    const pows = [];

    numbers.forEach((number) => pows.push(number ** 2));
    console.log(pows); //[1, 4, 9]
    ```

    ```jsx
    const numbers = [1, 2, 3];
    //forEach 메서드는 원본 배열을 변경하지 않지만 콜백 함수를 통해 원본 배열을 변경할 수는 있다.
    // 콜백 함수의 세 번째 매개변수 arr은 원본 배열 numbers를 가리킨다.
    //따라서 콜백 함수의 세 번째 매개변수 arr을 직접 변경하면 원본 배열 numbers가 변경된다.
    numbers.forEach((item, index, arr) => {
      arr[index] = item ** 2;
    });
    console.log(numbers); //[1, 4, 9]
    ```

### 5-2. map

- Array.prototype.`map` : 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다. 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다. 원본 배열은 변경되지 않는다. forEach와 달리 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다.

  - 매개변수 3개(요소값, 인덱스, this)

    ```jsx
    const numbers = [1, 4, 9];

    const roots = numbers.map((item) => Math.sqrt(item));
    console.log(roots); //[1, 2, 3]
    ```

### 5-3. filter

- Array.prototype.`filter` : 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다. 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다. 원본 배열은 변경되지 않는다.

  - 매개변수 3개(요소값, 인덱스, this)

    ```jsx
    const numbers = [1, 2, 3, 4, 5];

    const odds = numbers.filter((item) => item % 2); //1은 true
    console.log(odds); //[1, 3, 5]
    ```

### 5-4. reduce

- Array.prototype.`reduce` : 자신을 호출한 배열을 모든 요소를 순회하며 인수로 전달받은 콜백 함수를 반복 호출한다. 콜백 함수의 반환값을 다음 순회 시에 콜백 함수의 첫번째 인수로 전달하면서 콜백 함수를 호출하여 `하나의 결과값`을 만들어 반환한다. 원본 배열은 변경되지 않는다.

  - 첫 번째 인수 : `콜백 함수(4개의 인수)`
    - 1. 초기값 또는 콜백 함수의 이전 반환값 `accumulator`
    - 2. reduce 메서드를 호출한 배열의 요소값 `currentValue`
    - 3. 인덱스 `index` (옵션)
    - 4. reduce 메서드를 호출한 배열 자체(this) `array` (옵션)
  - 두 번째 인수 : `초기값` (옵션이므로 생략 가능, 그러나 초기값 전달하는 것이 안전)

  ```jsx
  const sum = [1, 2, 3, 4].reduce(
    (accumulator, currentValue, index, array) => accumulator + currentValue,
    0
  );
  console.log(sum); //10
  ```

## 6. 배열에서 주어진 값을 찾아 원소를 제거하거나 다른 값으로 치환하기

Array의 indexOf와 splice 메서드를 사용하면 배열 원소를 찾아 제거하거나 치환할 수 있다.

## 7. 정규표현식

### 7-1. 정규표현식 개념

정규 표현식은 문자열에 나타는 특정 문자 조합과 대응시키기 위해 사용되는 패턴이다. 이 패턴들은 RegExp의 exec 메소드와 test 메소드 ,그리고 String의 match메소드 , replace메소드 , search메소드 , split 메소드와 함께 쓰인다.
https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions

1. 확장문자 (: backslash)
   - `s` : 공백 문자(스페이스, 탭, 폼 피드, 라인 피드)
   - `b` : 단어의 경계
   - `B` 이를 제외한 모든 문자 매칭
   - `d` : 숫자
   - `D` : 숫자가 아닌 문자 [^0-9] 와 동일
   - `w` : 알파벳, 숫자로 된 문자, 밑줄 기호(\_) [A-Za-z0-9]
   - `W` : w의 반대 문자 [^a-za-z0-9]
   - 특수문자 : 특수문자 자체를 의미 예) + (+ 기호 자체)
2. 특수문자
   - `*` : 0회 이상 반복
   - `+` : 1회 이상 반복
   - `?` : 0 또는 1개의 문자 매칭
   - `.` : 정확히 1개 문자 매칭
3. 플래그
   - `g` : 전역매칭
     - https://stackoverflow.com/questions/15610251/why-pattern-testname-opposite-results-on-consecutive-calls
   - `i` : 대소문자 무시
   - `m` : 여러 줄 매칭
4. 기타
   - `()` : 괄호로 묶인 패턴은 매칭된 다음, 그 부분을 기억한다.
   - `$1,...,$9` : 괄호로 갭처한 부분 문자열이 저장 됨.
   - `|` : ~또는~
   - `{}` : 반복 횟수

### 7-2. 간단한 정규표현식

```jsx
const re = /a/         --a 가 있는 문자열
const re = /a/i        --a 가 있는 문자열, 대소문자 구분 안함
const re = /apple/    -- apple가 있는 문자열
const re = /[a-z]/    -- a~z 사이의 모든 문자
const re = /[a-zA-Z0-9]/    -- a~z, A~Z 0~9 사이의 모든 문자
const re = /[a-z]|[0-9]/  -- a~z 혹은 0~9사이의 문자
const re = /a|b|c/   --  a 혹은 b 혹은 c인 문자
const re = /[^a-z]/  -- a~z까지의 문자가 아닌 문자("^" 부정)
const re = /^[a-z]/  -- 문자의 처음이 a~z로 시작되는 문장
const re = /[a-z]$/  -- 문자가 a~z로 끝남
```

### 7-3. 상용 정규표현식

```js
특수문자 체크 정규식
const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

모든 공백 체크 정규식
const regExp = /\s/g;

숫자만 체크 정규식
const regExp = /[0-9]/g;

이메일 체크 정규식
const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

핸드폰번호 정규식
const regExp = /^\d{3}-\d{3,4}-\d{4}$/;

일반 전화번호 정규식
const regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;

아이디나 비밀번호 정규식
const regExp = /^[a-z0-9_]{4,20}$/;

휴대폰번호 체크 정규식
const regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
```

### 7-4. 정규표현식 메서드

#### 7-4-1. test 메서드

```
정규식.test(문자열)
```

### 7-4-2. match 메서드

인수로 정규식을 받으며, 일치하는 문자열의 배열(Array) 데이터를 반환한다.

```
문자열.match(정규식)
```

#### 7-4-3. replace 메서드

첫 번째 인수로는 정규표현식, 두 번째 인수로는 대체하려는 문자 데이터를 넣는다. 이를 통해 일치하는 문자열을 새로운 문자열로 대체하고, 대체된 결과를 문자열(String)로 반환한다.

```
문자열.replace(정규식, 대체문자)
```
