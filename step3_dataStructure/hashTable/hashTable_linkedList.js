// 해시 테이블의 사이즈는 충돌에 직접적 영향을 미친다.
// 해시 테이블의 사이즈가 클수록 충돌이 적게 발생한다.
// 충돌이 어떻게 발생하는지에 대한 설명 목적으로 해시 테이블 사이즈를 작게 조정해볼 수 있다.

class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  find({ value = undefined, 콜백 = undefined }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // 만약 현재 노드의 값에 대한 '콜백 :(nodeValue) => nodeValue.key === key,'
      // 의 값이 있으면, 현재 노드를 반환한다.
      if (콜백(currentNode.value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  append(value) {
    console.log('@@@@@value@@@@@@@', value);
    const newNode = new LinkedListNode(value);
    console.log('!!!!!newNode!!!!!', newNode);
    // 만약 head가 없다면, newNode를 head와 tail에 할당한다.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    //연결된리스트의 끝에 new node를 붙인다.
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // 만약 head가 지워져야 한다면, head와 다른 그 다음 새 head 노드를 만든다.
    while (this.head && this.head.value === value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // 만약 next node가 지워져야 한다면, next node를 next next one으로 만든다
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // tail이 지워졌는지 체크한다.
    if (this.tail.value === value) {
      this.tail = currentNode;
    }

    return deletedNode;
  }
}

class HashTable {
  /**
   * @param {number} hashTableSize
   */
  constructor(hashTableSize) {
    // 특정 사이즈의 해시 테이블을 만들고 각 버킷을 빈 연결 리스트로 채운다.
    this.hashTableSize = hashTableSize;
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList());

    // 모든 실제 key들을 빠른 방법으로 추적하기 위해 this.keys에 해당 객체를 담는다.
    this.keys = {};
  }

  /**
   * key 문자열을 hash된 숫자로 변환한다.
   *
   * @param {string} key
   * @return {number}
   */
  hash(key) {
    // 해시를 계산하기 위해 각 문자의 아스키 코드의 합을 이용하였고, 호너의 메서드를 적용하였다.
    // hash = charCodeAt(0) * PRIME + charCodeAt(1) * PRIME + ... + charCodeAt(n-1)
    // PRIME은 31과 같은 임의의 소수이다.
    const PRIME = 31;
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) =>
        hashAccumulator * PRIME + keySymbol.charCodeAt(0),
      0
    );

    // 해시된 숫자를 해시 테이블 사이즈에 맞도록 변환한다.
    return hash % this.buckets.length;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      콜백: (nodeValue) => nodeValue.key === key,
    });

    if (!node) {
      // 새 노드를 추가한다
      bucketLinkedList.append({ key, value });
    } else {
      // 존재하는 노드의 값을 갱신한다
      node.value.value = value;
    }
  }

  /**
   * @param {string} key
   * @return {*}
   */
  delete(key) {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      콜백: (nodeValue) => nodeValue.key === key,
    });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  /**
   * @param {string} key
   * @return {*}
   */
  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({
      콜백: (nodeValue) => nodeValue.key === key,
    });

    return node ? node.value.value : undefined;
  }

  getSize() {
    return Object.keys(this.keys).length;
  }

  /**
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
   * @return {string[]}
   */
  getKeys() {
    return Object.keys(this.keys);
  }

  clear() {
    this.buckets = Array(this.hashTableSize)
      .fill(null)
      .map(() => new LinkedList());

    this.keys = {};
  }

  /**
   * 해시 테이블 내에 저장된 값들의 리스트를 받는 메서드
   *
   * @return {*[]}
   */
  getValues() {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket
        .toArray()
        .map((linkedListNode) => linkedListNode.value.value);
      return values.concat(bucketValues);
    }, []);
  }
}

//테스트케이스
const hTable = new HashTable(5);
hTable.set('대한민국', '부산');
hTable.set('대한민국', '서울');
hTable.set('미국', '워싱턴');
hTable.set('일본', '도쿄');
hTable.set('베트남', '하노이');
hTable.set('인도네시아', '자카르타');
hTable.set('태국', '방콕');
hTable.set('미얀마', '양곤');
hTable.has('일본');
console.log(hTable.get('대한민국'));
console.log(hTable.getKeys());
console.log(hTable.getValues());
console.log(hTable);
console.log('####0번째#####', hTable.buckets[0]);
console.log('####1번째#####', hTable.buckets[1]);
hTable.delete('대한민국');
console.log(hTable.getSize());
console.log(hTable.get('미국'));
console.log(hTable.get('태국'));
hTable.clear();
console.log(hTable.getSize());
