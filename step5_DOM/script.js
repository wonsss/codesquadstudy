const form = document.getElementById('form');
const addInput = document.getElementById('add-input');
const toDoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
const todoCount = document.getElementById('todo-count');
const completeCount = document.getElementById('complete-count');
console.log(addInput);
let todoStorage = []; //
let completeStorage = [];
const TODO_KEY = 'MarcoTODO';
const COMPLETE_KEY = 'MarcoCOMPLETE';
function countLength() {
  todoCount.innerText = todoStorage.length;
  completeCount.innerText = completeStorage.length;
}

function paintTodo(obj) {
  const li = document.createElement('li');
  li.className = 'todo-line';
  li.id = obj.id;

  const daySpan = document.createElement('span');
  daySpan.className = 'add-day';
  daySpan.innerText = obj.addDay;

  const todoSpan = document.createElement('span');
  todoSpan.className = 'todo-span';
  todoSpan.innerText = obj.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerText = '삭제';
  deleteBtn.addEventListener('click', deleteTodo);

  const completeBtn = document.createElement('button');
  completeBtn.className = 'complete-btn';
  completeBtn.innerText = '완료';
  completeBtn.addEventListener('click', completeTodo);

  li.appendChild(daySpan);
  li.appendChild(todoSpan);
  li.appendChild(deleteBtn);
  li.appendChild(completeBtn);
  toDoList.prepend(li);
  countLength();
}

function saveTodo(key, storage) {
  localStorage.setItem(key, JSON.stringify(storage));
  countLength();
}

function deleteTodo(e) {
  const li = e.target.parentElement;
  li.remove(); //delete버튼의 부모인 toto-line 요소를 지운다.
  todoStorage = todoStorage.filter((todo) => todo.id !== parseInt(li.id));
  saveTodo(TODO_KEY, todoStorage); //로컬스토리지에 저장할 배열에도 클릭된 요소와 같은 id를 지닌 요소를 뺀 나머지만을 저장한다.
  countLength();
}

function completeTodo(e) {
  e.preventDefault();

  const li = e.target.parentElement;
  const completeObj = todoStorage.find((todo) => todo.id === parseInt(li.id));
  todoStorage = todoStorage.filter((todo) => todo.id !== parseInt(li.id));
  li.remove();
  saveTodo(TODO_KEY, todoStorage);

  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = beautifyTime(now.getHours());
  const minute = beautifyTime(now.getMinutes());
  completeObj['endDay'] = `${month}.${date}. ${hour}:${minute}`;
  completeObj['status'] = 'settled';
  completeStorage.push(completeObj);
  paintCompleteTodo(completeObj);
  saveTodo(COMPLETE_KEY, completeStorage);
  countLength();
}

function beautifyTime(number) {
  return number < 10 ? `0${number}` : number;
}

function backTodo(e) {
  e.preventDefault();
  const li = e.target.parentElement;
  const todoObj = completeStorage.find((todo) => todo.id === parseInt(li.id));
  completeStorage = completeStorage.filter(
    (todo) => todo.id !== parseInt(li.id)
  );
  saveTodo(COMPLETE_KEY, completeStorage);
  li.remove();
  todoObj['endDay'] = ``;
  todoObj['status'] = 'pending';
  paintTodo(todoObj);
  todoStorage.push(todoObj);
  saveTodo(TODO_KEY, todoStorage);
  countLength();
}

function paintCompleteTodo(obj) {
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
  backBtn.innerText = '덜함';
  backBtn.addEventListener('click', backTodo);

  li.appendChild(addDaySpan);
  li.appendChild(endDaySpan);
  li.appendChild(doneSpan);
  li.appendChild(backBtn);
  doneList.prepend(li);
  countLength();
}

function mainSubmit(e) {
  e.preventDefault();
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = beautifyTime(now.getHours());
  const minute = beautifyTime(now.getMinutes());

  const newTodoObj = {
    text: addInput.value,
    id: Date.now(),
    addDay: `${month}.${date}. ${hour}:${minute}`,
    endDay: '',
    status: 'pending',
  };
  todoStorage.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodo(TODO_KEY, todoStorage);
  addInput.value = '';
  countLength();
}

form.addEventListener('submit', mainSubmit);

const savedTodo = localStorage.getItem(TODO_KEY);

const savedComplete = localStorage.getItem(COMPLETE_KEY);

if (savedTodo !== null) {
  const parsedTodo = JSON.parse(savedTodo);
  todoStorage = parsedTodo;
  parsedTodo.forEach(paintTodo);
}

if (savedComplete !== null) {
  const parsedComplete = JSON.parse(savedComplete);
  completeStorage = parsedComplete;
  parsedComplete.forEach(paintCompleteTodo);
}
