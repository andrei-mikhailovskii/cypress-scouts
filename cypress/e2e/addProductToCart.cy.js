Cypress._.times(10, () => {
  
describe('Add product to cart', () => {
  it('Checks if product added to cart', () => {

    // open website
    cy.visit('/');

    // save first item name for future comparison
    cy.get('h4.card-title')
      .first()
      .invoke('text')
      .as('productTitle')
      .then((productTitle) => {
        cy.wrap(productTitle).as('productTitleValue');
      });

    // click first item in grid
    cy.get('.hrefch').first().click();

    // click Add to cart button
    cy.contains('.btn', 'Add to cart').should('be.visible', { timeout: 5000 }).click();

    // click Cart button
    cy.contains('#cartur', 'Cart').click();

    // verify if item is in the cart
    cy.get('@productTitleValue').then((productTitleValue) => {
      cy.get('.success > td').eq(1).invoke('text').then((cartItemName) => {
        expect(productTitleValue).to.be.eq(cartItemName);
      });
    });
      
  })
})

});
