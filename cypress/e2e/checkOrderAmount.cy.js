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

        // click Cart button
        cy.contains('#cartur', 'Cart').click();

        let elementsArray = [];

        cy.get('.success')
        .should('be.visible', { timeout: 5000 })
        .each((itemInCart) => {
          // add each item in Cart to the array
          elementsArray.push(itemInCart);
        }).then(() => {
            let sumOfItems = 0;
            elementsArray.forEach((elementOfArray) => {
              // find price of each item in Cart, and find sum of them
              const tdElement = elementOfArray.find('td:nth-child(3)');
              const value = parseInt(tdElement.text(), 10);
              sumOfItems += value;
            });
          
            // find total price and compare it with sumOfItems
            cy.get("#totalp").invoke('text').then((totalPriceText) => {
              const totalPriceInt = parseInt(totalPriceText, 10);
              expect(totalPriceInt).to.equal(sumOfItems);
            });
        });

    })
  })
})
