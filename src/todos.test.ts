import { describe, it, expect } from 'vitest'
import {
  type Todo,
  createTodo,
  removeTodoById,
  toggleTodoById,
  updateTodoText,
  getProgressText
} from './todos'


// a small list to use in the tests
const todos: Todo[] = [
  { id: 1, text: 'Buy milk', completed: false },
  { id: 2, text: 'Watch Futugrama', completed: true },
  { id: 3, text: 'Read a book', completed: false }
]


describe('createTodo', () => {
  it('creates a todo with the text and not completed', () => {
    const todo = createTodo('Study')

    expect(todo.text).toBe('Study')
    expect(todo.completed).toBe(false)
  })
})


describe('removeTodoById', () => {
  it('removes only the todo with that id', () => {
    const result = removeTodoById(todos, 2)

    expect(result.map(todo => todo.id)).toEqual([1, 3])
  })

  it('does not change the original list', () => {
    removeTodoById(todos, 2)

    expect(todos).toHaveLength(3)
  })
})


describe('toggleTodoById', () => {
  it('changes an active todo to completed', () => {
    const result = toggleTodoById(todos, 1)

    expect(result[0].completed).toBe(true)
  })

  it('changes a completed todo back to active', () => {
    const result = toggleTodoById(todos, 2)

    expect(result[1].completed).toBe(false)
  })
})


describe('updateTodoText', () => {
  it('changes the text of the todo', () => {
    const result = updateTodoText(todos, 1, 'Buy oat milk')

    expect(result[0].text).toBe('Buy oat milk')
  })

  it('keeps the old text if the new one is empty', () => {
    const result = updateTodoText(todos, 1, '   ')

    expect(result[0].text).toBe('Buy milk')
  })
})


describe('getProgressText', () => {
  it('counts how many todos are done', () => {
    expect(getProgressText(todos)).toBe('1 of 3 done')
  })

  it('works with an empty list', () => {
    expect(getProgressText([])).toBe('0 of 0 done')
  })
})