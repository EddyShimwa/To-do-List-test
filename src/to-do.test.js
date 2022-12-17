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

import Todos from "./modules/customTodosFiles.js";
// import isValid from "./modules/todos"

const domInput = document.getElementById("description");
// Test Add one task
describe("Add Task Test ", () => {
  const list = new Todos();
  test("Add normal task", () => {
    domInput.value = "task 1";
    list.onSubmit();
    expect(list.todos).toHaveLength(1);
  });

  test("Add second task", () => {
    domInput.value = "task 2";
    list.onSubmit();
    expect(list.todos).toHaveLength(2);
  });

  test("Add third task", () => {
    domInput.value = "task 3";
    list.onSubmit();
    expect(list.todos).toHaveLength(3);
  });
});

// Test delete one task
describe('Delete a todo task ', () => {
  const list = new Todos();
  test('remove first task', () => {
    domInput.value = 'task 1';
    list.delete();
    expect(list.todos).toHaveLength(0);
  });

  test('remove second task', () => {
    domInput.value = 'task 2';
    list.delete();
    expect(list.todos).toHaveLength(0);
  });
  test('remove the third task', () => {
    domInput.value = 'task 3';
    list.delete();
    expect(list.todos).toHaveLength(0);
  });
});


// Test edit one task
describe("edit the input content", () => {
  test("should edit one task", () => {
    const list = new Todos();
    list.todos = []
    domInput.value = "task 1";
    list.onSubmit();
    domInput.value = "task 2";
    list.onSubmit();

    const domTask = document.getElementById('1');
    const editInput = domTask.querySelector('input')
    editInput.value = "edited task 1";
    list.edit(editInput);
    expect(list.todos[0].description).toBe('edited task 1')
  });

  test("should edit one task", () => {
    const list = new Todos();
    list.todos = []
    domInput.value = "task 1";
    list.onSubmit();
    domInput.value = "task 2";
    list.onSubmit();

    const domTask = document.getElementById('2');
    const editInput = domTask.querySelector('input')
    editInput.value = "edited task 2";
    list.edit(editInput);
    expect(list.todos[1].description).toBe('edited task 2')
  });
});


// Test update one completed task
describe('Update completed task', () => {
  test('should completed one task', () => {
    const list = new Todos();
    list.todos = []
    domInput.value = "task 1";
    list.onSubmit();
    domInput.value = "task 2";
    list.onSubmit();
    const domTask = document.getElementById('1');
    const id = domTask.querySelector('input[type="checkbox"]');
    id.checked = true;
    list.onCompleate(id)
    expect(list.todos[0].completed).toBe(true);
  });

  test('should completed one task', () => {
    const list = new Todos();
    list.todos = []
    domInput.value = "task 1";
    list.onSubmit();
    domInput.value = "task 2";
    list.onSubmit();
    const domTask = document.getElementById('2');
    const id = domTask.querySelector('input[type="checkbox"]');
    id.checked = true;
    list.onCompleate(id)
    expect(list.todos[1].completed).toBe(true);
  })
})



