// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add('selectProduct', (productName) => {
    cy.get('h4.card-title').each(($el, index, $list) =>
{
    if($el.text().includes(productName))
    {
        cy.get('button.btn.btn-info').eq(index).click()
    }
})
})

Cypress.Commands.add("LoginAPI", () =>
{
    cy.request('POST', 'https://myapp.com/api/ecom/auth/login', {
        "userEmail" : "themaurya@gmail.com",
        "userPassword" : "Zandu@123"
    }).then(function(response)
    {
        expect(response.status).to.eq(200)
        Cypress.env('token', response.body.token)
        cy.log()
    })
})

Cypress.Commands.add('openHomePage', () =>
{
    cy.visit('http://localhost:4200')
})

Cypress.Commands.add('loginToApplication', () =>
{
    const userCredential = {
        "user": {
          "email": "themaurya@gmail.com",
          "password": "Zandu@123"
        }
      }

    cy.request('POST','https://conduit.productionready.io/api/users/login', userCredential)
    .its('body').then(body => {
        const token = body.user.token
        cy.wrap(token).as('token')
        cy.visit('https://angular.realworld.io/' , {
            onBeforeLoad (win){
                win.localStorage.setItem('jwtToken', token)
            }
        })
    })


/*cy.visit('https://angular.realworld.io/')
cy.contains('a', ' Sign in ').click()
cy.get('[placeholder="Email"]').type('maurya@gmail.com')
cy.get('[placeholder="Password"]').type('Pandu@123')
cy.get('form').submit() */
})
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })