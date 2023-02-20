import editSrc from '../assets/three-dots-svgrepo-com.svg';

const todoList = document.getElementById('todo-list-content');

export const appendTodoElement = (todo) => {
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

export const clearTodoList = () => {
  todoList.innerHTML = '';
};

export default { appendTodoElement, clearTodoList };
