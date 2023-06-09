describe('Add product to cart', () => {
  
  // declare test data
  const testData = [
    { "category": "Phones", "productName": "Samsung galaxy s6" },
    { "category": "Laptops", "productName": "Sony vaio i5" }
  ]

  beforeEach(() => {
    
    // intercept requests for further waits of them
    cy.intercept('GET', '**/entries').as('entries');
    cy.intercept('POST', '**/addtocart').as('addToCart');
    cy.intercept('POST', '**/viewcart').as('viewcart');
    cy.intercept('POST', '**/deleteitem').as('deleteitem');
    
    // open start page and wait until it's loaded
    cy.visit('/');
    cy.wait('@entries');

  });

  testData.forEach((data) => {

    it(`Checks if ${data.productName} is added to cart`, () => {

      // go to product page
      cy.contains('.list-group-item', data.category).click();

      // wait until product is visible and save its title for further check
      cy.contains('.card-title', data.productName)
        .should('be.visible')
        .invoke('text')
        .then((productTitle) => {
          cy.wrap(productTitle).as('productTitleValue');
        });

      // add product to Cart
      cy.addProductToCart(data.productName);

      // click Cart button
      cy.contains('#cartur', 'Cart').click();

      // wait until Cart is opened
      cy.wait('@viewcart');

      // verify if product is in the cart
      cy.get('@productTitleValue').then((productTitleValue) => {
        cy.get('.success > td')
        .should('be.visible')
        .eq(1)
        .invoke('text')
        .then((cartItemName) => {
          expect(productTitleValue).to.be.eq(cartItemName);
        }); 
      });

    });

  });
  
});
