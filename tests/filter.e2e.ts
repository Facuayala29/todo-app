import { Selector } from 'testcafe'
import { url, todoItems, todoTexts, addTodos } from './helpers'

const filterButton = (filter:string):Selector => Selector(`[data-filter="${filter}"]`)

fixture('Filter').page(url)
  .beforeEach(async t => {
    await addTodos(t, 'Buy milk', 'Walk the dog', 'Read a book')
    await t.click(todoItems.nth(1).find('.toggle-checkbox'))
  })

test('shows only the active todos', async t => {
  await t.click(filterButton('active'))

  await t.expect(todoItems.count).eql(2)
  await t.expect(todoTexts.nth(0).innerText).eql('Buy milk')
  await t.expect(todoTexts.nth(1).innerText).eql('Read a book')
})

test('shows only the completed todos', async t => {
  await t.click(filterButton('completed'))

  await t.expect(todoItems.count).eql(1)
  await t.expect(todoTexts.nth(0).innerText).eql('Walk the dog')
})

test('shows all the todos again and marks the button as active', async t => {
  await t
    .click(filterButton('completed'))
    .click(filterButton('all'))

  await t.expect(todoItems.count).eql(3)
  await t.expect(filterButton('all').hasClass('active')).ok()
  await t.expect(filterButton('completed').hasClass('active')).notOk()
})