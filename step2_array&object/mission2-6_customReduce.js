/*
### **6. reduce 만들기.*
Array 의 reduce 메서드처럼 동작하는 **myReduce** 메서드를 만들자.
*/
const arr = [1, 2, 3, 4];

const myReduce = (arr, callback, initialValue) => {
  let result = initialValue;
  for (let i = 0; i < arr.length; i++) {
    result = callback(result, arr[i]);
  }
  return result;
};

const sumreducer = (next, prev) => next + prev;
const answer = myReduce(arr, sumreducer, 0);
console.log(answer);
