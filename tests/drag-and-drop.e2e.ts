import { url, todoItems, todoTexts, addTodos, reloadPage } from './helpers'

fixture('Drag and drop').page(url)

test('moves a todo to where it is dropped', async t => {
  await addTodos(t, 'Buy milk', 'Walk the dog', 'Read a book')
  await t.dragToElement(todoItems.nth(2), todoItems.nth(0))

  await t.expect(todoTexts.nth(0).innerText).eql('Read a book')
  await t.expect(todoTexts.nth(1).innerText).eql('Buy milk')
  await t.expect(todoTexts.nth(2).innerText).eql('Walk the dog')
})

test('keeps the new order after reloading', async t => {
  await addTodos(t, 'Buy milk', 'Walk the dog')
  await t.dragToElement(todoItems.nth(1), todoItems.nth(0))
  await reloadPage()

  await t.expect(todoTexts.nth(0).innerText).eql('Walk the dog')
})