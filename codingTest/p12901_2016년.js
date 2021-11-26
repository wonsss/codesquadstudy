function solution(a, b) {
  const totalMonthDay = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const accumulatedDayArray = totalMonthDay.slice(0, a - 1);
  const accumulatedDays =
    (accumulatedDayArray.length === 0
      ? 0
      : accumulatedDayArray.reduce((acc, cur) => acc + cur)) + b;
  const dict = {
    1: 'FRI',
    2: 'SAT',
    3: 'SUN',
    4: 'MON',
    5: 'TUE',
    6: 'WED',
    0: 'THU',
  };
  return dict[accumulatedDays % 7];
}
console.log(solution(12, 22));
