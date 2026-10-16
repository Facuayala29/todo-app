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

// puts a removed todo back where it was, for the undo
export const restoreTodo = (todos:Todo[], todo:Todo, index:number):Todo[] => {
  const newTodos = [...todos]
  newTodos.splice(index, 0, todo)
  return newTodos
}

export const toggleTodoById = (todos:Todo[], id:number):Todo[] => {
  return todos.map(todo => {
    if (todo.id === id) {
      return {
        id: todo.id,
        text: todo.text,
        completed: !todo.completed
      }
    }
    return todo
  })
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

// filter can be 'all', 'active' or 'completed'
export const filterTodos = (todos:Todo[], filter:string):Todo[] => {
  if (filter === 'active') {
    return todos.filter(todo => !todo.completed)
  }
  if (filter === 'completed') {
    return todos.filter(todo => todo.completed)
  }
  return todos
}

export const clearCompleted = (todos:Todo[]):Todo[] => {
  return todos.filter(todo => !todo.completed)
}

// gives a text like "2 of 5 done"
export const getProgressText = (todos:Todo[]):string => {
  const completed = todos.filter(todo => todo.completed).length
  return `${completed} of ${todos.length} done`
}