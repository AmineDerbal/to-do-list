import editSrc from '../assets/three-dots-svgrepo-com.svg';
import removeSrc from '../assets/bin-svgrepo-com.svg';

const todoList = document.getElementById('todo-list-content');

export const appendTodoElement = (todo, list) => {
  const todoElement = document.createElement('li');
  todoElement.className = 'todo-item';

  const todoDescription = document.createElement('span');
  todoDescription.innerHTML = `<span><textarea class="todo-description" rows="1" maxlength="100"> ${todo.description}</textarea></span>`;

  const edit = new Image();
  edit.src = editSrc;
  edit.className = 'edit-icon';

  const remove = new Image();
  remove.src = removeSrc;
  remove.className = 'remove-icon remove-icon-hidden';
  remove.setAttribute('data-index', todo.index);
  remove.addEventListener('click', () => {
    list.removeTask(todo.index - 1);
  });

  todoElement.setAttribute('data-index', todo.index);
  todoElement.innerHTML = `<div class="todo-item-content"> <input class="checkbox" type="checkbox" ${
    todo.completed ? 'checked' : ''
  } /> ${todoDescription.innerHTML} </div>`;
  todoElement.appendChild(remove);
  todoElement.appendChild(edit);
  todoList.appendChild(todoElement);
};

export const clearTodoList = () => {
  todoList.innerHTML = '';
};

export default { appendTodoElement, clearTodoList };
