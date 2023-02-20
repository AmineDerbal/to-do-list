import { appendTodoElement, clearTodoList } from './handleDom.js';
import { saveToLocalStorage } from './data.js';

export default class TodoList {
  constructor(list = []) {
    this.list = list;
  }

  sortList = () => {
    this.list.sort((a, b) => a.index - b.index);
  };

  renderList = () => {
    clearTodoList();
    this.sortList();
    for (let i = 0; i < this.list.length; i += 1) {
      this.list[i].index = i + 1;
      appendTodoElement(this.list[i]);
    }
  };

  addTask = (task) => {
    this.list.push(task);
    saveToLocalStorage(this.list);
    this.renderList();
  };
}
