/// <reference types="Cypress" />

describe('My first test suite', function()
{
it('my first test case', function()
{
    cy.visit("https://myapp.com/seleniumPractise/#/")
    cy.get('.search-keyword').type('ca')
    cy.wait(2000)
    cy.get('.product:visible').should('have.length', 4)
    //aliasing  cy.get('.products')
    
    cy.get('.products').as('productlocator')
    cy.get('@productlocator').find('.product').should('have.length', 4)
    cy.get('@productlocator').find('.product').eq(2).contains('ADD TO CART').click().then(function()
    {
        console.log('test message')
    }
    )
    cy.get('@productlocator').find('.product').each(($e1, index, $list) => {
    const textVeg = $e1.find('h4.product-name').text()
    if(textVeg.includes("Cashew")){
       cy.wrap($e1).find('button').click()
    }
    })
    //assert if brand is correct

    cy.get('.brand').should('have.text', 'GREENKART')

    //below line is to print brand in logs
    cy.get('.brand').then(function(logelement)
    {
        cy.log(logelement.text())
    })
})
})
