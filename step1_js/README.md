# Day 1~2

## 목차
- [1. 학습 체크포인트](#1-학습-체크포인트)
- [2. NodeJS](#2-NodeJS)
- [3. Git & Github](#3-Git-&-Github)
- [4. debugging 기술문서 정리](#4-debugging-기술문서-정리)
- [5. 웹에서 경로 표기법](#5-웹에서-경로-표기법)
- [6. 자바스크립트 문법(rest파라미터, sperad연산자, forEach](#6-자바스크립트-문법)
- [7. NodeJS에서 입력받기](#7-NodeJS에서-입력받기)

## 1. 학습 체크포인트

- [x] Node.js를 통해서 JavaScript개발을 할 수 있다
- [x] 함수의 역할은 한가지에 집중하고 있다.
- [x] 일관된 변수명과 함수이름을 짓고 있다.
- [x] 함수는 늘 동일한 입력값에 동일한 출력을 보장한다.
- [x] 개발과정에서 breakpoint나 'debugger;' 키워드를 사용해서 디버깅을 했다.


## 2. NodeJS

### 2-1. NodeJS란?

- NodeJS는 브라우저 밖으로 나온 자바스크립트다.
- NodeJS는 코드를 실행할 수 있는 하나의 방법에 불과한 Javascript 런타임이며, 크롬 V8 자바스크립트 엔진으로 빌드되었다. 2009년에 Ryan Dahl에 의해 개발됐다.
- NodeJS로 웹서버를 만들 수 있다.
- NodeJS가 좋은 이유
  - 싱글 쓰레드이며 이벤트 기반, non-blocking I/O모델을 사용하여 가볍다.
  - 입출력이 잦고 데이터를 실시간으로 다루는 앱에 적합하다.
    - 데이터 스트리밍 앱, 실시간 채팅 앱, 서버사이드 웹 앱, 싱글페이지 앱 등
- NodeJS가 적합하지 않은 경우
  - 서버에서 무거운 CPU 처리를 하는 앱(이미지 조작, 비디오 변환, 파일 압축 등)
    - 이런 경우에는 Ruby on Rails, php, python 등 대체재를 사용하는 것이 적합하다.

### 2-2. 브라우저 밖에서 자바스크립트 실행하기

- 터미널에서 node 입력하면, repl 창이 실행된다(repl은 read-eval-print-loop의 약자).
- 여기에서 자바스크립트 코드를 작성할 수 있다.
- repl 창에서 .exit를 입력하거나 Ctrl+D를 누르면 repl 창이 종료된다.
- repl 창 내에서 언더바(밑줄 문자, '\_') 는 이전 코드의 결과값을 나타낸다.

### 2-3. 모듈 사용

- 터미널에 `node index.js` 를 입력하면 해당 폴더에 있는 index.js 파일을 NodeJS로 실행한다.

### 2-4. Non-blocking: 노드JS의 비동기 특성

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


## 3. Git & Github

- 깃허브는 버전 관리와 협업을 위한 코드 호스팅 플랫폼이다.

  1. 먼저 깃허브에서 저장소(repository)를 만든다.

     - 깃허브와 VSCode 연결하기. VSCode터미널에 아래와 같이 코드를 입력하여 깃허브 로그인을 한다.

       ```js
       git config --global user.name "이름"
       git config --global user.email "이메일"
       ```

  2. 브랜치 생성 : 브랜치는 하나의 저장소에서 서로 다른 버전을 동시에 작업하는 방법이다. 각각의 브랜치는 다른 브랜치의 영향을 받지 않으므로, 여러 작업을 동시에 진행할 수 있다. 한 프로젝트에서 동일한 소스코드를 여러 개발자들이 함께 다룰 때, 브랜치를 통해 개발자들은 한 소스코드로 동시에 다양한 작업을 할 수 있다.

     - 2020년 10월 이후 깃허브 저장소의 디폴트 브랜치명은 'main'이다.(2020년 10월에 'Black lives matter 운동으로 일환으로 기존 디폴트 브랜치명이었던 master를 main으로 순화하여 변경했다고 한다.)
     - 2-1. 브랜치 새로 만들기, 이름 바꾸기, 삭제하기

       - 새 브랜치 만들기 : `git push origin NEW_BRANCH`
       - A. 로컬 브랜치의 이름 변경 : `git branch -m OLD_BRANCH NEW_BRANCH`
       - B. OLD_BRANCH가 깃허브에서 디폴트 브랜치라면, 깃허브 저장소 설정에서 OLD_BRANCH의 디폴트 브랜치를 다른 브랜치에 넘겨준다. 디폴트 설정을 해제해주어야 아래와 같이 OLD_BRANCH에 대한 삭제 등을 할 수 있다.
       - ## C. OLD_BRANCH를 삭제하고 NEW_BRANCH를 푸시한다.

         - ```js
            git push origin NEW_BRANCH //새 브랜치 푸시
            git push origin --delete OLD_BRANCH //기존 브랜치 삭제
           ```

           또는 아래와 같이 한 줄에 푸시와 삭제를 한번에 할 수도 있다.

         -
         - ```js
            git push origin :OLD_BRANCH NEW_BRANCH //푸시와 삭제를 한번에
           ```

  3. 깃허브 저장소와 VS Code 로컬 저장소를 최초 연동하기(init, add, commit, remote add, push)
     1. `git init` : 초기화
     2. `git add .` : 온점은 현재 디렉토리의 모든 변경 내용을 지칭하고, `git add` 는 변경 내용을 `스테이징 영역`에 추가한다는 의미다. `스테이징 영역`은 작업 디렉토리와 깃 저장소의 변경 이력 사이에 징검다리 역할을 하며, 커밋할 준비가 된 변경 내용이 깃 저장소에 기록되기 전에 대기하는 장소라고 생각하면 쉽다. 만약 변경 내용의 일부만 스테이징하고 싶다면 `git add 파일경로`를 사용하면 된다.
     3. `git commit -m "커밋 메시지"` : 커밋은 의미 있는 변경 작업들을 저장소에 기록하는 동작이다. 위에서 add하여 스테이징된 변경 내용을 commit하게 되면 저장소에 기록된다.
     4. `git branch -M main` : 현재 브랜치를 강제로 main 브랜치로 이동시키고 기존 브랜치는 삭제된다.
     5. `git remote add origin 원격깃저장소주소` : 로컬 저장소와 원격 저장소를 연결해주는 명령어이다. 하나의 Git 저장소에는 다수의 원격 Git 저장소를 등록할 수 있다. 인자 중 origin은 원격 저장소의 이름이며 관습적으로 origin을 사용한다고 한다. `git remote -v` 명령어로 현재 로컬 Git 저장소에 등록된 원격 저장소 목록을 확인할 수 있다.
     6. `git push -u origin main` : git push는 원격 저장소에 코드 변경내용을 업로드하기 위해 사용하는 명령어이다. 인자 중 origin은 위에서 설정한 원격 저장소의 이름이고, main은 3번에서 설정한 브랜치의 이름이다. 즉, 원격 저장소 `origin`의 `main` 브랜치에 업로드한다는 의미다.


## 4. debugging 기술문서 정리

### 4-0. 개발툴의 디버그 모드

- 디버거란 프로그램의 오류를 찾아내기 위한 오류 수정기 소프트웨어의 총칭이다.

- Launch
  - 디버그용 스크립트를 실행
  - 디버그 모드로 앱 동작 불필요
  - 디버깅 정보 스크립트를 짜야 한다 - launch.json
- Attach
  - 디버그 모드로 동작 중인 프로세스에 연결
  - 디버그로 앱 시작 후 시작 버튼

### 4-1. breakpoints란

- 브레이크포인트(중단점)를 이용하여 에러가 발생한 범위를 좁혀서 원인을 찾을 수 있다. 작동하던 프로그램을 강제로 중단시키고 상태를 확인하는 것이다. 브레이크포인트 설정 후 디버깅 모드 실행 시, 포인트마다 순차적으로 실행이 일시적으로 멈추면서, 그 시점의 변수 상태 등을 확인할 수 있다.
  - 브레이크포인트에서 멈췄을 때, 변수를 확인하거나 코드를 이어서 실행한다.
- VS Code에서 브레이크포인트를 삽입하려면 삽입하고 싶은 코드 라인에서 코드라인 숫자 왼쪽 빈칸을 클릭하면 되고, 이를 통해 빨간색 브레이크포인트 나타난다. 또는 해당 코드라인에 커서를 올려두고 `F9`를 눌러서 브레이크포인트 삽입 및 제거를 할 수 있다.
- 브레이크포인트를 삽입했다면, 디버깅 시작 버튼 또는 `F5`를 눌러 디버깅을 시작한다. 참고로 `Ctrl+F5`는 디버깅하지 않고 실행이다(빨간점을 무시하고 실행).
- 디버그가 시작되면 첫 번째 브레이크포인트에 노란 화살표가 들어오며, 이는 이 포인트에서 프로그램이 중단됐다는 것이다. 다음 브레이크포인트까지 실행하려면 다시 `F5`를 누른다.
- 진행하다보면 `예외가 발생함`이라는 창과 함께 프로그램이 중단될 수 있는데, 이를 통해 에러가 발생한 지점이 많이 좁혀졌음을 알 수 있다. 더 상세히 살피려면, `F11`을 눌러 한 줄 한 줄 코드를 실행하여 확인한다.
  - 변수를 확인하려면, locals(지역)창, watch(조사식)창, auto(자동)창에서 확인한다.
- 디버깅을 중지하려면 `Shift + F5`를 누른다.

### 4-2. watch사용법

- watch(조사식)창은 특별히 보고싶은 변수만 모아서 볼 수 있는 창이다. 변수 명에서 우클릭하고 `Add Watch(조사식 추가)`를 하면 조사식창에서 상태를 확인할 수 있다. 변수끼리의 연산을 쓸 수 있다.
  - locals(지역)창에서는 현재 실행중인 메서드의 지역변수 상태를 확인할 수 있는데, locals에서 확인되지 않는 전역변수 상태는 watch(조사식)창에서 추가하여 확인할 수 있다.

### 4-3. call stack 의 의미

- call stack(호출 스택)에서는 함수의 호출 흐름을 볼 수 있다. 호출 스택은 이름 그대로, 함수가 호출되는 순서대로 정보가 쌓인다. 함수들을 타고 들어가다가 어디에서 오류가 발생했는지 쉽게 알아낼 수 있다.

### 4-4. Step over / Step into/ Step out

- continue(`F5`) : 다음 브레이크포인트로 이동한다.
- Step over(`F10`) : 브레이크포인트에서 다음 라인으로 이동한다. 다음 라인이 함수일 경우 그 함수 내부로 이동하지 않고 바로 실행한다.
- Step into(`F11`) : 다음 라인이 함수일 경우 그 함수 안으로 들어가서 함수 내부의 동작을 한줄씩 실행한다.
- Step out(`Shift + F11`) : 함수를 끝까지 실행시키고 호출시킨 곳으로 되돌아 간다. 즉, 현재 함수의 나머지 부분을 실행시키고 함수의 리턴이 완료된 곳에서 멈춘다. step into를 통해 함수 내부로 들어간 뒤 바로 return으로 넘어가고 싶을 때 사용하면 유용하다.


## 5. 웹에서 경로 표기법

1. 상대경로

   - 기준 : 현재 웹페이지의 소속 폴더가 기준점
   - 현재 위치를 '나'로 기준을 삼고 상대를 찾는 표현
   - `/` : 가장 최상의 디렉토리로 이동한다.(Web root)
   - `./` : 파일이 현재 디렉토리를 의미한다.
   - `../` : 상위 디렉토리로 이동한다.
   - 만약 두단계 상위 디렉토리로 이동하려면
     `../../` 이렇게 사용하면 된다.

2. 절대경로
   - 기준 : 누구나 다 알고있는 동일한 위치를 기준으로 상대를 찾는 표현

---

## 6. 자바스크립트 문법

**getArea 함수 미션 코드를 짜면서, 불규칙적인 갯수의 매개변수들을 입력받는 getArea 함수에 Rest 파라미터를 적용하였다.**

### 6-1. Rest 파라미터

Rest 파라미터(나머지 매개변수)는 매개변수 이름 앞에 세 개의 점 `...`을 붙여서 정의한 매개변수를 의미한다. Rest 파라미터는 함수에 전달된 인수들의 목록을 `배열` 로 전달받는다. Rest 파라미터는 이름 그대로 먼저 선언된 매개변수에 할당된 인수를 제외한 나머지 인수들로 구성된 배열이 할당된다. 따라서 Rest 파라미터는 반드시 마지막 파라미터이어야 한다. Rest파라미터는 단 하나만 선언할 수 있다.

```jsx
function bar(param1, param2, ...rest) {
  console.**log**(param1); //1
  console.log(param2); //2
  console.log(rest); //[3,4,5]
}

bar(1, 2, 3, 4, 5);
```

### 6-2. 스프레드 문법

ES6에서 도입된 스프레드 문법 `...`은 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만든다.

- 스프레드 문법의 결과는 값이 아니고 값들의 목록이다. 스프레드 문법의 결과는 변수에 할당할 수 없다. 함수 호출문의 인수 목록, 배열 리터럴의 요소 목록, 객체 리터럴의 프로퍼티 목록에서만 사용할 수 있다.
- 함수 호출문의 인수 목록에서 사용하는 경우

  ```jsx
  const arr = [1, 2, 3];
  const max = Math.max(...arr);
  console.log(max); //3
  ```

  - `스프레드 문법`은 `Rest 파라미터` 와 형태가 동일하여 혼동할 수 있으나 서로 반대의 개념이므로 주의할 필요가 있다.
    - `Rest 파라미터`는 함수에 전달된 인수들의 목록을 배열로 전달받기 위해 매개변수 이름 앞에 `...`을 붙이는 것이다.
    - `스프레드 문법`은 여러 개의 값이 하나로 뭉쳐 있는 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만드는 것이다.

### 6-3. Array의 forEach메서드

- Array.prototype.`forEach` : for 문을 대체할 수 있는 고차 함수이다. 반복문을 추상화한 고차 함수로서 내부에서 반복문을 통해 자신을 호출한 배열을 순회하면서 수행해야 할 처리를 콜백 함수로 전달받아 반복 호출한다. undefined를 반환한다.

  - 매개변수 3개(요소값, 인덱스, this)

  ```jsx
  const numbers = [1, 2, 3];
  const pows = [];

  numbers.forEach((number) => pows.push(number ** 2));
  console.log(pows); //[1, 4, 9]
  ```

  ```jsx
  const numbers = [1, 2, 3];

  //forEach 메서드는 원본 배열을 변경하지 않지만 콜백 함수를 통해 원본 배열을 변경할 수는 있다.
  // 콜백 함수의 세 번째 매개변수 arr은 원본 배열 numbers를 가리킨다.
  //따라서 콜백 함수의 세 번째 매개변수 arr을 직접 변경하면 원본 배열 numbers가 변경된다.
  numbers.forEach((item, index, arr) => {
    arr[index] = item ** 2;
  });
  console.log(numbers); //[1, 4, 9]
  ```

## 7. NodeJS에서 입력받기

### readline 모듈을 사용

- `readline` 모듈은 한 번에 한 줄씩 읽기 가능한 스트림(예: process.stdin)에서 데이터를 읽이 위한 인터페이스를 제공한다.
- `readline.Interface`클래스의 인스턴스는 `readline.createInterface()`메서드를 사용하여 생성된다. 모든 인스턴스는 입력 가능한 `input`스트림과 출력 가능한 `output` 메서드와 연동된다.

### 7-1. line 이벤트, close 이벤트를 활용하여 콘솔창에서 한 줄 입력받기

- line 이벤트
  - 'line'마다 이벤트가 방출되는 input스트림 라인 종료 입력을 수신한다 ( \n, \r나 \r\n). 이것은 일반적으로 사용자가 Enter또는 Return을 누를 때 발생한다. 리스너 함수(listener function)는 수신된 입력의 한 줄을 포함하는 문자열과 함께 호출된다.
- close 이벤트

  - 'close'이벤트는 다음 중 하나의 경우가 발생하면 실행된다.
    - close()메서드 호출
    - 콘솔 입력창에서 Ctrl + C 를 입력

  ```js
  //readline 모듈을 로드하고 최초에는 createInterface를 통해 input을 생성한다.
  const consoleReader = require('readline').createInterface({
    //stdin은 standard input의 약자
    input: process.stdin,
    output: process.stdin,
  });

  console.log('What is your favorite food? ');

  //line 이벤트
  consoleReader.on('line', (answer)) => {
    console.log(`Oh, so your favorite food is "${answer}"?`);

    //콘솔창에 입력을 그만받고 싶다면 close()를 해야 한다.
    consoleReader.close();
  };
  ```

#### question() 메서드 사용하여 콘솔창에서 질문하고 응답받기를 한 번에

- 구문 : `rl.question(query[,options], callback)`
  - `query` 에는 string으로 질문을 쓰며, 이 내용은 프롬프트 창에 출력된다.
  - `callback함수`는 사용자의 입력으로 유발된다.
- 예시

  ```js
  const consoleReader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdin,
  });
  consoleReader.question('What is your favorite food? ', (answer) => {
    console.log(`Oh, so your favorite food is ${answer}`);
    //콘솔창에 입력을 그만받고 싶다면 마찬가지로 close()를 해야 한다.
  });
  ```

#### 한 줄로 입력받은 string을 띄어쓰기를 기준으로 배열로 저장하기

```js
consoleReader.question(
  '★ 사다리꼴의 윗변, 아랫변, 높이를 순서대로 띄어쓰기하여 한줄로 입력해주세요.\n',
  (sizes) => {
    const sizeArray = sizes
      .trim()
      .split(' ')
  }
);
```

- trim() 메서드는 string 좌우 공백을 제거한다.
- split(' ') 메서드가 여기서 핵심이다. 문자열을 분해하여 배열을 반환한다. 따옴표 사이에 입력된 값을 기준으로 분해된다. 여기서는 하나의 빈 칸이 따옴표 사이에 있으므로 빈 칸을 기준으로 분해한다. 

### 7-2. 줄 단위로 파일 스트림 읽기

가장 쉬운 방법은 fs.ReadStreamAPI와 for await...of루프를 활용하는 것이다.
```js
const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
  }
}

processLineByLine();
```

또는 'line'이벤트를 사용할 수 있다 .

```js
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('sample.txt'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  console.log(`Line from file: ${line}`);
});
```

더 자세한 내용은 nodeJS 문서에서 확인할 수 있다.
https://nodejs.org/api/readline.html#readline
