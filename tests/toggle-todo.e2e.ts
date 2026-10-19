import { url, todoItems, addTodos } from './helpers'

fixture('Toggle completed').page(url)

test('marks a todo as completed', async t => {
  await addTodos(t, 'Buy milk')
  await t.click(todoItems.nth(0).find('.toggle-checkbox'))

  await t.expect(todoItems.nth(0).hasClass('completed')).ok()
  await t.expect(todoItems.nth(0).find('.toggle-checkbox').checked).ok()
})

test('marks a completed todo as active again', async t => {
  await addTodos(t, 'Buy milk')
  await t.click(todoItems.nth(0).find('.toggle-checkbox'))
  await t.click(todoItems.nth(0).find('.toggle-checkbox'))

  await t.expect(todoItems.nth(0).hasClass('completed')).notOk()
})