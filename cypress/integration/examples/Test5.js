/// <reference types="Cypress" />

describe('My first test suite', function()
{
it('my first test case', function()
{
    cy.visit("https://myapp.com/AutomationPractice/")
    cy.get('.table-display tr td:nth-child(2)').each(($e1, index, $list) =>
    {
        const course = $e1.text()
        if(course.includes('Python'))
        {
            cy.get('.table-display tr td:nth-child(2)').eq(index).next().then(function(price)
            {
                const priceText = price.text()
                expect(priceText).to.equal('25')
            })
        }
    })
})
})
