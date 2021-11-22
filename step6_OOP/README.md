# 프로그래밍 방법론

## Todo list 웹페이지 업데이트 내용

- 데모 주소 : https://wonsss.github.io/codesquadstudy/step6_OOP/index.html
- [x] 객체 지향 MVC 디자인 패턴 시도
- [x] 날짜별 완료 리스트 보기 기능 추가
- [x] form submit될 때, 페이지 새로고침되던 문제 해결

## 객체지향 프로그래밍

- 데이터와 기능이 클래스로'캡슐화'된 컴퓨터 자원의 묶음을 '객체'라고 한다.
- 객체 지향 디자인 패턴
  - MVC(Model View Controller) 패턴
    - MVC는 `유지보수`가 편해지는 코드 구성 방식이다.
    - Model
      - 데이터에 관련된 로직
      - 저장하고 불러오기 (주방장)
      - 데이터베이스와 상호작용(select, insert, update)
      - Controller와 상호작용한다.
      - 가끔 View를 업데이트할 수도 있다(프레임워크에 따라)
      - 1. Model은 Controller와 View에 의존하지 않아야 한다
        - Model 내부에 Controller와 View에 관련된 코드가 있으면 안 된다.
    - View
      - 일반적으로 html, css 요소로 구성되어 있다 (플레이팅 직원)
      - 사용자가 최종적으로 보는 것(UI)
      - Controller와 상호작용한다.
      - Controller로부터 직접 동적 값을 전달받을 수 있다.
      - 2. View는 Model에만 의존해야 하고, Controller에는 의존하면 안 된다.
        - View 내부에 Model의 코드만 있을 수 있고, Controller의 코드가 있으면 안 된다.
      - 3. View가 Model로부터 데이터를 받을 때는, 사용자마다 다르게 보여주어야 하는 데이터에 대해서만 받아야 한다.
      - 4. View가 Model로부터 데이터를 받을 때는, 반드시 Controller에서 받아야 한다.
    - Controller
      - Model과 View를 연결해주는 전반적 제어 기능 (주문도 받고 서빙도 하는 매니저)
      - 사용자로부터 input을 받는다(view,url 등 통해)
      - 요청을 처리한다(GET, POST, PUT, DELETE)
      - Model로부터 데이터를 받는다.
      - View에게 데이터를 전달한다.
      - 5. Controller는 Model과 View에 의존해도 된다.
        - Controller 내부에는 Model과 View의 코드가 있을 수 있다.
    - MVC 프레임워크
      - 프레임워크는 남이 이미 짜놓은 코드이다. 라이브러리는 가져다 쓰는 것이고, 기본 틀로 해서 골격을 만드는 것이 프레임워크다.
      - Ruby on Rails(Ruby), Express(Js), Angular(Js), Django(python), Flask(Pyhtno)
    - MVC는 소프트웨어 아키택처 디자인 패턴의 일종이다.
      - 기능과 로직 인터페이스를 앱에서 분리하는 것이 목적이다.

## 절차적 프로그래밍

## 함수형 프로그래밍

## 반응형 프로그래밍
