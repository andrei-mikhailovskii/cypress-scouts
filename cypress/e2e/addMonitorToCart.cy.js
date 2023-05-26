describe('Add Monitor to Cart', () => {
    it('Checks if monitor added to cart', () => {

        // open website
        cy.visit('https://www.demoblaze.com')

        // in the left navigation bar, click Monitors
        cy.contains('Monitors').click()

        // click the first item in the grid
        cy.get('.hrefch').eq(0).click()

        // click Add to cart button
        cy.contains('Add to cart').click()

        // click Cart button
        cy.contains('Cart').click()

        // click Place Order button
        cy.contains('Place Order').click()

        // fill all text fields
        cy.get('#name').type('testName')
        cy.get('#country').type('Norway')
        cy.get('#city').type('Bergen')
        cy.get('#card').type('1111222233334444')
        cy.get('#month').type('07')
        cy.get('#year').type('2025')

        // click Purchase button
        cy.contains('Purchase').click()

        // assert will be here
        
    })
})