import { alert } from "./script.js";
import { generateUUID } from "./script.js";

const todoForm = document.getElementsByTagName("form")[0];
const todoTable = document.getElementsByTagName("tbody")[0];
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filteredTodos = todos;

class Main {
  constructor(form, table, todos, filteredTodos) {
    this.form = form;
    this.table = table;
    this.todos = todos;
    this.filteredTodos = filteredTodos;
  }
  renderTodos(list) {
    this.table.innerHTML = "";
    list.forEach((item) => {
      const row = document.createElement("tr");
      row.setAttribute("data-id", item.id);
      row.innerHTML = `
          <td>${
            item.completed ? "<del>" + item.title + "</del>" : item.title
          }</td>
          <td>${item.completed ? "Completed" : "Not Completed"}</td>
          <td><button class="complete-btn">${
            item.completed ? "Redo" : "Done"
          }</button><button class="delete-btn">Delete</button></td>
          `;
      todoTable.appendChild(row);
    });
  }
  addTodo(text) {
    const newTask = {
      id: generateUUID(),
      title: text,
      completed: false,
    };
    this.todos.push(newTask);
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this.filteredTodos = this.todos;
    this.renderTodos(this.todos);
    this.form.reset();
  }
  deleteTodo(taskid) {
    this.todos = this.todos.filter((item) => item.id !== taskid);
    this.filteredTodos = this.todos;
    this.renderTodos(this.filteredTodos);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  changeStatusTodo(taskid) {
    this.todos.forEach((item) => {
      if (item.id === taskid) {
        item.completed = !item.completed;
      }
    });
    this.filteredTodos = this.todos;
    this.renderTodos(this.filteredTodos);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}

const mainObject = new Main(todoForm, todoTable, todos, filteredTodos);

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskValue = event.target.task.value;
  if (taskValue.trim() === "") {
    alert(
      "Error",
      "Task cannot be empty",
      "error",
      "ok",
      ".my-title-class-error"
    );
    todoForm.reset();
    return;
  } else {
    mainObject.addTodo(taskValue);
  }
});

mainObject.renderTodos(todos);

document.getElementById("Complete").addEventListener("click", (event) => {
  filteredTodos = todos.filter((item) => item.completed === true);
  mainObject.renderTodos(filteredTodos);
});

document.getElementById("Incomplete").addEventListener("click", (event) => {
  filteredTodos = todos.filter((item) => item.completed === false);
  mainObject.renderTodos(filteredTodos);
});

document.getElementById("All").addEventListener("click", (event) => {
  filteredTodos = todos;
  mainObject.renderTodos(filteredTodos);
});

todoTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const taskID =
      event.target.parentElement.parentElement.getAttribute("data-id");
    mainObject.deleteTodo(taskID);
  } else if (event.target.classList.contains("complete-btn")) {
    const taskID =
      event.target.parentElement.parentElement.getAttribute("data-id");
    mainObject.changeStatusTodo(taskID);
  }
});
