describe('Add Monitor to Cart', () => {
    it('Checks if monitor added to cart', () => {

        let name = 'testName';
        let country = 'Norway';
        let city = 'Bergen';
        let card = '1111222233334444';
        let month = '07';
        let year = '2025';

        // open website
        cy.visit('https://www.demoblaze.com');

        // in the left navigation bar, click Monitors
        cy.contains('Monitors').click();

        // click the first item in the grid
        cy.get('.hrefch').eq(0).click();

        // click Add to cart button
        cy.contains('Add to cart').click();

        // click Cart button
        cy.contains('Cart').click();

        // click Place Order button
        cy.contains('Place Order').click();

        // wait is set here because sometimes the name field is not filled up completely, and the corresponding assert fails
        cy.wait(1000)

        // fill all text fields
        cy.get('#name').type(name);
        cy.get('#country').type(country);
        cy.get('#city').type(city);
        cy.get('#card').type(card);
        cy.get('#month').type(month);
        cy.get('#year').type(year);

        // click Purchase button
        cy.contains('Purchase').click();

        cy.get('.lead').should('be.visible').then((domElementWithText) => {
            const text = domElementWithText.text();
          
            // check if Id is not empty
            expect(text).to.match(/Id: \d+/);
          
            // check if Amount is not empty
            expect(text).to.match(/Amount: \d+/);
          
            // check if Card Number equals "card" variable
            expect(text).to.include(`Card Number: ${card}`);

            // check if Name equals "name" variable
            expect(text).to.include(`Name: ${name}`);

            // check if Date is not empty
            expect(text).to.match(/Date: \d+\/\d+\/\d+/)

          });

          /* wait is set here because the "success tick" animation should be finished or something else before "OK" button is clicked,
          otherwise Place order modal winow is not closed, and there is no redirection to ~/index.html page*/
          cy.wait(1000);

          cy.get('button.confirm').contains('OK').click();
          
          // check if redirect to home page has happened
          cy.url().should('eq', 'https://www.demoblaze.com/index.html');
          
    })
})
