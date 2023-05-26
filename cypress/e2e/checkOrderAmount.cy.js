describe('Check Order Amount', () => {
    it('Checks the sum of two identical items in the cart', () => {

        // open website
        cy.visit('https://www.demoblaze.com')

        // click the first item in the grid
        cy.get('.hrefch').eq(0).click()

        // click Add to cart button
        cy.contains('Add to cart').click()

        // click Add to cart button again
        cy.contains('Add to cart').click()

        // click Cart button
        cy.contains('Cart').click()

        // assert will be here
        
    })
})