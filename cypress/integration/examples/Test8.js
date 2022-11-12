/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'


describe('my iFrame testSuite', function()
{
    it('my iFrame test case', function()
    {
        cy.visit('https://myapp.com/AutomationPractice/')
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find("a[href*='mentorship']").eq(0).click()
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)
    }
    )
})