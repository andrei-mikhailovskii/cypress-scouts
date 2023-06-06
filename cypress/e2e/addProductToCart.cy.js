Cypress._.times(10, () => {
  
describe('Add product to cart', () => {
  it('Checks if product added to cart', () => {

    //variable for future comparison of values
    let productTitle;

    // open website
    cy.visit('https://www.demoblaze.com');

    // save first item name for future comparison
    cy.get('.hrefch')
      .eq(0)
      .invoke('text')
      .then((firstProductName) => {
        productTitle = firstProductName
      });

    // click first item in grid
    cy.get('.hrefch').eq(0).click();

    // click Add to cart button
    cy.contains('.btn', 'Add to cart').click();

    // click Cart button
    cy.contains('#cartur', 'Cart').click();

    // verify if item is in the cart
    cy.get('.success > td')
      .eq(1)
      .invoke('text')
      .then((cartItemName) => {
        expect(cartItemName).to.equal(productTitle)
      });
      
  })
})

});
