import { ClientFunction, Selector } from 'testcafe'
import { url } from './helpers'

const getPageTitle = ClientFunction(() => document.title)

fixture('App').page(url)

test('opens the page with the right title', async t => {
  await t.expect(getPageTitle()).eql('Todo App')
})

test('shows the heading of the app', async t => {
  await t.expect(Selector('h1').innerText).eql('Todo App')
})