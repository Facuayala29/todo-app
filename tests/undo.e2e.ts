import { Selector } from 'testcafe'
import { url, todoItems, todoTexts, addTodos } from './helpers'

const undoBar = Selector('#undo-bar')

fixture('Undo remove').page(url)

test('brings back the removed todo in the same position', async t => {
  await addTodos(t, 'Buy milk', 'Walk the dog', 'Read a book')
  await t.click(todoItems.nth(1).find('.remove-button'))

  await t.expect(undoBar.visible).ok()

  await t.click(Selector('#undo-button'))

  await t.expect(todoItems.count).eql(3)
  await t.expect(todoTexts.nth(1).innerText).eql('Walk the dog')
  await t.expect(undoBar.visible).notOk()
})

test('hides the undo bar after 5 seconds', async t => {
  await addTodos(t, 'Buy milk')
  await t.click(todoItems.nth(0).find('.remove-button'))

  await t.expect(undoBar.visible).ok()
  await t.wait(5500)
  await t.expect(undoBar.visible).notOk()
})