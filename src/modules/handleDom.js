import editSrc from '../assets/three-dots-svgrepo-com.svg';
import removeSrc from '../assets/bin-svgrepo-com.svg';

const todoList = document.getElementById('todo-list-content');

export const appendTodoElement = (task, list) => {
  const todoElement = document.createElement('li');
  todoElement.className = 'todo-item';

  const edit = new Image();
  edit.src = editSrc;
  edit.className = 'edit-icon';
  edit.setAttribute('data-index', task.index);
  edit.setAttribute('draggable', 'false');

  const remove = new Image();
  remove.src = removeSrc;
  remove.className = 'remove-icon icon-hidden';
  remove.setAttribute('data-index', task.index);
  remove.setAttribute('draggable', 'false');
  remove.addEventListener('click', (e) => {
    e.preventDefault();
    list.removeTask(task.index - 1);
  });
  remove.addEventListener('dragstart', (e) => {
    e.preventDefault();
    console.log('dragstart');
  });

  todoElement.setAttribute('data-index', task.index);
  todoElement.innerHTML = `<div class="todo-item-content"> <input class="checkbox" data-index=${
    task.index
  } type="checkbox" ${
    task.completed ? 'checked' : ''
  } /> <span> <textarea class="todo-description ${task.completed ? 'completed' : ''}" data-index=${
    task.index
  } rows="1" maxlength="100">${task.description}</textarea> </span> </div>`;

  todoElement.appendChild(remove);
  todoElement.appendChild(edit);
  todoList.appendChild(todoElement);
};

const deleteClearButton = () => {
  if (document.getElementById('clear-completed') === null) return;
  const clearCompleted = document.getElementById('clear-completed');
  clearCompleted.parentNode.removeChild(clearCompleted);
};

export const clearTodoList = () => {
  todoList.innerHTML = '';
  deleteClearButton();
};

const toggleHiddenIcon = (event, task) => {
  task.classList.toggle('editing');
  const { index } = event.target.dataset;
  const listTag = document.querySelector(`li[data-index="${index}"]`);
  listTag.classList.toggle('editing');
  const removeIcon = document.querySelector(`.remove-icon[data-index="${index}"]`);
  const editIcon = document.querySelector(`.edit-icon[data-index="${index}"]`);
  setTimeout(() => {
    removeIcon.classList.toggle('icon-hidden');
    editIcon.classList.toggle('icon-hidden');
  }, 1000);
};

export const implementEdit = (Todo) => {
  const todoEditData = document.querySelectorAll('.todo-description');
  todoEditData.forEach((task) => {
    task.addEventListener('input', (e) => {
      const index = e.target.dataset.index - 1;
      Todo.editTask(index, e.target.value);
    });
    task.addEventListener('focusin', (e) => {
      toggleHiddenIcon(e, task);
    });
    task.addEventListener('focusout', (e) => {
      toggleHiddenIcon(e, task);
    });
  });
};

export const createClearCompletedElement = (Todo) => {
  const clearCompleted = document.createElement('button');
  clearCompleted.id = 'clear-completed';
  clearCompleted.textContent = 'Clear all completed';
  document.getElementById('todo-list-container').appendChild(clearCompleted);
  clearCompleted.addEventListener('click', () => {
    Todo.filterCompleted();
  });
};

export default {
  appendTodoElement,
  clearTodoList,
  implementEdit,
  createClearCompletedElement,
};
