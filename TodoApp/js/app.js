import { alert } from "./script.js";
import { generateUUID } from "./script.js";
const todoForm = document.getElementsByTagName("form")[0];
const todoTable = document.getElementsByTagName("tbody")[0];
let todos = JSON.parse(localStorage.getItem("todos")) || [];
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
    const newTodo = {
      id: generateUUID(),
      title: taskValue,
      completed: false,
    };
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
    todoForm.reset();
  }
});

todoTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const taskID =
      event.target.parentElement.parentElement.getAttribute("data-id");
    todos = todos.filter((item) => item.id !== taskID);
    renderTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  } else if (event.target.classList.contains("complete-btn")) {
    const taskID =
    event.target.parentElement.parentElement.getAttribute("data-id");
    todos.forEach((item) => {
      if (item.id == taskID) {
        item.completed = !item.completed
        renderTodos(todos)
        localStorage.setItem("todos",JSON.stringify(todos))
      }
    });
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
        <td><button class="complete-btn"">${
          item.completed ? "Redo" : "Done"
        }</button><button class="delete-btn">Delete</button></td>
        `;
    todoTable.appendChild(row);
  });
}
renderTodos(todos);
