# Todo App

Todo list made with TypeScript and Vite for the exam.

Live: https://facuayala29.github.io/todo-app/

## What it does

- add, edit and remove todos
- mark them as done (with a progress bar)
- filter all / active / completed and clear them
- saves in local storage
- undo when you remove one
- drag and drop to change the order
- color picker for the background


## Tests

npm test
npm run test:e2e


## How it was made

- every feature has its own issue and a pull request into develop, reviewed by Lucas
- gitflow with main, develop, feature and release branches
- conventional commits
- at least 2 testcafe tests per feature, plus unit tests with vitest
- github actions runs the build and tests on every PR and deploys main to github pages
