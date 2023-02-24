const swapItems = (fromIndex, toIndex, todo) => {
  const itemOne = todo.list[fromIndex - 1].index;
  const itemTwo = todo.list[toIndex - 1].index;
  todo.list[fromIndex - 1].index = itemTwo;
  todo.list[toIndex - 1].index = itemOne;
  todo.saveList();
  todo.renderList();
};

export const dragInteraction = (todo) => {
  let dragStartIndex;
  const draggables = document.querySelectorAll('.todo-item');
  const dragListItems = document.querySelectorAll('#todo-list-content li');
  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', (e) => {
      dragStartIndex = +e.target.closest('li').getAttribute('data-index');
    });
  });
  dragListItems.forEach((item) => {
    item.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    item.addEventListener('dragenter', (e) => {
      const parent = e.target.closest('li');
      parent.classList.add('over');
    });
    item.addEventListener('dragleave', (e) => {
      const parent = e.target.closest('li');
      parent.classList.remove('over');
    });
    item.addEventListener('drop', (e) => {
      const dragEndIndex = +e.target.getAttribute('data-index');
      console.log(dragEndIndex);
      const parent = e.target.closest('li');
      parent.classList.remove('over');

      swapItems(dragStartIndex, dragEndIndex, todo);
    });
  });
};

export default dragInteraction;
