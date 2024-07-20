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
    renderTodos();
    todoForm.reset();
  }
});

function renderTodos() {
  todoTable.innerHTML = "";
  todos.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.title}</td>
        <td>${item.completed ? "Completed" : "Not Completed"}</td>
        <td><button class="complete-btn" onclick="toggleCompleted(${
          item.id
        })">Toggle</button><button class="delete-btn" onclick="deleteTodo(${
      item.id
    })">Delete</button></td>
        `;
    todoTable.appendChild(row);
  });
}
renderTodos();
