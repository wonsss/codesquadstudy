# 해시맵

## 미션

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

## Hash Map 이란?

해시 테이블(hash table), 해시 맵(hash map), 해시 표는 컴퓨팅에서 키를 값에 매핑할 수 있는 구조인, 연관 배열 추가에 사용되는 자료 구조이다. 해시 테이블은 해시 함수를 사용하여 색인(index)을 버킷(bucket)이나 슬롯(slot)의 배열로 계산한다.

## 프로토타입이란?

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

## this란?

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
