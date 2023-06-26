describe('Add product to cart', () => {
  Cypress._.times(10, () => {

  beforeEach(() => {
    
    // intercept requests for further waits of them
    cy.intercept('GET', '**/entries').as('entries');
    cy.intercept('POST', '**/addtocart').as('addToCart');
    cy.intercept('POST', '**/viewcart').as('viewcart');
    
    // open start page and wait until it's loaded
    cy.visit('/');
    cy.wait('@entries');

  });

  it('Checks if Phone is added to cart', () => {

    // save first item name for future comparison
    cy.get('h4.card-title')
      .should('be.visible')
      .first()
      .invoke('text')
      .then((productTitle) => {
        cy.wrap(productTitle).as('phoneTitleValue');
      });
    
    // add product to Cart by its name
    cy.addProductToCart('Samsung galaxy s6');

    // click Cart putton
    cy.contains('#cartur', 'Cart').click();

    // wait until Cart is opened
    cy.wait('@viewcart');

    // verify if item is in the cart
    cy.get('@phoneTitleValue').then((phoneTitleValue) => {
      cy.get('.success > td')
      .should('be.visible')
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

    // wait until Sony vaio i5 is visible and save its title for further check
    cy.contains('.card-title', 'Sony vaio i5')
      .should('be.visible')
      .invoke('text')
      .then((laptopTitle) => {
        cy.wrap(laptopTitle).as('laptopTitleValue');
      });

    // open Sony vaio i5 item page
    cy.addProductToCart('Sony vaio i5');

    // click Cart button
    cy.contains('#cartur', 'Cart').click();

    // wait until Cart is opened
    cy.wait('@viewcart');

    // verify if item is in the cart
    cy.get('@laptopTitleValue').then((laptopTitleValue) => {
      cy.get('.success > td')
      .should('be.visible')
      .eq(1)
      .invoke('text')
      .then((cartItemName) => {
        expect(laptopTitleValue).to.be.eq(cartItemName);
      });
    });

  });
});

});
