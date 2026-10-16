import { Selector } from 'testcafe'
import { url, todoItems, todoTexts, addTodos, reloadPage } from './helpers'

fixture('Local storage').page(url)

test('keeps the todos after reloading the page', async t => {
  await addTodos(t, 'Buy milk', 'Walk the dog')
  await t.click(todoItems.nth(1).find('.toggle-checkbox'))
  await reloadPage()

  await t.expect(todoItems.count).eql(2)
  await t.expect(todoTexts.nth(0).innerText).eql('Buy milk')
  await t.expect(todoItems.nth(1).hasClass('completed')).ok()
})

test('stays empty after clear all and reload', async t => {
  await addTodos(t, 'Buy milk')
  await t.click(Selector('#clear-button'))
  await reloadPage()

  await t.expect(todoItems.count).eql(0)
})