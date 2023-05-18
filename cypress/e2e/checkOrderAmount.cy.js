describe('Check Order Amount', () => {
    it('Checks the sum of two identical items in the cart', () => {

        // open website
        cy.visit('https://www.demoblaze.com')

        // click the first item in the grid
        cy.get('.hrefch').eq(0).click()

        // click Add to cart button
        cy.get('.btn-lg').click()

        // click Add to cart button again
        cy.get('.btn-lg').click()

        // click Cart button
        cy.get('#cartur').click()

        // assert will be here
        
    })
})