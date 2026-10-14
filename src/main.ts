import './style.css'
import {
  type Todo,
  createTodo,
  removeTodoById
} from './todos'

let todos: Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

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
    li.innerHTML = `
      <span>${todo.text}</span>
      <button class="remove-button">Remove</button>
    `
    addRemoveButtonListener(li, todo.id);
    todoList.appendChild(li);
  })
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


const addRemoveButtonListener = (li:HTMLLIElement, id:number):void => {
  const removeButton = li.querySelector('.remove-button');
  removeButton?.addEventListener('click', () => removeTodo(id))
}

const removeTodo = (id:number):void => {
  todos = removeTodoById(todos, id)
  renderTodos();
}


renderTodos();