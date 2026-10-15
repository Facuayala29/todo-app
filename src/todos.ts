// logic of the todos, without anything from the page so it can be tested in todos.test.ts

// Interface for the data schema
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// creates a new todo, not completed yet
export const createTodo = (text:string):Todo => {
  return {
    id: Date.now(),
    text: text,
    completed: false
  }
}

// keeps every todo except the one with this id
export const removeTodoById = (todos:Todo[], id:number):Todo[] => {
  return todos.filter(todo => todo.id !== id)
}

// if the new text is empty the todo keeps the old one
export const updateTodoText = (todos:Todo[], id:number, text:string):Todo[] => {
  if (text.trim() === '') {
    return todos
  }
  return todos.map(todo => {
    if (todo.id === id) {
      return {
        id: todo.id,
        text: text.trim(),
        completed: todo.completed
      }
    }
    return todo
  })
}