import { url, todoInput, todoItems, todoTexts, addTodos } from './helpers'

fixture('Add todo').page(url)

test('adds a todo to the list', async t => {
  await addTodos(t, 'Buy milk')

  await t.expect(todoItems.count).eql(1)
  await t.expect(todoTexts.nth(0).innerText).eql('Buy milk')
})

test('clears the input after adding', async t => {
  await addTodos(t, 'Buy milk')

  await t.expect(todoInput.value).eql('')
})

test('adds new todos at the end of the list', async t => {
  await addTodos(t, 'Buy milk', 'Walk the dog')

  await t.expect(todoTexts.nth(1).innerText).eql('Walk the dog')
})