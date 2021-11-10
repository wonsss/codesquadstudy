# stack&queue

## 1. 예외 처리

```js
openMyFile();
try {
  writeMyFile(theData); //This may throw a error
} catch (e) {
  handleError(e); // If we got a error we handle it
} finally {
  closeMyFile(); // always close the resource
}
```

## 2. stack

- 스택은 `가장 윗부분에서만` 자료의 추가와 삭제가 일어나므로 실행속도가 빠르고 구현이 쉬운 효율적인 자료구조다.

### 2.1 스택 동작

- 스택은 요소 리스트로 구성되며 `탑(top)`이라 불리는 리스트의 한쪽 끝으로만 요소에 접근할 수 있다.
- 스택은 `후입선출(last in, first out, LIFO)` 자료구조 알려져 있다.
- 스택은 후입선출이라는 특성 때문에 스택의 탑에 있지 않은 요소에는 접근할 수 없다. 스택의 밑바닥에 있는 요소에 접근하려면 모든 요소를 제거하는 수밖에 없다.
- 스택은 스택에 요소를 추가하거나 요소를 스택에서 제거하는 두 가지 주요 동작을 제공한다.
  - 스택에서는 `push 동작`을 이용해 오소를 스택에 추가한다.
  - 또한 `pop 동작`을 이용해 스택에서 요소를 꺼낼 수 있다.
  - `peek` 을 이용하면 스택의 탑에 있는 요소를 제거하지 않고 내용만 확인할 수 있다.
- 탑 요소의 위치와 새 요소를 추가할 위치는 `top 변수`를 이용해 관리한다.
  - 새 요소를 스택에 추가했을 때는 top 변수를 증가시키고,
  - 스택 요소를 제거할 때는 top변수를 감소시킨다.

### 2.2 스택 구현

스택을 구현하려면 스택 요소를 내부적으로 저장한 자료구조를 결정해야 한다.
여기서는 배열을 사용한다.

```js
class Stack {
  constructor() {
    this.dataStore = []; //스택 요소 저장하는 배열
    this.top = 0;
  }

  push(element) {
    this.dataStore[this.top++] = element; //현재 top 위치에 새 요소 추가한 다음 top에 1 증가
  }
  pop() {
    return this.dataStore[--this.top]; // top 1을 감소하고 스택의 탑 위치에 있는 요소 반환
  }
  peek() {
    return this.dataStore[this.top - 1]; //top-1 위치의 요소에 접근해 스택의 탑 요소 반환, 스택이 비어있을 때 호출하면 undefined 반환
  }
  length() {
    return this.top;
  }
  clear() {
    this.top = 0;
  }
}

// Stack 클래스 구현 테스트
let s = new Stack();
s.push('Marco');
s.push('Dotori');
s.push('Pocky');
s.push('Millie');
console.log('length:' + s.length());
console.log(s.peek());
console.log('Popped element: ', s.pop());
console.log(s.peek());
console.log('length:' + s.length());
s.clear();
console.log('clear');
console.log('length:' + s.length());
```

### 2.3 Stack 클래스 이용하기

#### 2.3.1 진법 변환

n이라는 숫자가 있고 b라는 진법으로 변환할 때 다음과 같은 알고리즘 이용할 수 있다.

1. n의 가장 오른쪽 숫자는 n%b다. 이 값을 스택에 추가한다.
2. n을 n/b로 치환한다.
3. n=0이 되고 나머지가 없을 때까지 1번, 2번 과정을 반복한다.
4. 스택에 저장된 숫자를 모두 꺼내 변환된 숫자 문자열을 만든다.

```js
// 2진수부터 9진수 사이에서만 동작하는 알고리즘
function mulBase(num, base) {
  let s = new Stack(); //위에서 정의한 stack 클래스 사용
  while (num > 0) {
    s.push(num % base);
    num = Math.floor(num / base);
  }
  let converted = '';
  while (s.length() > 0) {
    converted += s.pop();
  }
  return converted;
}

console.log(mulBase(7, 2));
console.log(mulBase(45, 6));
```

#### 2.3.2 회문

앞으로 읽으나 뒤로 읽으나 같은 단어, 구절, 숫자를 회문(palindrome)이라 한다.
스택을 이용해 어떤 문자열이 회문인지 여부를 판단할 수 있다.
스택에 문자열을 추가하고, 스택의 각 문자를 다시 꺼내 새 문자열을 만든다.
역순으로 바뀐 문자열과 원래 문자열을 비교하여, 비교 결과가 같은 문자열을 회문이다.

```js
function isPalindrome(word) {
  let s = new Stack();
  for (let i = 0; i < word.length; ++i) {
    s.push(word[i]);
  }
  let rword = '';
  while (s.length() > 0) {
    rword += s.pop();
  }
  if (word == rword) {
    return true;
  } else {
    return false;
  }
}

console.log(isPalindrome('racecar')); // true, racecar는 거꾸로 해도 racecar
console.log(isPalindrome('hello')); //false
```

#### 2.3.3 재귀

재귀를 구현할 때도 스택을 사용한다. 스택을 이용해 재귀 프로세스를 흉내낼 수 있다.

```js
//팩토리얼 계산하는 재귀 함수
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
console.log(factorial(5)); //120
```

```js
//스택을 이용한 재귀 과정 시뮬레이션
function fact(n) {
  let s = new Stack();
  while (n > 1) {
    s.push(n--); // 5,4,3,2 순으로 쌓인다.
  }
  let product = 1;
  while (s.length() > 0) {
    product *= s.pop(); // 2,3,4,5 순으로 곱해진다.
  }
  return product;
}

console.log(fact(5)); //120
```

## 3. 큐(queue)

큐는 리스트의 일종으로 `끝부분(end)`으로 데이터가 삽입되고 `앞부분(front)`에서는 데이터가 삭제되는 자료구조다.
큐는 `선입선출(first-in, first-out, FIFO)` 자료구조다. 먼저 온 고객부터 먼저 처리해드리는 것과 같다.

### 3.1 큐 동작

- 큐에 요소를 삽입하거나 삭제하는 것이 큐의 두 가지 주요 동작이다.
  - 큐에 요소를 삽입하는 동작을 `인큐(enqueue)`라고 한다.
    - 인큐는 큐의 `끝부분`에 요소를 `추가`한다.
  - 큐에서 요소를 삭제하는 동작을 `데큐(dequeue)`라고 한다.
    - 데큐는 큐의 `앞부분`에서 요소를 `삭제`한다.

### 3.2 배열 기반의 Queue 클래스 구현

```js
class Queue {
  constructor() {
    this.dataStore = [];
  }
  enqueue(element) {
    this.dataStore.push(element);
  }
  dequeue() {
    this.dataStore.shift();
  }
  front() {
    return this.dataStore[0];
  }
  back() {
    return this.dataStore[this.dataStore.length - 1];
  }
  // toString(), 큐의 모든 요소 출력
  toString() {
    let retStr = '';
    for (let i = 0; i < this.dataStore.length; ++i) {
      retStr += this.dataStore[i] + '\n';
    }
    return retStr;
  }
  isEmpty() {
    if (this.dataStore.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}

let q = new Queue();
q.enqueue('A');
q.enqueue('B');
q.enqueue('C');
q.enqueue('D');
console.log(q.toString());
console.log('[dequeue 실행 후]');
q.dequeue();
console.log(q.toString());
console.log('제일 앞 요소: ' + q.front());
console.log('제일 뒤 요소: ' + q.back());
```

### 3.3 큐로 데이터 정렬하기

- 기수 정렬 수행

```js
//digit은 1의 자리, 10의 자리 숫자를 구분하는 매개변수
// 1의 자리 숫자인지 10의 자리 숫자인지 구분해 큐에 숫자 추가하는 함수
function distribute(nums, queues, n, digit) {
  for (let i = 0; i < n; i++) {
    if (digit == 1) {
      queues[nums[i] % 10].enqueue(nums[i]);
    } else {
      queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
    }
  }
  return queues;
}

// 큐에 저장된 숫자를 수집하는 함수
function collect(queues, nums) {
  let i = 0;
  const result = [];
  //이중 루프(이차원 배열을 일차원 배열로 만들기 위해)
  for (let digit = 0; digit < 10; digit++) {
    while (!queues[digit].isEmpty()) {
      nums[i++] = queues[digit].dequeue(); //원본배열 nums의 인덱스에 순차적으로 queues[digit] 배에서 dequeue한 요소를 재할당한다.
    }
  }
  return result;
}

let queues = [];
for (let i = 0; i < 10; i++) {
  queues[i] = new Queue();
}

let nums = [];
for (let i = 0; i < 10; i++) {
  nums[i] = Math.floor(Math.random() * 101);
}

console.log('기수 정렬 전');
console.log(nums);
console.log('1의 자리 수로 기수 정렬 후 ');
console.log(distribute(nums, queues, 10, 1));
collect(queues, nums);
console.log(nums);

console.log('기수 정렬 전');
console.log(nums);
console.log('10의 자리 수로 기수 정렬 후 ');
console.log(distribute(nums, queues, 10, 10));
collect(queues, nums);
console.log(nums);
```

### 3.4 우선순위 큐

- 우선순위 큐는 우선순위를 기준으로 요소의 삭제 순서를 결정한다.
- 예를 들어, 병원 응급실의 대기실에는 우선순위 큐가 적용된다. 환자가 응급실에 들어오면 예진 간호사가 환자를 검사하고, 우선순위 코드를 부여한다. 우선순위가 높은 코드(1이 제일 높다고 가정)를 받은 환자는 우선순위가 낮은 코드를 받은 환자보다 먼저 진료를 받는다.
  - 하지만 우선순위 코드가 같은 환자 간에는 선입선출 규칙을 적용한다.

```js
//큐에 저장할 객체 Patient의 요소 name, code 정의
function Patient(name, code) {
  this.name = name;
  this.code = code;
}

//가장 높은 우선순위를 가진 요소를 삭제하도록 dequeue 함수를 고친다.
Queue.prototype.dequeue = function () {
  let entry = 0;
  for (let i = 0; i < this.dataStore.length; i++) {
    if (this.dataStore[i].code < this.dataStore[entry].code) {
      entry = i;
    }
  }
  return this.dataStore.splice(entry, 1);
};

Queue.prototype.toString = function () {
  let retStr = '';
  for (let i = 0; i < this.dataStore.length; ++i) {
    retStr += `${this.dataStore[i].name}  ${this.dataStore[i].code}\n`;
  }
  return retStr;
};

let ed = new Queue();
let p = new Patient('Smith', 5);
ed.enqueue(p);
p = new Patient('Jones', 4);
ed.enqueue(p);
p = new Patient('Marco', 6);
ed.enqueue(p);
p = new Patient('Brown', 1);
ed.enqueue(p);
p = new Patient('Ingram', 1);
ed.enqueue(p);

console.log('치료 대기중인 환자:\n', ed.toString());

console.log('방금 치료받은 환자: ', ed.dequeue()[0]);
console.log('치료 대기중인 환자:\n', ed.toString());

console.log('방금 치료받은 환자: ', ed.dequeue()[0]);
console.log('치료 대기중인 환자:\n', ed.toString());

console.log('방금 치료받은 환자: ', ed.dequeue()[0]);
console.log('치료 대기중인 환자:\n', ed.toString());

console.log('방금 치료받은 환자: ', ed.dequeue()[0]);
console.log('치료 대기중인 환자:\n', ed.toString());

console.log('방금 치료받은 환자: ', ed.dequeue()[0]);
console.log('치료 대기중인 환자:\n', ed.toString());

console.log('방금 치료받은 환자: ', ed.dequeue()[0]);
console.log('치료 대기중인 환자:\n', ed.toString());
```

```
//output
치료 대기중인 환자:
 Smith  5
Jones  4
Marco  6
Brown  1
Ingram  1

방금 치료받은 환자:  Patient { name: 'Brown', code: 1 }
치료 대기중인 환자:
 Smith  5
Jones  4
Marco  6
Ingram  1

방금 치료받은 환자:  Patient { name: 'Ingram', code: 1 }
치료 대기중인 환자:
 Smith  5
Jones  4
Marco  6

방금 치료받은 환자:  Patient { name: 'Jones', code: 4 }
치료 대기중인 환자:
 Smith  5
Marco  6

방금 치료받은 환자:  Patient { name: 'Smith', code: 5 }
치료 대기중인 환자:
 Marco  6

방금 치료받은 환자:  Patient { name: 'Marco', code: 6 }
치료 대기중인 환자:

방금 치료받은 환자:  undefined
치료 대기중인 환자:
```

## 4. 연결리스트(linked list)

### 4.1 배열의 단점

- 배열에는 몇 가지 단점이 있다.
  - 대부분의 프로그래밍 언어에서는 배열의 길이가 정해져 있어 배열이 꽉 차면 추가로 데이터를 입력하기가 어렵다.
  - 배열에 데이터를 추가하거나 삭제할 때도 나머지 요소를 이동해야 하므로 어려움이 따른다.
- 다행히 자바스크립트에서는 배열의 split() 함수를 이용해 원하는 동작을 간단하게 수행할 수 있다.
  - 그러나 자바스크립트 배열은 객체이므로 C++나 자바 등의 배열에 비해 효율이 떨어진다.
- 배열로 작업했을 때 너무 느리다고 판단되면 대안으로 연결리스트를 사용할 수 있다. 일차원 배열을 사용한 곳에서는 대부분 배열을 `연결 리스트`로 바꿀 수 있다. 임의의 요소에 접근해야 할 때는 연결 리스트보다 배열이 좋다.

### 4.2 연결 리스트 정의

- `노드(node)` 라 불리는 객체가 모여 연결 리스트를 구성한다.
  - 각 노드는 `객체 레퍼런스`를 통해 리스트의 다른 노드와 연결된다.
    - 다른 노드를 참조하는 레퍼런스를 `링크(link)`라 한다.
- 인덱스로 요소를 참조할 수 있는 배열과 달리 **연결 리스트의 요소는 다른 요소와의 관계를 통해 원하는 요소를 참조할 수 있다.**
  - 예를 들어, 'Milk' 다음에 'Bread'가 있다고 표현한다. 연결 리스트에서는 첫 번째 노드에서 마지막 노드로 이동하는 방식으로 전체 요소를 확인할 수 있다.
    - 연결 리스트의 마지막은 Null로 끝나는데 이는 연결 리스트의 끝을 가리킨다.
    - 연결 리스트의 시작은 보통 `헤더` 라 불리는 특별한 노드를 이용해 표현한다.
- 연결 리스트에 새 노드를 추가하려면,
  - (1) 새 노드의 링크는 `이전 노드가 가리키던 노드`를 가리키도록 설정해야 한다.
  - (2) 삽입하려는 노드의 이전 노드 링크는 `새 노드`를 가리키도록 바꿔야 하고
- 연결 리스트의 항목을 삭제하려면,
  - (1) 삭제하려는 노드의 이전 노드 링크는 `삭제하려는 노드의 다음 노드`를 가리키도록 바꿔야 하고,
  - (2) 삭제하려는 노드의 링크를 `Null`로 설정한다.

### 4.3 객체 기반 연결리스트 설계

- 연결 리스트에서 두 클래스를 만들어야 한다.
  - 우선 연결 리스트에 추가할 수 있는 `Node 클래스`와 `LinkedList 클래스`를 만든다.
    - `LinkedList 클래스`는 노드의 삽입, 삭제, 리스트 출력, 기타 연결 리스트에 필요한 기능을 제공한다.

#### 4.3.1 Node 클래스

Node 클래스의 두 가지 프로퍼티

- 노드의 데이터를 저장하는 `element`
- 연결 리스트의 다음 노드 링크를 저장하는 `next`

```js
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
```

#### 4.3.2 연결 리스트 클래스

`LList` 클래스는 연결 리스트의 기능을 제공한다.

- 새 노드 삽입, 기존 노드 삭제, 리스트의 특정 데이터 검색 등의 기능
- 새 연결 리스트를 만드는데 사용할 생정자 함수
- 연결 리스트에는 리스트의 헤드를 나타내는 노드에 해당하는 한 개의 프로퍼티만 포함

```js
class LList {
  constructor() {
    this.head = new Node('head');
  }
  find = function () {};
  insert = function () {};
  remove = function () {};
  display = function () {};
}
```

#### 4.3.3 새로운 노드 삽입하기

- find 함수
  - 기존 노드의 뒤에 새 노드를 추가하려면 기존 노드를 찾아야 한다. 따라서 연결리스트에서 특정 데이터를 포함하는 노드를 검색하는 find()를 구현한다.
  - 데이터를 찾으면 find()함수는 해당 데이터를 저장하고 있는 노드를 반환한다.

```js
// find 함수 - 특정 데이터를 포함하는 노드를 검색하여 해당 노드를 반환
function find(item) {
  //새 노드를 만들고 head 노드로 설정한다
  let currentNode = this.head;
  //다음 노드로 반복 이동하면서 현재 노드의 element 프로퍼티 값이 탐색하려는 값과 같은지 확인한다.
  while (currentNode.element !== item) {
    currentNode = currentNode.next;
  }
  //원하는 데이터를 찾으면 해당 노드를 반환한다.
  // 데이터를 찾지 못했으면 null이 반환된다(currentNode.next가 null)
  return currentNode;
}
```

- insert 함수
  - 기존 노드를 찾았으면,
    - (1) 새 노드의 링크(`newNode.next`)는 이전 노드가 가리키던 노드(`current.next`)를 가리키도록 설정하고,
    - (2) 삽입하려는 노드의 이전 노드 링크(`current.next`)는 새 노드(`newNode`)를 가리키도록 바꿔야 한다.

```js
insert(newElement, item) {
  let newNode = new Node(newElement);
  let current = this.find(item);
  newNode.next = current.next;
  current.next = newNode;
}
```

- display 함수
  - 연결 리스트의 요소를 출력하는 함수

```js
display() {
  let currentNode = this.head;
  while (currentNode.next !== null) {
    //실제로 데이터를 포함하는 노드만 출력할 수 있도록(즉, 헤드 노드는 제외하도록) currentNode가 가리키는 다음 노드의 element 프로퍼티에 접근한다.
    console.log(currentNode.next.element);
    currentNode = currentNode.next;
  }
}
```

#### 4.3.4 연결리스트에서 노드 삭제하기

- findPrevious() 함수
  - (1) 이 함수는 연결 리스트를 탐색하다가, 다음 노드에서 삭제하려는 데이터를 포함하고 있으면 탐색을 멈춘다.
  - (2) 삭제하려는 데이터를 찾았으면 `삭제하려는 데이터를 포함하는 노드의 이전 노드(previousNode)`를 반환한다.

```js
  findPrevious(item) {
    let currentNode = this.head;
    while (currentNode.next !== null && currentNode.next.element !== item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
```

- remove() 함수 : 연결 리스트에서 노드를 삭제하려면,
  - (1) 삭제하려는 노드의 이전 노드 링크(`previousNode.next`)는 삭제하려는 노드의 다음 노드(`previousNode.next.next`)를 가리키도록 바꿔야 한다.
    - `findPrevious()함수` 사용하여 `삭제하려는 바로 이전 노드(previousNode)`를 찾는다.
  - (2) 삭제하려는 노드의 링크를 `Null`로 설정한다.

```js
  remove(item) {
    let previousNode = this.findPrevious(item);
    if (previousNode.next !== null) {
      previousNode.next = previousNode.next.next;
    }
  }
```

- 모든 코드

```js
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LList {
  constructor() {
    this.head = new Node('head');
  }
  find(item) {
    let currentNode = this.head;
    while (currentNode.element !== item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  insert(newElement, item) {
    let newNode = new Node(newElement);
    let current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }
  display() {
    let currentNode = this.head;
    while (currentNode.next !== null) {
      console.log(currentNode.next.element);
      currentNode = currentNode.next;
    }
  }

  findPrevious(item) {
    let currentNode = this.head;
    while (currentNode.next !== null && currentNode.next.element !== item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  remove(item) {
    let previousNode = this.findPrevious(item);
    if (previousNode.next !== null) {
      previousNode.next = previousNode.next.next;
    }
  }
}

//테스트
let cities = new LList();
//insert(새 요소, 기존 요소)
cities.insert('Seoul', 'head');
cities.insert('Pusan', 'Seoul');
cities.insert('Gwangju', 'Pusan');
cities.insert('Daegu', 'Gwangju');
cities.display();
// console.log(cities);
console.log('-------삭제 후------');
cities.remove('Pusan');
cities.display();
// console.log(cities);
```

### 4.4 양방향 연결 리스트

- 역방향으로 노드 탐색 추가
  - 노드에 이전 노드 링크를 저장하는 프로퍼티를 추가하면 이 문제를 해결할 수 있다.

```js
//수정
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.previous = null; //양방향 연결 리스트 위해 이전 노드의 링크 저장하는 프로퍼티 추가
  }

  insert(newElement, item) {
    let newNode = new Node(newElement);
    let current = this.find(item);
    newNode.next = current.next;
    newNode.previous = current; //양방향 연결 리스트 위해 연결
    current.next = newNode;
  }
}
```

- 양방향 연결 리스트의 remove()함수
  - (1) 이전 노드의 링크(`currentNode.previous.next`)가 삭제하려는 노드의 다음 노드(`currentNode.next`)를 가리키도록 설정
  - (2) 삭제하려는 노드 다음 노드의 previous 프로퍼티(`currentNode.next.previous`)를 삭제하려는 노드의 previous 값(`currentNode.previous`)으로 설정

```js
  remove(item) {
    let currentNode = this.find(item);
    if (currentNode.next !== null) {
      //이전 노드의 링크가 삭제하려는 노드의 다음 노드를 가리키도록 설정
      currentNode.previous.next = currentNode.next;
      //삭제하려는 노드 다음 노드의 previous 프로퍼티를 삭제하려는 노드의 previous 값으로 설정
      currentNode.next.previous = currentNode.previous;
      //삭제하려는 노드의 next, previous 프로퍼티를 null로 설정
      currentNode.next = null;
      currentNode.previous = null;
    }
  }
```

- 모든 코드

```js
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.previous = null; //양방향 연결 리스트 위해 이전 노드의 링크 저장하는 프로퍼티 추가
  }
}

class LList {
  constructor() {
    this.head = new Node('head');
  }
  find(item) {
    let currentNode = this.head;
    while (currentNode.element !== item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  insert(newElement, item) {
    let newNode = new Node(newElement);
    let current = this.find(item);
    newNode.next = current.next;
    newNode.previous = current; //양방향 연결 리스트 위해 연결
    current.next = newNode;
  }
  display() {
    let currentNode = this.head;
    while (currentNode.next !== null) {
      console.log(currentNode.next.element);
      currentNode = currentNode.next;
    }
  }

  /*   //단방향 연결시 사용
  findPrevious(item) {
    let currentNode = this.head;
    while (currentNode.next !== null && currentNode.next.element !== item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  } */

  remove(item) {
    let currentNode = this.find(item);
    if (currentNode.next !== null) {
      //이전 노드의 링크가 삭제하려는 노드의 다음 노드를 가리키도록 설정
      currentNode.previous.next = currentNode.next;
      //삭제하려는 노드 다음 노드의 previous 프로퍼티를 삭제하려는 노드의 previous 값으로 설정
      currentNode.next.previous = currentNode.previous;
      currentNode.next = null;
      currentNode.previous = null;
    }
  }

  // 유틸리티 함수 - 양방향 연결리스트의 마지막 노드로 이동
  findLast() {
    let currentNode = this.head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  //역순으로 양방향 연결리스트의 요소 출력 (findLast 이용)
  displayReverse() {
    let currentNode = this.head;
    currentNode = this.findLast();
    while (currentNode.previous !== null) {
      console.log(currentNode.element);
      currentNode = currentNode.previous;
    }
  }
}

//테스트
let cities = new LList();
//insert(새 요소, 기존 요소)
cities.insert('Seoul', 'head');
cities.insert('Pusan', 'Seoul');
cities.insert('Gwangju', 'Pusan');
cities.insert('Daegu', 'Gwangju');
cities.display();
console.log('-------삭제 후------');
cities.remove('Pusan');
cities.display();

console.log('-----역순으로 요소 출력------');
cities.displayReverse();

//output
/*
Seoul
Pusan
Gwangju
Daegu
-------삭제 후------
Seoul
Gwangju
Daegu
-----역순으로 요소 출력------
Daegu
Gwangju
Seoul
*/
```

### 4.5 순환형 연결 리스트

- 순환형 연결 리스트는 단방형 연결 리스트와 같은 종류의 노드를 포함한다.
  - 유일하게 다른 점은 `헤드의 next 프로퍼티가 자신을 가리킨다는 것`이다. `head.next= head`
    - 이 동작이 전체 리스트에 적용되어 항상 마지막 노드의 next 프로퍼티는 head를 가리킨다.
- 장점 : 복잡한 양방향 리스트를 만들지 않고도 간단하게 역방향 탐색 가능
  - 순환형 연결 리스트는 노드의 끝을 지나 계속 탐색하면 결국 역방향에 있는 노드로 이동할 수 있기 때문이다.
