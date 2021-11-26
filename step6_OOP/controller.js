// eslint-disable-next-line import/extensions
import TodoModel from './model.js';

export default class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.alreadyShow = false;
  }

  // eslint-disable-next-line class-methods-use-this
  getInputData() {
    const $inputTodoData = document.getElementById('add-input');
    const { value } = $inputTodoData;
    TodoModel.prototype.setTodoDataFromUser(value);
    $inputTodoData.value = '';
  }

  getDataAndCreateElementWhenOnload() {
    this.model.getDataFromLocal(TodoModel.TODO_KEY, this.model.todoStorage);
    this.model.getDataFromLocal(
      TodoModel.COMPLETE_KEY,
      this.model.completeStorage
    );

    this.model.todoStorage.forEach(this.createTodoHandler.bind(this));
    this.model.completeStorage.forEach(this.createCompleteHandler.bind(this));
    this.view.renderCounter();
    document
      .getElementById('form')
      .addEventListener('submit', this.submitFormHandler.bind(this));
  }

  beautifyTime(number) {
    return number < 10 ? `0${number}` : number;
  }

  submitFormHandler(e) {
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
  }

  createTodoHandler(obj) {
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
    $modifyBtn.addEventListener('click', e =>
      TodoController.prototype.modifyBtnHandler.call(this, e)
    );

    const $deleteBtn = document.createElement('button');
    $deleteBtn.className = 'delete-btn';
    $deleteBtn.innerText = '삭제';
    $deleteBtn.addEventListener('click', e =>
      TodoController.prototype.deleteBtnHandler.call(this, e)
    );

    const $completeBtn = document.createElement('button');
    $completeBtn.className = 'complete-btn';
    $completeBtn.innerText = '완료';
    $completeBtn.addEventListener('click', e =>
      TodoController.prototype.completeBtnHandler.call(this, e)
    );

    $li.appendChild($daySpan);
    $li.appendChild($todoSpan);
    $li.appendChild($modifyBtn);
    $li.appendChild($deleteBtn);
    $li.appendChild($completeBtn);
    this.view.renderTodo($li);
    this.view.renderCounter();
    return $li;
  }

  createCompleteHandler(obj) {
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
    $backBtn.addEventListener('click', e =>
      TodoController.prototype.backBtnHandler.call(this, e)
    );
    $li.appendChild($addDaySpan);
    $li.appendChild($endDaySpan);
    $li.appendChild($doneSpan);
    $li.appendChild($backBtn);
    this.view.renderComplete($li);
    this.view.renderCounter();
  }

  backBtnHandler(e) {
    e.preventDefault();
    const $li = e.target.parentElement;
    const todoObj = this.model.completeStorage.find(
      todo => todo.id === parseInt($li.id, 10)
    );
    this.model.completeStorage = this.model.completeStorage.filter(
      todo => todo.id !== parseInt($li.id, 10)
    );
    this.model.saveTodo(TodoModel.COMPLETE_KEY, this.model.completeStorage);
    $li.remove();
    todoObj.endDay = ``;
    todoObj.status = 'pending';
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
      todo => todo.id === parseInt(theId, 10)
    );
    $modifyInput.value = modifyObj.text;

    const modifySubmitHandler = () => {
      const changedText = $modifyInput.value;
      const modifyObj = this.model.todoStorage.find(
        todo => todo.id === parseInt(theId, 10)
      );
      const modifyObjIndex = this.model.todoStorage.findIndex(
        todo => todo.id === parseInt(theId, 10)
      );

      modifyObj.text = changedText;
      this.model.todoStorage.splice(modifyObjIndex, 1, modifyObj);
      this.model.saveTodo(TodoModel.TODO_KEY, this.model.todoStorage);
      const $modifiedLine = this.createTodoHandler(modifyObj);
      $li.replaceWith($modifiedLine);
    };
    //  Form 새로고침 문제 해결 : addEventListener 대신에 onsubmit을 사용해서 form이 submit되면 event.preventDefault()를 먼저 실행하고 Handler 함수가 실행되도록 설정하였다.
    $modifyForm.onsubmit = function (event) {
      event.preventDefault();
      modifySubmitHandler();
    };

    const $modifyBtn = document.createElement('button');
    $modifyBtn.className = 'modified-btn';
    $modifyBtn.innerText = '수정 완료';

    $modifyForm.appendChild($modifyInput);
    $modifyForm.appendChild($modifyBtn);
    $li.childNodes[1].replaceWith($modifyForm);
    $li.childNodes[2].remove();
    $li.childNodes[2].remove();
    $li.childNodes[2].remove();
    $modifyInput.focus();
  }

  deleteBtnHandler(e) {
    const $li = e.target.parentElement;
    $li.remove();
    this.model.todoStorage = this.model.todoStorage.filter(
      todo => todo.id !== parseInt($li.id, 10)
    );
    this.model.saveTodo(TodoModel.TODO_KEY, this.model.todoStorage);
    this.view.renderCounter();
  }

  completeBtnHandler(e) {
    e.preventDefault();
    const $li = e.target.parentElement;
    const completeObj = this.model.todoStorage.find(
      todo => todo.id === parseInt($li.id, 10)
    );
    this.model.todoStorage = this.model.todoStorage.filter(
      todo => todo.id !== parseInt($li.id, 10)
    );
    $li.remove();
    this.model.saveTodo(TodoModel.TODO_KEY, this.model.todoStorage);
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = TodoController.prototype.beautifyTime(now.getHours());
    const minute = TodoController.prototype.beautifyTime(now.getMinutes());
    completeObj.endDay = `${month}.${date}. ${hour}:${minute}`;
    completeObj.status = 'settled';
    this.model.completeStorage.push(completeObj);
    this.createCompleteHandler(completeObj);
    this.model.saveTodo(TodoModel.COMPLETE_KEY, this.model.completeStorage);
  }

  showAchievement() {
    const showAchievementBtn = document.getElementById('achievement-btn');
    const closeBtn = document.getElementById('close-btn');
    const achievements = document.getElementById('achievements');
    showAchievementBtn.addEventListener('click', () => {
      achievements.classList.add('show');
      this.createAchievementsByDateHandler.bind(this)();
    });
    closeBtn.addEventListener('click', () => {
      achievements.classList.remove('show');
      this.view.clearAchievement();
      this.alreadyShow = false;
    });
    const contents = document.getElementById('contents');
    contents.addEventListener('mouseup', () => {
      const popup = document.getElementById('achievements');
      popup.classList.remove('show');
    });
  }

  createAchievementsByDateHandler() {
    if (this.alreadyShow === true) {
      return;
    }
    this.alreadyShow = true;
    const collectionByDate = {};
    this.model.completeStorage.forEach(obj => {
      const targetDate = obj.endDay.slice(0, 5);
      if (!Object.keys(collectionByDate).includes(targetDate)) {
        collectionByDate[targetDate] = [];
      }
    });

    this.model.completeStorage.forEach(obj => {
      const targetDate = obj.endDay.slice(0, 5);
      collectionByDate[targetDate].push(obj);
    });
    const createDateAchievement = (obj, date) => {
      const $li = document.createElement('div');
      $li.className = 'achievement-Card';
      const $dayDiv = document.createElement('div');
      $dayDiv.className = 'day-div';
      const $daySpan = document.createElement('span');
      $daySpan.innerText = date;
      $daySpan.className = 'achievement-day';
      const $counter = document.createElement('span');
      $counter.innerText = Object.keys(obj).length;
      $counter.className = 'counter';
      $dayDiv.appendChild($daySpan);
      $dayDiv.appendChild($counter);
      $li.appendChild($dayDiv);

      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const $doneSpan = document.createElement('p');
          $doneSpan.innerText = obj[key].text;
          $doneSpan.className = 'achievement-span';
          const $endTime = document.createElement('span');
          $endTime.innerText = obj[key].endDay.slice(7, 12);
          $endTime.className = 'end-time';
          $li.appendChild($endTime);
          $li.appendChild($doneSpan);
        }
      }
      this.view.renderAchievement($li);
    };

    for (const date in collectionByDate) {
      if (Object.prototype.hasOwnProperty.call(collectionByDate, date)) {
        createDateAchievement(collectionByDate[date], date);
      }
    }
  }
}
