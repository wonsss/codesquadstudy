function solution(nums) {
  const setNums = new Set(nums);
  const max = nums.length / 2;
  return max > setNums.size ? setNums.size : max;
}

const nums = [3, 3, 3, 2, 2, 2];
console.log(solution(nums));
