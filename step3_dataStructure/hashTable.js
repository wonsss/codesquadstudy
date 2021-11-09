function Node(key, value) {
  this.key = key;
  this.value = value;

  Node.prototype.setChain = function (chain) {
    this.chain = chain;
  };
}

//생성자함수
function HashTable(size) {
  this.size = size;
  this.storage = new Array(size);
}
//makeHash 메서드 : key를 hash한다. hash는 아스키코드 변환한 값 합을 size로 나누었을 때 나머지로 구한다.
HashTable.prototype.makeHash = function (string, storageSize) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i);
  }
  return hash % storageSize;
};

//put(String key, String value) 키-값을 추가한다.
HashTable.prototype.put = function (key, value) {
  const node = new Node(key, value);
  console.log('-----------', node, '------------');
  const index = this.makeHash(key, this.size);
  console.log(index);
  if (!this.storage[index]) {
    this.storage[index] = node;
  } else {
    console.log('@충돌', this.storage[index]);
    this.collision(node, index);
  }
  return;
};

HashTable.prototype.collision = function (node, index) {
  this.storage[index].chain = node;
  if (!node.chain) {
    //chain 값 없음
    console.log('#Chain값 없으면', this.storage[index].chain);
    this.storage[index].chain = node;
  } else {
    //chain 값이 있을 때
    console.log('##Chain값 있으면', this.storage[index].chain);
    this.collision(node.chain, index);
  }
};

//get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
HashTable.prototype.get = function (key) {
  const index = this.makeHash(key, this.size);
  const foundNode = this.storage[index];
  if (foundNode.key === key) {
    return foundNode;
  } else {
    return this.lookUpChain(foundNode.chain, key);
  }
};

//lookUpChain
HashTable.prototype.lookUpChain = function (node, key) {
  if (node) {
    if (node.key === key) {
      return node;
    } else {
      return this.lookUpChain(node.chain, key);
    }
  }
};

//keys() 전체 키 목록을 [String] 배열로 리턴한다.
HashTable.prototype.keys = function () {
  return this.storage;
};

//getSize() 전체 아이템 개수를 리턴한다.
HashTable.prototype.getSize = function () {
  let count = 0;
  this.storage.map((each) => (count += this.countChains(each)));
  return count;
};

//countChains() 노드를 따라 size 카운트(getSize메서드 보조)
HashTable.prototype.countChains = function (node) {
  let eachCount = 0;
  if (!node) {
    return 0;
  } else {
    eachCount++;
    eachCount += this.countChains(node.chain);
  }
  return eachCount;
};

//remove(String key) 해당 키에 있는 값을 삭제한다.
HashTable.prototype.remove = function (key) {
  const index = this.makeHash(key, this.size);
  const foundNode = this.storage[index];
  delete this.storage[index];
  // if (this.lookUpChain(foundNode.chain, key)) {
  //   // console.log('@@@@@', this.storage[index]['chain']);
  //   delete this.storage[index]['chain'];
  // } else {
  //   delete this.storage[index];
  // }
};

//clear() 전체 맵을 초기화한다.
HashTable.prototype.clear = function () {
  delete this.storage;
};

const hTable = new HashTable(5);
hTable.put('대한민국', '서울');
hTable.put('대한민국', '부산');
hTable.put('일본', '도쿄');
hTable.put('영국', '런던');
// console.log(hTable.keys());
// console.log(hTable.get('대한민국'));
// console.log(hTable.getSize());
hTable.remove('대한민국');

console.log(hTable.keys());

// console.log(hTable.storage);
// console.log(hTable.countAll());
// console.log('-------------------------------');
// console.log(hTable.lookUp('대한민국'));
// console.log(hTable.lookUp('Node 101'));
