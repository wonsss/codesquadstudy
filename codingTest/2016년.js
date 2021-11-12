function getDayName(a, b) {
  return new Date(2016, a - 1, b).toString().slice(0, 3).toUpperCase();
}

//아래 코드는 테스트를 위한 코드입니다.
console.log(getDayName(5, 24));
