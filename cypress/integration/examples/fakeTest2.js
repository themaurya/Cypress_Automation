/// <reference types = "Cypress" />

describe('this is fake test suite', function()
{
    it('this is fake test', function()
    {
       cy.visit('https://myapp.com/angularAppdemo')
       cy.intercept('GET','https://myapp.com/Library/GetBook.php?AuthorName=shetty',(req) =>
       {
        req.url='https://myapp.com/Library/GetBook.php?AuthorName=malhotra'
        req.continue((res) =>
        {
            expect(res.statusCode).to.equal(404)
        })
       }).as('dummyUrl')
       cy.get("button[class='btn btn-primary']").click()
       cy.wait('@dummyUrl')
      
    })
})