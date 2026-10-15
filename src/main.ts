import './style.css'
import {
  type Todo,
  createTodo,
  removeTodoById,
  toggleTodoById,
  updateTodoText,
  getProgressText
} from './todos'

let todos: Todo[] = [];

let editingId = 0; // id of the todo that is being edited, 0 when there is none

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
const progressBar = document.getElementById('progress-bar') as HTMLProgressElement;
const progressText = document.getElementById('progress-text') as HTMLParagraphElement;

const addTodo = (text:string):void => {
  todos.push(createTodo(text))
  renderTodos();
}

const renderTodos = ():void => {
  // clear the list so the todos are not repeated
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item'
    if (todo.completed) {
      li.classList.add('completed')
    }

    if (todo.id === editingId) {
      // this todo is being edited, show an input instead of the text
      li.innerHTML = `
        <input type="text" class="edit-input">
        <button class="save-button">Save</button>
        <button class="cancel-button">Cancel</button>
      `
      addEditFormListeners(li, todo);
    } else {
      li.innerHTML = `
        <input type="checkbox" class="toggle-checkbox" ${todo.completed ? 'checked' : ''}>
        <span>${todo.text}</span>
        <button class="remove-button">Remove</button>
        <button class="edit-button">Edit</button>
      `
      addToggleListener(li, todo.id);
      addRemoveButtonListener(li, todo.id);
      addEditButtonListener(li, todo.id);
    }
    todoList.appendChild(li);
  })

  // put the cursor in the edit input so the user can type right away
  const editInput = todoList.querySelector('.edit-input') as HTMLInputElement | null;
  editInput?.focus()

  updateProgress();
}

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (text !== '') {
    todoInput.classList.remove('input-error')
    errorMessage.style.display = 'none'
    addTodo(text);
    todoInput.value = ''; // clears the input field after adding the todo
  } else {
    // empty input, show the error
    todoInput.classList.add('input-error')
    errorMessage.style.display = 'block'
  }
})


const addToggleListener = (li:HTMLLIElement, id:number):void => {
  const checkbox = li.querySelector('.toggle-checkbox');
  checkbox?.addEventListener('change', () => toggleTodo(id))
}

const toggleTodo = (id:number):void => {
  todos = toggleTodoById(todos, id)
  renderTodos();
}


const updateProgress = ():void => {
  progressBar.max = todos.length || 1 // max can not be 0
  progressBar.value = todos.filter(todo => todo.completed).length
  progressText.textContent = getProgressText(todos)
}


const addRemoveButtonListener = (li:HTMLLIElement, id:number):void => {
  const removeButton = li.querySelector('.remove-button');
  removeButton?.addEventListener('click', () => removeTodo(id))
}

const removeTodo = (id:number):void => {
  todos = removeTodoById(todos, id)
  renderTodos();
}


const addEditButtonListener = (li:HTMLLIElement, id:number):void => {
  const editButton = li.querySelector('.edit-button');
  editButton?.addEventListener('click', () => editTodo(id))
}

const editTodo = (id:number):void => {
  editingId = id
  renderTodos();
}

const addEditFormListeners = (li:HTMLLIElement, todo:Todo):void => {
  const editInput = li.querySelector('.edit-input') as HTMLInputElement;
  const saveButton = li.querySelector('.save-button');
  const cancelButton = li.querySelector('.cancel-button');
  editInput.value = todo.text

  saveButton?.addEventListener('click', () => saveEdit(todo.id, editInput.value))
  cancelButton?.addEventListener('click', () => cancelEdit())

  // enter saves and escape cancels, same as the buttons
  editInput.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      saveEdit(todo.id, editInput.value);
    }
    if (event.key === 'Escape') {
      cancelEdit();
    }
  })
}

const saveEdit = (id:number, text:string):void => {
  todos = updateTodoText(todos, id, text)
  editingId = 0
  renderTodos();
}

const cancelEdit = ():void => {
  editingId = 0
  renderTodos();
}


renderTodos();