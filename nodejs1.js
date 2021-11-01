//fs는 file system의 약자
const fs = require('fs');
//Blocking, synchronous way
//파일 읽기
const textIn = fs.readFileSync('.day1/txt/input.txt', 'utf-8');
console.log(textIn);

//파일 쓰기
const textOut = `텍스트 파일에서 불러온 글: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written');
