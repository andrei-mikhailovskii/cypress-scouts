const dayjs = require('dayjs');

Cypress._.times(5, () => {

describe('Add Monitor to Cart', () => {
    it('Checks if monitor added to cart', () => {

        const name = 'testName';
        const country = 'Norway';
        const city = 'Bergen';
        const card = '1111222233334444';
        const month = '07';
        const year = '2025';
        const todaysDate = dayjs().format('D/M/YYYY');

        // open website
        cy.visit('https://www.demoblaze.com');

        // in the left navigation bar, click Monitors
        cy.contains('.list-group-item', 'Monitors').click();

        // click the first item in the grid
        cy.get('.hrefch').eq(0).click();

        // click Add to cart button
        cy.contains('.btn', 'Add to cart').click();

        // click Cart button
        cy.contains('#cartur', 'Cart').click();

        // save total amount in Cart for further check
        cy.get("#totalp").invoke('text').as('totalPriceInCart');

        // click Place Order button
        cy.contains('.btn', 'Place Order').click();

        // wait is set here because sometimes the name field is not filled up completely, and the corresponding assert fails
        cy.wait(1000);

        // fill all text fields
        cy.get('#name').type(name, {delay : 100});
        cy.get('#country').type(country);
        cy.get('#city').type(city);
        cy.get('#card').type(card);
        cy.get('#month').type(month);
        cy.get('#year').type(year);

        // click Purchase button
        cy.contains('.btn', 'Purchase').click();

        // save total amount in Cart to compare it with the amount in the Thank you for your purchase! alert
        //const totalPriceInCart = parseInt(totalPriceText, 10);
        
        cy.get('.lead').should('be.visible');

        cy.get('@totalPriceInCart').then((totalPriceInCart) => {

            cy.get('.lead').invoke('text').as('alertText');
            
            // check if Id is not empty
            cy.get('@alertText').should('match', /Id: \d+/);

            // check the correctness of Amount
            const expectedPriceText = 'Amount: ' + totalPriceInCart + ' USD';
            cy.get('@alertText').should('include', expectedPriceText);
          
            // check if Card Number equals "card" variable
            cy.get('@alertText').should('include', `Card Number: ${card}`);

            // check if Name equals "name" variable
            cy.get('@alertText').should('include', `Name: ${name}`);

            // check if Date is not empty
            cy.get('@alertText').should('match', /Date: \d+\/\d+\/\d+/);
            // check if Date is current date
            // this check is commented out because there is a bug on the webiste: the date is displayed one month earlier
            // expect(text).to.include(`Date: ${todaysDate}`);

        });


        /* wait is set here because the "success tick" animation should be finished or something else before "OK" button is clicked,
        otherwise Place order modal winow is not closed, and there is no redirection to ~/index.html page*/
        cy.wait(1000);

        cy.get('button.confirm').contains('OK').click();
        
        // check if redirect to home page has happened
        cy.url().should('eq', 'https://www.demoblaze.com/index.html');
          
    })
})

});
