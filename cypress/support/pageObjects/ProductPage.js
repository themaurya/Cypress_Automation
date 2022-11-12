class ProductPage
{

getCheckoutBtn()
{
    return  cy.get('.nav-link.btn.btn-primary')
}

checkoutSuccess()
{
    return cy.get('.btn.btn-success')
}
deliveryLocation()
{
    return cy.get('#country')
}
selectLocation()
{
    return cy.get('.suggestions > ul > li > a', { timeout: 10000 }).should('be.visible')
}
checkbox()
{
    return cy.get('#checkbox2')
}
puchase()
{
    return cy.get("input[value='Purchase']")
}
successMessage()
{
    return cy.get('.alert')
}
}

export default ProductPage