//[v]this.Hashfunction
// 문자열을 ASCII코드로 변환한 뒤 배열의 크기로 나누어 배열의 Index를 만단다.
/* function this.Hashfunction(key) {
  // let ascii = 0;
  // let hashcode = 0;

  // for (let i = 0; i < key.length; i++) {
  //   ascii += key[i].charCodeAt(0);
  // }

  // hashcode = ascii % 4; //SIZE
  // //console.log(hashcode);
  // return hashcode;

  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const H = 31; //소수
    hash += hash * H + key.charCodeAt(i);
  }

  return hash % 10;
}
 */
// console.log("@@@@@@@@@", this.Hashfunction("가"));
// console.log("@@@@@@@@@", this.Hashfunction("나"));
// console.log("@@@@@@@@@", this.Hashfunction("aa"));

function Hashmap() {
  this.data = {};
  this.ResultArr = [];
  this.ResultArr.length = 10;
}
//해시
Hashmap.prototype.Hashfunction = function (key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const H = 31; //소수
    hash += hash * H + key.charCodeAt(i);
  }

  return hash % 10;
};

//데이터 담을 크기 지정
Hashmap.prototype.ArraySize = function () {
  for (i = 0; i < this.ResultArr.length; i++) {
    this.ResultArr.push('');
  }
};

//put(String key, String value) 키-값을 추가한다.
Hashmap.prototype.put = function (key, value) {
  let index = this.Hashfunction(key);
  this.ResultArr[index] = value;
  console.log(index);
  console.log(`[Put] \n${this.ResultArr}`);
  return this.ResultArr;
};

//remove(String key) 해당 키에 있는 값을 삭제한다.
Hashmap.prototype.remove = function (key) {
  let index = this.Hashfunction(key);
  delete this.ResultArr[index];

  console.log(`[Remove]\nkey가 ${key}인 값을 삭제합니다= ${this.ResultArr}`);
  return this.ResultArr;
};

//containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
//동일한 키는 동일한 값을 생성한다.
Hashmap.prototype.containsKey = function (key) {
  let index = this.Hashfunction(key);
  console.log(`[Containkey]\nkey가 ${key}인 값이 존재하는가?`);
  if (this.ResultArr[index]) console.log('True');
  else console.log('False');
};

//get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
Hashmap.prototype.get = function (key) {
  let index = this.Hashfunction(key);
  console.log(`[Get]\nkey가 ${key}이면 value는 ${this.ResultArr[index]}이다`);
  return this.ResultArr[index];
};

//keys() 전체 키 목록을 [String] 배열로 리턴한다.
//???
// Hashmap.prototype.keys = function () {
//   console.log(`[Keys]\n${JSON.stringify(this.data)}`); //object object
//   return JSON.stringify(this.data);
// };
Hashmap.prototype.keys = function () {
  console.log(`[Keys]\n${Object.keys(this.ResultArr)}`);
  //return this.data;
};

Hashmap.prototype.values = function () {
  console.log(`[Values]\n${Object.values(this.ResultArr)}`);
  //return this.data;
};

//replace(String key, String value) 키-값으로 기존 값을 대체한다.
Hashmap.prototype.replace = function (key, value) {
  let index = this.Hashfunction(key);
  this.ResultArr[index] = value;
  console.log(`[Replace]\n ${this.ResultArr}`);
  return this.ResultArr;
};

//size() 전체 아이템 개수를 리턴한다.
Hashmap.prototype.size = function () {
  console.log(`[Size]\n${this.ResultArr.length}`);
  return this.ResultArr.length;
};

//clear() 전체 맵을 초기화한다.
Hashmap.prototype.clear = function () {
  this.ResultArr = [];
  console.log(`[Clear]\n${this.ResultArr}`);
};

//isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
//배열의 길이로 확인
Hashmap.prototype.isEmpty = function () {
  console.log(`[IsEmpty]`);
  if (this.ResultArr.length === 0) console.log('True');
  else console.log('False');
};

const Product = new Hashmap();

Product.put('가', 'A');
Product.put('나', 'B');
Product.put('다', 'C');

//이 값이 없어도 데이터 크기가 4인지 size함수로 확인
Product.put('라', 'D');

console.log(Product.data);

Product.remove('가');

Product.containsKey('나');
Product.containsKey('가');

Product.replace('나', 'E');

Product.size();

Product.keys();

Product.values();

Product.get('나');

// Product.clear();

// Product.isEmpty();

console.log(Product);
console.log(Product.ResultArr);
