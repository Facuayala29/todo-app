import { ClientFunction, Selector } from 'testcafe'

// the tests use their own port so the normal npm run dev can stay open
export const url = 'http://localhost:5174'

export const todoInput = Selector('#todo-input')
export const todoItems = Selector('.todo-item')
export const todoTexts = Selector('.todo-item span')

// types each text in the input and presses enter
export const addTodos = async (t:TestController, ...texts:string[]):Promise<void> => {
  for (const text of texts) {
    await t.typeText(todoInput, text).pressKey('enter')
  }
}

export const reloadPage = ClientFunction(() => location.reload())