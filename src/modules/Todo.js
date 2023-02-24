import {
  appendTodoElement,
  clearTodoList,
  implementEdit,
  createClearCompletedElement,
} from './handleDom.js';
import { saveToLocalStorage } from './data.js';
import implementCheckBoxEvents from './checkbox.js';
import { dragInteraction } from './dropDrag.js';

export default class Todo {
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
      appendTodoElement(this.list[i], this);
    }
    //saveToLocalStorage(this.list);
    this.saveList();
    implementEdit(this);
    implementCheckBoxEvents(this);
    createClearCompletedElement(this);
    dragInteraction(this);
  };

  saveList = () => {
    saveToLocalStorage(this.list);
  };

  addTask = (task) => {
    this.list.push(task);
    saveToLocalStorage(this.list);
    this.renderList();
  };

  removeTask = (index) => {
    this.list.splice(index, 1);
    saveToLocalStorage(this.list);
    this.renderList();
  };

  editTask = (index, description) => {
    this.list[index].description = '';
    this.list[index].description = description;
    saveToLocalStorage(this.list);
  };

  toggleCompleted = (index) => {
    this.list[index].completed = !this.list[index].completed;
    saveToLocalStorage(this.list);
  };

  filterCompleted = () => {
    this.list = this.list.filter((task) => !task.completed);
    saveToLocalStorage(this.list);
    this.renderList();
  };
}
