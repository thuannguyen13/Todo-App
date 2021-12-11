var taskListPanel = document.querySelector('[data-task-list]');
var taskEntryField = document.querySelector('[data-task-entry-field]');
var taskEntryForm = document.querySelector('[data-task-entry-area]');
var taskEntryButton = document.querySelector('[data-task-entry-submit-button]');
var taskCounterLabel = document.querySelector('[data-task-counter]')

// Global Variable
const LOCALSTORAGE_LIST_KEY = 'list.name';
var taskList = JSON.parse(localStorage.getItem(LOCALSTORAGE_LIST_KEY)) || [];
// var taskList = [];
load()

// localStorage.clear()

function Task(title) {
  this.id = Date.now().toString();
  this.title = title || 'untitled task';
  this.display = true;
}

taskEntryButton.addEventListener('click', function(){
  var taskTitle = taskEntryField.value;
  addTask(taskTitle)
  taskEntryField.value = '';
})

taskEntryForm.addEventListener('click', function(element){
  element.preventDefault();
})

taskListPanel.addEventListener('click', function(element){
  if (element.target && element.target.dataset.closeButton) deleteTask(element)
  if (element.target && element.target.dataset.updateButton) updateTask(element)
})

function addTask(title) { 
  let task = new Task(title);
  taskList.push(task);
  saveAndRender()
}

function updateTask(element) {
  let targetID = element.target.parentNode.dataset.id;
  let newTitle = document.querySelector(`[data-id="${targetID}"] > [data-task-title]`).value
  console.log(findID(targetID, taskList))
  findID(targetID, taskList).title = newTitle
  saveAndRender()
}

function deleteTask(element){
  let targetID = element.target.parentNode.dataset.id;
  findID(targetID, taskList).display = false;
  saveAndRender()
}

function countTask(){
  let listLength = taskList.filter(list => list.display !== false).length;
  taskCounterLabel.textContent = `${listLength} item(s)`
  return listLength;
}

function render() {
  clearElement(taskListPanel)
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

      closeBtn.className = 'button button-ghost button-danger';
      closeBtn.textContent = 'Remove';
      closeBtn.dataset.closeButton = 'close-button';

      updateBtn.textContent = 'Update';
      updateBtn.className = 'button button-ghost update-button';
      updateBtn.dataset.updateButton = 'update-button';


      li.appendChild(checkbox);
      li.appendChild(taskTitlefield);
      li.appendChild(updateBtn);
      li.appendChild(closeBtn);

      taskListPanel.appendChild(li);

    }
  })
  countTask()
  console.log(taskList)
}

function save() {
  localStorage.setItem(LOCALSTORAGE_LIST_KEY, JSON.stringify(taskList));
}

function saveAndRender() {
  save()
  render()
}

function load(){
  taskList = JSON.parse(localStorage.getItem(LOCALSTORAGE_LIST_KEY)) || [];
  console.log("local:" + taskList)
  render()
}

// Helpers

function clearElement(element){
  while (element.firstChild){
    taskListPanel.removeChild(element.firstChild);
  }
}

function findID(id, list){
  for (let i in list) {
    if (list[i].id == id) {
      return list[i]
    }
  }
}
