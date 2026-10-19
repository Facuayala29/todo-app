import { Selector } from 'testcafe'
import { url, todoItems, todoTexts, addTodos } from './helpers'

const editInput = Selector('.edit-input')

fixture('Edit todo').page(url)

test('saves the new text with the save button', async t => {
  await addTodos(t, 'Buy milk')
  await t
    .click(todoItems.nth(0).find('.edit-button'))
    .typeText(editInput, 'Buy oat milk', { replace: true })
    .click(Selector('.save-button'))

  await t.expect(todoTexts.nth(0).innerText).eql('Buy oat milk')
})

test('saves with enter and cancels with escape', async t => {
  await addTodos(t, 'Buy milk')
  await t
    .click(todoItems.nth(0).find('.edit-button'))
    .typeText(editInput, 'Buy bread', { replace: true })
    .pressKey('enter')

  await t.expect(todoTexts.nth(0).innerText).eql('Buy bread')

  await t
    .click(todoItems.nth(0).find('.edit-button'))
    .typeText(editInput, 'Something else', { replace: true })
    .pressKey('esc')

  await t.expect(todoTexts.nth(0).innerText).eql('Buy bread')
})

test('keeps the old text if the new one is empty', async t => {
  await addTodos(t, 'Buy milk')
  await t
    .click(todoItems.nth(0).find('.edit-button'))
    .selectText(editInput)
    .pressKey('delete')
    .click(Selector('.save-button'))

  await t.expect(todoTexts.nth(0).innerText).eql('Buy milk')
})