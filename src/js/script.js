var newTaskList = document.querySelector('#js-newTaskList'),
    newTaskEntry = document.querySelector('#js-newTaskEntry'),
    addBtn = document.querySelector('js-addNewTask');

// TODO

var globalCounter = 0;
var taskList = [];

class Task {
  constructor(title) {
    this.id = globalCounter++;
    this.title = title || '';
    this.display = true;
    this.type = 'task'
  }

  updateTitle(value) {
    this.title = value;
  }

  updateDisplay(value) {
    this.display = value;
  }
}

var task1 = new Task('Task 1', true)
var task2 = new Task('Task 2', true)


taskList.push(task1)
taskList.push(task2)

renderTaskList()

function addTask() {
  var taskItem = new Task(newTaskEntry.value);
  // Clear input value
  newTaskEntry.value = '';
  taskList.push(taskItem);
  renderTaskList();
}

function removeTask() {
  var targetID;

  newTaskList.onclick = function(e) {
    if (e.target && e.target.className === "close-button") {
      targetID = e.target.parentNode.dataset.id;
      e.target.parentNode.dataset.display = false;

      for (let x in taskList) {
        if (taskList[x].id == targetID) {
          taskList[x].updateDisplay(false)
        }
      }

      renderTaskList()
    }
  }
}

function updateTask() {
  var targetID;

  newTaskList.onclick = function(e) {
    if (e.target && e.target.className === "update-button") {
      targetID = e.target.parentNode.dataset.id;

      for (let x in taskList) {
        if (taskList[x].id == targetID) {
          taskList[x].updateTitle(document.querySelector(`[data-id="${targetID}"] > .task-title-field`).value);
        }
      }
      renderTaskList()
      console.log(taskList)
    }
  }
}

function renderTaskList() {
  newTaskList.innerHTML = '';

  taskList.forEach(item => {
    let li = document.createElement('li')
    let checkbox = document.createElement('input');
    let taskTitlefield = document.createElement('input');
    let updateBtn = document.createElement('button');
    let closeBtn = document.createElement('span');
    li.dataset.id = item.id;
    li.dataset.display = item.display;
    li.dataset.type = item.type;

    if (item.display == true) {
      closeBtn.className = "close-button";
      checkbox.type = "checkbox";
      updateBtn.textContent = "update";
      updateBtn.className = "update-button";
      taskTitlefield.className = "task-title-field";
      taskTitlefield.value = item.title;

      
      li.appendChild(checkbox);
      li.appendChild(taskTitlefield);
      li.appendChild(updateBtn);
      li.appendChild(closeBtn);

      newTaskList.appendChild(li);

    }
  })
}

removeTask()
updateTask()