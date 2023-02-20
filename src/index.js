import './styles/style.css';
import refreshSrc from './assets/refresh-svgrepo-com.svg';
import editSrc from './assets/three-dots-svgrepo-com.svg';
import enterSrc from './assets/arrow-enter-svgrepo-com.svg';
import Todo from './modules/Todo.js';
import { checkLocalStorage } from './modules/data.js';
import Task from './modules/Task.js';

const refreshIcon = document.querySelector('#refresh');
const todoList = document.getElementById('todo-list-content');
const submitFormButton = document.getElementById('enter-Button');
const taskInput = document.getElementById('add-task-text');

const createTodoList = () => {
  let todoListData;
  console.log(checkLocalStorage());
  if (checkLocalStorage()) {
    todoListData = new Todo(JSON.parse(localStorage.getItem('todoListData')));
    todoListData.renderList();
    return todoListData;
  }
  todoListData = new Todo();
  return todoListData;
};

const todoListData = createTodoList();

const imageRefresh = new Image();
imageRefresh.src = refreshSrc;
imageRefresh.className = 'reload-icon';
refreshIcon.appendChild(imageRefresh);

const sortListByIndex = () => {
  todoListData.sort((a, b) => a.index - b.index);
};

const loadTodoElement = (todo) => {
  const todoElement = document.createElement('li');
  todoElement.className = 'todo-item';
  const edit = new Image();
  edit.src = editSrc;
  edit.className = 'edit-icon';
  todoElement.setAttribute('data-index', todo.index);
  todoElement.innerHTML = `<div> <input class="checkbox" type="checkbox" ${
    todo.completed ? 'checked' : ''
  } /> <span> ${todo.description} </span> </div>`;
  todoElement.appendChild(edit);
  todoList.appendChild(todoElement);
};

const displayList = () => {
  sortListByIndex();
  listData.forEach((todo) => {
    loadTodoElement(todo);
  });
};

const submitTask = (e) => {
  e.preventDefault();
  if (taskInput.value !== '') {
    todoListData.addTask(new Task(taskInput.value));
    taskInput.value = '';
  }
};

const loadEnterIcon = () => {
  submitFormButton.src = enterSrc;
  submitFormButton.alt = 'Enter';
  submitFormButton.addEventListener('click', submitTask);
};

window.onload = () => {
  // displayList();
  loadEnterIcon();
};
