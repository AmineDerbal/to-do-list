export const checkLocalStorage = () => {
  if (localStorage.getItem('todoListData')) {
    return true;
  }
  return false;
};

export const saveToLocalStorage = (todoListData) => {
  localStorage.setItem('todoListData', JSON.stringify(todoListData));
};

export default { checkLocalStorage, saveToLocalStorage };
