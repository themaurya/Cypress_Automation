/// <reference types="cypress" />


describe('Test with backend', () =>
{
    beforeEach('login to the app', () =>
    {
        cy.intercept('GET','https://api.realworld.io/api/tags', {fixture: 'tags.json'})
        cy.intercept({method: 'GET', url: 'https://api.realworld.io/api/tags'}, {fixture: 'tags.json'})
        cy.loginToApplication()
    })
    it('should log in' , () =>
    {
        cy.log('Yupp!! we logged in')
    })

    it('verify correct request and response', () =>
    {
        cy.intercept('POST','https://api.realworld.io/api/articles/').as('postArticles')
        cy.contains('a',' New Article ').click()
        cy.get('[formcontrolname="title"]').type('This is my title')
        cy.get('[formcontrolname="description"]').type('This is my description')
        cy.get('[formcontrolname="body"]').type('This is body of my article')
        cy.contains(' Publish Article ').click()

        cy.wait('@postArticles').then( xhr =>
            {
                console.log(xhr)
                expect(xhr.response.statusCode).to.equal(200)
                expect(xhr.request.body.article.body).to.equal('This is body of my article')
                expect(xhr.response.body.article.description).to.equal('This is my description')
            })
    })

    it('verify popular tags are displayed', () =>
    {
        cy.get('.tag-list')
        .should('contain','welcomeTo')
        .and('contain','cypress')
        .and('contain','automation')
    })

    it('verigy global feed like count', ()=>
    {
        cy.intercept('GET','https://api.realworld.io/api/articles/feed*',{"articles":[],"articlesCount":0})
        cy.intercept('GET','https://api.realworld.io/api/articles*',{fixture: 'articles.json'})
        cy.contains('Global Feed').click()
        cy.get('app-article-list button').then(heartList =>
            {
                expect(heartList[0]).to.contain('1')
                expect(heartList[1]).to.contain('5')
            })
        cy.fixture('articles.json').then(file =>
            {
                const articleLink = file.articles[1].slug
                file.articles[1].favoritesCount = 6
                cy.intercept('POST','https://api.realworld.io/api/articles/'+articleLink+'/favorite', file)
            })

            cy.get('app-article-list button').eq(1).click().should('contain','6')
    })
   
    it('intercepting and modifying request and response', () =>
    {
        /*modify request
        cy.intercept('POST','https://api.realworld.io/api/articles/', (req) =>
        {
            req.reply( res =>
                {
                   expect(res.body.article.description).to.equal('This is my description')
                   res.body.article.description = "This is description 2"
                })
        }).as('postArticles') */

        //modify response
        cy.intercept('POST','https://api.realworld.io/api/articles/', (req) =>
        {
            req.body.article.description = "This is description 2"
        }).as('postArticles')
        cy.contains('a',' New Article ').click()
        cy.get('[formcontrolname="title"]').type('This is my title 3')
        cy.get('[formcontrolname="description"]').type('This is my description')
        cy.get('[formcontrolname="body"]').type('This is body of my article')
        cy.contains(' Publish Article ').click()

        cy.wait('@postArticles').then( xhr =>
            {
                console.log(xhr)
                expect(xhr.response.statusCode).to.equal(200)
                expect(xhr.request.body.article.body).to.equal('This is body of my article')
                expect(xhr.response.body.article.description).to.equal('This is description 2')
            })
    })

    it.only('delete a new article in global feed', () =>
    {
       const userCredential = {
            "user": {
              "email": "maurya@gmail.com",
              "password": "Pandu@123"
            }
          }

          const bodyRequest ={
            "article" : {
                "tagList" : [],
                "title" : 'Request from API',
                "description" : "API Testing is easy",
                "body" : "Angular is cool"
            }
        }
          cy.request('POST','https://conduit.productionready.io/api/users/login', userCredential)
          .its('body').then(body =>
            {
                const token = body.user.token
                cy.log(token)
                cy.request( { 
                   url: 'https://conduit.productionready.io/api/articles/',
                   headers: {'Authorization': 'Token '+token},
                   method : 'POST',
                   body : bodyRequest
                }).then( response =>
                    {
                        expect(response.status).to.equal(200)
                    })
                    cy.contains('Global Feed').click()
                    cy.get('.article-preview').first().click()
                    cy.get('.article-actions').contains('Delete Article').click()
                    //lets verify feed is deleted
                    cy.wait(2000)
                    cy.request({
                        url: 'https://api.realworld.io/api/articles?limit=10&offset=0',
                        headers: {'Authorization': 'Token '+token},
                        method : 'GET',
                    }).its('body').then(body =>{
                        expect(body.articles[0].title).not.to.equal('Request from API')
                    })
            })
       })
    })
