/*     - Controller
      - Model과 View를 연결해주는 전반적 제어 기능 (주문도 받고 서빙도 하는 매니저)
      - 사용자로부터 input을 받는다(view,url 등 통해)
      - 요청을 처리한다(GET, POST, PUT, DELETE)
      - Model로부터 데이터를 받는다.
      - View에게 데이터를 전달한다.
      - 5. Controller는 Model과 View에 의존해도 된다.
        - Controller 내부에는 Model과 View의 코드가 있을 수 있다. */
import TodoModel from './model.js';
export default class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  //버튼 클릭하면 인풋데이터 가져온다.
  getInputData() {
    const $inputTodoData = document.getElementById('add-input');
    const value = $inputTodoData.value; //C
    TodoModel.prototype.setTodoDataFromUser(value);
    $inputTodoData.value = ''; //C
  }

  //새로고침하면 데이터를 받고 엘리먼트를 만든다.
  getDataAndCreateElementWhenOnload() {
    //Model클래스에게 로컬스토리지 데이터를 받아서 저장하라고 명령
    // this.model.getTodoDataFromLocal();
    // this.model.getCompleteDataFromLocal();
    this.model.getDataFromLocal(TodoModel.TODO_KEY, this.model.todoStorage);
    this.model.getDataFromLocal(
      TodoModel.COMPLETE_KEY,
      this.model.completeStorage
    );

    this.model.todoStorage.forEach(this.createTodoHandler);
    this.model.completeStorage.forEach(this.createCompleteHandler);
    this.view.renderCounter();
    document
      .getElementById('form')
      .addEventListener('submit', this.submitFormHandler);
  }

  beautifyTime(number) {
    return number < 10 ? `0${number}` : number;
  }

  submitFormHandler = (e) => {
    e.preventDefault();
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = TodoController.prototype.beautifyTime(now.getHours());
    const minute = TodoController.prototype.beautifyTime(now.getMinutes());
    TodoController.prototype.getInputData();
    const value = TodoModel.prototype.getTodoDataFromUser();

    const newTodoObj = {
      text: value,
      id: Date.now(),
      addDay: `${month}.${date}. ${hour}:${minute}`,
      endDay: '',
      status: 'pending',
    };
    this.createTodoHandler(newTodoObj);
    this.model.pushDataToStorage(newTodoObj, this.model.todoStorage);
    this.model.saveTodo(TodoModel.TODO_KEY, this.model.todoStorage);
    this.view.renderCounter();
  };

  createTodoHandler = (obj) => {
    const $li = document.createElement('li');
    $li.className = 'todo-line';
    $li.id = obj.id;

    const $daySpan = document.createElement('span');
    $daySpan.className = 'add-day';
    $daySpan.innerText = obj.addDay;

    const $todoSpan = document.createElement('span');
    $todoSpan.className = 'todo-span';
    $todoSpan.innerText = obj.text;

    const $modifyBtn = document.createElement('button');
    $modifyBtn.className = 'modify-btn';
    $modifyBtn.innerText = '수정';
    $modifyBtn.addEventListener('click', (e) =>
      TodoController.prototype.modifyBtnHandler.call(this, e)
    );

    const $deleteBtn = document.createElement('button');
    $deleteBtn.className = 'delete-btn';
    $deleteBtn.innerText = '삭제';
    $deleteBtn.addEventListener('click', (e) =>
      TodoController.prototype.deleteBtnHandler.call(this, e)
    );

    const $completeBtn = document.createElement('button');
    $completeBtn.className = 'complete-btn';
    $completeBtn.innerText = '완료';
    $completeBtn.addEventListener('click', (e) =>
      TodoController.prototype.completeBtnHandler.call(this, e)
    );

    $li.appendChild($daySpan);
    $li.appendChild($todoSpan);
    $li.appendChild($modifyBtn);
    $li.appendChild($deleteBtn);
    $li.appendChild($completeBtn);
    this.view.renderTodo($li);
    this.view.renderCounter();
  };

  createCompleteHandler = (obj) => {
    const $li = document.createElement('li');
    $li.className = 'done-line';
    $li.id = obj.id;
    const $addDaySpan = document.createElement('span');
    $addDaySpan.className = 'add-day-done';
    $addDaySpan.innerText = obj.addDay;
    const $endDaySpan = document.createElement('span');
    $endDaySpan.className = 'end-day';
    $endDaySpan.innerText = obj.endDay;
    const $doneSpan = document.createElement('span');
    $doneSpan.className = 'done-span';
    $doneSpan.innerText = obj.text;
    const $backBtn = document.createElement('button');
    $backBtn.className = 'back-btn';
    $backBtn.innerText = '되돌리기';
    $backBtn.addEventListener('click', (e) =>
      TodoController.prototype.backBtnHandler.call(this, e)
    );
    $li.appendChild($addDaySpan);
    $li.appendChild($endDaySpan);
    $li.appendChild($doneSpan);
    $li.appendChild($backBtn);
    this.view.renderComplete($li);
    this.view.renderCounter();
  };

  backBtnHandler(e) {
    e.preventDefault();
    const $li = e.target.parentElement;
    const todoObj = this.model.completeStorage.find(
      (todo) => todo.id === parseInt($li.id)
    );
    this.model.completeStorage = this.model.completeStorage.filter(
      (todo) => todo.id !== parseInt($li.id)
    );
    this.model.saveTodo(TodoModel.COMPLETE_KEY, this.model.completeStorage);
    $li.remove();
    todoObj['endDay'] = ``;
    todoObj['status'] = 'pending';
    this.createTodoHandler(todoObj);
    this.model.pushDataToStorage(todoObj, this.model.todoStorage);
    this.model.saveTodo(TodoModel.TODO_KEY, this.model.todoStorage);
    this.view.renderCounter();
  }
  modifyBtnHandler(e) {
    e.preventDefault();
    const $li = e.target.parentElement;
    const theId = $li.id;
    const $modifyForm = document.createElement('form');
    $modifyForm.className = 'modify-form';
    const $modifyInput = document.createElement('input');
    $modifyInput.className = 'modify-input';
    const modifyObj = this.model.todoStorage.find(
      (todo) => todo.id === parseInt(theId)
    );
    $modifyInput.value = modifyObj['text'];

    const $modifyBtn = document.createElement('button');
    $modifyBtn.className = 'modified-btn';
    $modifyBtn.innerText = '수정 완료';
    $modifyForm.addEventListener('submit', (e) => modifySubmitHandler(e));
    $modifyForm.appendChild($modifyInput);
    $modifyForm.appendChild($modifyBtn);
    $li.childNodes[1].replaceWith($modifyForm);
    $li.childNodes[2].remove();
    $li.childNodes[2].remove();
    $li.childNodes[2].remove();
    $modifyInput.focus();
    const modifySubmitHandler = () => {
      e.preventDefault();
      const changedText = $modifyInput.value;
      const modifyObj = this.model.todoStorage.find(
        (todo) => todo.id === parseInt(theId)
      );
      const modifyObjIndex = this.model.todoStorage.findIndex(
        (todo) => todo.id === parseInt(theId)
      );

      modifyObj['text'] = changedText;
      this.model.todoStorage.splice(modifyObjIndex, 1, modifyObj);
      this.model.saveTodo(TodoModel.TODO_KEY, this.model.todoStorage);
    };
  }
  deleteBtnHandler(e) {
    const $li = e.target.parentElement;
    $li.remove(); //delete버튼의 부모인 toto-line 요소를 지운다.
    this.model.todoStorage = this.model.todoStorage.filter(
      (todo) => todo.id !== parseInt($li.id)
    );
    this.model.saveTodo(TodoModel.TODO_KEY, this.model.todoStorage);
    this.view.renderCounter();
  }

  completeBtnHandler(e) {
    e.preventDefault();
    const $li = e.target.parentElement;
    const completeObj = this.model.todoStorage.find(
      (todo) => todo.id === parseInt($li.id)
    );
    this.model.todoStorage = this.model.todoStorage.filter(
      (todo) => todo.id !== parseInt($li.id)
    );
    $li.remove();
    this.model.saveTodo(TodoModel.TODO_KEY, this.model.todoStorage);
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = TodoController.prototype.beautifyTime(now.getHours());
    const minute = TodoController.prototype.beautifyTime(now.getMinutes());
    completeObj['endDay'] = `${month}.${date}. ${hour}:${minute}`;
    completeObj['status'] = 'settled';
    this.model.completeStorage.push(completeObj);
    this.createCompleteHandler(completeObj);
    this.model.saveTodo(TodoModel.COMPLETE_KEY, this.model.completeStorage);
  }
}
