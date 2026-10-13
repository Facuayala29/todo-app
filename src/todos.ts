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