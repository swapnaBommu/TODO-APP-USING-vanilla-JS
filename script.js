const input = document.getElementById("input");
const app = document.getElementById("app");
const listContainer = document.getElementById("list-container");

const itemsLeftElement = document.querySelector("#items-left");
let todos = [];

// Check if todos exist in local storage
// if (localStorage.getItem("todos")) {
//   todos = JSON.parse(localStorage.getItem("todos"));
//   renderTodoList();
// }

function addTodo() {
  if (input.value === "") {
    alert("Add the description for todo");
  } else {
    todos.push(input.value);

    let li = document.createElement("li");
    li.innerHTML = input.value;
    listContainer.appendChild(li);
    let img = document.createElement("img");
    img.src = "./images/cross.png";
    li.appendChild(img);
    updateItemsLeft();
  }
  input.value = "";
  saveData();
}
//to get the length of todos
const updateItemsLeft = () => {
  itemsLeftElement.textContent = todos.length;
  saveData();
};

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "IMG") {
      e.target.parentElement.remove();
      todos.splice(0, 1);
      updateItemsLeft();
      saveData();
    }
  },
  false
);

//adding keyboard control to add todo
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && input.value.trim() !== "") {
    addTodo();
  }
});

//to store data in local storage
function saveData() {
  localStorage.setItem("todos", listContainer.innerHTML);
}

//to display the data
function show() {
  listContainer.innerHTML = localStorage.getItem("todos");
}
show();
