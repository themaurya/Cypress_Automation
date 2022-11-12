/// <reference types = "Cypress" />
const neatCSV = require('neat-csv')
let productName
describe('JWT session', function()
{
    it('login through JWT session test', async function()
    {
        cy.LoginAPI().then(function()
        {
            cy.visit('https://myapp.com/client/',{
                onBeforeLoad : function(window)
                {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
        })
        cy.get(".card-body b").eq(1).then(function(ele) {
            productName = ele.text()
        })
        cy.get(".card-body button:last-of-type").eq(1).click()
        cy.get("[routerlink*='cart']").click()
        cy.contains("Checkout").click()
        cy.get("[placeholder*='Country']").type("ind")
        cy.get(".ta-results button").each(($el, index, $list) =>
        {
            const actualText = $el.text()
            if(actualText.trim() == 'India')
            {
                cy.wrap($el).click()
            }
        })
        cy.get(".action__submit").click()
        cy.wait(2000)
        cy.get(".order-summary button").click()
        //parse csv file
        
        cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_mauryasa.csv")
        .then(async(text) =>
        {
            const csv = await neatCSV(text)
            cy.log(csv)
           const actualProdCSV =  csv[0] ["Product Name"]
           expect(productName).to.equal(actualProdCSV)
        })
        
    })
 })