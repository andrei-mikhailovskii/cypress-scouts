describe('Check Order Amount', () => {
    it('Checks the sum of two identical items in the cart', () => {

        // open website
        cy.visit('https://www.demoblaze.com');

        // click the first item in the grid
        cy.get('.hrefch').eq(0).click();

        // click Add to cart button
        cy.contains('Add to cart').click();

        // click Add to cart button again
        cy.contains('Add to cart').click();

        // click Cart button
        cy.contains('Cart').click();

        let elementsArray = [];

        cy.get('.success').each((itemInCart) => {
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
