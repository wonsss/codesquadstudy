function solution(s) {
  if (s.length !== 4 && s.length !== 6) return false;
  const regex = /[0-9]/;
  for (let i = 0; i < s.length; i++) {
    if (!regex.test(s[i])) return false;
  }
  return true;
}

// console.log(solution("a234"));
