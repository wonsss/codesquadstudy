# Step4 학습정리

## 프로미스

- 싱글스레드인 자바스크립트는 비동기 처리를 위해 콜백을 사용해왔는데, 이 때문에 비동기 처리를 할 수는 있지만 단점이 나타났다.
  - 그 단점으로는 비동기 처리를 순차적으로 실행할 필요가 있는 경우에도 비동기 처리를 중첩시켜 표현하므로 에러 및 예외 처리가 어렵다는 것과 중첩으로 인한 복잡도가 증가한다는 것이다.
  - 이 두 가지 단점을 해결하기 위해, ES2015에서 프로미스가 도입되었다.
- 프로미스의 목적은 "비동기에서 성공과 실패를 분리해서 메서드를 수행한다"는 것이다.
- 프로미스는 단어 뜻 그대로 기능에서 약속의 의미을 내포하며, `비동기 연산을 수행하고 연산이 종료되면 결과를 알려주겠다`고 `약속`하는 것과 같다.
- 프로미스는 비동기 함수로부터 동기적으로 반환되는 객체이며, 다음 세 가지 상태(Fulfilled, Rejected, Pending) 중 하나를 가진다.
  - Settled(한번 settled 상태가 되면, 해당 프로미스의 그 상태는 불변)
    - Fulfilled : 작업이 성공적으로 완료된 상태(resovle() 호출)
      - 작업이 성공적으로 완료되면 Promise.resolve() 메소드를 통해 결과 값으로 이행하는 Promise 객체를 반환한다.
    - Rejected : 작업 수행 중, 어떠한 요인으로 인해 실패한 상태(reject() 호출)
      - 작업이 실패(에러) 되면 Promise.reject() 메소드를 통해 거부하는 Promise 객체를 반환한다.
  - Pending : 아직 작업이 완료되지 않은 상태 또는 초기 상태(아직 fulfilled 또는 rejected 상태가 아닌 경우)
- 프로미스 생성 : 프로미스 생성자 함수를 new 연산자와 함께 호출하면 프로미스 객체를 생성한다. Promise 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달받는데, 이 콜백 함수는 resolve와 reject 함수를 인수로 전달받는다.
  - 프로미스의 상태는 resolve 또는 reject 함수를 호출하는 것으로 결정된다.
- 프로미스가 성공할 때의 값을 얻는 데에 .then() 을 사용하고, 프로미스가 실패할 때의 오류를 처리하는 데에는 .catch() 를 사용한다.

```js
const myPromise = new Promise((resolve, reject) => {
  resolve('The value we get from the promise');
  reject(new Error('this is our error'));
});

myPromise
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

//The value we get from the promise
```

- 프로미스의 성공 또는 실패 여부와 무관하게 이전 프로미스에서 반환된 것을 후속 프로미스의 기반으로 사용하여 프로미스를 계속 체이닝(연결) 할 수 있다.
- Promise.resolve()와 Promise.reject()는 자동으로(즉시) 성공하거나 실패하는 프로미스를 생성한다.
  - Promise.resolve()는 즉시 프로미스를 성공 처리하므로, .then()절의 인수 중 첫 번째 함수가 호출된다.
  - Promise.reject()는 즉시 프로미스를 실패 처리하므로, .then()절의 인수 중 두 번째 함수가 호출된다.

```js
Promise.resolve('Hello. I successed').then(
  //Promise.reject("Hello. I successed").then(
  function (value) {
    console.log('wow you successed');
  },
  function (value) {
    console.log('no you failed.');
  }
);
//resolve이면 wow you successed
//reject이면  no you failed.
```

- Promise.all()은 모든 프로미스가 성공할 경우에 성공하는 하나의 프로미스를 반환한다. 하나라도 실패하면 에러가 발생한다.
- Promise.race()는 이터러블에 포함된 프로미스들 중 가장 먼저 성공한 결과를 반환한다.

## 제너레이터

- 제너레이터는 ES2015에서 도입됐다.
- 모던 자바스크립트에서는 제너레이터를 잘 사용하지 않는다고 한다.
  - 그러나 제너레이터를 사용하면 실행 중에도 제너레이터 호출 코드와 데이터를 교환할 수 있기 때문에 유용한 경우가 종종 있다.
  - 그리고 제너레이터를 사용하면 이터러블 객체를 쉽게 만들 수 있다는 장점도 있다.
- 제너레이터는 `코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는` 특수한 함수다. `비동기 처리를 동기 처리처럼 동작`하도록 구현했다.
  - 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
  - 함수 호출자와 함수의 상태를 주고받을 수 있다.
  - 제너레이터 객체를 반환한다.
- 일반 함수는 하나의 값(혹은 0개의 값)만을 반환한다. 하지만 제너레이터(generator)를 사용하면 여러 개의 값을 필요에 따라 하나씩 반환(yield)할 수 있다.
  - 제너레이터와 이터러블 객체를 함께 사용하면 손쉽게 데이터 스트림을 만들 수 있다.
- 정의
  - function\* 키워드로 선언한다. 하나 이상의 yield 표현식을 포함한다.
    - 이것을 제외하면 일반 함수를 정의하는 방법과 같다.
  - 에스터리스크(\*) 의 위치는 function 키워드와 함수 이름 사이라면 어디든지 상관없다. 하지만 일관성을 위해 function 키워드 바로 뒤에 붙이는 것이 추천된다.
- 실행
  - 제너레이터 함수를 호출하면 코드가 실행되지 않고, 대신 실행을 처리하는 특별 객체, '제너레이터 객체’가 반환된다.
  - next()는 제너레이터의 주요 메서드이다.
    - `next()`를 호출하면 가장 가까운 `yield <value>문`을 만날 때까지 실행이 지속된다(value를 생략할 수도 있는데, 이 경우엔 undefined가 된다).
      - 이후,` yield <value>`문을 만나면 실행이 멈추고 산출하고자 하는 값인 value가 바깥 코드에 반환됩니다.
    - next()는 항상 아래 두 프로퍼티를 가진 객체를 반환한다.
      - value: 산출 값
      - done: 함수 코드 실행이 끝났으면 true, 아니라면 false

```js
function* genFunc() {
  const x = yield 1; //(1)
  const y = yield x + 10; //(2)
  return x + y; //(3)
}

const generator = genFunc(0);
let res = generator.next(); //(1)
console.log(res); // {value: 1, done: false}    처음 호출은 next메서드에 인수 전달안됨, const x = yield 1;

res = generator.next(15); //(2)
console.log(res); // {value: 25, done: false}   15를 x변수에 할당 const y = yield ('15'+10) = 25;

res = generator.next(100); //(3)
console.log(res); // {value: 115, done: true}   100을 y변수에 할당 세번째 코드 실행 return '15'+'100' =115
```

- 제너레이터는 `이터러블`이다. 제너레이터는 이터레이터를 어떻게 하면 쉽게 구현할지를 염두에 두며 자바스크립트에 추가되었다.
  - 따라서 `for..of 반복문`을 사용해 값을 얻을 수 있다.
  - 또한, 이터러블이므로 `스프레드 문법(...)` 같은 관련 기능을 사용할 수 있다.

```JS
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, 2, 3
}
```

- 제너레이터의 특수 문법 yield\*를 사용하면 제너레이터를 다른 제너레이터에 ‘끼워 넣을 수’ 있습니다.

  - yield* 지시자는 실행을 다른 제너레이터에 위임하기 때문이다. 제너레이터는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다고 했다. 여기서 '위임’은 yield* gen이 제너레이터 gen을 대상으로 반복을 수행하고, 산출 값들을 바깥으로 전달한다는 것을 의미한다. 마치 외부 제너레이터에 의해 값이 산출된 것처럼 말이다.
  - 이와 같은 제너레이터 컴포지션을 사용하면 중간 결과 저장 용도의 추가 메모리가 필요하지 않다.

- 'yield’를 사용해 제너레이터 안·밖으로 정보 교환하기
  - yield가 양방향 길과 같은 역할을 하기 때문에, yield는 결과를 바깥으로 전달할 뿐만 아니라 값을 제너레이터 안으로 전달하기까지 한다.
    - 값을 안, 밖으로 전달하려면 generator.next(arg)를 호출해야 하고, 이때 인수 arg는 yield의 결과가 된다.
  - 첫 번째 next()를 제외한 각 next(value)는 현재 yield의 결과가 될 값을 제너레이터 안에 전달한다. 그리고 다음 yield의 결과로 되돌아온다.

```JS
function* gen() {
  let ask1 = yield "2 + 2 = ?";
  alert(ask1); // 4
  let ask2 = yield "3 * 3 = ?"
  alert(ask2); // 9
}

let generator = gen();
alert( generator.next().value ); // 첫번째 yield "2 + 2 = ?"
alert( generator.next(4).value ); // 4를 제너레이터 안 첫번째 yield로 전달하여 ask1=>4,
                                  // 두번째 yield "3 * 3 = ?"
alert( generator.next(9).done ); // 9를 제너레이터 안 두번째 yield로 전달하여 ask2=>4,
                                 // done: true 이므로 함수 종료
```

## async와 await

- ES2017에서는 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 구현할 수 있는 async/await가 도입되었다. 프로미스를 기반으로 동작한다. 프로미스의 후속 처리 메서드 없이 마치 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현할 수 있다.
  - 비동기 함수를 만들려면 함수 앞에 async 키워드를 넣어야 한다.
    - 해당 키워드는 자바스크립트에게 항상 프로미스를 반환하도록 지시한다
    - 비동기 함수 내에서 프로미스가 아닌 값을 반환하게 작성하면 자바스크립트가 해당 값을 자동으로 프로미스로 감싼 후에 반환한다.
    - await 키워드는 비동기 함수 내에서만 작동한다.
      - 이름에서 알 수 있듯이 await 키워드는 프로미스가 결과를 반환할 때까지 기다리도록 자바스크립트에 지시한다.

## 비동기 반복

- ES2018에서 도입된 `비동기 이터레이터(asynchronous iterator)`를 사용하면 비동기적으로 들어오는 데이터(네트워크를 통해 데이터가 여러 번에 걸쳐 들어오는 상황)를 필요에 따라 처리할 수 있다.
  - 비동기 이터레이터에 더하여 `비동기 제너레이터(asynchronous generator)`를 사용하면 이런 데이터를 좀 더 편리하게 처리할 수 있다.
- 비동기 반복자는 next() 메서드가 {value, done} 쌍에 대한 프로미스를 반환한다는 점을 제외하면 동기 반복자와 매우 유사하다.
  - 각각의 이터러블을 프로미스로 변환해서 작동하는 `for-await-of` 를 사용할 수 있다.
- 웹 개발을 하다 보면 띄엄띄엄 들어오는 데이터 스트림(용량이 큰 파일을 다운로드하거나 업로드 할 때처럼)을 다뤄야 하는 경우가 자주 생기는데, 이런 데이터를 처리할 때 async 제너레이터를 사용할 수 있다고 한다.

```js
const array = [1, 2, 3];
async function test() {
  for await (const value of array) {
    console.log(value);
  }
}

test();
//1
//2
//3
```

- `for await...of`로 반복이 가능한 `async 제너레이터`를 사용할 수 있다.
  - async 제너레이터의 generator.next() 메서드는 일반 제너레이터와 달리
    - 비동기적으로 된다.
    - 프로미스를 반환한다.
    - 일반 제너레이터에서는 result = generator.next()를 사용해 값을 얻으나, async 제너레이터에서는 result = await generator.next()와 같이 await를 붙여줘야 한다.

```js
//async 키워드를 붙이기만 하면 제너레이터 안에서 프라미스와 기타 async 함수를 기반으로 동작하는 await를 사용할 수 있습니다.
async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    // await를 사용할 수 있습니다!
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield i;
  }
}

(async () => {
  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1, 2, 3, 4, 5
  }
})();
```

## this 바인딩

- this 바인딩 : 바인딩이란 식별자와 값을 연결하는 과정을 의미한다. this 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다)와 this가 가리킬 객체를 바인딩하는 것이다.

- 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법은 다음과 같다.

  - this 바인딩을 변수 that에 할당

```js
var value = 1;

const obj = {
  value: 100,
  foo() {
    const that = this; //this 바인딩(obj)을 변수 that에 할당한다.
    console.log("foo's this: ", that); // foo's this:  {value: 100, foo: ƒ}
    console.log("foo's this.value: ", that.value); //foo's this.value:  100

    function bar() {
      console.log("bar's this: ", that); // bar's this:  {value: 100, foo: ƒ}
      console.log("bar's this.value: ", that.value); //bar's this.value:  100
    }
    bar();
  },
};

obj.foo();
```

- bind 메서드

```js
var value = 1;
const obj = {
  value: 100,
  foo() {
    //콜백 함수에 명시적으로 this를 바인딩한다
    setTimeout(
      function () {
        console.log(this.value);
      }.bind(this),
      100
    );
  },
};

obj.foo();
```

- 화살표 함수(화살표 함수를 쓰면 화살표 함수 내부에서 그냥 똑같이 this 써도 된다.)

## import, 모듈

- 모듈
  - JavaScript 코드를 여러 파일과 폴더에 나누어 작성하고 서로가 서로를 효율적으로 불러올 수 있도록 해주는 시스템의 필요성이 절실해져, 모듈 시스템이 ES2015에 추가되었다고 한다.
  - script 태그에 type="module" 어트리뷰트를 추가하거나 package.json 파일에 {"type": "module"} 을 추가하면, 해당 js 파일은 모듈로서 동작한다.
- 특징
  - import 혹은 export 구문을 사용할 수 있습니다.
    - 변수, 함수, 클래스 등을 모듈로서 재사용할 수 있다.
  - 별다른 처리를 해주지 않아도 엄격 모드(strict mode)로 동작한다
  - 모듈의 가장 바깥쪽에서 선언된 이름은 전역 스코프가 아니라 모듈 스코프에서 선언된다.
    - 따라서 여러 모듈의 가장 바깥쪽에서 같은 이름으로 변수, 함수, 클래스를 선언하더라도, 서로 다른 스코프에서 선언되기 때문에 이름의 충돌이 생길 일이 없다.
- export default 구문을 통해, 모듈을 대표하는 하나의 값을 지정하고 그 값을 다른 모듈에서 편하게 불러와서 사용할 수 있다. 이렇게 사용하는 값을 default export라고 부른다.
  - import 구문에서 이름을 적어주는 부분에 중괄호를 생략하면, 모듈의 default export를 가져온다.
- import 구문과 export 구문은 모듈 간 의존 관계를 나타내는 것일 뿐, 코드를 실행시키라는 명령이 아니다.

## Quick Sort

- 퀵 정렬은 n개의 데이터를 정렬할 때, 최악의 경우에는 O(n2)번의 비교를 수행하고, 평균적으로 O(n log n)번의 비교를 수행한다.
- 알고리즘
  - 퀵 정렬은 분할 정복(divide and conquer) 방법을 통해 리스트를 정렬한다.
    - 1. 리스트 가운데서 하나의 원소를 고른다. 이렇게 고른 원소를 피벗이라고 한다.
    - 2. 피벗 앞에는 피벗보다 값이 작은 모든 원소들이 오고, 피벗 뒤에는 피벗보다 값이 큰 모든 원소들이 오도록 피벗을 기준으로 리스트를 둘로 나눈다. 이렇게 리스트를 둘로 나누는 것을 분할이라고 한다. 분할을 마친 뒤에 피벗은 더 이상 움직이지 않는다.
    - 3. 분할된 두 개의 작은 리스트에 대해 재귀(Recursion)적으로 이 과정을 반복한다. 재귀는 리스트의 크기가 0이나 1이 될 때까지 반복된다.
  - 재귀 호출이 한번 진행될 때마다 최소한 하나의 원소는 최종적으로 위치가 정해지므로, 이 알고리즘은 반드시 끝난다는 것을 보장할 수 있다.

```js
function quickSort(arr) {
  //3-2. 재귀는 리스트의 크기가 0이나 1이 될 때까지 반복된다
  if (arr.length <= 1) {
    return arr;
  }

  // 1. 리스트 가운데서 하나의 원소를 고른다. 이렇게 고른 원소를 피벗이라고 한다.
  const pivot = arr[0];
  const left = [];
  const right = [];

  // 2. 피벗 앞에는 피벗보다 값이 작은 모든 원소들이 오고, 피벗 뒤에는 피벗보다 값이 큰 모든 원소들이 오도록 피벗을 기준으로 리스트를 둘로 나눈다. 이렇게 리스트를 둘로 나누는 것을 분할이라고 한다. 분할을 마친 뒤에 피벗은 더 이상 움직이지 않는다.
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  //3. 분할된 두 개의 작은 리스트에 대해 재귀(Recursion)적으로 이 과정을 반복한다.
  return quickSort(left).concat(pivot, quickSort(right)); //재귀함수
}
```
