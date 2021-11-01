# Day 1

# 1. 학습 체크포인트

- [x] Node.js를 통해서 JavaScript개발을 할 수 있다
- [x] 함수의 역할은 한가지에 집중하고 있다.
- [x] 일관된 변수명과 함수이름을 짓고 있다.
- [x] 함수는 늘 동일한 입력값에 동일한 출력을 보장한다.
- [ ] 개발과정에서 breakpoint나 'debugger;' 키워드를 사용해서 디버깅을 했다.

# 2. NodeJS
## 2-1. NodeJS란?
- NodeJS는 브라우저 밖으로 나온 자바스크립트다. 
- NodeJS는 코드를 실행할 수 있는 하나의 방법에 불과한 Javascript 런타임이며, 크롬 V8 자바스크립트 엔진으로 빌드되었다. 2009년에 Ryan Dahl에 의해 개발됐다. 
- NodeJS로 웹서버를 만들 수 있다.
- NodeJS가 좋은 이유
  - 싱글 쓰레드이며 이벤트 기반, non-blocking I/O모델을 사용하여 가볍다.
  - 확장성이 높은 데이터 집약적인 앱을 만드는데 적합하다.
    - 데이터 스트리밍 앱, 실시간 채팅 앱, 서버사이드 웹 앱 등
- NodeJS가 적합하지 않은 경우
  - 서버에서 무거운 CPU 처리를 하는 앱(이미지 조작, 비디오 변환, 파일 압축 등)
    - 이런 경우에는 Ruby on Rails, php, python 등 대체재를 사용하는 것이 적합하다. 
## 2-2. 브라우저 밖에서 자바스크립트 실행하기
- 터미널에서 node 입력하면, repl 창이 실행된다(repl은 read-eval-print-loop의 약자).
- 여기에서 자바스크립트 코드를 작성할 수 있다.
- repl 창에서 .exit를 입력하거나 Ctrl+D를 누르면 repl 창이 종료된다.
- repl 창 내에서 언더바(밑줄 문자, '_') 는 이전 코드의 결과값을 나타낸다.

## 2-3. 모듈 사용
- 터미널에 `node index.js` 를 입력하면 해당 폴더에 있는 index.js 파일을 NodeJS로 실행한다.

## 2-4. Non-blocking: 노드JS의 비동기 특성
- NodeJS 비동기식 비차단 코드
  - 실행을 차단하지 않는다. 콜백 사용
  - 싱글 스레드이기 때문에, 사용자 한 명이 동기 코드로 단일 스레드를 잠그면, 다른 모든 사용자들은 그 실행이 끝날 때까지 기다려야 하는 문제가 있다.
  - nodeJS는 비동기 처리를 위해 콜백을 중점으로 설계됐다(확장 가능한 웹 애플리케이션).
  - 함수를 다른 함수로 전달하는 것이 nodejs에서는 흔하다.

- 콜백 지옥
  - Non-blocking, asynchronous way식으로 처리하는 것은 콜백지옥에 빠질 수도 있지만, 일단 이것이 콜백의 철학이며 NodeJS가 비동기 작업을 구현하는 방법임을 기억한다.
  - 콜백지옥은 ES의 최신 문법인 Promises나 Async/Await 등을 사용하여 해결할 수도 있다.
```js
// Non-blocking, asynchronous way 예시
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      console.log(data3);
      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
        console.log('Your file has been written', err);
      });
    });
  });
});
console.log('will read file'); //이 줄의 콘솔이 제일 먼저 찍힌다. 위 비동기/비차단식 코드 실행하는데 시간이 걸릴 수 있어 이 줄이 먼저 실행됐다. 
```

# 3. Git & Github
- 깃허브는 버전 관리와 협업을 위한 코드 호스팅 플랫폼이다.
  1. 먼저 깃허브에서 저장소(repository)를 만든다.
  2. 브랜치 생성 : 브랜치는 하나의 저장소에서 서로 다른 버전을 동시에 작업하는 방법이다. 
     - 2020년 10월 이후 깃허브 저장소의 디폴트 브랜치명은 'main'이다.(2020년 10월에 'Black lives matter 운동으로 일환으로 기존 디폴트 브랜치명이었던 master를 main으로 순화하여 변경했다고 한다.)
     -  깃허브에서 
   

# 4. debugging 기술문서 정리
## 4-0. 개발툴의 디버그 모드
 - Launch
   - 디버그용 스크립트를 실행
   - 디버그 모드로 앱 동작 불필요 
   - 디버깅 정보 스크립트를 짜야 한다 - launch.json
   - 
   - 
 - Attach 
   - 디버그 모드로 동작 중인 프로세스에 연결
   - 디버그로 앱 시작 후 시작 버튼

## 4-1. breakpoints란

## 4-2. watch사용법

## 4-3. call stack 의 의미

## 4-4. Step over / Step into/ Step out

---
### 웹에서 경로 표기법
1. 상대경로
- 기준 : 현재 웹페이지의 소속 폴더가 기준점
- 현재 위치를 '나'로 기준을 삼고 상대를 찾는 표현
-  `/`  : 가장 최상의 디렉토리로 이동한다.(Web root)
-  `./`  : 파일이 현재 디렉토리를 의미한다.
-  `../`  : 상위 디렉토리로 이동한다.
- 만약 두단계 상위 디렉토리로 이동하려면
   `../../` 이렇게 사용하면 된다.

2. 절대경로
- 기준 : 누구나 다 알고있는 동일한 위치를 기준으로 상대를 찾는 표현