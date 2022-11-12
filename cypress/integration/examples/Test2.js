/// <reference types="Cypress" />

describe('My second test suite', function()
{
it('my second test case', function()
{
    cy.visit("https://myapp.com/seleniumPractise/#/")
    cy.get('.search-keyword').type('ca')
    cy.wait(2000)
    //aliasing  cy.get('.products')
    cy.get('.products').as('productlocator')
    cy.get('@productlocator').find('.product').each(($e1, index, $list) => {
    const textVeg = $e1.find('h4.product-name').text()
    if(textVeg.includes("Cashew")){
       cy.wrap($e1).find('button').click()
    }
    })
    cy.get('.cart-icon > img').click()
    cy.contains('PROCEED TO CHECKOUT').click()
    cy.contains('Place Order').click()
})
})
