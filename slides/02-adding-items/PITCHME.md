## ☀️ Part 2: Adding items tests

### 📚 You will learn

- the common commands for working with page elements
- organizing the test code using Mocha hooks

---

## What kind of tests?

- discussion 🗣️: what would you test in the TodoMVC app?

Note:
Longer tests, adding items then deleting one for example. Adding items via GUI and observing communication with the server. Adding items then reloading the page.

---

## Let's test

- keep `todomvc` app running
- open `cypress/e2e/02-adding-items/spec.js` in your text editor
- click file `02-adding-items/spec.js` in Cypress

+++

## ⚠️ Warning ⚠️

The tests we are about to write are NOT resetting the previously added Todo items. Delete the Todo items before each test manually.

We will reset the previously saved Todo items in section "4 Reset State".

## ⚠️ Warning ⚠️

---

## Todo: Make this test work

```js
// cypress/e2e/02-adding-items/spec.js
it('adds two items', () => {
  // visit the site
  // https://on.cypress.io/visit
  // repeat twice
  //    get the input field
  //    https://on.cypress.io/get
  //    type text and "enter"
  //    https://on.cypress.io/type
  //    assert that the new Todo item
  //    has been added added to the list
  // cy.get(...).should('have.length', 2)
})
```

**💡 tip** use `cy.get`, `cy.type`, `cy.contains`, `cy.click`, remember `https://on.cypress.io/<command>`

Note:
Draw distinction between commands and assertions, show how commands can be chained,
each continues to work with the subject of the previous command. Assertions do
not change the subject.

+++

## Todo: mark the first item completed

```js
it('can mark an item as completed', () => {
  // visit the site
  // adds a few items
  // marks the first item as completed
  // https://on.cypress.io/get
  // https://on.cypress.io/find
  // https://on.cypress.io/first
  // confirms the first item has the expected completed class
  // confirms the other items are still incomplete
  // check the number of remaining items
})
```

+++

## Refactor code 1/3

- visit the page before each test

Note:
Avoid duplicate `cy.visit('localhost:3000')` command at the start of each test.

+++

## Refactor code 2/3

- move the url into `cypress.config.js`

**💡 tip** look at [https://on.cypress.io/configuration](https://on.cypress.io/configuration)

+++

## Refactor code 3/3

- make a helper function to add todo item

**💡 tip** it is just JavaScript

Note:
Move `addItem` function into a separate file and import from the spec file. It is just JavaScript, and Cypress bundles each spec file, so utilities can have `cy...` commands too!

+++

## Run multiple specs

`experimentalRunAllSpecs: true` config option.

---

## Todo: delete an item

```javascript
it('can delete an item', () => {
  // adds a few items
  // deletes the first item
  // use force: true because we don't want to hover
  // confirm the deleted item is gone from the dom
  // confirm the other item still exists
})
```

---

## Todo: use random text

```javascript
it('adds item with random text', () => {
  // use a helper function with Math.random()
  // or Cypress._.random() to generate unique text label
  // add such item
  // and make sure it is visible and does not have class "completed"
})
```

---

## Todo: no items

```js
it('starts with zero items', () => {
  // check if the list is empty initially
  //   find the selector for the individual TODO items in the list
  //   use cy.get(...) and it should have length of 0
  //   https://on.cypress.io/get
  //   ".should('have.length', 0)"
  //   or ".should('not.exist')"
})
```

---

## Default assertions

```js
cy.get('li.todo')
// is the same as
cy.get('li.todo').should('exist')
```

See [cy.get Assertions](https://on.cypress.io/get#Assertions)

+++

What if you do not know if an element exists? You can disable the built-in assertions using a "dummy" `should(cb)` assertion.

```js
cy.get('li.todo').should(() => {})
// or using the bundled Lodash
cy.get('li.todo').should(Cypress._.noop)
```

Todo: write test "disables the built-in assertion".

---

## Todo: number of items increments by one

How do you check if an unknown number of items grows by one? There might be no items at first.

Implement the test "adds one more todo item"

---

## 💡 Pro tips

- resize the viewport in `cypress.config.js`

---

## Checking the saved items

The application saves the items in "todomvc/data.json" file. Can we verify that a new item has been saved?

Todo: write the test "saves the added todos"

**Tip:** use [cy.task](https://on.cypress.io/task) in the plugins file or [cy.readFile](https://on.cypress.io/readfile)

---

## Adding blank item

The application does not allow adding items with blank titles. What happens when the user does it? Hint: open DevTools console.

+++

## Todo: finish this test

```js
it('does not allow adding blank todos', () => {
  // https://on.cypress.io/catalog-of-events#App-Events
  cy.on('uncaught:exception', () => {
    // check e.message to match expected error text
    // return false if you want to ignore the error
  })

  // try adding an item with just spaces
})
```

---

## Bonus

Unit tests vs end-to-end tests

### Unit tests

```javascript
import add from './add'
test('add', () => {
  expect(add(2, 3)).toBe(5)
})
```

- arrange - action - assertion

+++

### End-to-end tests

```javascript
const addItem = (text) => {
  cy.get('.new-todo').type(`${text}{enter}`)
}
it('can mark items as completed', () => {
  const ITEM_SELECTOR = 'li.todo'
  addItem('simple')
  addItem('difficult')
  cy.contains(ITEM_SELECTOR, 'simple')
    .should('exist')
    .find('input[type="checkbox"]')
    .check()
  // have to force click because the button does not appear unless we hover
  cy.contains(ITEM_SELECTOR, 'simple').find('.destroy').click({ force: true })
  cy.contains(ITEM_SELECTOR, 'simple').should('not.exist')
  cy.get(ITEM_SELECTOR).should('have.length', 1)
  cy.contains(ITEM_SELECTOR, 'difficult').should('be.visible')
})
```

command - assertion - command - assertion (CACA pattern)

- **tip** check out `cy.pause` command

Note:
Revisit the discussion about what kind of tests one should write. E2E tests can cover a lot of features in a single test, and that is a recommended practice. If a test fails, it is easy to debug it, and see how the application looks during each step.

+++

### Unit vs component vs E2E

- if you are describing how code works: **unit test**
- if you are testing a component that runs in the browser: **component test**
- if you are describing how code is used by the user: **end-to-end test**

+++

## Todo: run unit tests in Cypress

Does this test run in Cypress?

```javascript
import add from './add'
test('add', () => {
  expect(add(2, 3)).toBe(5)
})
```

+++

### Bonus

- Core concepts [https://on.cypress.io/writing-and-organizing-tests](https://on.cypress.io/writing-and-organizing-tests)

---

Organize tests using folder structure and spec files

```text
cypress/integration/
  featureA/
    first-spec.js
    second-spec.js
  featureB/
    another-spec.js
    errors-spec.js
```

+++

Organize tests inside a spec using Mocha functions

```js
describe('Feature A', () => {
  beforeEach(() => {})

  it('works', () => {})

  it('handles error', () => {})

  // context is alias of describe
  context('in special case', () => {
    it('starts correctly', () => {})

    it('works', () => {})
  })
})
```

+++

## Support file

Support file is included before each spec file.

```html
<script src="cypress/support/e2e.js"></script>
<script src="cypress/e2e/spec.js"></script>
```

**💡 Tip:** Want to reset the data and visit the site before each test? Put the commands into `beforeEach` hook inside the support file.

---

## 🏁 Write your tests like a user

- go through UI
- validate the application after actions

➡️ Next: [03-selector-playground](?p=03-selector-playground) chapter
