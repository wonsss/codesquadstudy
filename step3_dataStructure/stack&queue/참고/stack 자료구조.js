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

function mulBase(num, base) {
  let s = new Stack();
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

function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
console.log(factorial(5));

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
