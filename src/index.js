import './styles/style.css';
import refreshSrc from './assets/refresh-svgrepo-com.svg';
import enterSrc from './assets/arrow-enter-svgrepo-com.svg';
import Todo from './modules/Todo.js';
import { checkLocalStorage, loadLocalStorage } from './modules/data.js';
import Task from './modules/Task.js';

const refreshIcon = document.querySelector('#refresh');
const submitFormButton = document.getElementById('enter-Button');
const taskInput = document.getElementById('add-task-text');

const createTodoList = () => {
  let todoListData;
  if (checkLocalStorage()) {
    todoListData = new Todo(loadLocalStorage());
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

const submitTask = () => {
  if (taskInput.value !== '') {
    todoListData.addTask(new Task(taskInput.value));
    taskInput.value = '';
  }
};

const loadEnterIcon = () => {
  submitFormButton.src = enterSrc;
  submitFormButton.alt = 'Enter';
  submitFormButton.addEventListener('click', submitTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitTask();
    }
  });
};

window.onload = () => {
  loadEnterIcon();
};
