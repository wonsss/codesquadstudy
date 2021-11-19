//https://www.hackerrank.com/challenges/kangaroo/problem
function kangaroo(x1, v1, x2, v2) {
  // Write your code here
  //(x1+n*v1) = (x2+n*v2)이라는 일차방정식을 풀어서 나온 변수 n의 값은 아래와 같다.(절대값처리)
  //n(n이 정수라면)은 캥거루가 만나기 위해 총 몇 번 뛰었는지를 의미한다.
  const n = Math.abs((x2 - x1) / (v1 - v2)); //n은 시작점의 차이와 속도의 차이 간의 비율이기도 하다
  if ((x2 !== x1) & (v1 === v2)) {
    //시작점이 같지 않은데, 속도가 같은 경우 -> 영원히 만나지 못함
    return 'NO';
  }
  if (n !== parseInt(n, 10)) {
    //시작점의 차이가 속도의 차이로 나누어 떨어지지 않을 경우(n이 정수가 아니라면)-> 영원히 만나지 못함
    return 'NO';
  }
  if (x1 + n * v1 === x2 + n * v2) {
    //두 캥거루가 뛴 최종 거리를 비교했을 때 같은지 비교
    return 'YES';
  } else {
    return 'NO';
  }
}

// console.log(kangaroo(43, 6, 47, 3));
console.log(kangaroo(43, 2, 70, 2));
