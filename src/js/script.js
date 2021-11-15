var newTaskList = document.querySelector('#js-newTaskList'),
    newTaskEntry = document.querySelector('#js-newTaskEntry'),
    addBtn = document.querySelector('js-addNewTask');

function addTask() {
  var li = document.createElement('li');
  var checkbox = document.createElement('input');
  var txt = document.createTextNode(newTaskEntry.value);
  var closeBtn = document.createElement('span');

  closeBtn.className = "close-Button";
  checkbox.type = "checkbox";
  li.appendChild(checkbox);
  li.appendChild(txt);
  li.appendChild(closeBtn);
  newTaskList.appendChild(li);

  // Clear input value
  newTaskEntry.value = '';
}

function removeTask() {
  document.addEventListener('click', function(){
    var closeButtons = document.querySelectorAll('#js-newTaskList > li > span');
    for (let i in closeButtons) {
      closeButtons[i].onclick = function() {
        closeButtons[i].parentNode.remove()
      }
    }
  })
}

removeTask();