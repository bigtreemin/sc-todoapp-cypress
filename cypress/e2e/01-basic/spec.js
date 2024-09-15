/// <reference types="cypress" />
// @ts-check
it('loads', () => {
  // The application should be running at port 3000.
  // For more information on the "cy.visit" command, refer to the Cypress documentation at https://on.cypress.io/visit.
  // All commands are linked from https://on.cypress.io/api.
  // TODO: Visit the application at the correct URL.


  // The following are passing assertions.
  // For more information, refer to https://on.cypress.io/get
  // TODO: Use the "cy.get()" command to select the element with class 'new-todo', and then get the 'footer' element.
  cy.get('.new-todo').get('footer')

  // The following assertion is designed to fail.
  // Can you correct it?
  // For more information, refer to https://on.cypress.io/contains.
  // TODO: FIX THE ASSERTION
  cy.contains('h1', 'Todos App')

  // Can you rewrite the "cy.contains" command using a regular expression?
  // cy.contains('h1', /.../)

  // It's a good practice to use data attributes specifically for testing.
  // For more information, refer to https://on.cypress.io/best-practices#Selecting-Elements.
  // TODO: Use the "cy.contains()" command to select the element with the data-cy attribute 'app-title' and text 'todos'.


  /*
    Keys: A normal test contains the following:
    - A description of the test: what is being tested
    - A setup phase: visiting a page, setting up data
    - An execution phase: element selection and interaction
    - An assertion phase: checking the results
   */
})
