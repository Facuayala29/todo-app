import { Selector } from 'testcafe'
import { url, todoItems, addTodos } from './helpers'

const progressBar = Selector('#progress-bar')
const progressText = Selector('#progress-text')

fixture('Progress bar').page(url)

test('shows how many todos are done', async t => {
  await addTodos(t, 'Buy milk', 'Walk the dog', 'Read a book')
  await t.click(todoItems.nth(0).find('.toggle-checkbox'))

  await t.expect(progressText.innerText).eql('1 of 3 done')
})

test('fills the bar when all todos are done', async t => {
  await addTodos(t, 'Buy milk', 'Walk the dog')
  await t
    .click(todoItems.nth(0).find('.toggle-checkbox'))
    .click(todoItems.nth(1).find('.toggle-checkbox'))

  await t.expect(progressBar.getAttribute('value')).eql('2')
  await t.expect(progressBar.getAttribute('max')).eql('2')
})