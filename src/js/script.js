var newTaskList = document.querySelector('#js-newTaskList');
var newTaskEntry = document.querySelector('#js-newTaskEntry');
var addBtn = document.querySelector('#js-addNewTask');
var taskEntryForm = document.querySelector('[data-task-entry-area]');

// Global Variable
var taskList = [];

class Task {
  constructor(title) {
    this.id = Date.now().toString();
    this.title = title || 'untitled task';
    this.display = true;
  }

  updateTitle(value) {
    this.title = value;
  }

  updateDisplay(value) {
    this.display = value;
  }
}

addBtn.addEventListener('click', function(){
  addTask()
})

taskEntryForm.addEventListener('click', function(element){
  element.preventDefault();
})

newTaskList.addEventListener('click', function(element){
  if (element.target && element.target.dataset.closeButton) {
    deleteTask(element)
    render()
  }
  if (element.target && element.target.dataset.updateButton) {
    updateTask(element)
    render()
  }
  
})

function addTask() { 
  var task = new Task(newTaskEntry.value);
  newTaskEntry.value = '';
  taskList.push(task);
  render();
}

function updateTask(element) {
  var targetID = element.target.parentNode.dataset.id;
  for (let x in taskList) {
    if (taskList[x].id == targetID) {
      taskList[x].updateTitle(document.querySelector(`[data-id="${targetID}"] > [data-task-title]`).value);
    }
  }
  render()
}

function deleteTask(element){
  var targetID = element.target.parentNode.dataset.id;
  for (let x in taskList) {
    if (taskList[x].id == targetID) {
      taskList[x].updateDisplay(false)
    }
  }
  render()
}

function render() {
  clearElement(newTaskList)

  taskList.forEach(item => {
    let li = document.createElement('li')
    let checkbox = document.createElement('input');
    let taskTitlefield = document.createElement('input');
    let updateBtn = document.createElement('button');
    let closeBtn = document.createElement('button');
    li.dataset.id = item.id;

    if (item.display == true) {
      checkbox.type = 'checkbox';

      taskTitlefield.className = 'task-title-field';
      taskTitlefield.value = item.title;
      taskTitlefield.dataset.taskTitle = 'taskTitle'

      closeBtn.className = 'button button-ghost close-button';
      closeBtn.textContent = 'remove';
      closeBtn.dataset.closeButton = 'close-button';

      updateBtn.textContent = 'update';
      updateBtn.className = 'button button-ghost update-button';
      updateBtn.dataset.updateButton = 'update-button';

      li.appendChild(checkbox);
      li.appendChild(taskTitlefield);
      li.appendChild(updateBtn);
      li.appendChild(closeBtn);

      newTaskList.appendChild(li);

    }
  })
}

function clearElement(element){
  while (element.firstChild){
    newTaskList.removeChild(element.firstChild);
  }
}

function getElementId(element){

}