import { Selector } from 'testcafe'
import { url, todoInput, todoItems, addTodos } from './helpers'

const errorMessage = Selector('#error-message')
const addButton = Selector('.todo-form button')

fixture('Error handling').page(url)

test('shows an error when the input is empty', async t => {
  await t.click(addButton)

  await t.expect(errorMessage.visible).ok()
  await t.expect(todoInput.hasClass('input-error')).ok()
  await t.expect(todoItems.count).eql(0)
})

test('does not add a todo with only spaces', async t => {
  await addTodos(t, '   ')

  await t.expect(errorMessage.visible).ok()
  await t.expect(todoItems.count).eql(0)
})

test('hides the error after adding a valid todo', async t => {
  await t.click(addButton)
  await addTodos(t, 'Buy milk')

  await t.expect(errorMessage.visible).notOk()
  await t.expect(todoInput.hasClass('input-error')).notOk()
})