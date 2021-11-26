const isPalindrome = function (x) {
  const palindromeX = String(x).split('').reverse().join('');
  if (String(x) === palindromeX) {
    return true;
  }
  return false;
};

const x = -121;
console.log(isPalindrome(x));
