/*     - View
      - 일반적으로 html, css 요소로 구성되어 있다 (플레이팅 직원)
      - 사용자가 최종적으로 보는 것(UI)
      - Controller와 상호작용한다.
      - Controller로부터 직접 동적 값을 전달받을 수 있다.
      - 2. View는 Model에만 의존해야 하고, Controller에는 의존하면 안 된다. 
        - View 내부에 Model의 코드만 있을 수 있고, Controller의 코드가 있으면 안 된다. 
      - 3. View가 Model로부터 데이터를 받을 때는, 사용자마다 다르게 보여주어야 하는 데이터에 대해서만 받아야 한다. 
      - 4. View가 Model로부터 데이터를 받을 때는, 반드시 Controller에서 받아야 한다.  */
export default class TodoView {
  constructor(model) {
    this.model = model;
    this.$toDoList = document.getElementById('todo-list');
    this.$doneList = document.getElementById('done-list');
    this.$todoCount = document.getElementById('todo-count');
    this.$completeCount = document.getElementById('complete-count');
    this.$achievementDiv = document.getElementById('achievementDiv');
  }

  renderTodo(li) {
    this.$toDoList.prepend(li);
  }

  renderComplete(li) {
    this.$doneList.prepend(li);
  }

  renderCounter() {
    this.$todoCount.innerText = this.model.todoStorage.length;
    this.$completeCount.innerText = this.model.completeStorage.length;
  }

  renderAchievement(li) {
    this.$achievementDiv.prepend(li);
  }

  clearAchievement() {
    this.$achievementDiv.innerHTML = '';
  }
}
