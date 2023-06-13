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

// Get first item in the grid of products
Cypress.Commands.add('getFirstProductText', () => {
    cy.get('h4.card-title')
      .should('be.visible', { timeout: 5000 })
      .first()
      .invoke('text')
      .as('productTitle');
});

Cypress.Commands.add('addFirstProductToCart', () => {
    // click first item in grid
    cy.get('.hrefch').first().click();
    // click Add to cart button
    cy.contains('.btn', 'Add to cart')
        .should('be.visible', { timeout: 5000 })
        .click();
});

Cypress.Commands.add('goToCart', () => {
    // click Cart button
    cy.contains('#cartur', 'Cart').click();
});
