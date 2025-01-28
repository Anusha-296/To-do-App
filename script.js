document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve tasks from localStorage or initialize as an empty array

  // Render tasks
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task-item";

      const taskText = document.createElement("span");
      taskText.textContent = task;
      taskText.contentEditable = false;

      const actions = document.createElement("div");
      actions.className = "actions";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
      editBtn.addEventListener("click", () => editTask(index, taskText));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => deleteTask(index));

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(taskText);
      li.appendChild(actions);

      taskList.appendChild(li);
    });
  }

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add task
  function addTask() {
    const task = taskInput.value.trim();
    if (task) {
      tasks.push(task);
      taskInput.value = "";
      saveTasks();
      renderTasks();
    } else {
      alert("Please enter a task.");
    }
  }

  // Edit task
  function editTask(index, taskTextElement) {
    const isEditing = taskTextElement.contentEditable === "true";
    if (isEditing) {
      tasks[index] = taskTextElement.textContent.trim();
      taskTextElement.contentEditable = false;
      saveTasks();
    } else {
      taskTextElement.contentEditable = true;
      taskTextElement.focus();
    }
  }

  // Delete task
  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  // Event listeners
  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Initial rendering
  renderTasks();
});


