const formTodo = document.querySelector(".todo_form");
const input = document.querySelector("#todo_input");
const todoList = document.querySelector("#todo-list");

const configuration = () => {
   const todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos) {
     localStorage.setItem("todos", JSON.stringify([]));
  } else {
     todos.forEach(todo => {
      todoHTML(todo);
     });
  } 
}

const addTodo = (e) => {
  e.preventDefault();

  const inputVal = input.value;

  if (inputVal == "") {
    $(".error").toast("show");
    return false 
  }

  const todo = {
    text: inputVal,
    isDone: false,
 };

 const todos = JSON.parse(localStorage.getItem("todos"));
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  todoHTML(todo);
  $(".success").toast("show");
  formTodo.reset();
  
};

const doneTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.children[0].textContent;

   let todos = JSON.parse(localStorage.getItem("todos"));
  
  todos.forEach(td => {
     if (td.text === text) td.isDone = !td.isDone 
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}


const deleteTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[0].textContent;

  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter(td => td.text != text);
  localStorage.setItem("todos", JSON.stringify(todos));
  
  todo.remove();
  
};

const todoHTML = (todo) => {

   const todoLi = document.createElement("li")
  todoLi.classList.add("list-group-item")

  const todoRow = document.createElement("div")
  todoRow.classList.add("row", "justify-content-center")

  const todoCol6 = document.createElement("div")
  todoCol6.classList.add("col-md-6","offset-md-2")
  
  const inputGroup = document.createElement("div")
  
  const inputTextGroup = document.createElement("div")
  inputTextGroup.classList.add("col-md-10", "todo-text")
    
  const inputCheckbox = document.createElement("input")
  inputCheckbox.type = "checkbox"
  inputCheckbox.checked = todo.isDone
  inputCheckbox.addEventListener("click", doneTodo)

  const todoCol4 = document.createElement("div")
  todoCol4.classList.add("col-md-1")
 
  const todoText = document.createElement("span")
  todoText.textContent = todo.text;
  
  const todoDelBtn = document.createElement("button")
  todoDelBtn.classList.add("btn", "btn-danger")
  todoDelBtn.textContent = "Sil"
  todoDelBtn.addEventListener("click", deleteTodo)

  todoLi.appendChild(todoRow) 
  
  todoRow.appendChild(todoCol6)
  todoRow.appendChild(todoCol4)
  
  todoCol6.appendChild(inputGroup) 
  todoCol4.appendChild(todoDelBtn)
  inputGroup.appendChild(inputTextGroup)
  inputTextGroup.appendChild(inputCheckbox)

  inputTextGroup.appendChild(todoText)
  
  todoList.appendChild(todoLi)

}

configuration();

formTodo.addEventListener("submit", addTodo);


