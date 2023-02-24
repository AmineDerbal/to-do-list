const todoList = document.getElementById('todo-list-content');

export const appendTodoElement = (task, todo) => {
  const todoElement = document.createElement('li');
  todoElement.className = 'todo-item';
  todoElement.draggable = true;

  const edit = document.createElement('i');
  edit.className = ' fas fa-solid fas fas fa-ellipsis-v edit-icon';
  edit.setAttribute('data-index', task.index);

  const remove = document.createElement('i');
  remove.className = 'remove-icon icon-hidden fas fa-solid fa-trash';
  remove.setAttribute('data-index', task.index);
  remove.setAttribute('draggable', 'false');
  remove.addEventListener('click', (e) => {
    e.preventDefault();
    todo.list = todo.removeTask(task.index - 1);
    todo.renderList();
  });

  todoElement.setAttribute('data-index', task.index);
  todoElement.innerHTML = `<div class="todo-item-content"> <input class="checkbox" data-index=${
    task.index
  } type="checkbox" ${
    task.completed ? 'checked' : ''
  } /> <span draggable = false> <textarea draggable=false class="todo-description ${
    task.completed ? 'completed' : ''
  }" data-index=${task.index} rows="1" maxlength="100">${
    task.description
  }</textarea> </span> </div>`;

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

export const implementEdit = (todo) => {
  const todoEditData = document.querySelectorAll('.todo-description');
  todoEditData.forEach((task) => {
    task.addEventListener('input', (e) => {
      const index = e.target.dataset.index - 1;
      todo.list = todo.editTask(index, e.target.value);
      todo.saveList();
    });
    task.addEventListener('focusin', (e) => {
      toggleHiddenIcon(e, task);
    });
    task.addEventListener('focusout', (e) => {
      toggleHiddenIcon(e, task);
    });
  });
};

export const createClearCompletedElement = (todo) => {
  const clearCompleted = document.createElement('button');
  clearCompleted.id = 'clear-completed';
  clearCompleted.textContent = 'Clear all completed';
  document.getElementById('todo-list-container').appendChild(clearCompleted);
  clearCompleted.addEventListener('click', () => {
    todo.list = todo.filterCompleted();
    todo.renderList();
  });
};

export default {
  appendTodoElement,
  clearTodoList,
  implementEdit,
  createClearCompletedElement,
};
