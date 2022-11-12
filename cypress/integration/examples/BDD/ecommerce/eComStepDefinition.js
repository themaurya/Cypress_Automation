import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import HomePage from '../../../../support/pageObjects/HomePage'
import ProductPage from '../../../../support/pageObjects/ProductPage'

const homePage = new HomePage()
const productPage = new ProductPage()
let name

Given('I open ecommerce page', function()
{
    cy.visit(Cypress.env('url'))
})

When('I add items to cart', function()
{
    homePage.getShopTab().click()

 this.data.productName.forEach(function (element)
 {
    cy.selectProduct(element)
     
 });
 productPage.getCheckoutBtn().click()
}) 

And('validate the total price', function()
{
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
})

Then('select the country and verify success message', () =>
{
    productPage.checkoutSuccess().click()
       
    productPage.deliveryLocation().type('India')
   // Cypress.config('defaultCommandTimeout',12000)
    productPage.selectLocation().click()
    productPage.checkbox().click({ force: true })
    productPage.puchase().click()
    productPage.successMessage().then(function(element)
    {
        const alert = element.text()
        expect(alert.includes("Success!")).to.be.true
    })
}) 

When('I fill the form details', function(dataTable)
{
    name = dataTable.rawTable[1][0]
    homePage.getEditBox().type(dataTable.rawTable[1][0])
    homePage.getGender().select(dataTable.rawTable[1][1])
})
Then('validate the form behaviour', function()
{
    homePage.getEditBox().should('have.attr','minlength','2')
    homePage.getTwoWayDataBinding().should('have.value', name)
    homePage.getEntrepreneaurRadioBtn().should('be.disabled')
})

And('select the shop page', function()
{
    homePage.getShopTab().click()
}
)