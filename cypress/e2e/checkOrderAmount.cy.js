describe('Check Order Amount', () => {

    beforeEach(() => {

      // intercept request for further waits of it
      cy.intercept('POST', '**/addtocart').as('addToCart');
      
    })

    it('Checks the sum of two identical items in the cart', () => {

        // open website
        cy.visit('/');

        // click the first item in the grid
        cy.get('.hrefch').first().click();

        // click Add to cart button two times
        cy.contains('.btn', 'Add to cart').should('be.visible').click().click();

        // wait until product is added to cart
        cy.wait('@addToCart');

        // click Cart button
        cy.contains('#cartur', 'Cart').click();

        // wait until table with product is displayed in Cart
        cy.get('.success').should('be.visible');

        // find the price of the first item in cart
        cy.get('table tbody tr').eq(0).find('td').eq(2).invoke('text').then(parseInt).as('firstItemPrice')

        // find the price of the second item in cart
        cy.get('table tbody tr').eq(1).find('td').eq(2).invoke('text').then(parseInt).as('secondItemPrice');

        // compare Total price with the sum of items in cart
        cy.get('#totalp').invoke('text').then(parseInt).as('totalPrice').then(function() {
          expect(this.firstItemPrice + this.secondItemPrice).to.eq(this.totalPrice);
        });

    });
});
