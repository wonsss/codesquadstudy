function map(arr, fn) {
  const result = [];
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i]));
    }
  }
  return result;
}

const print = (e) => console.log(e);
const array1 = ['a', 'b', 'c'];
forEach(array1, print);
