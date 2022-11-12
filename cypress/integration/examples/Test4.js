/// <reference types="Cypress" />

describe('My second test suite', function()
{
it('my second test case', function()
{
    cy.visit("http://myapp.com/practice.php")
    cy.get('#alertbtn').click()
    cy.get('[value="Confirm"]').click()

  //window:alert (event)
     cy.on('window:alert',(str) =>
   {
    //Mocha
    expect(str).to.equal('Hello , share this practice page and share your knowledge')
   })

   //window:confirm (event)
   cy.on('window:confirm',(str) =>
   {
    //Mocha
    expect(str).to.equal('Hello , Are you sure you want to confirm?')
   })

   //open new tab
   cy.get('#opentab').invoke('removeAttr','target').click()
   //check if URL is correct
   cy.url().should('include','rahulshettyacademy')
   //navigate back
   cy.go('back')
   
   
})
})