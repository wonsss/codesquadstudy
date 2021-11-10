# stack&queue

## 1. 예외 처리

```js
openMyFile();
try {
  writeMyFile(theData); //This may throw a error
} catch(e) {
  handleError(e); // If we got a error we handle it
} finally {
  closeMyFile(); // always close the resource
}
```