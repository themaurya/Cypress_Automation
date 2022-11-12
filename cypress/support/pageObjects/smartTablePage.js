export class smartTablePage
{
updateByFirstName(name){
    cy.get('tbody').contains('tr',name).then(tableRow =>
        {
           cy.wrap(tableRow).find('.nb-edit').click()
           cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(12)
           cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain',12)
        })
}
addRecorsWithFirstAndLastName(firstName, lastName){
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(tableRows =>
        {
            cy.wrap(tableRows).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(tableRows).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(tableRows).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(tableCloumns =>
            {
                cy.wrap(tableCloumns).eq(2).should('contain',firstName)
                cy.wrap(tableCloumns).eq(3).should('contain',lastName)
            })
}

deleteRowByIndex(index){
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() =>
    {
        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })
}
}

export const onSmartTablePage = new smartTablePage()