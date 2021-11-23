import TodoModel from './model.js';
import TodoView from './view.js';
import TodoController from './controller.js';

const dom = {
  $toDoList: document.getElementById('todo-list'),
  $doneList: document.getElementById('done-list'),
  $todoCount: document.getElementById('todo-count'),
  $completeCount: document.getElementById('complete-count'),
  $achievementDiv: document.getElementById('achievementDiv'),
};

window.addEventListener('DOMContentLoaded', () => {
  const model = new TodoModel();
  const view = new TodoView(model, dom);
  const controller = new TodoController(model, view);
  controller.getDataAndCreateElementWhenOnload();
  controller.showAchievement();
});
