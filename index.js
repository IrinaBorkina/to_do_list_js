const addButton = document.getElementById('add');
const inputTask = document.getElementById('new-task');
const unfinishedTasks = document.getElementById('unfinished-tasks');
const finishedTasks = document.getElementById('finished-tasks');

function createNewElement(task) {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('button');
  checkbox.className = 'material-icons checkbox';
  checkbox.innerHTML = '<i class="material-icons">check_box_outline_blank</i>';
  const label = document.createElement('label');
  label.innerText = task;
  const input = document.createElement('input');
  input.type = 'text';
  const editButton = document.createElement('button');
  editButton.className = 'material-icons edit';
  editButton.innerHTML = '<i class="material-icons">edit</i>';
  const deleteButton = document.createElement('button');
  deleteButton.className = 'material-icons delete';
  deleteButton.innerHTML = '<i class="material-icons">delete</i>';

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(input);
  listItem.appendChild(deleteButton);
  listItem.appendChild(editButton);

  return listItem;
}

function deleteTask() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

function editTask() {
  const editButton = this;
  const listItem = this.parentNode;
  const label = listItem.querySelector('label');
  const input = listItem.querySelector('input');

  const containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    label.innerText = input.value;
    editButton.className = 'material-icons edit';
    editButton.innerHTML = '<i class="material-icons">edit</i>';
  } else {
    input.value = label.innerText;
    editButton.className = 'material-icons save';
    editButton.innerHTML = '<i class="material-icons">save</i>';
  }

  listItem.classList.toggle('editMode');
}

function bindTaskEvents(listItem, checkboxEvent) {
  const checkbox = listItem.querySelector('button.checkbox');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  checkbox.onclick = checkboxEvent;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
}

function unfinishTask() {
  const listItem = this.parentNode;
  const checkbox = listItem.querySelector('button.checkbox');
  checkbox.className = 'material-icons checkbox';
  checkbox.innerHTML = '<i class="material-icons">check_box_outline_blank</i>';

  unfinishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, finishTask);
}

function finishTask() {
  const listItem = this.parentNode;
  const checkbox = listItem.querySelector('button.checkbox');
  checkbox.className = 'material-icons checkbox';
  checkbox.innerHTML = '<i class="material-icons">check_box</i>';

  finishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, unfinishTask);
}


function addTask() {
  if (inputTask.value) {
    const listItem = createNewElement(inputTask.value);
    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
    inputTask.value = '';
  }
}

addButton.onclick = addTask;
