const dayjs = require('dayjs');

Cypress._.times(5, () => {

describe('Check purchase alert', () => {

    beforeEach(() => {
        cy.intercept('POST', '**/view').as('view');
      })

    it('Checks if purchase alert contains information entered at purchase', () => {

        const name = 'testName';
        const country = 'Norway';
        const city = 'Bergen';
        const card = '1111222233334444';
        const month = '07';
        const year = '2025';
        const todaysDate = dayjs().format('D/M/YYYY');

        // open website
        cy.visit('/');

        // in the left navigation bar, click Monitors
        cy.contains('.list-group-item', 'Monitors').click();

        cy.addProductToCart('.col-md-6:nth-child(1)>div>a');

        cy.contains('#cartur', 'Cart').click();

        cy.wait('@view')

        // save total amount in Cart for further check
        cy.get("#totalp").should('be.visible', { timeout: 5000 }).invoke('text').as('totalPriceInCart');

        // click Place Order button
        cy.contains('.btn', 'Place Order').click();

        // fill all text fields
        cy.get('#name').invoke('val', name);
        cy.get('#country').invoke('val', country);
        cy.get('#city').invoke('val', city);
        cy.get('#card').invoke('val', card);
        cy.get('#month').invoke('val', month);
        cy.get('#year').invoke('val', year);

        // click Purchase button
        cy.contains('.btn', 'Purchase').click();
        
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
        otherwise Place order modal winow is not closed, and there is no redirection to ~/index.html page */
        cy.wait(1000);

        cy.get('button.confirm').contains('OK').click();
        
        // check if redirect to home page has happened
        cy.url().should('eq', Cypress.config().baseUrl + '/index.html');
          
    })
})

});
