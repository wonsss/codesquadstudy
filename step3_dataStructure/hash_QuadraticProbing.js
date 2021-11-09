// Start of: Quadratic Probing --------------------------------
HashTable.prototype.put = function (key, value) {
  if (this.limit >= this.size) throw 'hash table is full';

  var hashedIndex = this.hash(key),
    squareIndex = 1;

  // quadratic probing
  while (this.keys[hashedIndex % this.size] != null) {
    hashedIndex += Math.pow(squareIndex, 2);
    squareIndex++;
  }

  this.keys[hashedIndex % this.size] = key;
  this.values[hashedIndex % this.size] = value;
  this.limit++;
};

HashTable.prototype.get = function (key) {
  var hashedIndex = this.hash(key),
    squareIndex = 1;

  while (this.keys[hashedIndex % this.size] != key) {
    hashedIndex += Math.pow(squareIndex, 2);
    hashedIndex = hashedIndex % this.size;
    squareIndex++;
  }
  return this.values[hashedIndex % this.size];
};
// End of: Quadratic Probing ----------------------------------
