describe('Check Order Amount', () => {
  Cypress._.times(5, () => {
    it('Checks the sum of two identical items in the cart', () => {

        // open website
        cy.visit('/');

        // click the first item in the grid
        cy.get('.hrefch').first().click();

        // click Add to cart button
        cy.contains('.btn', 'Add to cart').should('be.visible', { timeout: 5000 }).click();

        // click Add to cart button again
        cy.contains('.btn', 'Add to cart').should('be.visible', { timeout: 5000 }).click();

        cy.contains('#cartur', 'Cart').click();

        cy.get('.success').should('be.visible');

        // find the price of the first item in cart
        cy.get('.success:nth-child(1)>td:nth-child(3)').invoke('text').then(parseInt).as('firstItemPrice');

        // find the price of the second item in cart
        cy.get('.success:nth-child(2)>td:nth-child(3)').invoke('text').then(parseInt).as('secondItemPrice');

        // compare Total price with the sum of items in cart
        cy.get('#totalp').invoke('text').then(parseInt).as('totalPrice').then(function() {
          expect(this.firstItemPrice + this.secondItemPrice).to.eq(this.totalPrice);
        });

    });
  });
});
