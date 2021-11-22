import TodoModel from './model.js';
import TodoView from './view.js';
import TodoController from './controller.js';

window.addEventListener('DOMContentLoaded', () => {
  console.log('window onload');
  const model = new TodoModel();
  const view = new TodoView(model);
  const controller = new TodoController(model, view);
  controller.getDataAndCreateElementWhenOnload();
});
