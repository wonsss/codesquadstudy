/* ### **2. 배열 거르기**
주어진 사람들 중 아래 조건을 만족하는 사람들로 구성된 배열을 만들어서 반환하는 함수 만들기.
- 특수기호가 없는 아이디 제외
- 아이디에서 숫자를 제거
- 2 가지 iteration을 처리하는 버전을 만든다.
    - for/while문을 사용한 버전 만들기.
    - forEach,filter, map등의 고차함수를 사용한 버전 만들기 */
const people = ['crong!@#', 'honux5', 'sarah#', 'hea3d', 'zello', '5lucas'];
const regSpecial = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
const regNumber = /[0-9]/;
const filterId = (people) => {
  //거꾸로 for문 돌리기
  // for (let i = people.length; i >= 0; i--) {
  //   if (regSpecial.test(people[i])) {
  //     people.splice(i, 1);
  //   }
  // }

  for (let i = 0; i < people.length; i++) {
    if (regSpecial.test(people[i])) {
      people.splice(i, 1);
      // i--;
    }
  }
  for (let i = 0; i < people.length; i++) {
    people.splice(i, 1, people[i].replace(regNumber, ''));
  }
  return people;
};

console.log(filterId(people));

//forEach, filter 사용
//Array.prototype.forEach : for 문을 대체할 수 있는 고차 함수이다. 반복문을 추상화한 고차 함수로서 내부에서 반복문을 통해 자신을 호출한 배열을 순회하면서 수행해야 할 처리를 콜백 함수로 전달받아 반복 호출한다. undefined를 반환한다.
//Array.prototype.filter : 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다. 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다. 원본 배열은 변경되지 않는다.
const newPeople = ['crong!@#', 'honux5', 'sarah#', 'hea3d', 'zello', '5lucas'];
const foreach_filter = (people) => {
  const filteredPeople = people.filter((person) => !regSpecial.test(person));
  filteredPeople.forEach((person, index, arr) => {
    arr[index] = person.replace(regNumber, '');
  });
  return filteredPeople;
};
console.log(foreach_filter(newPeople));

//filter와 map 사용
//Array.prototype.map : 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다. 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다. 원본 배열은 변경되지 않는다. forEach와 달리 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다.
const filter_map = (people) => {
  const filteredPeople = people.filter((person) => !regSpecial.test(person));
  return filteredPeople.map((person) => person.replace(regNumber, ''));
};
console.log(filter_map(newPeople));
