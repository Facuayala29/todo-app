import { ClientFunction, Selector } from 'testcafe'
import { url } from './helpers'

// a color input can not be typed into, so the test sets the value like the picker does
const pickColor = ClientFunction((color:string) => {
  const colorPicker = document.getElementById('color-picker') as HTMLInputElement
  colorPicker.value = color
  colorPicker.dispatchEvent(new Event('input'))
})

const body = Selector('body')

fixture('Color picker').page(url)

test('changes the background of the page', async t => {
  await pickColor('#336699')

  await t.expect(body.getStyleProperty('background-color')).eql('rgb(51, 102, 153)')
})

test('changes it again when another color is picked', async t => {
  await pickColor('#336699')
  await pickColor('#ff0000')

  await t.expect(body.getStyleProperty('background-color')).eql('rgb(255, 0, 0)')
})