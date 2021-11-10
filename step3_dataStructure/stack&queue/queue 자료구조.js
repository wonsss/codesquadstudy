class Queue {
  constructor() {
    this.dataStore = [];
  }
  enqueue(element) {
    this.dataStore.push(element);
  }
  dequeue() {
    return this.dataStore.shift();
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
      nums[i++] = queues[digit].dequeue(); //원본배열 nums의 인덱스에 순차적으로 queues[digit] 배열에서 dequeue한 요소를 재할당한다.
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

////////////////////////////

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
