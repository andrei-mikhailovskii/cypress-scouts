// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('addProductToCart', (locator) => {
    cy.get(locator).click();
    cy.intercept('POST', '**/view').as('view');
    cy.wait('@view').its('response.statusCode').should('eq', 200);
    // click Add to cart button
    cy.intercept('POST', '**/addtocart').as('addToCart');
    cy.contains('.btn', 'Add to cart')
        .should('be.visible', { timeout: 5000 })
        .click();
    cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
});
