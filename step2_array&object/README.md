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
