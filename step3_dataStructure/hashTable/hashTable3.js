class HashTable {
  constructor(settingSize) {
    this.table = new Array(settingSize);
    this.values = [];
  }
}

HashTable.prototype.betterHash = function (string) {
  const H = 117;
  let total = 0;
  for (let i = 0; i < string.length; ++i) {
    total += H * total + string.charCodeAt(i);
  }
  console.log('Hash value: ' + string + '->' + total);
  total = total % this.table.length;
  return parseInt(total, 10);
};

HashTable.prototype.showDistro = function () {
  for (let i = 0; i < this.table.length; ++i) {
    if (this.table[i] != undefined) {
      console.log(i + ':' + this.table[i]);
    }
  }
};

HashTable.prototype.put = function (key, data) {
  let pos = this.betterHash(key);
  if (this.table[pos] == undefined) {
    this.table[pos] = key;
    this.values[pos] = data;
  } else {
    while (this.table[pos] != undefined) {
      pos++;
    }
    this.table[pos] = key;
    this.values[pos] = data;
  }
};

HashTable.prototype.get = function (key) {
  let hash = -1;
  hash = this.betterHash(key);
  if (hash > -1) {
    for (let i = hash; this.table[hash] != undefined; i++) {
      if (this.table[hash] == key) {
        return this.values[hash];
      }
    }
  }
  return undefined;
};

const hTable = new HashTable(2);
hTable.put('대한민국', '서울');
hTable.put('미국', '워싱턴');
hTable.put('일본', '도쿄');
hTable.put('영국', '런던');
hTable.put('중국', '베이징');

console.log(hTable.get('미국'));
hTable.showDistro();

console.log(hTable);
