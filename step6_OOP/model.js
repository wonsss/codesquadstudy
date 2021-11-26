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

  getDataFromLocal(key) {
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
