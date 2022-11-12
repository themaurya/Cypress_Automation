/// <reference types = "Cypress" />

describe('this is API test suite', function()
{
    it('this is API test', function()
    {
       cy.request('POST','http://216.10.245.166/Library/Addbook.php',{
        "name" : "Learn Cypress from me",
        "isbn" : "sanmau",
        "aisle" : "34s9",
        "author" : "Sanjay Maurya"
       }).then(function(response)
    {
       expect(response.body).to.have.property("Msg","successfully added")
       expect(response.status).to.eq(200)
    })
})
    
})