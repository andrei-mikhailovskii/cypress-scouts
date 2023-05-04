describe('Demo Tests', () => {
    it('Opens the Home page', () => {
      cy.visit('https://www.demoblaze.com')
  
      cy.get('#nava')
        .should('contain', 'PRODUCT STORE')
    })
  })
