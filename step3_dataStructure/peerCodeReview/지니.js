function HashTable() {
  this.storage = [];
  this.size = 3;
}

const myTable = new HashTable();

//아스키코드로 바꾸는 함수
HashTable.prototype.makeAscii = function (key) {
  let hash = 0;
  const prime = 31;
  for (let i = 0; i < key.length; i++) {
    hash += hash * prime + key.charCodeAt(i);
  }
  //console.log(hash);
  return hash % this.size; //13 this.size
};

//넣어주는 함수
HashTable.prototype.put = function (key, value) {
  let index = this.makeAscii(key);

  this.storage[index] = [key, value];
};

//[]containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
HashTable.prototype.containsKey = function (key) {
  let index = this.makeAscii(key);
  // console.log(key, '@@@@', this.storage[index], index);
  // console.log('####', Object.values(this.storage));
  // console.log(
  //   '!!!!!',
  //   Object.values(this.storage)
  //     .map((i) => i[0] === key)
  //     .includes(true)
  // );
  // [1,2,3].map(i=> i*2)   -> [2,4,6]
  // Object.values(this.storage)  -> [ [ '떡군이네', 9000 ], [ '엽기떡볶이', 16000 ], [ '벌떡', 16000 ] ]
  //   Object.values(this.storage).map((i) => i[0] === key)   -> [true, false, false]

  if (
    Object.values(this.storage)
      .map((i) => i[0] === key)
      .includes(true)
  ) {
    return true;
  }
  return false;

  // if (Object.values(this.storage).map((i) => i[0] === key)) {
  //   return true;
  // }
  // return false;
  // console.log('&&&&&&&&&&&&&', this.storage[index], index);
  // if (this.storage[index]) {
  //   return true;
  // } else {
  //   return false;
  // }
};

//[]get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
HashTable.prototype.get = function (key) {
  let index = this.makeAscii(key);
  if (this.storage[index] === key) {
    return this.storage[index];
  }
};

// []replace(String key, String value) 키-값으로 기존 값을 대체한다.
HashTable.prototype.replace = function (key, value) {
  let index = this.makeAscii(key);

  if (this.storage[index]) {
    return (this.storage[index] = [key, value]);
  }
};

myTable.put('태리로제', 9000);
myTable.put('신전떡볶이', 5000);
myTable.put('엽기떡볶이', 16000);
myTable.put('벌떡', 16000);
myTable.put('떡군이네', 9000);
// myTable.put('pizza',20000);
// console.log(myTable.storage);

//console.log(myTable.containsKey('pizza'));
console.log(myTable.get('떡군이네'));
console.log('containsKey("떡군이네") : ', myTable.containsKey('떡군이네'));
console.log('containsKey("교촌치킨") : ', myTable.containsKey('교촌치킨'));

console.log(myTable);
// console.log(myTable.remove('pizza'));
// console.log(myTable.replace('배떡', 9000));
// console.log(this.storage);
