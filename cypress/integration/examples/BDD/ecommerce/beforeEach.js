beforeEach(function()
{
    // runs before all tests
    cy.fixture('testdata').then(function(data)
    {
        this.data = data
    })
})