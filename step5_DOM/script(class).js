class TodolistBuilder {
  constructor() {
    this.todoStorage = [];
    this.completeStorage = [];
  }

  static TODO_KEY = 'MarcoTODO';
  static COMPLETE_KEY = 'MarcoCOMPLETE';

  init() {
    const savedTodo = localStorage.getItem(TodolistBuilder.TODO_KEY);
    if (savedTodo !== null) {
      const parsedTodo = JSON.parse(savedTodo);
      this.todoStorage = parsedTodo;
      parsedTodo.forEach(this.paintTodo); //  <- 이 시점에 이렇게 호출된 paintTodo 내부에서의 this는 undefined만 나온다.
      //메서드 내부에서 콜백함수로서 다른 메서드를 부를 때, 그 메서드는 화살표 함수로 바꿔야지 this를 올바르게(상위...?) 불러온다.
    }
    const savedComplete = localStorage.getItem(TodolistBuilder.COMPLETE_KEY);
    if (savedComplete !== null) {
      const parsedComplete = JSON.parse(savedComplete);
      this.completeStorage = parsedComplete;
      parsedComplete.forEach(this.paintCompleteTodo);
    }
  }

  mainSubmit(e) {
    e.preventDefault();
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = this.beautifyTime(now.getHours());
    const minute = this.beautifyTime(now.getMinutes());

    const value = addInput.value;
    const newTodoObj = {
      text: value,
      id: Date.now(),
      addDay: `${month}.${date}. ${hour}:${minute}`,
      endDay: '',
      status: 'pending',
    };
    this.todoStorage.push(newTodoObj);
    this.paintTodo(newTodoObj); // <- this를 잘 넘겨준다?
    this.saveTodo(TodolistBuilder.TODO_KEY, this.todoStorage);
    addInput.value = '';
    // const that = this;
    console.log('@@@@', this);
  }

  paintTodo = (obj) => {
    console.log('####', this);
    const li = document.createElement('li');
    li.className = 'todo-line';
    li.id = obj.id;

    const daySpan = document.createElement('span');
    daySpan.className = 'add-day';
    daySpan.innerText = obj.addDay;

    const todoSpan = document.createElement('span');
    todoSpan.className = 'todo-span';
    todoSpan.innerText = obj.text;

    const modifyBtn = document.createElement('button');
    modifyBtn.className = 'modify-btn';
    modifyBtn.innerText = '수정';
    modifyBtn.addEventListener('click', (e) =>
      TodolistBuilder.prototype.modifyTodo.call(this, e)
    );

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = '삭제';
    deleteBtn.addEventListener('click', (e) =>
      TodolistBuilder.prototype.deleteTodo.call(this, e)
    );

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.innerText = '완료';
    completeBtn.addEventListener('click', (e) =>
      TodolistBuilder.prototype.completeTodo.call(this, e)
    );

    li.appendChild(daySpan);
    li.appendChild(todoSpan);
    li.appendChild(modifyBtn);
    li.appendChild(deleteBtn);
    li.appendChild(completeBtn);
    toDoList.prepend(li);
  };

  modifyTodo(e) {
    console.log(e);
    e.preventDefault();
    const li = e.target.parentElement;
    const theId = li.id;
    const modifyForm = document.createElement('form');
    modifyForm.className = 'modify-form';
    const modifyInput = document.createElement('input');
    modifyInput.className = 'modify-input';
    const modifyObj = this.todoStorage.find(
      (todo) => todo.id === parseInt(theId)
    );
    modifyInput.value = modifyObj['text'];

    const modifyBtn = document.createElement('button');
    modifyBtn.className = 'modified-btn';
    modifyBtn.innerText = '수정 완료';
    modifyForm.addEventListener('submit', (e) => modifySubmit(e));
    modifyForm.appendChild(modifyInput);
    modifyForm.appendChild(modifyBtn);
    li.childNodes[1].replaceWith(modifyForm);
    li.childNodes[2].remove();
    li.childNodes[2].remove();
    li.childNodes[2].remove();
    modifyInput.focus();
    const modifySubmit = () => {
      e.preventDefault();
      const changedText = modifyInput.value;
      const modifyObj = this.todoStorage.find(
        (todo) => todo.id === parseInt(theId)
      );
      const modifyObjIndex = this.todoStorage.findIndex(
        (todo) => todo.id === parseInt(theId)
      );

      modifyObj['text'] = changedText;
      this.todoStorage.splice(modifyObjIndex, 1, modifyObj);
      this.saveTodo(TodolistBuilder.TODO_KEY, this.todoStorage);
    };
  }

  saveTodo(key, storage) {
    localStorage.setItem(key, JSON.stringify(storage));
    this.countLength();
  }

  deleteTodo(e) {
    const li = e.target.parentElement;
    li.remove(); //delete버튼의 부모인 toto-line 요소를 지운다.
    this.todoStorage = this.todoStorage.filter(
      (todo) => todo.id !== parseInt(li.id)
    );
    this.saveTodo(TodolistBuilder.TODO_KEY, this.todoStorage); //로컬스토리지에 저장할 배열에도 클릭된 요소와 같은 id를 지닌 요소를 뺀 나머지만을 저장한다.
  }

  completeTodo(e) {
    e.preventDefault();
    const li = e.target.parentElement;
    const completeObj = this.todoStorage.find(
      (todo) => todo.id === parseInt(li.id)
    );
    this.todoStorage = this.todoStorage.filter(
      (todo) => todo.id !== parseInt(li.id)
    );
    li.remove();
    this.saveTodo(TodolistBuilder.TODO_KEY, this.todoStorage);
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = this.beautifyTime(now.getHours());
    const minute = this.beautifyTime(now.getMinutes());
    completeObj['endDay'] = `${month}.${date}. ${hour}:${minute}`;
    completeObj['status'] = 'settled';
    this.completeStorage.push(completeObj);
    this.paintCompleteTodo(completeObj);
    this.saveTodo(TodolistBuilder.COMPLETE_KEY, this.completeStorage);
  }

  beautifyTime(number) {
    return number < 10 ? `0${number}` : number;
  }

  backTodo(e) {
    e.preventDefault();
    const li = e.target.parentElement;
    const todoObj = this.completeStorage.find(
      (todo) => todo.id === parseInt(li.id)
    );
    console.log(todoObj);
    this.completeStorage = this.completeStorage.filter(
      (todo) => todo.id !== parseInt(li.id)
    );
    this.saveTodo(TodolistBuilder.COMPLETE_KEY, this.completeStorage);
    li.remove();
    todoObj['endDay'] = ``;
    todoObj['status'] = 'pending';
    this.paintTodo(todoObj);
    this.todoStorage.push(todoObj);
    this.saveTodo(TodolistBuilder.TODO_KEY, this.todoStorage);
  }

  paintCompleteTodo = (obj) => {
    const li = document.createElement('li');
    li.className = 'done-line';
    li.id = obj.id;
    const addDaySpan = document.createElement('span');
    addDaySpan.className = 'add-day-done';
    addDaySpan.innerText = obj.addDay;
    const endDaySpan = document.createElement('span');
    endDaySpan.className = 'end-day';
    endDaySpan.innerText = obj.endDay;
    const doneSpan = document.createElement('span');
    doneSpan.className = 'done-span';
    doneSpan.innerText = obj.text;
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerText = '되돌리기';
    backBtn.addEventListener('click', (e) =>
      TodolistBuilder.prototype.backTodo.call(this, e)
    );
    li.appendChild(addDaySpan);
    li.appendChild(endDaySpan);
    li.appendChild(doneSpan);
    li.appendChild(backBtn);
    doneList.prepend(li);
  };

  countLength() {
    todoCount.innerText = this.todoStorage.length;
    completeCount.innerText = this.completeStorage.length;
  }
}

const addInput = document.getElementById('add-input');
const toDoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
const todoCount = document.getElementById('todo-count');
const completeCount = document.getElementById('complete-count');

const todoInstance = new TodolistBuilder();

todoInstance.init();
todoInstance.countLength();
document
  .getElementById('form')
  .addEventListener('submit', todoInstance.mainSubmit.bind(todoInstance));
