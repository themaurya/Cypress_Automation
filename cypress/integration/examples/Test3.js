/// <reference types="Cypress" />

describe('My second test suite', function()
{
it('my second test case', function()
{
    cy.visit("https://myapp.com/AutomationPractice/")

    //handling checkboxes
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
    cy.get('input[type="checkbox"]').check(['option2','option3'])

    //handling static drop-down
    cy.get('select').select('option2').should('have.value','option2')

     //handling static drop-down
     cy.get('#autocomplete').type('ind')
     cy.get('.ui-menu-item div').each(($e1, index, $list) => {
    
        if($e1.text()==="India"){
          cy.wrap($e1).click()
        }
        })
    cy.get('#autocomplete').should('have.value', 'India')

    //checking visibility/invisiblity of an element

    cy.get('#displayed-text').should('be.visible')
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible')
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible')

    //Radio button
    cy.get('[value="radio2"]').click().should('be.checked')
})
})
