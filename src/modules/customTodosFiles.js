const btnSubmit = document.querySelector(".btn-submit");
const todoItemsDes = document.querySelectorAll(".todo-des");
const filterButton = document.querySelector(".btn-clear-all");

export default class Todos {
  constructor() {
    if (localStorage.getItem("todos")) {
      this.todos = JSON.parse(localStorage.getItem("todos"));
    } else {
      this.todos = [];
    }
  }

  sortAndSave = () => {
    const todoArr = [...this.todos];
    // sorting the list
    todoArr.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      }
      if (a.index < b.index) {
        return -1;
      }
      return 0;
    });

    // rearrange the index
    let index = 0;
    todoArr.forEach((todo) => {
      index += 1;
      todo.index = index;
    });

    this.todos = [...todoArr];
    localStorage.setItem("todos", JSON.stringify(this.todos));
  };

  // Render todo list
  render = () => {
    const todoContainer = document.querySelector(".todo-items-gropu");
    const showMsg = document.querySelector(".display-message");

    todoContainer.innerHTML = "";
    showMsg.innerText = "";
    showMsg.classList.remove("form-error");
    this.sortAndSave();
    if (this.todos.length > 0) {
      this.todos.forEach((todo) => {
        // create todo item
        const todoItem = document.createElement("li");
        todoItem.id = todo.index;
        todoItem.className = "todo-item";
        todoItem.setAttribute("draggable", true);

        // drag and drop function;
        todoItem.addEventListener("dragstart", () => {
          todoItem.classList.add("dragging");
        });

        todoItem.addEventListener("dragend", () => {
          todoItem.classList.remove("dragging");
        });

        // todo checkbox
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.id = "todo-compleate";

        checkbox.addEventListener("change", (e) => {
          this.onCompleate(e);
        });

        // todo description
        const todoDes = document.createElement("p");
        todoDes.className = "todo-des";
        todoDes.innerText = todo.description;

        if (todo.completed) {
          checkbox.setAttribute("checked", "yes");
          todoDes.classList.add("todo-compleated");
        }

        // todo Three dot button
        const threeDotButton = document.createElement("button");
        threeDotButton.className = "btn-three-dot";

        // add event on three icon for edit and delete.
        threeDotButton.addEventListener("click", (e) => {
          this.onClickTodoDes(e);
        });

        // Append all the todo elements inside the todoItems
        todoItem.append(checkbox, todoDes, threeDotButton);

        // appent the todo item inside todoContainer
        todoContainer.appendChild(todoItem);
      });
    } else {
      todoContainer.innerHTML =
        '<p class="no-item">Your to do list is empty! Please add some!.</p>';
    }
  };

  // onSubmit method
  onSubmit = () => {
    // Validate the form
    const formInput = document.getElementById("description");
    const description = formInput.value;
    const required = true;
    const minLength = 3;
    const maxLength = 255;
    const specialChar = false;
    const isValid = this.validateForm(
      description,
      required,
      minLength,
      maxLength,
      specialChar
    );

    // Check if form has error or not
    const showMsg = document.querySelector(".display-message");

    if (isValid.isError === true && isValid.msg.length >= 0) {
      showMsg.classList.add("form-error");
      showMsg.textContent = isValid.msg;
      formInput.classList.add("invalid");
    } else {
      // if form is empty add a new todo
      showMsg.classList.remove("form-error");
      showMsg.textContent = "";
      formInput.classList.remove("invalid");
      formInput.value = "";
      const index = this.todos.length + 1 || 1;
      const todo = {
        description,
        completed: false,
        index,
      };
      this.todos = [...this.todos, todo];
      // render the new todos on the dom
      this.render();
    }
  };

  delete = (index) => {
    this.todos = this.todos.filter((t) => t.index.toString() !== index);
    this.render();
  };

  // edit todo
  edit = (e) => {
    const value  = e.value;

      e.classList.remove("invalid-edit");
      const index = e.parentElement.id;
      const newArr = [...this.todos];
      const indx = newArr.findIndex((item) => index === item.index.toString());
      if (indx >= 0) {
        newArr[indx].description = value;
      }
      this.todos = [...newArr];
      this.render();
  };

  // onClickDes enent method
  onClickTodoDes = (e) => {
    // target.outerHTML = document.createElement('textarea');
    const parent = e.target.parentElement.parentElement;
    const getTotodes = parent.querySelector(".todo-des").innerText;
    parent.innerHTML = "";

    // todo checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.id = "todo-compleate";

    checkbox.addEventListener("change", (e) => {
      this.onCompleate(e);
    });

    // todo description
    const todoEditInput = document.createElement("input");
    todoEditInput.setAttribute("type", "text");
    todoEditInput.setAttribute("value", getTotodes);
    todoEditInput.className = "todo-edit-input";

    // Add event on keypress in the textarea
    todoEditInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.edit(e);
      } else {
        showMsg.classList.remove("form-error");
        showMsg.innerText = "";
        e.target.classList.remove("invalid-edit");
      }
    });

    // todo Delete dot button
    const deleteTodo = document.createElement("button");
    deleteTodo.className = "btn-delete";
    deleteTodo.innerHTML = `<img src="${deleteIcon}" alt="X">`;

    // adding event on delete icon
    deleteTodo.addEventListener("click", () => {
      const index = parent.id;
      this.delete(index);
    });

    parent.append(checkbox, todoEditInput, deleteTodo);
  };

  onCompleate = (e) => {
    const index = e.parentElement.id;
    const newArr = [...this.todos];
    const indx = newArr.findIndex((item) => index === item.index.toString());
    if (indx >= 0) {
      newArr[indx].completed = !newArr[indx].completed;
    }
    this.todos = [...newArr];
    this.render();
  };

  onFilterCompletedTodos = () => {
    let newArr = [...this.todos];
    newArr = newArr.filter((item) => item.completed !== true);
    this.todos = [...newArr];
    this.render();
  };

  validateForm = (
    str, required = false, minLength = 0, maxLength = 0, specialChar = true,
  ) => {
    let isError = false;
    let msg = '';
    str = str.trim();
    const len = str.length;

    if (required) {
      if (str.length <= 0) {
        isError = true;
        msg = 'This is a required field!';
        return { isError, msg };
      }
    }

    if (minLength > 0) {
      if (len < minLength) {
        isError = true;
        msg = `The minimum number of characters to enter as todo is ${minLength}`;
        return { isError, msg };
      }
    }

    if (maxLength > 0) {
      if (len > maxLength) {
        isError = true;
        msg = `The bare minimum of characters required for todo entry is ${maxLength}`;
        return { isError, msg };
      }
    }

    if (!specialChar) {
      const newStr = str.replace(/\s/g, '');
      const re = /^[A-Za-z][A-Za-z0-9-_.]*$/;
      if (!re.test(newStr)) {
        isError = true;
        msg = 'This field only accepts A-z0-9_.- characters and the first character should be A to z';
        return { isError, msg };
      }
    }
    return { isError, msg };
  };


}
