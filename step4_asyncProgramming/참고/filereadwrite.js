import fs from 'fs';
// 파일 읽기
// fs.readFile('./input.txt', [options], callback);
// "filename"파일을, [options]을 적용해 읽은후, callback 함수를 실행!
let data = fs.readFileSync('step4_asyncProgramming/input.txt');
// "filename"파일을, [options]을 적용해 읽은후, 문자열 반환
// Sync : 동기적 읽기를 뜻함 ( 한 작업을 마치기 전까지, 다른 작업 불가 )
console.log(data);
const writer = '{ a: 123 }';
fs.writeFileSync('step4_asyncProgramming/input.txt', writer);

// 파일 쓰기
// fs.writeFile('./input.txt', data, [options], callback);
// "filenam"파일에, [options]을 적용해 data내용을 작성하고, callback함수 실행!
// fs.writeFileSync('./input.txt', data, [options]);
// "filename"파일에, [options]을 적용해 data내용을 작성
