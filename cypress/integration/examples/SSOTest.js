/// <reference types = "Cypress" />

describe('this is SSO test suite', function()
{
    it('this is SSO test', function()
    {
      cy.visit('http://localhost:7074/dashboard')
      cy.get('h3').should('contain', 'You are not logged in and cannot access this page')
      const options ={
         method : 'POST',
         url : 'http://localhost:7075/login',
         qs : {
            redirectTo : 'http://localhost:7074/set_token'
         },
         body : {
            username : 'jane.lane',
            password : 'password123'
         },
         form : true
      }
       cy.request(options).then(function(response)
    {
       expect(response.status).to.eq(200)
    })

    cy.visit('http://localhost:7074/dashboard')
    cy.get('h1').should('contain', 'Welcome to the Dashboard')
})
    
})