import { url, todoItems, todoTexts, addTodos } from './helpers'

fixture('Remove todo').page(url)

test('removes the todo from the list', async t => {
  await addTodos(t, 'Buy milk')
  await t.click(todoItems.nth(0).find('.remove-button'))

  await t.expect(todoItems.count).eql(0)
})

test('removes only the clicked todo', async t => {
  await addTodos(t, 'Buy milk', 'Walk the dog', 'Read a book')
  await t.click(todoItems.nth(1).find('.remove-button'))

  await t.expect(todoItems.count).eql(2)
  await t.expect(todoTexts.nth(0).innerText).eql('Buy milk')
  await t.expect(todoTexts.nth(1).innerText).eql('Read a book')
})