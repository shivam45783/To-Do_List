document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
      return renderTask(task)
  });
  // tasks.array.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", function () {
    const taskText = todoInput.value.trim(); //Grab the text in the text box
    //trim function removes extra spaces at the end after the text is written
    if (taskText.length === 0) {
      return;
    } // get out of the function if the text box is empty

    const newTask = {
      id: Date.now(), //this gives the current time past from epoch
      text: taskText,
      completed: false,
    };
    tasks.push(newTask)
    saveTasks()
    renderTask(newTask)
    todoInput.value = "";
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id',task.id)
    if(task.completed) {
      li.classList.add('completed')
    }
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;
    
    li.addEventListener('click', (event)=>{
      if (event.target.tagName === 'BUTTON') return
      task.completed = !task.completed
      li.classList.toggle('completed')
      saveTasks()
    })
    li.querySelector('button').addEventListener('click', (event)=>{
      event.stopPropagation() //prevent toggle from firing
      tasks = tasks.filter((t) => t.id != task.id )
      li.remove()
      saveTasks()
    })

    todoList.appendChild(li)
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
