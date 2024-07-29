import { alert } from "./script.js";
import { generateUUID } from "./script.js";

const todoForm = document.getElementsByTagName("form")[0];
const todoTable = document.getElementsByTagName("tbody")[0];
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filteredTodos = todos;

function NewTask(id,title,completed){
  this.id = id
  this.title = title
  this.completed = completed
}

document.getElementById("Complete").addEventListener("click", (event) => {
  filteredTodos = todos.filter((item) => item.completed === true);
  renderTodos(filteredTodos);
});

document.getElementById("Incomplete").addEventListener("click", (event) => {
  filteredTodos = todos.filter((item) => item.completed === false);
  renderTodos(filteredTodos);
});

document.getElementById("All").addEventListener("click", (event) => {
  filteredTodos = todos;
  renderTodos(filteredTodos);
});

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
    const newTodo = new NewTask(generateUUID(),taskValue,false)
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    filteredTodos = todos;
    renderTodos(filteredTodos);
    todoForm.reset();
  }
});

todoTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const taskID = event.target.parentElement.parentElement.getAttribute("data-id");
    todos = todos.filter((item) => item.id !== taskID);
    filteredTodos = todos;
    renderTodos(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(todos));
  } else if (event.target.classList.contains("complete-btn")) {
    const taskID = event.target.parentElement.parentElement.getAttribute("data-id");
    todos.forEach((item) => {
      if (item.id === taskID) {
        item.completed = !item.completed;
      }
    });
    filteredTodos = todos;
    renderTodos(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});

function renderTodos(list) {
  todoTable.innerHTML = "";
  list.forEach((item) => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", item.id);
    row.innerHTML = `
        <td>${item.completed ? "<del>" + item.title + "</del>" : item.title}</td>
        <td>${item.completed ? "Completed" : "Not Completed"}</td>
        <td><button class="complete-btn">${item.completed ? "Redo" : "Done"}</button><button class="delete-btn">Delete</button></td>
        `;
    todoTable.appendChild(row);
  });
}


renderTodos(filteredTodos);
