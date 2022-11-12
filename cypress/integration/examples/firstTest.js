/// <reference types="Cypress" />

describe('Our first test suite',() =>
{
    it('first test', () =>
    {
        cy.visit('http://localhost:4200')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
       
        // by Tag name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by class
        cy.get('.input-full-width')

        //by attribute name
        cy.get('[placeholder]')

        //by attribute name and value
        cy.get('[placeholder="Email"]')

        //by class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //The most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')

        //by tag name and attribute with value
        cy.get('input[placeholder="Email"]')

        // by two different attributes
        cy.get('[placeholder="Email"][type="email"]')

        // by Tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail.input-full-width')
    })

it('this is second test', () =>
{
    cy.visit('http://localhost:4200')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    cy.contains('[status="primary"]','Sign in')
    cy.get('#inputEmail3')
    .parents('form')
    .find('button')
    .should('contain','Sign in')
    .parents('form')
    .find('nb-checkbox')
    .click()
    //navigating using contains and find
    cy.contains('nb-card','Horizontal form').find('[type="email"]')
})

it('then and wrap methods', () =>
{
    cy.visit('http://localhost:4200')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
  
  /*  cy.contains('nb-card','Using the Grid')
    .find('[for="inputEmail1"]')
    .should('contain','Email')
    cy.contains('nb-card','Using the Grid')
    .find('[for="inputPassword2"]')
    .should('contain','Password')
    // same thing for Basic form
    cy.contains('nb-card','Basic form')
    .find('[for="exampleInputEmail1"]')
    .should('contain','Email address')
    cy.contains('nb-card','Basic form')
    .find('[for="exampleInputPassword1"]')
    .should('contain','Password')*/

    //selenium style
   /* 
   const firstForm =  cy.contains('nb-card','Using the Grid')
    const secondForm =  cy.contains('nb-card','Basic form')

    firstForm .find('[for="inputEmail1"]').should('contain','Email')
    firstForm.find('[for="inputPassword2"]').should('contain','Password')

    secondForm.find('[for="exampleInputEmail1"]').should('contain','Email address')
    secondForm.find('[for="exampleInputPassword1"]').should('contain','Password')
    */
    //Cypress style
    cy.contains('nb-card','Using the Grid').then(firstForm =>
        {
           const emailLabelFirst =  firstForm.find('[for="inputEmail1"]').text()
           expect(emailLabelFirst).to.equal('Email')
           const passwordLabelFirst =   firstForm.find('[for="inputPassword2"]').text()
           expect(passwordLabelFirst).to.equal('Password')
           cy.contains('nb-card','Basic form').then(secondFrom =>
            {
                const emailLabelSecond= secondFrom.find('[for="exampleInputEmail1"]').text()
                const passwordLabelSecond= secondFrom.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)
            //swithing back from Jquery to Cypress context use wrap Jquery object
            cy.wrap(firstForm).find('[for="inputEmail1"]').should('contain','Email')

            })
        })
})
it('Invoke command',() =>
{
    cy.visit('http://localhost:4200')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    //1 Cypress way
    cy.get('[for="exampleInputEmail1"]')
    .should('contain','Email address')
    .should('have.class','label')
    .and('have.text', 'Email address')
    
    //2 JQuery way
    cy.get('[for="exampleInputEmail1"]').then(label =>
        {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')
        })

    //3 using Invoke command
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text =>
        {
            expect(text).to.equal('Email address')
        })

    cy.contains('nb-card','Basic form')
    .find('nb-checkbox')
    .click()
    .find('.custom-checkbox')
    .invoke('attr','class')
    //.should('contain', 'checked')
    .then(classValue =>
        {
            expect(classValue).to.contain('checked')
        })
})

it('Asset property', () =>
{
    function selectDayFromCurrent(day){
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleString('default', {month: 'short'})
        console.log("Future date is: "+futureDay+" and future month is: "+futureMonth)
        let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
//check the month
cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttributee =>
{
   if(!dateAttributee.includes(futureMonth)){
    cy.get('[data-name="chevron-right"]').click()
    selectDayFromCurrent(day)
   } else {
    cy.get('nb-calendar-picker-row [class="day-cell ng-star-inserted"]').contains(futureDay).click()
   }
})
return dateAssert
      }

    cy.visit('http://localhost:4200')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()
   
    cy.contains('nb-card','Common Datepicker')
    .find('input')
    .then(input =>
        {
          cy.wrap(input).click()
         let dateAssert = selectDayFromCurrent(30)
         
    //assert value is selected
         cy.wrap(input).invoke('prop','value').should('contain',dateAssert)
         cy.wrap(input).should('have.value', dateAssert)
        })
})
it('radio buttons', () =>
{
    cy.visit('http://localhost:4200')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(readioButtons =>
        {
            cy.wrap(readioButtons)
            .first() //eq(0) can also be used
            .check({force: true})
            .should('be.checked')
            //check on second radio button
            cy.wrap(readioButtons)
            .eq(1)
            .check({force: true})
            //first radio button should not be checked
            cy.wrap(readioButtons)
            .first()
            .should('not.be.checked')

            //third radio button
            cy.wrap(readioButtons)
            .eq(2)
            .should('be.disabled')
        })

})

it('checkboxes', () =>
{
    cy.visit('http://localhost:4200')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    //checkboxes
    cy.get('[type="checkbox"]').check({force: true})

    //same operation can be performed using click
    cy.get('[type="checkbox"]').eq(0).click({force: true})
})

it('list and drop downs', () =>
{
    cy.visit('http://localhost:4200')
    //1 approach
   cy.get('nav nb-select').click()
   cy.get('.options-list').contains('Dark').click()
   cy.get('nav nb-select').should('contain','Dark')
   // verify background color of page
   cy.get('nb-layout-header nav').should('have.css','background-color', 'rgb(34, 43, 69)')

    //2 select options using each method
    cy.get('nav nb-select').then(dropdown =>
        {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index)  =>
                {
                    const itemText = listItem.text().trim()
                    //create JSON objects of background color
                    const colors = {
                        "Light" : "rgb(255, 255, 255)",
                        "Dark" : "rgb(34, 43, 69)",
                        "Cosmic" : "rgb(50, 50, 89)",
                        "Corporate" : "rgb(255, 255, 255)"
                    }
                    cy.wrap(listItem).click()
                    cy.wrap(dropdown).should('contain',itemText)
                    cy.get('nb-layout-header nav').should('have.css','background-color', colors[itemText])
                    // should not click on dropdown after selecting last item
                    if(index < 3){
                        cy.wrap(dropdown).click()
                    }
                })
        })
})

it('web tables', () =>
{
    cy.visit('http://localhost:4200')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()
    //1 updating existing table value
    cy.get('tbody').contains('tr','Larry').then(tableRow =>
        {
           cy.wrap(tableRow).find('.nb-edit').click()
           cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
           cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain','25')
        })
    //2 adding a new row in the table
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(tableRows =>
        {
            cy.wrap(tableRows).find('[placeholder="First Name"]').type('Artem')
            cy.wrap(tableRows).find('[placeholder="Last Name"]').type('Border')
            cy.wrap(tableRows).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(tableCloumns =>
            {
                cy.wrap(tableCloumns).eq(2).should('contain','Artem')
                cy.wrap(tableCloumns).eq(3).should('contain','Border')
            })
        //3 search the table
        cy.get('thead [placeholder="Age"]').type('20')
        cy.wait(500)
        cy.get('tbody tr').each(tableRows =>
            {
                cy.wrap(tableRows).find('td').eq(6).should('contain','20')
            })
        //4 try searching multiple age values
        const age = [25, 30, 40, 200]

        cy.wrap(age).each(age =>
            {
                cy.get('thead [placeholder="Age"]').clear().type(age)   
                cy.wait(500)
                cy.get('tbody tr').each(tableRows =>
            {
                if (age == 200){
                    cy.wrap(tableRows).should('contain','No data found')
                }
                else{
                    cy.wrap(tableRows).find('td').eq(6).should('contain', age)
                }
            }) 
            })
})

it('tool tip', () =>
{
    cy.visit('http://localhost:4200')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()

    cy.contains('nb-card','Colored Tooltips')
    .contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')
})
it('dialog box', () =>
{
    cy.visit('http://localhost:4200')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()
    cy.get('tbody tr').first().find('.nb-trash').click()
    //1 method
    cy.on('window:confirm',(confirm) =>
    {
        expect(confirm).to.equal('Are you sure you want to delete?')

    })

    //2 method
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then(() =>
    {
        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })

    // 3 instead of confirm click cancel
    
    cy.on('window:confirm',() => false)
})
})