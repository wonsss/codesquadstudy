/*     - Model
      - 데이터에 관련된 로직
      - 저장하고 불러오기 (주방장)
      - 데이터베이스와 상호작용(select, insert, update)
      - Controller와 상호작용한다.
      - 가끔 View를 업데이트할 수도 있다(프레임워크에 따라)
      - 1. Model은 Controller와 View에 의존하지 않아야 한다
        - Model 내부에 Controller와 View에 관련된 코드가 있으면 안 된다.  */

export default class TodoModel {
  constructor() {
    this.inputTodoData;
    this.todoStorage = [];
    this.completeStorage = [];
  }

  static TODO_KEY = 'MarcoTODO';
  static COMPLETE_KEY = 'MarcoCOMPLETE';

  getTodoDataFromUser() {
    return this.inputTodoData;
  }
  setTodoDataFromUser(data) {
    this.inputTodoData = data;
  }

  pushDataToStorage(obj, storage) {
    storage.push(obj);
  }

  saveTodo(key, storage) {
    localStorage.setItem(key, JSON.stringify(storage));
  }

  getDataFromLocal(key, storage) {
    const savedData = localStorage.getItem(key);
    if (savedData !== null) {
      const parsedData = JSON.parse(savedData);
      if (key === 'MarcoTODO') {
        this.todoStorage = parsedData;
      } else if (key === 'MarcoCOMPLETE') {
        this.completeStorage = parsedData;
      }
    }
  }
  getTodoDataFromLocal() {
    const savedTodo = localStorage.getItem(TodoModel.TODO_KEY);
    if (savedTodo !== null) {
      const parsedTodo = JSON.parse(savedTodo);
      this.todoStorage = parsedTodo;
    }
  }
  getCompleteDataFromLocal() {
    const savedComplete = localStorage.getItem(TodoModel.COMPLETE_KEY);

    if (savedComplete !== null) {
      const parsedComplete = JSON.parse(savedComplete);
      this.completeStorage = parsedComplete;
    }
  }
}
