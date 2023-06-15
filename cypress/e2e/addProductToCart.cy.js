Cypress._.times(10, () => {
  
describe('Add product to cart', () => {

  beforeEach(() => {

    cy.intercept('GET', 'https://api.demoblaze.com/entries').as('entries');
    cy.visit('/');
    cy.wait('@entries');

    cy.intercept('POST', 'https://api.demoblaze.com/viewcart').as('viewcart');

  });

  it('Checks if Phone is added to cart', () => {

    // save first item name for future comparison
    cy.get('h4.card-title')
      .should('be.visible', { timeout: 5000 })
      .first()
      .invoke('text')
      .as('productTitle')
      .then((productTitle) => {
        cy.wrap(productTitle).as('phoneTitleValue');
      });
    
    cy.addProductToCart('.col-md-6:nth-child(1)>div>a');

    cy.contains('#cartur', 'Cart').click();

    cy.wait('@viewcart');

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

    cy.contains('.card-title', 'Sony vaio i5')
      .should('be.visible', { timeout: 5000 })
      .invoke('text')
      .as('laptopTitle')
      .then((laptopTitle) => {
        cy.wrap(laptopTitle).as('laptopTitleValue');
      });

    cy.contains('.card-title', 'Sony vaio i5').click();

    // click Add to cart button
    cy.intercept('POST', 'https://api.demoblaze.com/addtocart').as('addToCart');
    cy.contains('.btn', 'Add to cart')
        .should('be.visible', { timeout: 5000 })
        .click();
    cy.wait('@addToCart').its('response.statusCode').should('eq', 200);

    cy.contains('#cartur', 'Cart').click();

    cy.wait('@viewcart');

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
});

});
