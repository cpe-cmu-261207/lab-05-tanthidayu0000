const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");
let sequence = true;

inputAdd.onkeyup = (event) => {
  sequence = true;
  if (event.key !== "Enter") {
    return;
  } else if (event.key === "Enter") {
    console.log(inputAdd.value);
    if (inputAdd.value === "") {
      alert("Todo cannot be empty");
    } else {
      addTodo(inputAdd.value, false);
      inputAdd.value = "";
    }
  }

  saveTodo();
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";
  doneBtn.style.display = "none";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";
  deleteBtn.style.display = "none";

  //append todo to HTML...
  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  if (sequence === true) {
    todoCtn.prepend(div);
  } else {
    todoCtn.appendChild(div);
  }

  //define buttons event...
  div.onmouseover = () => {
    deleteBtn.style.display = "";
    doneBtn.style.display = "";
  };

  div.onmouseout = () => {
    deleteBtn.style.display = "none";
    doneBtn.style.display = "none";
  };

  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };

  doneBtn.onclick = () => {
    if (completed == false) {
      completed = true;
    } else if (completed == true) {
      completed = false;
    }
    span.style.textDecoration = completed ? "line-through" : "";
    saveTodo();
  };
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    todoObj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.push(todoObj);

    const dataStr = JSON.stringify(data);
    localStorage.setItem("todoListData", dataStr);
  }
  console.log(data);
}

function loadTodo() {
  sequence = false;
  const dataStr = localStorage.getItem("todoListData");
  const data = JSON.parse(dataStr);

  for (const todoObj of data) {
    addTodo(todoObj.title, todoObj.completed);
  }
}

loadTodo();
