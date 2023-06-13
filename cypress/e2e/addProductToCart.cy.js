Cypress._.times(10, () => {
  
describe('Add product to cart', () => {

  beforeEach(() => {

    cy.visit('/');

  });

  it('Checks if Phone is added to cart', () => {

    // save first item name for future comparison
    cy.getFirstProductText()
      .as('phoneTitle')
      .then((phoneTitle) => {
        cy.wrap(phoneTitle).as('phoneTitleValue');
      });
    
    cy.addFirstProductToCart();

    cy.goToCart();

    // verify if item is in the cart
    cy.get('@phoneTitleValue').then((phoneTitleValue) => {
      cy.get('.success > td')
      .should('be.visible', { timeout: 5000 })
      .eq(1)
      .invoke('text')
      .then((cartItemName) => {
        expect(phoneTitleValue).to.be.eq(cartItemName);
      });
    });
      
  });

  it('Checks if Laptop is added to Cart', () => {

    // go to Laptops page
    cy.contains('.list-group-item', 'Laptops').click();

    /* Wait until page is loaded because sometimes it is not loaded comletely, 
    and test takes DOM element of previous page (Phone) and final assert fails*/
    cy.wait(1000);

    cy.getFirstProductText()
      .as('laptopTitle')
      .then((laptopTitle) => {
        cy.wrap(laptopTitle).as('laptopTitleValue');
      });

    cy.addFirstProductToCart();

    cy.goToCart();

    // verify if item is in the cart
    cy.get('@laptopTitleValue').then((laptopTitleValue) => {
      cy.get('.success > td')
      .should('be.visible', { timeout: 5000 })
      .eq(1)
      .invoke('text')
      .then((cartItemName) => {
        expect(laptopTitleValue).to.be.eq(cartItemName);
      });
    });

  });
})

});
