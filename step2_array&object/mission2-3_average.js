// ### **3. 평균 구하기**
// 아래 예시는 네 명의 학생에 대한 과목 점수이다.
// 각 학생은 3가지 과목에 대한 점수를 가지고 있다.
// - 각 학생의 평균점수(1)와 모든 학생의 최고점수의 평균점수(2)를 출력하라.
const grades = [
  [88, 76, 77],
  [33, 44, 44],
  [90, 100, 94],
  [30, 44, 98],
];

const getAverageScoreOfEachStudent = (grades) => {
  let result = [];
  grades.forEach((scores) => {
    const sum = scores.reduce(
      (accumulator, currentValue, index, array) => accumulator + currentValue,
      0
    );
    result.push((sum / scores.length).toFixed(1));
  });
  return result;
};
console.log(getAverageScoreOfEachStudent(grades));

const getAverageOfMaxScore = (grades) => {
  let maxScore = 0;
  grades.forEach((scores) => {
    maxScore += Math.max(...scores);
  });
  return maxScore / grades.length;
};
console.log(getAverageOfMaxScore(grades));
