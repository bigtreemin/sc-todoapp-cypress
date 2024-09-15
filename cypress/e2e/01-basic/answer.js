/// <reference types="cypress" />
// @ts-check
it('loads', () => {
  // The application should be running at port 3000.
  // For more information on the "cy.visit" command, refer to the Cypress documentation at https://on.cypress.io/visit.
  // All commands are linked from https://on.cypress.io/api.
  // TODO: Visit the application at the correct URL.
  cy.visit('localhost:3000')

  // The following are passing assertions.
  // For more information, refer to https://on.cypress.io/get
  // TODO: Use the "cy.get()" command to select the element with class 'new-todo', and then get the 'footer' element.
  cy.get('.new-todo').get('footer')

  // The following assertion is designed to fail.
  // Can you correct it?
  // For more information, refer to https://on.cypress.io/contains.
  // TODO: FIX THE ASSERTION
  cy.contains('h1', 'todos')

  // or can use regular expression
  cy.contains('h1', /^todos$/)

  // It's a good practice to use data attributes specifically for testing.
  // For more information, refer to https://on.cypress.io/best-practices#Selecting-Elements.
  // TODO: Use the "cy.contains()" command to select the element with the data-cy attribute 'app-title' and text 'todos'.
  cy.contains('[data-cy=app-title]', 'todos')
})
