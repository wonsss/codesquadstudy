const hash = (string, storageSize) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i);
  }
  return hash % storageSize;
};

class Node {
  key;
  value;
  chain;
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  setChain(chain) {
    this.chain = chain;
  }
}

class HashTable {
  size;
  storage;
  constructor(size) {
    this.size = size;
    this.storage = new Array(size);
  }
  add(key, value) {
    const node = new Node(key, value);
    const index = hash(key, this.size);

    if (!this.storage[index]) {
      this.storage[index] = node;
    } else {
      this.collision(node, index);
    }
    return;
  }

  collision(node, index) {
    if (!node.chain) {
      //chain 값 없음
      this.storage[index].chain = node;
    } else {
      //chain 값이 있을 때
      this.collision(node.chain, index);
    }
  }

  lookUp(key) {
    const index = hash(key, this.size);
    const foundNode = this.storage[index];
    if (foundNode.key === key) {
      return foundNode;
    } else {
      return this.lookUpChain(foundNode.chain, key);
    }
  }

  lookUpChain(node, key) {
    if (node.key === key) {
      return node;
    } else {
      return this.lookUpChain(node.chain, key);
    }
  }

  countAll() {
    let count = 0;
    this.storage.map((each) => (count += this.countChains(each)));
    return count;
  }

  countChains(node) {
    let eachCount = 0;
    if (!node) {
      return 0;
    } else {
      eachCount++;
      eachCount += this.countChains(node.chain);
    }
    return eachCount;
  }
}

const hTable = new HashTable(23);
for (let i = 0; i < 5; i++) {
  hTable.add(`Node ${i}`, Math.random() * 10);
}
hTable.add('대한민국', '서울');
hTable.add('일본', '도쿄');
hTable.add('영국', '런던');

console.log(hTable.storage);
console.log(hTable.countAll());
console.log('-------------------------------');
console.log(hTable.lookUp('대한민국'));
// console.log(hTable.lookUp('Node 101'));
