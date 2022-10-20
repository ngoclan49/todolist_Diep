let newListTask = [];
let listTaskDone = [];
let elementNewTask = document.getElementById('newTask');
let elementUL = document.getElementById('todo');
let elementULComplete = document.getElementById('completed');

function addTask() {
  if (elementNewTask.value !== '') {
    newListTask.push(elementNewTask.value);
    localStorage.setItem('listArray', JSON.stringify(newListTask));
    elementNewTask.value = '';
    showListTodo();
  } else {
    alert('This field is required');
  }
}

function showListTodo() {
  if (localStorage.getItem('listArray')) {
    var str = '';
    newListTask = JSON.parse(localStorage.getItem('listArray'));
    newListTask.forEach((task, index) => {
      str += `
              <li>
                  <span>${task}</span>
                  <div class="buttons">
                      <button class="remove" data-index="0" data-status="todo" onclick="deleteToDo(${index})">
                          <i class="fa fa-trash-alt"></i>
                      </button>
                      <button class="complete" data-index="0" data-status="todo" onclick="completeToDo(${index})">
                          <i class="far fa-check-circle"></i>
                          <i class="fas fa-check-circle"></i>
                      </button>
                  </div>
              </li>
              `;
    });
    elementUL.innerHTML = str;
  }
}

function deleteToDo(index) {
  let newIndex = newListTask.findIndex(
    (item, itemIndex) => itemIndex === index
  );
  if (newIndex !== -1) {
    newListTask.splice(newIndex, 1);
    localStorage.setItem('listArray', JSON.stringify(newListTask));
    showListTodo();
  }
}

function completeToDo(index) {
  let listTaskTodo = JSON.parse(localStorage.getItem('listArray'));
  let newIndex = listTaskTodo.findIndex(
    (item, itemIndex) => itemIndex === index
  );
  if (newIndex !== -1) {
    listTaskDone.push(listTaskTodo[newIndex]);
    listTaskTodo.splice(newIndex, 1);
    localStorage.setItem('listArray', JSON.stringify(listTaskTodo));
    showListTodo();
    localStorage.setItem('listTaskDone', JSON.stringify(listTaskDone));
    showListDone();
  }
}

function showListDone() {
  if (localStorage.getItem('listTaskDone')) {
    var str = '';
    listTaskDone = JSON.parse(localStorage.getItem('listTaskDone'));
    listTaskDone.forEach((task, index) => {
      str += `
              <li>
                  <span>${task}</span>
                  <div class="buttons">
                      <button class="remove" data-index="0" data-status="todo" onclick="deleteToDo(${index})">
                          <i class="fa fa-trash-alt"></i>
                      </button>
                      <button class="complete" data-index="0" data-status="todo" onclick="completeToDo(${index})">
                          <i class="far fa-check-circle"></i>
                          <i class="fas fa-check-circle"></i>
                      </button>
                  </div>
              </li>
              `;
    });
    elementULComplete.innerHTML = str;
  }
}
