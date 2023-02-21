import editSrc from '../assets/three-dots-svgrepo-com.svg';
import removeSrc from '../assets/bin-svgrepo-com.svg';

const todoList = document.getElementById('todo-list-content');

export const appendTodoElement = (todo, list) => {
  const todoElement = document.createElement('li');
  todoElement.className = 'todo-item';

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
  } /> <span> <textarea class="todo-description" data-index=${
    todo.index
  } rows="1" maxlength="100">${todo.description}</textarea> </span> </div>`;

  todoElement.appendChild(remove);
  todoElement.appendChild(edit);
  todoList.appendChild(todoElement);
};

export const clearTodoList = () => {
  todoList.innerHTML = '';
};

export const implementEdit = (list) => {
  const todoEditData = document.querySelectorAll('.todo-description');
  todoEditData.forEach((todo) => {
    todo.addEventListener('input', (e) => {
      const index = e.target.dataset.index - 1;
      list.editTask(index, e.target.value);
    });
  });
};

export default { appendTodoElement, clearTodoList, implementEdit };
