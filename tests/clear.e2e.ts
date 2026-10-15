import { Selector } from 'testcafe'
import { url, todoItems, todoTexts, addTodos } from './helpers'

fixture('Clear completed and clear all').page(url)
  .beforeEach(async t => {
    await addTodos(t, 'Buy milk', 'Walk the dog', 'Read a book')
    await t.click(todoItems.nth(1).find('.toggle-checkbox'))
  })

test('clear completed removes only the completed todos', async t => {
  await t.click(Selector('#clear-completed-button'))

  await t.expect(todoItems.count).eql(2)
  await t.expect(todoTexts.withText('Walk the dog').exists).notOk()
})

test('clear all removes every todo', async t => {
  await t.click(Selector('#clear-button'))

  await t.expect(todoItems.count).eql(0)
  await t.expect(Selector('#progress-text').innerText).eql('0 of 0 done')
})