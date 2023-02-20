import './styles/style.css';
import refreshSrc from './assets/refresh-svgrepo-com.svg';
import editSrc from './assets/three-dots-svgrepo-com.svg';
import enterSrc from './assets/arrow-enter-svgrepo-com.svg';

const refreshIcon = document.querySelector('#refresh');
const todoList = document.getElementById('todo-list-content');
const enterButton = document.getElementById('enter-Button');

const listData = [
  {
    index: 3,
    description: 'Do the dishes',
    completed: false,
  },
  {
    index: 2,
    description: 'Do the laundry',
    completed: true,
  },
  {
    index: 6,
    description: 'Do the homework',
    completed: true,
  },
  {
    index: 1,
    description: 'Do the shopping',
    completed: false,
  },
  {
    index: 23,
    description: 'Do the cleaning',
    completed: true,
  },
  {
    index: 10,
    description: 'Do the cooking',
    completed: false,
  },
  {
    index: 13,
    description: 'Do the gardening',
    completed: false,
  },
];

const imageRefresh = new Image();
imageRefresh.src = refreshSrc;
imageRefresh.className = 'reload-icon';
refreshIcon.appendChild(imageRefresh);

const sortListByIndex = () => {
  listData.sort((a, b) => a.index - b.index);
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

const loadEnterIcon = () => {
  enterButton.src = enterSrc;
  enterButton.alt = 'Enter';
};

window.onload = () => {
  displayList();
  loadEnterIcon();
};
