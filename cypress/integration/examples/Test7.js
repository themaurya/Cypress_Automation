/// <reference types="Cypress" />
describe('my seventh testSuite', function()
{
    it('my seventh test case', function()
    {
        cy.visit('https://myapp.com/AutomationPractice/')
        cy.get('#opentab').then(function(el)
        {
            const url = el.prop('href')
            cy.log(url)
            cy.visit(url)
        })
    }
    )
})