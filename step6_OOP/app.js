import TodoModel from './model.js';
import TodoView from './view.js';
import TodoController from './controller.js';

window.addEventListener('DOMContentLoaded', () => {
  const model = new TodoModel();
  const view = new TodoView(model);
  const controller = new TodoController(model, view);
  controller.getDataAndCreateElementWhenOnload();
  controller.showAchievement();
});
