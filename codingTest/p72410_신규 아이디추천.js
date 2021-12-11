// 1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
const first = id => id.toLowerCase();

// 2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
const second = id => {
  const regSpecial = /[^a-z|0-9\-_.]/g;
  return id.replace(regSpecial, '');
};

// 3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
const third = id => {
  while (id.indexOf('..') >= 0) {
    id = id.replace('..', '.');
  }
  return id;
};

// 4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
const fourth = id => {
  const result = id.split('');
  while (result[0] === '.') {
    result.splice(0, 1);
  }
  while (result[result.length - 1] === '.') {
    result.splice(result.length - 1, 1);
  }
  return result.join('');
};

// 5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
const fifth = id => {
  if (id === '') {
    id = 'a';
  }
  return id;
};

// 6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다. 만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
const sixth = id => {
  const result = id.split('');
  if (result.length >= 16) {
    result.splice(15, result.length - 15);
  }
  while (result[result.length - 1] === '.') {
    result.splice(result.length - 1, 1);
  }
  return result.join('');
};

// 7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.
const seventh = id => {
  while (id.length <= 2) {
    id += id[id.length - 1];
  }
  return id;
};

const solution = new_id =>
  seventh(sixth(fifth(fourth(third(second(first(new_id)))))));

const new_id = '...!@BaT#*..y.abcdefghijklm.';
console.time('test');
console.log(solution(new_id));
console.timeEnd('test');

// const solution2 = new_id =>
//   new_id
//     .toLowerCase()
//     .replace(/[^\w-_.]/g, '')
//     .replace(/\.+/g, '.')
//     .replace(/^\.|\.$/g, '')
//     .replace(/^$/, 'a')
//     .match(/^.{0,14}[^.]/)[0]
//     .replace(/^(.)$/, '$1$1$1')
//     .replace(/^(.)(.)$/, '$1$2$2');

// console.time('test2');
// console.log(solution2(new_id));
// console.timeEnd('test2');
