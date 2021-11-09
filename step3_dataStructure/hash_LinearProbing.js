// Start of: Linear Probing -----------------------------------
function HashTable(size) {
  this.size = size;
  this.keys = this.initArray(size);
  this.values = this.initArray(size);
  this.limit = 0;
}

HashTable.prototype.initArray = function (size) {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(null);
  }
  return array;
};

HashTable.prototype.put = function (key, value) {
  if (this.limit >= this.size) throw 'hash table is full';

  let hashedIndex = this.hash(key);
  // console.log('@전', hashedIndex);

  // Linear probing
  while (this.keys[hashedIndex] != null) {
    hashedIndex++;
    console.log('@전', hashedIndex);
    hashedIndex = hashedIndex % this.size;
    console.log('@후', hashedIndex);
  }

  this.keys[hashedIndex] = key;
  this.values[hashedIndex] = value;
  this.limit++;
};

HashTable.prototype.get = function (key) {
  let hashedIndex = this.hash(key);

  while (this.keys[hashedIndex] != key) {
    hashedIndex++;
    console.log('@전', hashedIndex);
    hashedIndex = hashedIndex % this.size;
    console.log('@후', hashedIndex);
  }
  return this.values[hashedIndex];
};

HashTable.prototype.hash = function (key) {
  const hash = Array.from(key).reduce(
    (hashAccumulator, key) => hashAccumulator + key.charCodeAt(0),
    0
  );
  return hash % this.size;
};

const exampleTable = new HashTable(6);
exampleTable.put('대한민국', '서울');
exampleTable.put('대한민국', '도쿄');
exampleTable.put('영국', '런던');
console.log(exampleTable.keys);
console.log(exampleTable.values);
// End of: Linear Probing ------------------------------------0
console.log(exampleTable.get('대한민국'));
