/// <reference types="Cypress" />

describe('My first test suite', function()
{
it('my first test case', function()
{
    cy.visit("https://myapp.com/AutomationPractice/")
    cy.get('.mouse-hover-content').invoke('show')
    cy.contains('Top').click()
    cy.url().should('include','top')

   // force click on hidden element
   cy.contains('Top').click({force:true})
   cy.url().should('include','top')
})
})
