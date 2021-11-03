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
