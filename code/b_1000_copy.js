// const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const fs = require('fs');
const input = fs.readFileSync('/input.txt').toString().split(' ');
const result = Number(input[0]) + Number(input[1]);
console.log(result);
