/* eslint-disable linebreak-style */
/* eslint-disable indent */

document.body.innerHTML = `<body>
<main class="container">
  <section class="todo-section">
    <h1 class="title">MyTodo</h1>
    <label for="description" class="display-message"></label>
    <form id="todo-form">
      <input type="text" autocomplete="off" required min="5" max="255" placeholder="Add todo list here ..." name="description" id="description" class="input-group">
     <button type="submit" class="btn-submit"></button>
    </form>
    <ul class="todo-items-gropu">
    </ul>
    <button class="btn-clear-all">Clear all completed</button>
  </section>
</main>
</body>`;

import Todos from "./modules/todosfiles.js";

const domInput = document.getElementById('description');

describe("Add Task Test ", () => {
  const list = new Todos();
  test("Add normal task", () => {
    domInput.value = 'task 1';
    list.onSubmit();
    expect(list.todos).toHaveLength(1);
  });

  test("Add second task", () => {
    domInput.value = 'task 2';
    list.onSubmit();
    expect(list.todos).toHaveLength(2);
  });

  test("Add second task", () => {
    domInput.value = 'task 3';
    list.onSubmit();
    expect(list.todos).toHaveLength(3);
  });
});


