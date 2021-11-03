console.log('Say anything!');

const myArray = [];
const consoleReader = require('readline').createInterface({
  input: process.stdin,
});
consoleReader.on('line', (input) => {
  myArray.push(input);
  console.log(`Did you say "${input}"?`);
  consoleReader.close();
});
