/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />

import 'cypress-iframe'
import HomePage from '../../support/pageObjects/HomePage'
import ProductPage from '../../support/pageObjects/ProductPage'

describe('my iFrame testSuite', function()
{
    before(function()
    {
        // runs before all tests
        cy.fixture('testdata').then(function(data)
        {
            this.data = data
        })

    })

    it('my iFrame test case', function()
    {
    
       const homePage = new HomePage()
       const productPage = new ProductPage()

      cy.visit(Cypress.env('url'))
      homePage.getEditBox().type(this.data.name)
      homePage.getEditBox().should('have.attr','minlength','2')
      homePage.getGender().select(this.data.gender)
      homePage.getTwoWayDataBinding().should('have.value',this.data.name)
        homePage.getEntrepreneaurRadioBtn().should('be.disabled')
        homePage.getShopTab().click()

           //validate price amount
        this.data.productName.forEach(function (element)
        {
           cy.selectProduct(element)
            
        });
        productPage.getCheckoutBtn().click()

        var total = 0
         cy.get('tr td:nth-child(4) strong').each(($el, index, $list) =>
         {
            const price = $el.text()
            var price1 = price.split(" ")
            price1 = price1[1].trim()
            total = total + Number(price1)
            
         }).then(function()
         {
            cy.get('h3 strong').then(function(element)
            {
                const actualVal = element.text()
                var TotalVal = actualVal.split(" ")
                TotalVal = TotalVal[1].trim()
                expect(total).to.equal(Number(TotalVal))
            })
         })
        productPage.checkoutSuccess().click()
       
        productPage.deliveryLocation().type('India')
       // Cypress.config('defaultCommandTimeout',12000)
        productPage.selectLocation().click()
        productPage.checkbox().click({ force: true })
        productPage.puchase().click()
       // productPage.successMessage().should('have.text',' Thank you! Your order will be delivered in next few weeks :-).')
        productPage.successMessage().then(function(element)
        {
            const alert = element.text()
            expect(alert.includes("Success!")).to.be.true
        })
    }
    )
})